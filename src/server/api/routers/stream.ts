import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

export const streamRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.stream.findMany();
    }),
    // :{ctx:Context, input:string}
    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.stream.findUnique({
            where: {
                id: input
            }
        });
    }),

    addStream: publicProcedure.input(z.object({
        name: z.string(),
        slug: z.string(),
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.stream.create({
            data: input,
        });
    }),

});
