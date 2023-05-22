import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.task.findMany({
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
        return ctx.prisma.task.findUnique({
            where: {
                id: input
            },
            include: {
                stream: true,
                teacher: true
            }
        });
    }),

    addTask: protectedProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        file: z.string(),
        secure_url: z.string(),
        asset_id: z.string(),
        original_filename: z.string(),
        subject: z.object({
            name: z.string(),
            slug: z.string()
        }),
        teacherId: z.string(),
        streamId: z.string(),
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.task.create({
            data: input,
        });
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.task.delete({
            where: {
                id: input
            }
        })
    }),

    search: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.task.findMany({
            where: {
                name: { contains: input }
            },
            include: {
                stream: true,
                teacher: true
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
