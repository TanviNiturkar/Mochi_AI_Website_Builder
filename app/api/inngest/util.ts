import Sandbox from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

/**
 * Connect to an existing E2B sandbox
 */
export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(60_000*10*3); // 30 minutes
  return sandbox;
}

/**
 * Safely extract the last assistant text from an Inngest/AgentResult
 */
export function lastAssistantTextMessageContent(result: AgentResult) {
  if (!result || !Array.isArray(result.output)) return undefined;

  const lastIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastIndex] as TextMessage | undefined;

  if (!message?.content) return undefined;
  return typeof message.content === "string"
    ? message.content
    : message.content.map((c) => c.text).join("");
}
