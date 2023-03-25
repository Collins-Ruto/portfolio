import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const examRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exam.findMany({
        include: {
            student: true
        }
    });
  }),
    
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    if (input === 'all') {
        return ctx.prisma.exam.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }
    }),

  studentExams: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.exam.findMany({
            where: {
                studentId: input,
            },
        });
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
