// import Link from "next/link";
// import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import type { Metadata } from "next";
import ThemeToogle from "~/components/ThemeToogle";
import { BlogCard } from "~/components";
import blogs from '~/assets/blogs.json'

const Page = async () => {
  const data = await getServerSession(authOptions);

  console.log("user data", data);

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <main className=" md: py-4">
          <div className="flex items-center justify-between">
            <h1 className="py-6 text-5xl font-bold md:py-16">My Blogs</h1>
            <ThemeToogle />
          </div>
          <div className="md:flex-nowra mb-4 flex flex-wrap gap-4 sm:flex-row">
            {blogs.map((blog, index) => {
              return (
                <div className="w-1/2 grow md:w-1/3 lg:w-1/3" key={index}>
                <BlogCard blog={blog} />
              </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Blogs"
}
