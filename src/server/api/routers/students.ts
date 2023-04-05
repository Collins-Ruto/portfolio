import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const studentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.student.findMany({
      include: {
        stream: true
      }
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    if (input === 'all') {
      return ctx.prisma.student.findMany({
        where: {
          admissionId: input
        },
        select: {
          id: true,
          name: true,
          email: true,
          stream: true
        }
      });
    }
  }),

  addStudent: publicProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    parent: z.string(),
    gender: z.string(),
    admissionId: z.string(),
    streamId: z.string(),
    dateOfBirth: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.student.create({
      data: input,
    });
  }),

  editStudent: publicProcedure.input(z.object({
    slug: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.student.update({
      where: {
        slug: input.slug
      },
      data: input,
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
