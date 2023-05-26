import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const feeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fee.findMany({
      include: {
        student: {
          include: {
            stream: true
          }
        }
      }
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

  studentFees: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.fee.findMany({
      where: {
        studentId: input,
      },
    });
  }),

  addFee: publicProcedure.input(z.object({
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

});
