import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

export const dataRouter = createTRPCRouter({
    getCount: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const lessons = await ctx.prisma.lesson.findMany({
            where: {
                OR: [
                    { streamId: input },
                    { teacherId: input }
                ]
            }
        })
        const students = await ctx.prisma.student.count()
        const teachers = await ctx.prisma.teacher.count()
        const data = {
            students,
            teachers,
            lessons
        }
        console.log("data data", data)
        return data
    }),

});
