import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { Admin, Student, Teacher } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },

    session({ session, user }) {
      if (session.user) {
        session.user = user;
        // session.user.role = user.role; 
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Username',
          type: 'username',
          placeholder: 'johnsmith'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log("credentialss", credentials)
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const student = await prisma.student.findUnique({
          where: {
            slug: credentials.username
          },
          select: {
            id: true,
            name: true,
            slug: true,
            email: true,
            phone: true,
            password: true,
          }
        }) as Student
        const teacher = await prisma.teacher.findUnique({
          where: {
            slug: credentials.username
          },
          select: {
            id: true,
            name: true,
            slug: true,
            email: true,
            phone: true,
            password: true,
          }
        }) as Teacher
        const admin = await prisma.admin.findUnique({
          where: {
            slug: credentials.username
          },
          select: {
            id: true,
            name: true,
            slug: true,
            email: true,
            phone: true,
            password: true,
          }
        }) as Admin

        const user = student || teacher || admin

        console.log("next user1", user)

        if (!user) {
          return null
        }
        console.log("next user2", user)

        if (typeof user.password !== "string") {
          return null; // or handle the error in some other way
        }
        console.log("next user3", user)

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )
        console.log("next user4", user)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          username: user.slug,
          name: user.name,
          role: student ? "student" : teacher ? "teacher" : "admin",
          randomKey: 'Hey cool'
        }
      }
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
