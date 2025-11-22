import {serve} from "inngest/next";
import {inngest} from "@/app/api/inngest/client";
import {codeAgentFunction} from "@/app/api/inngest/functions";
export const {POST,GET,PUT} = serve({
    client: inngest,
    functions : [
codeAgentFunction,
    ],
});