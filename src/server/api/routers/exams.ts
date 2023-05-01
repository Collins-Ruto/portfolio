import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
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
        where: {
            id: input
          },
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

  addExam: publicProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    term: z.string(),
    examDate: z.string(),
    studentId: z.string()
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.exam.create({
      data: input,
    });
  }),
});
