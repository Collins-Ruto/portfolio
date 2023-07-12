import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),

    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
            where: {
                   slug: input
            }
        });
    }),
})