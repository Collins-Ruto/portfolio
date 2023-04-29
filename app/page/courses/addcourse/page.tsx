"use client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";
import type { Course } from "@prisma/client";
import { Subjects } from "~/types/types";
import { api } from "@/utils/api";

// const course1 = {
//   subject: {
//     name: "Physics",
//     slug: "phy",
//   },
//   title: "Refraction of Light - Introduction",
//   topic: "Refraction",
//   form: "2",
//   description:
//     "This course will introduce you to the basics of refraction of light",
//   unit_code: "2.4",
//   video_url:
//     "https://www.youtube.com/watch?v=v5SuSB_93FM&pp=ygUUcmVmcmFjdGlvbiBvZiBsaWdodCA%3D",
//   thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
// };

// const video = {
//   title: "Refraction of Light - Introduction | Don\u0027t Memorise",
//   author_name: "Infinity Learn Class 9\u002610",
//   author_url: "https://www.youtube.com/@InfinityLearn9-10",
//   type: "video",
//   height: 113,
//   width: 200,
//   version: "1.0",
//   provider_name: "YouTube",
//   provider_url: "https://www.youtube.com/",
//   thumbnail_height: 360,
//   thumbnail_width: 480,
//   thumbnail_url: "https://i.ytimg.com/vi/v5SuSB_93FM/hqdefault.jpg",
//   html: "\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022https://www.youtube.com/embed/v5SuSB_93FM?feature=oembed\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\u0022 allowfullscreen title=\u0022Refraction of Light - Introduction | Don\u0026#39;t Memorise\u0022\u003e\u003c/iframe\u003e",
// };

interface IndexedInput extends Course {
  [key: string]: any;
}

function AddCourse() {
  const [course, setCourse] = useState<Course | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

  const handleInput = (event: React.SyntheticEvent) => {
    setValidInput("");
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    setCourse((prevCourse) => {
      if (!prevCourse) {
        if (target.name === "subject") {
          return {
            subject: {
              slug: value,
              name:
                Subjects.find((subject) => subject.slug === value)?.name || "",
            },
          } as unknown as Course;
        }
        return {
          [name]: value,
        } as unknown as Course; // or some default value if you have one
      }
      if (target.name === "subject") {
        return {
          ...prevCourse,
          [name]: value,
          subject: {
            slug: value,
            name:
              Subjects.find((subject) => subject.slug === value)?.name || "",
          },
        };
      }
      const updatedCourse = {
        ...prevCourse,
        [name]: value,
        posted: new Date().toDateString(),
      };

      console.log(updatedCourse);

      return updatedCourse;
    });
  };

  const inputValidate = (action: string) => {
    const fields = [
      "topic",
      "description",
      "form",
      "unit_code",
      "video_url",
      "subject",
    ];
    const input = course as IndexedInput;
    let message = "Please fill: ";
    if (action === "clear") {
      setCourse(() => {
        let newInput = {} as unknown as Course;
        fields.forEach((field) => {
          newInput = { ...newInput, [field]: "" };
        });
        return newInput;
      });
    }
    fields.forEach((field) => {
      if (input?.[field] === "" || input?.[field] === undefined) {
        message += `${field}, `;
        setValidInput(message);
      }
    });
    if (message === "Please fill: ") {
      return true;
    } else {
      return false;
    }
  };

  const addCourseMutation = api.course.addCourse.useMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputValidate("") === false) {
      return;
    }
    setSubmit(true);

    const res = await fetch(
      `https://youtube.com/oembed?url=${course?.video_url ?? ""}&format=json`
    );

    const json = (await res.json()) as Course;
    console.log(json);

    const updatedCourse = {
      ...course,
      title: json.title ?? "",
      thumbnail_url: json.thumbnail_url ?? "",
    } as Course;

    console.log("new course", updatedCourse);

    try {
      addCourseMutation.mutate(updatedCourse, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${
              updatedCourse?.title ?? ""
            } as a Course`,
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
    <div className="container mx-auto">
      {<StatusMsg status={status} />}
      <div className="p-2 text-2xl font-semibold md:p-4">
        <h3>Add Courses</h3>
      </div>
      <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
        <form>
          <div className="flex grid-cols-3 flex-col gap-2 gap-y-4 md:grid md:gap-y-8">
            <div>
              <label>
                Subject ID <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.subject?.slug}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. geo"
                name="subject"
              />
            </div>
            <div>
              <label>
                Course topic <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.topic}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Refraction"
                name="topic"
              />
            </div>
            <div>
              <label>
                Form <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.form}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. 2"
                name="form"
              />
            </div>
            <div>
              <label>Unit Code </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.unit_code}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                name="unit_code"
                placeholder="eg. 2.4.2"
              />
            </div>
            <div>
              <label>Video Link</label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.video_url}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                name="video_url"
                placeholder=""
              />
            </div>
            <div>
              <label>Description </label>
              <textarea
                onChange={(e) => {
                  handleInput(e);
                }}
                value={course?.description}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="refraction of light"
                name="description"
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="opacity80 rounded text-xs text-red-500">
              <span className="">{validInput}</span>
              <span className="text-transparent">.</span>
            </div>
          </div>

          <div className=" my-2">
            <div>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={(e) => void handleSubmit(e)}
                  className="w-fit cursor-pointer rounded  bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
