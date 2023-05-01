import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

export const lessonRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.lesson.findMany({
            select: {
                stream: true,
                teacher: true,
                day: true,
                subject: true,
                startTime: true,
                endTime: true,
            }
        });
    }),
    // :{ctx:Context, input:string}
    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.lesson.findUnique({
            where: {
                id: input
            },
            select: {
                stream: true,
                teacher: true,
            }
        });
    }),

    addLesson: publicProcedure.input(z.object({
        startTime: z.string(),
        endTime: z.string(),
        day: z.string(),
        id: z.string(),
        subject: z.object({
            name: z.string(),
            slug: z.string()
        }),
        attendance: z.string(),
        streamId: z.string(),
        teacherId: z.string()
    })).mutation(({ ctx, input }) => {
        console.log("trpc input", input)
        return ctx.prisma.lesson.create({
            data: input,
        });
    }),

});
