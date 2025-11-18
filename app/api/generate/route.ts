import { NextResponse } from "next/server";
import { inngest } from "@/app/api/inngest/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "create a component";
    const slug = body.slug || "";
    const value = slug ? `${prompt}\nSLUG:${slug}` : prompt;

    const ev = await inngest.send({
      name: "loveable/hello",
      data: { value, slug },
    });

    return NextResponse.json({ ok: true, event: ev });
  } catch (err) {
    console.error("generate route error", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
