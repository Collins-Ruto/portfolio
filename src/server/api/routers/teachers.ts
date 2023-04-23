import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.teacher.findUnique({
      where: {
        slug: input
      },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        password: true
      }
    });
  }),

  addTeacher: publicProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    joiningDate: z.string(),
    gender: z.string(),
    qualification: z.string(),
    dateOfBirth: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.teacher.create({
      data: input,
    });
  }),

  editTeacher: publicProcedure.input(z.object({
    slug: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.teacher.update({
      where: {
        slug: input.slug
      },
      data: input,
    });
  }),
});
