"use client";
import { api } from "@/utils/api";
import type { Blog } from "@prisma/client";
import React, { useState } from "react";
import { StatusMsg } from "~/components";

type DevToBlog = {
  title: string;
  description: string;
  slug: string;
  url: string;
  created_at: string;
  tags: string;
  public_reactions_count: string;
  comments_count: string;
  cover_image: string;
  social_image: string;
};

function AddSBlog() {
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");
  const [devtourl, setDevtourl] = useState("");
  const [username, setUsername] = useState("collins-ruto");

  const generateFields = async (): Promise<Blog | undefined> => {
    const parts = devtourl.split("/");
    const postSlug = parts[parts.length - 1] || "";
    const devtoUsername = parts[parts.length - 2] || "";

    try {
      const blogapi = `https://dev.to/api/articles/${devtoUsername}/${postSlug}`;
      const blogres: Response = await fetch(blogapi);
      const blogjson = await blogres.json() as DevToBlog;

      const markdown = `https://raw.githubusercontent.com/${username}/blogs/main/${postSlug}/README.md`;
      const github = `https://github.com/${username}/blogs/tree/main/${postSlug}`;

      const newBlog = {
        title: blogjson.title,
        description: blogjson.description,
        slug: blogjson.slug,
        markdown: markdown,
        github: github,
        devto_url: blogjson.url,
        created_at: blogjson.created_at,
        tag_list: blogjson.tags,
        public_reactions_count: blogjson.public_reactions_count,
        comments_count: blogjson.comments_count,
        cover_image: blogjson.cover_image || blogjson.social_image,
      } as unknown as Blog;

      return newBlog;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const inputValidate = (action: string) => {
    let message = "Please fill: ";
    if (action === "clear") {
      setUsername("");
      setDevtourl("");
    }
    if (devtourl === "" || devtourl === undefined) {
      message += `Dev.to Url, `;
      setValidInput(message);
    }
    if (username === "" || username === undefined) {
      message += `username, `;
      setValidInput(message);
    }
    if (message === "Please fill: ") {
      return true;
    } else {
      return false;
    }
  };

  const addSBlogMutation = api.blog.addBlog.useMutation();
  const handleSubmit = async () => {
    if (inputValidate("") === false) {
      return;
    }
    const blog = await generateFields();
    if (!blog) {
      return;
    }
    console.log("submit", blog);
    setSubmit(true);
    try {
      addSBlogMutation.mutate(blog, {
        onSuccess: () => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${blog?.title ?? ""} as a blog`,
          });
          setTimeout(() => {
            inputValidate("clear");
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="py-4 text-2xl font-semibold">
        <h3>Add Blog</h3>
      </div>
      <div className="">
        <form>
          <div className="flex flex-col gap-4 md:gap-y-4">
            <div className="flex flex-col">
              <label>
                Dev.to Url <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  setDevtourl(e.target.value);
                  setValidInput("");
                }}
                value={devtourl}
                className="focus:shadow-outline mt-2 w-full appearance-none rounded border bg-slate-800 px-3 py-3 leading-tight shadow focus:outline-none sm:w-fit sm:min-w-[25rem]"
                type="text"
                placeholder="Blog dev.to Url"
                name="name"
              />
            </div>
            {/* <div>
                    <label>
                      Github Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                      className="focus:shadow-outline w-full appearance-none rounded border bg-slate-800 px-3 py-3 leading-tight shadow focus:outline-none"
                      type="text"
                      placeholder="Github Username"
                      name="name"
                    />
                  </div> */}
            <div className="mt-1">
              <div className="opacity80 rounded text-sm text-red-500">
                <span className="">{validInput}</span>
                <span className="text-transparent">.</span>
              </div>
            </div>
            <div className="">
              <button
                onClick={(e) => {
                  void handleSubmit();
                  e.preventDefault();
                }}
                type="submit"
                className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
              >
                {submit ? "Uploading ..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSBlog;
