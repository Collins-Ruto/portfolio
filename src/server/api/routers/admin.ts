import { z } from "zod";
import bcrypt from "bcryptjs";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
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

    addAdmin: protectedProcedure.input(z.object({
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

    editAdmin: protectedProcedure.input(z.object({
        name: z.string(),
        slug: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const encrypterPass = await bcrypt.hash(input.password, 10)
        input.password = encrypterPass
        console.log("trpc input", input)
        return ctx.prisma.admin.update({
            where: {
                id: input.slug
            },
            data: input,
        });
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.admin.delete({
            where: {
                slug: input
            }
        })
    }),

});
