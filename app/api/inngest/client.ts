import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Mochi",
   eventKey: process.env.INNGEST_EVENT_KEY!
});
