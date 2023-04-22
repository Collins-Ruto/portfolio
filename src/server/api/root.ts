import { createTRPCRouter } from "@/server/api/trpc";
import { studentRouter } from "@/server/api/routers/students";
import { teacherRouter } from "@/server/api/routers/teachers";
import { examRouter } from "@/server/api/routers/exams";
import { feeRouter } from "@/server/api/routers/fees";
import { exampleRouter } from "./routers/example";
import { lessonRouter } from "./routers/lesson";
import { adminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  student: studentRouter,
  teacher: teacherRouter,
  exam: examRouter,
  fee: feeRouter,
  lesson: lessonRouter,
  admin: adminRouter,
  example: exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
