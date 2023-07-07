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
            service: 'Gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
                pass: process.env.NEXT_PUBLIC_PASSWORD,
            },
        });

        const message = {
            from: input.email,
            to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
            subject: 'New Message From Portfolio Form!',
            text: input.message,
            html: `<p>${input.message}</p>`
        }

        const res = await transporter.sendMail(message);

        console.log(res);

        return res.response
         
    }),

})