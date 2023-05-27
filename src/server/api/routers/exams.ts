import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type{ Prisma } from "@prisma/client";

export const examRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
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

  studentExams: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.exam.findMany({
      where: {
        studentId: input,
      },
    });
  }),

  addExam: protectedProcedure.input(z.object({
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

  search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("search in", input)
    const searchQuery: Prisma.ExamWhereInput = {
      OR: [
        { name: { contains: input, mode: "insensitive" } },
        { student:{name: { contains: input, mode: "insensitive" }} },
        { slug: { contains: input, mode: "insensitive" } },
        { term: { contains: input, mode: "insensitive" } },
        // Add additional conditions using the OR operator if needed
      ]
    };
    return ctx.prisma.exam.findMany({
      where: searchQuery,
      include: {
        student: true
      }
    })
  }),
});
