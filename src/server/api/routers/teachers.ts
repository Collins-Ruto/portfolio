import { z } from "zod";
import bcrypt, { compare } from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),

  getIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findMany({
      select: {
        id: true,
      },
    });
  }),


  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.teacher.findUnique({
      where: {
        id: input
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
  })).mutation(async ({ ctx, input }) => {
    const encrypterPass = await bcrypt.hash(input.password, 10)
    input.password = encrypterPass
    console.log("trpc input", input)
    return ctx.prisma.teacher.create({
      data: { ...input, createdAt: new Date() },
    });
  }),

  editPassword: protectedProcedure.input(z.object({
    id: z.string(),
    password: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const encrypterPass = await bcrypt.hash(input.password, 10)
    input.password = encrypterPass
    console.log("trpc input", input)
    return ctx.prisma.teacher.update({
      where: {
        id: input.id
      },
      data: {
        password: encrypterPass
      },
    });
  }),

  editInfo: protectedProcedure.input(z.object({
    id: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),

  })).mutation(async ({ ctx, input }) => {
    console.log("trpc input", input)
    const inputUpdate = {
      email: (input.email !== "" ? input.email : undefined),
      phone: (input.phone !== "" ? input.phone : undefined)
    }
    return ctx.prisma.teacher.update({
      where: {
        id: input.id
      },
      data: inputUpdate,
    });
  }),

  passwordVerify: protectedProcedure.input(z.object({
    id: z.string(),
    password: z.string()
  })).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.teacher.findUnique({
      where: {
        id: input.id
      },
      select: {
        password: true
      }
    })
    const isPasswordValid = await compare(
      input.password,
      user?.password || ""
    )
    return isPasswordValid
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.teacher.delete({
      where: {
        slug: input
      }
    })
  }),
});
