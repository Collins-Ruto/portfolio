import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.task.findMany({
            include: {
                teacher: true
            },
            take: 20,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }),

    getIds: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.task.findMany({
            select: {
                id: true,
            },
        });
    }),

    getAllStream: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.task.findMany({
            where: {
                streamId: input
            },
            include: {
                stream: true,
                teacher: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }),
    getAllTeacher: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.task.findMany({
            where: {
                teacherId: input
            },
            include: {
                stream: true,
                teacher: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }),

    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.task.findMany({
            where: {
                id: input
            },
            include: {
                stream: true,
                teacher: true
            }
        });
    }),

    // .or(z.literal(''))

    addTask: protectedProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        due: z.string(),
        posted: z.string(),
        file: z.string(),
        secure_url: z.string(),
        asset_id: z.string(),
        original_filename: z.string(),
        subject: z.object({
            slug: z.string(),
            name: z.string(),
        }),
        teacherId: z.string(),
        streamId: z.string(),
    })).mutation(({ ctx, input }) => {
        const { subject, teacherId, streamId, ...taskData } = input;
        console.log("trpc input", input)
        return ctx.prisma.task.create({
            data: {
                createdAt: new Date(),
                subject: subject,
                stream: {
                    connect: {
                        slug: streamId
                    }
                },
                teacher: {
                    connect: {
                        slug: teacherId
                    }
                },
                ...taskData
            },
        });
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.task.delete({
            where: {
                id: input
            }
        })
    }),

    search: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.task.findMany({
            where: {
                name: { contains: input }
            },
            include: {
                stream: true,
                teacher: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 20
        })
    }),

    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
});
