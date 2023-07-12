import React from "react";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import cv from "../../public/cv.md";

export const metadata: Metadata = {
  title: "CV",
};

function BlogPage() {

  return (
    <div className="pt-8">
      <div className=" prose mx-auto dark:prose-invert lg:prose-xl">
        <div className="text-center">
          <div className="flex mb-4 text-gray-500 flex-wrap justify-end ">
            Last updated: Tue Jul 11, 2023
          </div>
        </div>
        <div className="prose mx-auto dark:prose-invert lg:prose-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{cv}</ReactMarkdown>
        </div>
        <div className="py-6">
          <div className="mx-auto text-center not-prose">
            <a
              href="https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/collinsruto.pdf"
              className="mx-auto my-12 flex w-fit items-center rounded bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg hover:bg-indigo-700"
            >
              <Image
                src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/downloading-updates.png"
                className="mr-1 w-6 "
                height={100}
                width={100}
                alt=""
              />
              Download Résumé
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
