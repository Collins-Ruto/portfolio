import { z } from "zod";
import bcrypt, { compare } from "bcryptjs";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const studentRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.student.findMany({
      include: {
        stream: true,
      },
      where: {
        deleted: false
      },
      take: 10,
      skip: input,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),

  getIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.student.findMany({
      select: {
        id: true,
        name: true,
        streamId: true,
      },
    });
  }),

  count: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.student.count();
  }),

  getAllStream: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.student.findMany({
      where: {
        streamId: input,
        deleted: false
      },
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.student.findUnique({
      where: {
        slug: input,
      }
    });
  }),

  getByAdm: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.student.findUnique({
      where: {
        admissionId: input
      },
      include: { stream: true }
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
  })).mutation(async ({ ctx, input }) => {
    const encrypterPass = await bcrypt.hash(input.slug, 10)
    input.password = encrypterPass
    console.log("trpc input", input)
    const { streamId, ...inputData } = input
    return ctx.prisma.student.create({
      data: {
        createdAt: new Date(),
        stream: {
          connect: {
            slug: streamId
          }
        },
        ...inputData
      },
    });
  }),

  editStudent: protectedProcedure.input(z.object({
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
  })).mutation(async ({ ctx, input }) => {
    const encrypterPass = await bcrypt.hash(input.password, 10)
    input.password = encrypterPass
    console.log("trpc input", input)
    return ctx.prisma.student.update({
      where: {
        id: input.slug
      },
      data: input,
    });
  }),

  editInfo: protectedProcedure.input(z.object({
    id: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),

  })).mutation(async ({ ctx, input }) => {
    console.log("trpc input", input)
    const inputUpdate = {email: input.email, name: input.phone}
    return ctx.prisma.student.update({
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
    const user = await ctx.prisma.student.findUnique({
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
    return ctx.prisma.student.update({
      where: {
        id: input
      },
      data: {
        deleted: true
      },
    })
  }),

  totalDelete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return Promise.all([
      ctx.prisma.fee.deleteMany({
        where: {
          studentId: input
        }
      }),
      ctx.prisma.student.delete({
        where: {
          id: input
        }
      })
    ]);
  }),

  search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("search in", input)
    const searchQuery: Prisma.StudentWhereInput = {
      AND: [
        { deleted: false },
        {
          OR: [

            { name: { contains: input, mode: "insensitive" } },
            { slug: { contains: input, mode: "insensitive" } },
            { admissionId: { contains: input, mode: "insensitive" } },
          ]
        }]
    };
    return ctx.prisma.student.findMany({
      where: searchQuery,
      include: {
        stream: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
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

// updateAll: protectedProcedure.query(async ({ ctx }) => {
//     const data = await ctx.prisma.student.findMany();
//     console.log("update data", data)
//     const updatePromises = data.map((entry) => {
//         console.log(`updating entry with id: ${entry.id}`)
//         return ctx.prisma.student.update({
//             where: {
//                 id: entry.id
//             },
//             data: {
//                 deleted: false
//             },
//         });
//     });
//     console.log(`update finished.`)
//     return Promise.all(updatePromises);
// }),
