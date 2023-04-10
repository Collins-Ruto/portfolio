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

  addFee: publicProcedure.input(z.string()).query(({ ctx, input }) => {      Binding element
  27   │ │ │ return ctx.prisma.fee.findMany({
  28   │ │ │ │ │ where: {
  29   │ │ │ │ │ │ │ studentId: input,
  30   │ │ │ │ │ },
  31   │ │ │ });
  32   │ }),

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
