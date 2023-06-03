import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.teacher.findUnique({
      where: {
        slug: input
      }
    });
  }),

  addTeacher: protectedProcedure.input(z.object({
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

  editTeacher: protectedProcedure.input(z.object({
    name: z.string(),
    slug: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    joiningDate: z.string(),
    gender: z.string(),
    qualification: z.string(),
    dateOfBirth: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const encrypterPass = await bcrypt.hash(input.password, 10)
    input.password = encrypterPass
    console.log("trpc input", input)
    return ctx.prisma.teacher.update({
      where: {
        slug: input.slug
      },
      data: input,
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.teacher.delete({
      where: {
        slug: input
      }
    })
  }),
});
