import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            username: string;
            name: string;
            email: string;
            phone: string;
            slug: string;
            accessToken: string;
        };
    }
}