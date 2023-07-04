import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "@/server/api/routers/projects";
import { blogRouter } from "@/server/api/routers/blogs";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  blog: blogRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
