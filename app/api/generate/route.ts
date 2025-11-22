import { NextResponse } from "next/server";
import { inngest } from "@/app/api/inngest/client";

export async function POST(req: Request) {
  try {
    const { prompt = "create a component", slug = "" } = await req.json();

    const value = slug ? `${prompt}\nSLUG:${slug}` : prompt;

    const event = await inngest.send({
      name: "loveable/hello",
      data: { value, slug },
    });

    return NextResponse.json({ ok: true, event });
  } catch (err) {
    console.error("generate route error", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
