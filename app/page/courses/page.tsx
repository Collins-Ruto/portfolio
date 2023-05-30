"use client";
import { api } from "@/utils/api";
import type { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Loader } from "~/components";
import { type Search, Subjects } from "~/types/types";

const course = {
  subject: {
    name: "Physics",
    slug: "phy",
  },
  form: "2",
  title: "Refraction of Light - Introduction",
  description:
    "This course will introduce you to the basics of refraction of light",
  topic: "2.4 Refraction",
  url: "https://www.youtube.com/watch?v=v5SuSB_93FM&pp=ygUUcmVmcmFjdGlvbiBvZiBsaWdodCA%3D",
  thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
};

const video = {
  title: "Refraction of Light - Introduction | Don\u0027t Memorise",
  author_name: "Infinity Learn Class 9\u002610",
  author_url: "https://www.youtube.com/@InfinityLearn9-10",
  type: "video",
  height: 113,
  width: 200,
  version: "1.0",
  provider_name: "YouTube",
  provider_url: "https://www.youtube.com/",
  thumbnail_height: 360,
  thumbnail_width: 480,
  thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
  html: "\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022https://www.youtube.com/embed/v5SuSB_93FM?feature=oembed\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\u0022 allowfullscreen title=\u0022Refraction of Light - Introduction | Don\u0026#39;t Memorise\u0022\u003e\u003c/iframe\u003e",
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const forms = ["1", "2", "3", "4"];

const searchOrg = {
  form: forms,
  subject: {
    slug: "all",
    name: "",
  },
  search: "",
};

function Courses() {
  const [courses, setCourses] = useState<Course[] | undefined>()
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState<Search>(searchOrg);
  const searchCourses = api.course.search.useQuery(search);

  const { data, isLoading, error } = api.course.getAll.useQuery();

  useEffect(() => {
    if (data) {
      setCourses(data);
    }
    searchSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, search]);

  if (error) {
    console.log(error);
  }

  console.log("course", courses)

  const searchSubmit = () => {
    console.log("search crs", search);
    const { data } = searchCourses;
    console.log("search data crs", data);
    setCourses(data);
    setSubmit(false);
  };

  const handleSubject = (value: string) => {
    setSearch((search) => ({
      ...search,
      subject: {
        slug: value,
        name:
          Subjects.find((subject) => subject.slug === value)?.name ||
          "",
      },
    }));
  }
  return (
    <div>
      <div className="px-4 pt-4 text-2xl font-semibold">
        <h3>Courses</h3>
      </div>
      {isLoading && <Loader />}
      <div className="p-4">
        <div className="flex flex-col justify-end gap-4 p-4 md:flex-row">
          <div className="flex cursor-pointer items-center">
            <select
              onChange={(e) => {
                setSearch((search) => ({ ...search, form: [e.target.value] }));
              }}
              value={search.form[0]}
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
              name="stream_slug"
            >
              <option>Select Form</option>
              {forms?.map((form, index) => {
                return (
                  <option key={index} value={form}>
                    {form}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="flex cursor-pointer items-center">
            <select
              onChange={(e) => {
                handleSubject(e.target.value);
              }}
              value={search.subject.name}
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
              name="stream_slug"
            >
              <option>Select Subject</option>
              {Subjects?.map((subject, index) => {
                return (
                  <option key={index} value={subject.slug}>
                    {subject.name}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="">
            <input
              onChange={(e) => {
                setSearch((search) => ({ ...search, search: e.target.value }));
              }}
              value={search.search}
              name="name"
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border-[1px] bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-800 shadow focus:outline-none"
              placeholder="Search Topic, Title, subject ..."
            />
          </div>
          <div className="flex justify-between gap-4">
            <div>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={() => {
                    searchSubmit();
                    // setSubmit(true);
                  }}
                  type="button"
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              )}
            </div>
            {/* user?.role === "admin" && */}
            {
              <div>
                <Link
                  href="/page/courses/addcourse"
                  type="button"
                  className="flex w-fit items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  {" "}
                  <Image
                    width={100}
                    height={100}
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                    className="mr-1 w-5 text-white"
                    alt=""
                  />
                  Add
                </Link>
              </div>
            }
          </div>
        </div>
        <div className="mx-auto flex flex-wrap justify-center gap-2 border-blue-500 p-2">
          {arr.map((_, index) => (
            <div
              key={index}
              className="mb-2 flex min-w-[14rem] max-w-[18rem] flex-col rounded-md bg-[#F7F6FB]"
            >
              <img
                // width={500}
                // height={500}
                src={video.thumbnail_url}
                className="h-[7rem] w-full rounded-t-md object-cover text-white"
                alt={video.title}
              />
              <div className="flex flex-col p-1">
                <span className="text-sm text-blue-500">{video.title}</span>
                <span className="text-green-700">{course.topic}</span>
                <span className="">
                  Form {course.form} {course.subject.name}
                </span>
                <div className=""></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
