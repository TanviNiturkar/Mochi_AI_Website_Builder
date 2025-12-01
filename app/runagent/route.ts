import { inngest } from "@/app/api/inngest/client";

// This route will be called with a POST request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const value = body?.value || "Hello World";

    // Trigger the helloworld function via Inngest
    const event = await inngest.send({
      name: "loveable/hello",
      data: { value },
    });

    return Response.json(event, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
