import React from 'react'
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import type { Metadata, ResolvingMetadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            title: "blog not found"
        }
    }

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: blog.title,
    openGraph: {
      images: [blog.cover_image, ...previousImages],
    },
    authors: [
      {
        name: "Collins Ruto",
        url: "https://collinsruto.netlify.app/",
      },
    ],
    keywords: ["learnhq", ...blog.tag_list, blog.title],
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

    const res = await fetch(blog.markdown)
    const markdown = await res.text()

    return (
      <div className="pt-8">
        <div className=" prose mx-auto dark:prose-invert lg:prose-xl">
          <h1>{blog.title}</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    );
}

export default BlogPage