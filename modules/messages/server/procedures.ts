import { inngest } from "@/app/api/inngest/client";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import z from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure
  .input(z.object({
    projectId:z.string().min(1,{message: "Project ID is required"}),
  }),
  )
  .query(async({input})=>{
    const messages = await prisma.message.findMany({
      where: {
        projectId : input.projectId,
      },
      include : {
        fragment : true,
      },
        orderBy : {
          updatedAt:"asc",
        },
      })
      return messages;
  }),
  // Define your message-related procedures here
  create : baseProcedure
  .input(z.object({
    Value:z.string()
    .min(1,{message: "Message is required"})
    .max(10000,{message: "Message is too long"}),
    projectId:z.string().min(1,{message: "Project ID is required"}),
  }),
  )
  .mutation(async({input})=>{
    const createdMessage = await prisma.message.create({
        data :{
          projectId: input.projectId,
            content: input.Value,
            role:"USER",
            type:"RESULT",
        }
    })
    await inngest.send({
        name : "code-agent/run",
        data : {
            value : input.Value,
            projectId : input.projectId,
        }
    })
    return createdMessage;
  }),
});