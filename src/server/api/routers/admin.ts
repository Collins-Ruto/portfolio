import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.admin.findMany();
    }),
    // :{ctx:Context, input:string}
    
    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.admin.findUnique({
            where: {
                slug: input
            },
            select: {
                id: true,
                name: true,
                slug: true,
                email: true,
                phone: true,
                password: true
            }
        });
    }),

    addAdmin: publicProcedure.input(z.object({
        name: z.string(),
        slug: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.admin.create({
            data: input,
        });
    }),

    editAdmin: publicProcedure.input(z.object({
        slug: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.admin.update({
            where: {
                slug: input.slug
            },
            data: input,
        });
    }),

});
