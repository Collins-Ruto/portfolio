import { z } from "zod";
import bcrypt, { compare } from "bcryptjs";

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
    })).mutation(async( { ctx, input }) => {
        const encrypterPass = await bcrypt.hash(input.password, 10)
        input.password = encrypterPass
        console.log("trpc input", input)
        return ctx.prisma.admin.create({
            data: input,
        });
    }),

    editPassword: protectedProcedure.input(z.object({
        id: z.string(),
        password: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const encrypterPass = await bcrypt.hash(input.password, 10)
        input.password = encrypterPass
        console.log("trpc input", input)
        return ctx.prisma.admin.update({
            where: {
                id: input.id
            },
            data: {
                password: encrypterPass
            },
        });
    }),

    editInfo: protectedProcedure.input(z.object({
        id: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        password: z.string().optional(),

    })).mutation(async ({ ctx, input }) => {
        console.log("trpc input", input)
        const inputUpdate = {
            email: (input.email !== "" ? input.email : undefined),
            phone: (input.phone !== "" ? input.phone : undefined)
        }
        return ctx.prisma.admin.update({
            where: {
                id: input.id
            },
            data: inputUpdate,
        });
    }),

    passwordVerify: protectedProcedure.input(z.object({
        id: z.string(),
        password: z.string()
    })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.admin.findUnique({
            where: {
                id: input.id
            },
            select: {
                password: true
            }
        })
        const isPasswordValid = await compare(
            input.password,
            user?.password || ""
        )
        return isPasswordValid
    }),

    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.admin.delete({
            where: {
                slug: input
            }
        })
    }),

});
