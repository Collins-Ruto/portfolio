import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const feeRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.fee.findMany({
      include: {
        student: {
          include: {
            stream: true
          }
        }
      },
      take: 10,
      skip: input,
    });
  }),

  count: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.fee.count();
  }),

  getIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.fee.findMany({
      select: {
        id: true,
      },
    });
  }),

  // :{ctx:Context, input:string}
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.fee.findUnique({
      where: {
        id: input
      }
    });
  }),

  studentFees: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.fee.findMany({
      where: {
        studentId: input,
      },
    });
  }),

  addFee: protectedProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    term: z.string(),
    type: z.string(),
    payday: z.string(),
    amount: z.string(),
    studentId: z.string()
  })).mutation(({ ctx, input }) => {
    console.log("trpc input",input)
    return ctx.prisma.fee.create({
      data: input,
    });
  }),

  search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("search in", input)
    const searchQuery: Prisma.FeeWhereInput = {
      OR: [
        { student: {name: { contains: input, mode: "insensitive" }} },
        { student: {slug: { contains: input, mode: "insensitive" }} },
        { student: {admissionId: { contains: input, mode: "insensitive" }} },
        // Add additional conditions using the OR operator if needed
      ]
    };
    return ctx.prisma.fee.findMany({
      where: searchQuery,
      include: {
        student: {
          include: {
            stream: true
          }
        }
      }
    })
  }),

});
