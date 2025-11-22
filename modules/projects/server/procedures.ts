import { inngest } from "@/app/api/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const projectsRouter = createTRPCRouter({
  getOne: baseProcedure
  .input(z.object({
    id: z.string().min(1,{message: "Project ID is required"}),
  }))
  .query(async({input})=>{
    const exisitingprojects = await prisma.project.findUnique({
        where: {
          id : input.id,
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
  getMany: baseProcedure.query(async()=>{
    const projects = await prisma.project.findMany({
        orderBy : {
          updatedAt:"desc",
        },
      })
      return projects;
  }),
  // Define your message-related procedures here
  create : baseProcedure
  .input(z.object({
    Value:z.string()
    .min(1,{message: "Value is required"})
    .max(10000,{message: "Value is too long"}),
  }),
  )
  .mutation(async({input})=>{
    const createdProject = await prisma.project.create({
      data :{
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