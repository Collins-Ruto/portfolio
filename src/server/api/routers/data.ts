import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

export const dataRouter = createTRPCRouter({
    getCount: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        const lessons = ctx.prisma.lesson.count({
            where: {
                streamId: input
            }
        })
        const students = ctx.prisma.student.count()
        const teachers = ctx.prisma.teacher.count()
        const data = {
            students,
            teachers,
            lessons
        }
        return data
    }),
    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.fee.findUnique({
            where: {
                id: input
            }
        });
    }),

    studentFees: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.fee.findMany({
            where: {
                studentId: input,
            },
        });
    }),

    addFee: publicProcedure.input(z.object({
        name: z.string(),
        slug: z.string(),
        term: z.string(),
        type: z.string(),
        payday: z.string(),
        amount: z.string(),
        studentId: z.string()
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.fee.create({
            data: input,
        });
    }),

});
