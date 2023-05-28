import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const courseRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.course.findMany({
            include: {
                stream: true
            },
            take: 10,
            // orderBy: {
            //   createdAt: 'desc'
            // }
        });
    }),
    getAllSubject: protectedProcedure.input(z.object({
            slug: z.string(),
            name: z.string(),
    })).query(({ ctx, input }) => {
        return ctx.prisma.course.findMany({
            where: {
                subject: {
                    slug: input.slug,
                    name: input.name
                },
            },
        });
    }),

    getAllForm: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.course.findMany({
            where: {
                form: input
            }
        });
    }),

    getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.course.findMany({
            where: {
                id: input
            },
        });
    }),

    // .or(z.literal(''))

    addCourse: publicProcedure.input(z.object({
        title: z.string(),
        topic: z.string(),
        description: z.string(),
        form: z.string(),
        unit_code: z.string(),
        video_url: z.string(),
        thumbnail_url: z.string(),
        subject: z.object({
            slug: z.string(),
            name: z.string(),
        }),

    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.course.create({
            data: {
                title: input.title,
                topic: input.description,
                description: input.description,
                form: input.form,
                unit_code: input.unit_code,
                video_url: input.video_url,
                thumbnail_url: input.thumbnail_url,
                subject: {
                    slug: input.subject.slug,
                    name: input.subject.name,
                },
            },
        });
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.course.delete({
            where: {
                id: input
            }
        })
    }),

    search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        console.log("search in", input)
        const searchQuery: Prisma.CourseWhereInput = {
            OR: [
                { title: { contains: input, mode: "insensitive" } },
                { topic: { contains: input, mode: "insensitive" } },
                { description: { contains: input, mode: "insensitive" } },
                // Add additional conditions using the OR operator if needed
            ]
        };
        return ctx.prisma.exam.findMany({
            where: searchQuery,
            include: {
                student: true
            }
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
