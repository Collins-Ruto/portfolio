// import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    // protectedProcedure,
} from "@/server/api/trpc";
// import type { Prisma } from "@prisma/client";

export const projectRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.project.findMany({
            take: 10,
            orderBy: {
                created_at: 'desc'
            }
        });
    }),
})