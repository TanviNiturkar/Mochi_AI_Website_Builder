import { inngest } from "@/app/api/inngest/client";

export default async function handler(req : any, res:any) {
  try {
    const value = req.body?.value || "Hello World";

    // Trigger the helloworld function via Inngest
    const event = await inngest.send({
      name: "loveable/hello", // the event name in your helloworld function
      data: { value },
    });

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
}
