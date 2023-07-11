import React from "react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import cv from "../../public/cv.md";

// generate the site metatdata for each blog page and add/replace to that
// of parent metadata using ResolvingMetadata

export const metadata: Metadata = {
  title: "CV",
  //     authors: [
  //       {
  //         name: "Collins Ruto",
  //         url: "https://collinsruto.netlify.app/",
  //       },
  //     ],
  //     twitter: { creator: "@ruto_collins_" },
};

function BlogPage() {

  // const cvmd = await import("!!raw-loader!../../public/cv.md");
  // const defl = await fetch(cvmd.default)
  // const cv = await defl.text()
  
  // const res = await fetch("https://raw.githubusercontent.com/Collins-Ruto/portfolio/main/public/cv.md");
  // const markdown = await res.text();

  // const date = new Date(blog.created_at);

  return (
    <div className="pt-8">
      <div className=" prose mx-auto dark:prose-invert lg:prose-xl">
        <div className="text-center">
          <div className="flex flex-wrap justify-center ">
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
        <div className="prose mx-auto dark:prose-invert lg:prose-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{cv}</ReactMarkdown>
        </div>
        <div className="py-6">
          <div className="mx-auto text-center">
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
