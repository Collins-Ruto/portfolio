import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";

export const studentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.student.findMany({
      include: {
        stream: true
      },
      take: 10,
      // orderBy: {
      //   createdAt: 'desc'
      // }
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.student.findUnique({
      where: {
        slug: input
      },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        password: true,
        streamId: true
      }
    });
  }),

  addStudent: protectedProcedure.input(z.object({
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

  editStudent: protectedProcedure.input(z.object({
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

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.student.delete({
      where: {
        slug: input
      }
    })
  }),

  search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("search in", input)
    const searchQuery: Prisma.StudentWhereInput = {
      OR: [
        { name: { contains: input, mode: "insensitive" } },
        { slug: { contains: input, mode: "insensitive" } },
        { admissionId: { contains: input, mode: "insensitive" } },
        // Add additional conditions using the OR operator if needed
      ]
    };
    return ctx.prisma.student.findMany({
      where: searchQuery,
      include: {
        stream: true
      }
    })
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
