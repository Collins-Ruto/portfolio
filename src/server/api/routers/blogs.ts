import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";
// import type { Prisma } from "@prisma/client";

export const blogRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.blog.findMany({
            take: 10,
            orderBy: {
                created_at: 'desc'
            }
        });
    }),

    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.blog.findUnique({
            where: {
                slug: input
            },
        });
    }),

    addBlog: protectedProcedure.input(z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        markdown: z.string(),
        github: z.string(),
        devto_url: z.string(),
        created_at: z.string(),
        tag_list: z.array(z.string()),
        cover_image: z.string(),
        comments_count: z.number(),
        public_reactions_count: z.number(),
    })).mutation(async ({ ctx, input }) => {
        return ctx.prisma.blog.create({
            data: input
        });
    }),

})
