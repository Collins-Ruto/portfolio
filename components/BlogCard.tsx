import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";
//
function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="rounded-xlflex mx-auto flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-gray-200  bg-gray-50 shadow-md dark:border-gray-700 dark:bg-gray-900 md:max-w-xl">
      <Image
        width={1200}
        height={400}
        className="h-40 w-full object-cover"
        src={blog.cover_image}
        alt="Blog Cover Image"
      />
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            {blog.tag_list.map((tag) => (
              <span className="mx-1 inline-block rounded-full bg-indigo-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-800">
                {tag}
              </span>
            ))}
          </div>
          <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Created at: <span className="font-semibold">June 30, 2023</span>
          </div>
        </div>
        <h2 className="my-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {blog.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200">
          Blog Description Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Fusce lacinia turpis nec magna bibendum, ac fermentum elit
          blandit.
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="mr-1 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19 21H16.9292C15.5741 21 14.2496 20.4848 13.1569 19.5528L12 18.6045L10.8431 19.5528C9.75043 20.4848 8.42594 21 7.07077 21H5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span className="ml-1 text-sm">
              {blog.public_reactions_count} Reactions
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="mr-1 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M20 6H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M20 18H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span className="ml-1 text-sm">{blog.comments_count} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
