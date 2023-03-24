import { createTRPCRouter } from "@/server/api/trpc";
import { studentRouter } from "@/server/api/routers/students";
import { teacherRouter } from "@/server/api/routers/teachers";
import { exampleRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  student: studentRouter,
  teacher: teacherRouter,
  example: exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
