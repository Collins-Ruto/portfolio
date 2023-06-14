"use client";
import { api } from "@/utils/api";
import type { Student, Exam, Stream } from "@prisma/client";
import React, { useState } from "react";
import { Subjects } from "~/types/types";
import { Button, DateTime, Loader } from "~/components";
import StatusMsg from "~/components/StatusMsg";

function AddExam() {
  const [exam, setExam] = useState<Exam | undefined>();
  const [students, setStudents] = useState<(Student | undefined)[]>();
  const [stream, setStream] = useState<Stream>();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const { data: streams, isLoading } = api.stream.getAll.useQuery();

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setExam((prevExam: Exam | undefined) => {
      if (!prevExam) {
        return { [name]: value } as unknown as Exam; // or some default value if you have one
      }

      const updatedExam = {
        ...prevExam,
        [name]: value,
      };

      return updatedExam;
    });
  };

  const handleResult = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    setExam((prevExam) => {
      if (!prevExam) {
        return undefined;
      }

      return {
        ...prevExam,
        [name]: value,
      };
    });
  };

  console.log(stream);

  const addExamMutation = api.exam.addExam.useMutation();

  const handleSubmit = () => {
    setSubmit(true);
    try {
      addExamMutation.mutate(exam as Exam, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${exam?.name ?? ""} exam`,
          });

          setTimeout(() => {
            res && window.location.reload();
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  const getStudentsQuery = api.student.getAllStream.useQuery(
    stream?.id || "621dd16f2eece6ce9587cb0d"
  );

  const getStudents = () => {
    setSubmit(true);
    const { data, error, isLoading } = getStudentsQuery;
    try {
      if (error) {
        console.log("error", error);
        setStatus({
          type: "error",
          message: "can,t find student, check your input",
        });
      }
      if (data) {
        setStudents(data);
      }
      setLoading(isLoading);
      setSubmit(false);
      console.log("add exam student data", data);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };
  return (
    <div className="w-screen">
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Exam Results</h3>
      </div>
      {loading && <Loader />}
      <div className="px-4">
        <div className="my-4 flex flex-col items-center justify-between rounded-xl bg-[#F7F6FB] p-2 md:lex-row">
          <div className="relative flex items-center gap-4">
            <label>
              Stream <span className="text-red-500">*</span>
            </label>
            <div className="relative flex cursor-pointer items-center pt-2">
              <select
                onChange={(e) => {
                  setStream(
                    streams?.find((item) => item.slug === e.target.value)
                  );
                  getStudents();
                }}
                className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                name="streamId"
              >
                <option>Select Stream</option>
                {streams?.map((stream, index) => {
                  return (
                    <option key={index} value={stream.slug}>
                      {stream.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            Stream :{" "}
            <span className="text-lg font-semibold">{stream?.name}</span>
          </div>
          <div>
            Stream Id:{" "}
            <span className="text-lg font-semibold">{stream?.slug}</span>
          </div>
          <div>
            Date: <span className="text-lg font-semibold">{DateTime()}</span>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-4 rounded-xl bg-[#F7F6FB] p-2 md:flex-row ">
          <div>
            <label>
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={exam?.name}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="eg: End Term 1"
              name="name"
            />
          </div>
          <div>
            <label>
              Current Term <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={exam?.term}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="eg: 2020 II"
              name="term"
            />
          </div>
          <div>
            <label>
              Unique Identifier <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={exam?.slug}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="eg: 282021i"
              name="slug"
            />
          </div>
        </div>
      </div>
      <div className="m-4 mb-0 overflow-auto rounded-t-xl bg-[#F7F6FB] p-2">
        <div className="overflow-scroll">
        <table className="w-full text-justify">
          <thead>
            <tr className="bg-[#eexamf4] p-2">
              <th className="px-2 py-2 ">Student Name</th>
              {Subjects?.map((subject, index) => {
                return (
                  <th key={index} className="mx-auto border-x px-2 py-2">
                    {subject.slug}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => {
              return (
                <tr
                  key={index}
                  className={` p-2 ${index % 2 === 0 ? "bg-white" : ""}`}
                >
                  <td className="px-4 py-2 text-lg">{student?.name}</td>
                  {Subjects?.map((subject, index) => {
                    const slug = subject.slug.substring(0, 1);
                    return (
                      <td key={index} className="border-x px-2 py-2">
                        <input
                          onInput={(e) => {
                            handleResult(e);
                          }}
                          value={
                            exam?.results?.find(
                              (result) => result.slug === slug
                            )?.marks || ""
                          }
                          className="focus:shadow-outline w-14 appearance-none rounded border px-2 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                          type="text"
                          placeholder="-"
                          name={slug}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
      <div className=" mx-4 rounded-b-xl bg-[#F7F6FB] py-4 px-2">
        <div>
          {submit ? (
            <Button />
          ) : (
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddExam;
