import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const examRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.exam.findMany({
      include: {
        student: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      skip: input,
    });
  }),

  count: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exam.count();
  }),

  getIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exam.findMany({
      select: {
        id: true,
      },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
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
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),

  addExam: protectedProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    term: z.string(),
    results: z.array(z.object({
      slug: z.string(),
      marks: z.string(),
    })),
    examDate: z.string(),
    studentId: z.string()
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    const newInput = { ...input, createdAt: new Date() };
    return ctx.prisma.exam.create({
      data: newInput,
    });
  }),

  addManyExams: protectedProcedure.input(z.array(z.object({
    name: z.string(),
    slug: z.string(),
    term: z.string(),
    results: z.array(z.object({
      slug: z.string(),
      marks: z.string(),
    })),
    examDate: z.string(),
    studentId: z.string()
  }))).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    for (const exam of input) {
      const newInput = { ...exam, createdAt: new Date() };
      return ctx.prisma.exam.create({
        data: newInput,
      })
    }
  }),

  search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("search in", input)
    const searchQuery: Prisma.ExamWhereInput = {
      OR: [
        { name: { contains: input, mode: "insensitive" } },
        { student: { name: { contains: input, mode: "insensitive" } } },
        { slug: { contains: input, mode: "insensitive" } },
        { term: { contains: input, mode: "insensitive" } },
        // Add additional conditions using the OR operator if needed
      ]
    };
    return ctx.prisma.exam.findMany({
      where: searchQuery,
      include: {
        student: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })
  }),
});
