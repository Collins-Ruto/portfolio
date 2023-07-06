// import Link from "next/link";
// import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import type { Metadata } from "next";
import ThemeToogle from "~/components/ThemeToogle";

const Page = async () => {
  const data = await getServerSession(authOptions);

  console.log("user data", data);

  const BlogCard = () => {
    return (
      <div className=""></div>
    )
  }

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <main className=" md: py-4">
          <div className="flex items-center justify-between">
            <h1 className="py-6 text-5xl font-bold md:py-16">My Blogs</h1>
            <ThemeToogle />
          </div>
          <div className="">
            <BlogCard />
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
