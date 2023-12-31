import React from "react";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import type { Metadata, ResolvingMetadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";

// generate the site metatdata for each blog page and add/replace to that
// of parent metadata using ResolvingMetadata
export async function generateMetadata(
  {
    params: { slug },
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const blog = await caller.blog.getById(slug || "621dd16f2eece6ce9587cb0d");
  if (!blog) {
    return {
      title: "blog not found",
    };
  }

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: [blog.cover_image, ...previousImages],
    },
    authors: [
      {
        name: "Collins Ruto",
        url: "https://collinsruto.netlify.app/",
      },
    ],
    keywords: ["blog", ...blog.tag_list, blog.title],
    twitter: { creator: "@ruto_collins_" },
  };
}

async function BlogPage({ params: { slug } }: { params: { slug: string } }) {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const blog = await caller.blog.getById(slug || "621dd16f2eece6ce9587cb0d");

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const res = await fetch(blog.markdown);
  const markdown = await res.text();
  const date = new Date(blog.created_at);

  // const blgr = await fetch(
  //   "https://dev.to/api/articles/collinsruto/github-ssh-for-linux-alx-sandbox-37mp"
  // );

  // const blg = await 

  return (
    <div className="pt-8">
      <div className=" prose mx-auto dark:prose-invert lg:prose-xl">
        <h1>{blog.title}</h1>
        <div className="text-center">
          <div className="flex flex-wrap justify-center ">
            {date.toDateString()}&nbsp;, BY COLLINS RUTO -- &nbsp;
            <Link
              href={blog.github}
              target="_blank"
              rel="noopener"
              className="text-purple-500"
            >
              {" "}
              ✏️ Edit Post GitHub
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="https://twitter.com/ruto_collins_"
              target="_blank"
              rel="noopener"
              className="h-full"
            >
              <Image
                height={100}
                width={130}
                src="https://img.shields.io/badge/-@ruto_collins_-1ca0f1?style=flat&labelColor=1ca0f1&logo=twitter&logoColor=white"
                alt="Twitter Badge"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/collins-ruto/"
              target="_blank"
              rel="noopener"
            >
              <Image
                height={100}
                width={100}
                src="https://img.shields.io/badge/-LinkedIn-0e76a8?style=flat&labelColor=0e76a8&logo=linkedin&logoColor=white"
                alt="Linkedin Badge"
              />
            </Link>
            <Link
              href="mailto:collinsruto48@gmail.com"
              target="_blank"
              rel="noopener"
            >
              <Image
                height={100}
                width={80}
                src="https://img.shields.io/badge/-Gmail-c0392b?style=flat&labelColor=c0392b&logo=gmail&logoColor=white"
                alt="Mail Badge"
              />
            </Link>
          </div>
        </div>
        <div
          // dangerouslySetInnerHTML={{ __html: blg.body_html }}
          className="prose mx-auto dark:prose-invert lg:prose-xl"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
          </ReactMarkdown>
        </div>
        <div className="py-6">
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-200">
              Enjoyed this post?
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Head over to Dev.to and show some love!
            </p>
            <div className="mt-6">
              <Link
                href={blog.devto_url}
                target="_blank"
                rel="noopener"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500"
              >
                Like 💜 and comment ✒️ on Dev.to
              </Link>
            </div>
            <span className="mt-4 block text-lg text-gray-500 dark:text-gray-400">
              Seen a bug/error somewhere?
            </span>

            <Link
              href={`https://github.com/Collins-Ruto/blogs/fork`}
              target="_blank"
              rel="noopener"
              className="not-prose flex items-center justify-center text-purple-500"
            >
              {" "}
              fork & submit a pull request
              <Image
                height={30}
                width={30}
                src="https://img.icons8.com/ios-glyphs/30/3D3D3D/pull-request.png"
                alt="contribute Badge "
                className="ml-1  dark:hidden"
              />
              <Image
                height={30}
                width={30}
                src="https://img.icons8.com/ios-glyphs/30/pull-request.png"
                alt="contribute Badge "
                className="ml-1 hidden dark:block"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
