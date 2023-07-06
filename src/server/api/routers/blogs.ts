// import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    // protectedProcedure,
} from "@/server/api/trpc";
// import type { Prisma } from "@prisma/client";

export const blogRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.blog.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }),
})
