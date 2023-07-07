import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "@/server/api/routers/projects";
import { blogRouter } from "@/server/api/routers/blogs";
import { formRouter } from "./routers/forms";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  blog: blogRouter,
  form: formRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
