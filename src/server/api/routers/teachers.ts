import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findMany();
  }),
    
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    if (input === 'all') {
        return ctx.prisma.teacher.findMany({
            select: {
                id: true,
                name: true,
                email: true,
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
