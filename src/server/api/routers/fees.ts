import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const feeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fee.findMany({
        include: {
            student: true
        }
    });
  }),
    
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    if (input === 'all') {
        return ctx.prisma.fee.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
    
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
