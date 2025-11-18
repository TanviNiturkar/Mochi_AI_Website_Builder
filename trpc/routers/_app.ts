import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/app/api/inngest/client';
export const appRouter = createTRPCRouter({
    invoke: baseProcedure
    .input(
      z.object({
        value: z.string(),
        }),
        )
        .mutation(async ({input}) => {
            await inngest.send({
                name: "loveable/hello",
                data: {
                    value: input.value,
                }
            })
        }),
  createAI: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;