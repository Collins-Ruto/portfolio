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
    if (input === 'all') {
      return ctx.prisma.teacher.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    }
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
    streamId: z.string(),
    dateOfBirth: z.string(),
  })).mutation(({ ctx, input }) => {
    console.log("trpc input", input)
    return ctx.prisma.teacher.create({
      data: input,
    });
  }),
});
