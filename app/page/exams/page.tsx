"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Loader } from "~/components";
import Image from "next/image";
import type { Result } from "~/types/types";
import { Subjects } from "~/types/types";
import { api } from "@/utils/api";
import type { Exam, Student } from "@prisma/client";

function Exams() {
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");
  const [pagesCount, setPagesCount] = useState(0);
  const [pages, setPages] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [exams, setExams] = useState<(Exam & { student: Student })[]>();
  const { data, isLoading, error } = api.exam.getAll.useQuery(pagesCount);
  const { data: count } = api.exam.count.useQuery();
  
  console.log("exams", exams);

  useEffect(() => {
    if (data) {
      setExams(data);
    }
    if (count) {
      setPages((pages) => ({
        ...pages,
        hasNextPage: count - 10 > pagesCount,
      }));
      setPages((pages) => ({
        ...pages,
        hasPreviousPage: pagesCount + 10 > count,
      }));
    }
  }, [count, data, pagesCount]);

  if (error) {
    console.log(error);
  }

  const searchExams = api.exam.search.useQuery(search);

  const searchSubmit = () => {
    console.log("term sc exam", search);
    const { data } = searchExams;
    console.log("search data exam", data);
    setExams(data);
    setSubmit(false);
  };

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>Exam Results</h3>
      </div>
      {isLoading && <Loader />}
      <div className="flex flex-col justify-end gap-4 p-4 md:flex-row">
        <div>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              // searchSubmit();
            }}
            name="id"
            value={search}
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border-[1px] bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-800 shadow focus:outline-none"
            placeholder="Search student, Name, Term ..."
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
          <div>
            <Link
              href="/page/addexam"
              type="button"
              className="flex items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
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
        </div>
      </div>
      <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
        <table className=" w-full text-justify">
          <thead>
            <tr className="p-4">
              <th className="p-4">Exam</th>
              <th className="p-4">Student</th>
              <th className="p-4">Term</th>
              <th className="p-4 px-6">Date</th>
              {Subjects.map((subject, index) => (
                <th className="border-x-2 p-2" key={index}>
                  {subject.slug}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams?.map((exam, index) => {
              return (
                <tr
                  className={`p-4 text-sm ${index % 2 === 0 ? "bg-white" : ""}`}
                  key={index}
                >
                  <td className="p-4">{exam.name}</td>
                  <td className="p-4">{exam?.student?.name}</td>
                  <td className="p-4">{exam?.term}</td>
                  <td className="p-4">{exam.examDate}</td>
                  {Subjects.map((subject, index) => {
                    const resultsObj: Result[] = exam.results as Result[];
                    const myResult = resultsObj.find(
                      (obj) => obj.slug === subject.slug
                    );
                    return (
                      <td className="border-x-2 p-4" key={index}>
                        {myResult?.marks || "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center pt-2 pb-10 align-middle md:pb-0">
          <div
            onClick={() => {
              setPagesCount(pagesCount - 10);
            }}
            className={` ${
              pages.hasPreviousPage
                ? "cursor-pointer bg-slate-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                : "bg-gray-300 text-gray-800"
            }  mr-3 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium `}
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </div>
          <div
            onClick={() => {
              setPagesCount(pagesCount + 10);
            }}
            className={` ${
              pages.hasNextPage
                ? "cursor-pointer bg-slate-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                : "bg-gray-300 text-gray-800"
            }  mr-3 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium `}
          >
            Next
            <svg
              aria-hidden="true"
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;
