import { inngest } from "./client";
import { openai, createAgent, createTool, createNetwork, Tool } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox, lastAssistantTextMessageContent } from "./util";
import { PROMPT } from "@app/api/inngest/prompts";
import { z } from "zod";
import { prisma } from "@/lib/db";


interface AgentState {
  summary?: string;
  files : {[path: string]: string};
}

// ------------------------------------------------------------
// ✅ ZOD SCHEMAS
// ------------------------------------------------------------
const terminalSchema = z.object({
  command: z.string().describe("The shell command to execute"),
});

const createOrUpdateFilesSchema = z.object({
  files: z.array(
    z.object({
      path: z.string().describe("File path inside the sandbox"),
      content: z.string().describe("File content to write"),
    })
  ),
});

const readFileSchema = z.object({
  files: z.array(z.string().describe("List of file paths to read")),
});



// ------------------------------------------------------------
// ✅ MAIN FUNCTION
// ------------------------------------------------------------
export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    if (!step) throw new Error("Step object is undefined");

    const value = event.data?.value || "World";

    // Step 1: Create Sandbox
    const sandboxId = await step.run("get-sandbox-id", async () => {
      try {
        const sandbox = await Sandbox.create("mochi-nextjs-test3");
        console.log("✅ Sandbox created:", sandbox.sandboxId);
        return sandbox.sandboxId;
      } catch (err: unknown) {
        console.error("❌ Sandbox creation failed:", err);
        throw new Error("Sandbox could not be created. Check E2B_API_KEY or Docker.");
      }
    });

    // Step 2: Create Agent + Tools
    const codeAgent = createAgent<AgentState>({
      name: "codeAgent",
      description: "An expert coding agent",
      system: PROMPT,
      model: openai({ model: "gpt-4.1", defaultParameters: { temperature: 0.1 } }),
      tools: [
        createTool({
          name: "terminal",
          description: "Execute shell commands in the sandbox",
          parameters: terminalSchema,
          handler: async ({ command }) => {
            return await step.run("terminal-command", async () => {
              const buffers = { stdout: "", stderr: "" };
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                } ,
                });
                return result.stdout;
              } catch (err: unknown) {
                return `❌ Command failed: ${String(err)}\nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}`;
              }
            });
          },
        }),

        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files inside the sandbox",
          parameters: createOrUpdateFilesSchema,
          handler: async ({ files }, { network }) => {
            if (!network) throw new Error("Network object is undefined");
            const result = await step.run("create-or-update-files", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const updatedFiles = network.state.data.files || {};
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  updatedFiles[file.path] = file.content;
                }
                return updatedFiles;
              } catch (err: unknown) {
                console.error("❌ File creation error:", err);
                return { error: String(err) };
              }
            });
            if (typeof result === "object") network.state.data.files = result;
          },
        }),

        createTool({
          name: "readFile",
          description: "Read file contents from the sandbox",
          parameters: readFileSchema,
          handler: async ({ files },{step,network} : Tool.Options<AgentState>

          ) => {
            return await step?.run("read-files", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return contents;
              } catch (err: unknown) {
                return { error: String(err) };
              }
            });
          },
        }),
      ],

      lifecycle: {
        onResponse: async ({ result, network }) => {
          const msg = lastAssistantTextMessageContent(result);
          if (msg && network) {
            network.state.data.summary = msg.includes("<task_summary>")
              ? msg
              : network.state.data.summary;
          }
          return result;
        },
      },
    });

    // Step 3: Network
    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      router: async ({ network }) => {
        if (!network.state.data.summary) return codeAgent;
      },
    });

    // Step 4: Run Network
    const result = await network.run(value);

    const isError =
  !result.state.data.summary ||
  Object.keys(result.state.data.files || {}).length === 0;
    // Step 5: Sandbox URL
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      try {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `http://${host}`;
      } catch (err: unknown) {
        console.error("❌ Failed to get sandbox URL:", err);
        return null;
      }
    });

    await step.run("save-result",async()=> {
      if(isError) {
        return await prisma.message.create({
          data :{
            projectId : event.data.projectId,
            content: "Code Agent failed to generate a result.",
            role:"ASSISTANT",
            type:"ERROR",
          }
        })
      }

      return await prisma.message.create({
        data :{
          projectId : event.data.projectId,
          content: result.state.data.summary || "No summary generated",
          role:"ASSISTANT",
          type:"RESULT",
          fragment : {
            create : {
              sandboxUrl: sandboxUrl || "N/A",
              title: "Fragment",
              files: result.state.data.files,
            }
          }
        }
      })
    })
    // Step 6: Return final result
    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.files || {},
      summary: result.state.data.summary || "No summary generated",
    };
  }
);
