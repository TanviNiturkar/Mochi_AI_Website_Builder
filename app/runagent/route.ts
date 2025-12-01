import { inngest } from "@/app/api/inngest/client";

// This route only handles POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const value = body?.value || "Hello World";

    // Trigger the Inngest event
    const event = await inngest.send({
      name: "loveable/hello",
      data: { value },
    });

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
