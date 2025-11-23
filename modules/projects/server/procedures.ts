import { inngest } from "@/app/api/inngest/client";
import { prisma } from "@/lib/db";
import { consumeCredits } from "@/lib/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const projectsRouter = createTRPCRouter({
  getOne: protectedProcedure
  .input(z.object({
    id: z.string().min(1,{message: "Project ID is required"}),
  }))
  .query(async({input,ctx})=>{
    const exisitingprojects = await prisma.project.findUnique({
        where: {
          id : input.id,
          userId : ctx.auth.userId,
        },
      });
      if(!exisitingprojects){
        throw new TRPCError({
          code : "NOT_FOUND",
          message : "Project not found",
        });
      }
      return exisitingprojects;
  }),
  getMany: protectedProcedure.query(async({ctx})=>{
    const projects = await prisma.project.findMany({
      where: {
        userId : ctx.auth.userId,
      },
        orderBy : {
          updatedAt:"desc",
        },
      })
      return projects;
  }),
  // Define your message-related procedures here
  create : protectedProcedure
  .input(z.object({
    Value:z.string()
    .min(1,{message: "Value is required"})
    .max(10000,{message: "Value is too long"}),
  }),
  )
  .mutation(async({input,ctx})=>{
     try {
          await consumeCredits();
          }
          catch (e){
            if (e instanceof Error) {
              throw new TRPCError({
                code : "BAD_REQUEST",
                message : "Something went wrong",
              });
            }
            else {
              throw new TRPCError({
                code : "TOO_MANY_REQUESTS",
                message : "You have run out of credits. Please upgrade your plan to continue using the service.",
              });
            }
          }
    const createdProject = await prisma.project.create({
      data :{
        userId : ctx.auth.userId,
        name : generateSlug(2, {
          format : "kebab",

        }), messages: {
          create : {
            content: input.Value,
            role:"USER",
            type:"RESULT",
          }
        }
      }
    })
  
    await inngest.send({
        name : "code-agent/run",
        data : {
            value : input.Value,
            projectId : createdProject.id,
        }
    })
    return createdProject;
  }),
});