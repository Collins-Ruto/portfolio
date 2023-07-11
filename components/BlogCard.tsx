import React from "react";
import type { Blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const date = new Date(blog.created_at);
  return (
    <div className=" flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50 shadow-md drop-shadow-sm  hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 md:max-w-2xl">
      <Image
        width={600}
        height={200}
        className="cover h-40 w-full  rounded-t-md"
        src={blog.cover_image}
        style={{ objectFit: "cover", justifyContent: "start" }}
        alt="Blog Cover Image"
      />
      <Link
        href={`/blogs/blog/${blog.slug}`}
        className="flex h-full flex-col justify-between p-4"
      >
        <div className="justify-betwee flex">
          <div className="flex flex-wrap items-center">
            {blog.tag_list.map((tag, index) => (
              <span
                key={index}
                className="m-[0.1rem] inline-block rounded-full bg-indigo-200 px-2 py-[0.15rem] text-xs font-semibold uppercase tracking-wide text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="ml-2 flex flex-wrap text-sm text-gray-600 dark:text-gray-400">
            <span className="hidden md:block">Created at:&nbsp; </span>
            <span className="font-semibold">{date.toDateString()}</span>
          </div>
        </div>
        <h2 className=" text-2xl font-semibold text-gray-800 hover:underline dark:text-gray-100">
          {blog.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200">{blog.description}</p>
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M19 21H16.9292C15.5741 21 14.2496 20.4848 13.1569 19.5528L12 18.6045L10.8431 19.5528C9.75043 20.4848 8.42594 21 7.07077 21H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 6H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 18H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="ml-1 text-sm">{blog.comments_count} Comments</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
