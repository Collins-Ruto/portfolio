"use client";
import { api } from "@/utils/api";
import type { Exam, Stream, Result } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Subjects } from "~/types/types";
import { Button, DateTime, Loader } from "~/components";
import StatusMsg from "~/components/StatusMsg";

const dummyExams: Exam[] = [
  {
    id: "",
    name: "",
    slug: "",
    term: "",
    results: [
      {
        slug: "",
        marks: "",
      },
    ],
    createdAt: new Date(),
    examDate: "",
    studentId: "",
    deleted: false,
  },
];

console.log(dummyExams);
interface IndexedInput extends Exam {
  [key: string]: string | Date | Boolean | Result[];
}

type Students = { id: string; name: string; streamId: string }[];

function AddExam() {
  const [exams, setExams] = useState<Exam[]>();
  const [students, setStudents] = useState<Students>();
  const [submit, setSubmit] = useState(false);
  const [clear, setClear] = useState(false);
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });
  const [validInput, setValidInput] = useState("");

  const { data: streams, isLoading } = api.stream.getAll.useQuery();
  const { data } = api.student.getIds.useQuery();
  const [stream, setStream] = useState<Stream | undefined>(streams?.[0]);
  // const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (data) {
      const streamStudents = data.filter(
        (student) => student.streamId === stream?.id
      );
      setStudents(streamStudents);
    }
    if (streams) {
      setStream(streams[0]);
    }
    // getStudents();
  }, [streams, data, stream]);

  // Handles input of the exam name, term and slug which is included in every exam
  const handleInput = (event: React.SyntheticEvent) => {
    setValidInput("");
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    const emptyResults = [] as unknown as Result[]; // Create an empty array for results

    setExams((prevExams: Exam[] | undefined) => {
      const newExams = [] as unknown as Exam[]; // Create a new array for updated exams

      if (!prevExams || prevExams[0]?.studentId) {
        // If there are no previous exams, create new exams for each student
        students?.forEach((student) => {
          newExams.push({
            studentId: student?.id,
            [name]: value, // Set the specified name property to the provided value
            examDate: DateTime(), // Set the exam date to the current date and time
            results: emptyResults, // Set the results to an empty value
          } as unknown as Exam);
        });

        return newExams; // Return the new exams
      }

      prevExams?.forEach((prevExam) => {
        // Update existing exams with the specified name and value
        newExams.push({
          ...prevExam, // Copy the properties of the previous exam
          examDate: DateTime(), // Update the exam date to the current date and time
          [name]: value, // Set the specified name property to the provided value
        } as unknown as Exam);
      });
      console.log("final inp exams", exams);

      return newExams; // Return the updated exams
    });
  };

  // Handles input of results for every
  const handleResult = (event: React.SyntheticEvent, id: string) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    console.log("hand chsng"); // Log a message for debugging purposes

    setExams((prevExams: Exam[] | undefined) => {
      let newExams = [{ results: [] as Result[] }] as unknown as Exam[]; // Initialize newExams with an empty result

      if (!prevExams || prevExams.length < 1) {
        console.log("hand chsng 1"); // Log a message for debugging purposes

        // If there are no previous exams or the length is less than 1, create new exams for each student
        students?.forEach((student) => {
          if (student?.id === id) {
            console.log("hand chsng 2"); // Log a message for debugging purposes

            // Create a new exam with the provided id, date, and result
            newExams.push({
              studentId: student?.id,
              examDate: DateTime(),
              results: [
                {
                  slug: name,
                  marks: value,
                },
              ],
            } as unknown as Exam);
          } else {
            const emptyResults = [] as unknown as Result[];
            console.log("hand chsng 3"); // Log a message for debugging purposes

            // Create a new exam with the student id and empty results
            newExams.push({
              studentId: student?.id,
              examDate: DateTime(),
              results: emptyResults,
            } as unknown as Exam);
          }
        });

        return newExams; // Return the new exams
      }

      prevExams?.forEach((prevExam) => {
        console.log("ex map", prevExams); // Log a message for debugging purposes
        console.log("ex map id", prevExam.studentId); // Log a message for debugging purposes
        console.log("hand chsng 4"); // Log a message for debugging purposes

        if (prevExam.studentId === id) {
          console.log("hand chsng 5"); // Log a message for debugging purposes

          console.log("inject", prevExam); // Log a message for debugging purposes

          const myExam = () => {
            const existingResult = prevExam.results.find(
              (result) => result.slug === name
            );
            console.log("exists ? ", existingResult); // Log a message for debugging purposes

            if (!existingResult) {
              console.log("add new", prevExam); // Log a message for debugging purposes

              // Add a new result to the existing exam
              return {
                ...prevExam,
                results: [
                  ...prevExam.results,
                  {
                    slug: name,
                    marks: value,
                  },
                ],
              } as unknown as Exam;
            } else {
              console.log("not add new", prevExam); // Log a message for debugging purposes

              // Update the marks of an existing result in the exam
              return {
                ...prevExam,
                results: prevExam.results.map((result) =>
                  result.slug === name ? { ...result, marks: value } : result
                ),
              };
            }
          };

          console.log("hand 5 exam ", myExam()); // Log a message for debugging purposes

          const newprevs = prevExams.map((exam) => {
            console.log("hand chsng 7"); // Log a message for debugging purposes

            if (exam.studentId === id) {
              console.log("hand chsng 8"); // Log a message for debugging purposes
              return myExam();
            }
            return exam;
          });

          newExams = newprevs;
          console.log("new prev2 Exams ", newprevs); // Log a message for debugging purposes
          console.log("new exam ", newExams); // Log a message for debugging purposes
        } else {
          console.log("hand chsng 6"); // Log a message for debugging purposes
          return; // Skip the current iteration
        }
      });

      console.log("final exam ", newExams); // Log a message for debugging purposes

      return newExams; // Return the updated exams
    });
  };

  const inputValidate = () => {
    const fields = ["name", "slug", "term"]; // Specify the required fields
    const input = exams?.[1] as IndexedInput; // Access the input object
    let message = "Please fill: "; // Initialize the message with a default value

    fields.forEach((field) => {
      if (input?.[field] === "" || input?.[field] === undefined) {
        // Check if the field is empty or undefined
        message += `${field}, `; // Append the field to the message
        setValidInput(message); // Set the validInput state with the message
      }
    });

    if (message === "Please fill: ") {
      // If no fields are missing, return true
      return true;
    } else {
      // If there are missing fields, return false
      return false;
    }
  };

  console.log("exams", exams);

  // Define the trpc addExamMutation method
  const addExamMutation = api.exam.addManyExams.useMutation();

  const handleSubmit = () => {
    // setStatus({
    //   type: "success",
    //   message: `successfully added ${exams?.[0]?.name ?? ""} exam`, // Set the success message
    // });
    if (!exams) {
      return; // If exams is empty, return
    }
    if (inputValidate() === false) {
      return; // If input validation fails, return
    }
    setSubmit(true);

    const filteredExams = exams.filter((exam) => exam.results.length > 0); // Filter exams to include only those with results
    console.log("subm exam ", filteredExams); // Log the filtered exams

    try {
      addExamMutation.mutate(filteredExams, {
        // Call the addExamMutation with the filtered exams
        onSuccess: () => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `successfully added ${exams?.[0]?.name ?? ""} exam`, // Set the success message
          });

          setClear(true);
          setTimeout(() => {
            setClear(false);
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" }); // Set the error message
    }
  };

  // const getStudentsQuery = api.student.getAllStream.useQuery(
  //   stream?.id || "621dd16f2eece6ce9587cb0d"
  // );

  const getStudents = (slug: string) => {
    console.log("slug", slug);
    console.log("data", data);
    if (data) {
      const streamStudents = data.filter((student) => {
        const myStream = streams?.find((item) => item.slug === slug);
        return student.streamId === myStream?.id;
      });
      setStudents(streamStudents);
    }
    // setSubmit(true);
    // const { data, error, isLoading } = getStudentsQuery;
    // try {
    //   if (error) {
    //     console.log("error", error);
    //     setStatus({
    //       type: "error",
    //       message: "can,t find student, check your input",
    //     });
    //   }
    //   if (data) {
    //     setStudents(data);
    //   }
    //   setLoading(isLoading);
    //   setSubmit(false);
    //   console.log("add exam student data", data);
    // } catch (error) {
    //   setSubmit(false);
    //   setStatus({ type: "error", message: "error check your input" });
    // }
  };

  console.log(clear);
  return (
    <div className="w-screen md:w-full">
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Exam Results</h3>
      </div>
      {isLoading && <Loader />}
      <div className="px-4">
        <div className="my-2 flex flex-col items-center justify-between rounded-xl bg-[#F7F6FB] p-2 md:flex-row">
          <div className="flex w-full items-center justify-between gap-2 px-2 sm:justify-around md:w-1/2">
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
                    getStudents(e.target.value);
                    setClear(true);
                    setTimeout(() => {
                      setClear(false);
                    }, 2000);
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
              Stream Id:{" "}
              <span className="text-lg font-semibold">{stream?.slug}</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-2 px-2 sm:justify-around md:w-1/2">
            <div>
              Stream :{" "}
              <span className="text-lg font-semibold">{stream?.name}</span>
            </div>
            <div>
              Date: <span className="text-lg font-semibold">{DateTime()}</span>
            </div>
          </div>
        </div>

        <div className="my-2 flex flex-col gap-4 rounded-xl bg-[#F7F6FB] p-2 md:flex-row ">
          <div>
            <label>
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={clear ? "" : exams?.[0]?.name}
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
              value={clear ? "" : exams?.[0]?.term}
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
              value={clear ? "" : exams?.[0]?.slug}
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
                const id = student?.id || "621dd16f2eece6ce9587cb0d";
                return (
                  <tr
                    key={index}
                    className={` p-2 ${index % 2 === 0 ? "bg-white" : ""}`}
                  >
                    <td className="px-4 py-2 text-lg">{student?.name}</td>
                    {Subjects?.map((subject, index) => {
                      const slug = subject.slug;
                      const exam = exams?.find(
                        (exam) => exam.studentId === student?.id
                      );
                      const result = exam?.results?.find(
                        (result) => result.slug === slug
                      );
                      return (
                        <td key={index} className="border-x px-2 py-2">
                          <input
                            onChange={(e) => {
                              handleResult(e, id);
                            }}
                            value={clear ? "" : result?.marks}
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
      <div className=" mx-4 rounded-b-xl bg-[#F7F6FB] px-2 py-4">
        <div className="mb-2">
          <div className="opacity80 rounded text-sm text-red-500">
            <span className="">{validInput}</span>
            <span className="text-transparent">.</span>
          </div>
        </div>

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
