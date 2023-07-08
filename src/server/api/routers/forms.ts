import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    // publicProcedure,
} from "@/server/api/trpc";

import nodemailer from 'nodemailer'

export const formRouter = createTRPCRouter({
    addForm: protectedProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
    })).mutation(async ({ input }) => {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
                pass: "msafkdeuomozkbqn",
            },
        });
        console.log("input", input)

        const message = {
            from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
            to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
            subject: 'New Message From Portfolio Form!',
            text: input.message,
            html: `<p>${input.message} from ${input.name} via email: ${input.email}</p>`
        }

        const res = await transporter.sendMail(message);

        console.log(res);

        return "res"

    }),

})