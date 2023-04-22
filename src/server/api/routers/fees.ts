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

  // addFees: publicProcedure<Fee, Fee>()({
  //   input: z.object({
  //     name: z.string(),
  //     slug: z.string(),
  //     term: z.string(),
  //     type: z.string(),
  //     payday: z.string(),
  //     amount: z.string(),
  //     studentId: z.string(),
  //     student: z.object({
  //       // You can define the schema for the `student` object here
  //     }).optional(),
  //   }),
  //   async resolve({ input }, ctx) {
  //     const fee = await ctx.prisma.fee.create({
  //       data: input,
  //     });
  //     return fee;
  //   },
  // });

  // addFee: publicProcedure<CreateFeeInputType, Fee>({
  //   input: CreateFee,
  //   async query({ ctx, input }) {
  //     const newFee = await ctx.prisma.fee.create({
  //       data: input.fee,
  //     });

  //     return newFee;
  //   },
  // });

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
