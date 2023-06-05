import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";

export const courseRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.course.findMany({
            take: 10,
            // orderBy: {
            //   createdAt: 'desc'
            // }
        });
    }),

    count: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.course.count();
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

    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
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
        const newInput = { ...input, createdAt: new Date() };
        return ctx.prisma.course.create({
            data: newInput,
        });
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.course.delete({
            where: {
                id: input
            }
        })
    }),

    search: publicProcedure.input(z.object({
        form: z.string(),
        subject: z.object({
            slug: z.string(),
            name: z.string(),
        }),
        search: z.string()
    })).query(({ ctx, input }) => {
        console.log("search in", input)
        const searchQuery: Prisma.CourseWhereInput = {
            AND: [
                input.form !== "" ? { form: input.form } : {},
                { title: { contains: input.search, mode: "insensitive" } },
                input.subject.slug !== "all" ? {
                    subject: {
                        slug: input.subject.slug,
                        name: input.subject.name
                    },
                } : {},
                // Add additional conditions using the OR operator if needed
            ]
        };
        return ctx.prisma.course.findMany({
            where: searchQuery,

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
