import "@/styles/globals.css";
import type { Metadata } from "next";
import ThemeToogle from "~/components/ThemeToogle";
import { BlogCard } from "~/components";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

const Page = async () => {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const blogs = await caller.blog.getAll();
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <main className=" md: py-4">
          <div className="flex items-center justify-between">
            <h1 className="py-6 text-5xl font-bold md:py-16">My Blogs</h1>
            <ThemeToogle place="blog-toogle" />
          </div>
          <div className="md:flex-nowra mb-4 flex flex-wrap gap-4 sm:flex-row">
            {blogs.map((blog, index) => {
              return (
                <div
                  className="w-1/2 grow md:w-1/3 lg:w-1/3 xl:w-1/4"
                  key={index}
                >
                  <BlogCard blog={blog} />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Blogs",
};
