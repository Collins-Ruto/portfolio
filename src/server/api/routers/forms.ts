import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const formRouter = createTRPCRouter({
    addForm: protectedProcedure.input(z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
    })).query(async ({ ctx, input }) => {
        
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_EMAIL_ADDRESS,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }),

})