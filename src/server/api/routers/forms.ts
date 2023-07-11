import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";

import nodemailer from 'nodemailer'

export const formRouter = createTRPCRouter({
    addForm: publicProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
    })).mutation(async ({ input }) => {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
                pass: process.env.NEXT_PUBLIC_PASSWORD,
            },
        });

        console.log("input", input)

        const message = {
            from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
            to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
            subject: 'New Message From Portfolio Form!',
            text: input.message,
            html: `
                <table cellpadding="0" cellspacing="0" border="0" align="center" width="800" style="font-family: Arial, sans-serif; background-color: #f3f3f3; color: #333333;">
                    <tr>
                    <td align="left" style="padding: 20px;">
                        <h1 style="font-size: 24px; margin-bottom: 20px; color: #333333;">New Message</h1>
                        <p><strong>Name:</strong> ${input.name}</p>
                        <p><strong>Email:</strong> ${input.email}</p>
                        <p><strong>Message:</strong> ${input.message}</p>
                    </td>
                    </tr>
                </table>`
        }

        const res = await transporter.sendMail(message);

        console.log(res);

        return "res"

    }),

})