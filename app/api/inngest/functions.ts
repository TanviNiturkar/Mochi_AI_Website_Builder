import { inngest } from "./client";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

function safeRelPath(p: string) {
  return p.replace(/^\/+/, "").replace(/\.\.(\/|\\)/g, "");
}

export const helloworld = inngest.createFunction(
  { id: "hello" },
  { event: "loveable/hello" },
  async ({ event, step }) => {
    const rawValue = String(event.data?.value || "");
    const slug = String(event.data?.slug || "page");

    // SYSTEM PROMPT
    const systemPrompt = `
You are a Next.js file generator.
Generate ONLY this JSON:
{
  "files": {
    "app/generated/${slug}/page.tsx": "...",
    "app/generated/${slug}/meta.json": "{\\"title\\":\\"...\\",\\"description\\":\\"...\\"}"
  },
  "summary": "short text"
}
    `.trim();

    // AI CALL
    const ai = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawValue },
      ],
      max_output_tokens: 4096,
    });

    const text = ai.output_text || "{}";

    // PARSE JSON
    let parsed: any = {};
    try {
      const match = text.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(match ? match[0] : text);
    } catch {
      parsed = {};
    }

    const files: Record<string, string> = parsed.files || {};

    const written: string[] = [];

    // WRITE ALL GENERATED FILES LOCALLY
    for (const [rel, content] of Object.entries(files)) {
      const clean = safeRelPath(rel);
      const out = path.join(process.cwd(), clean);

      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, content);
      written.push(clean);
    }

    return {
      url: `/generated/${slug}`,
      files,
      written,
      summary: parsed.summary || "No summary",
    };
  }
);
