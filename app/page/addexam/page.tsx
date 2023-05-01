"use client";
import { api } from "@/utils/api";
import { type Exam } from "@prisma/client";
import React, { useState } from "react";
import { Subjects } from "~/types/types";
import { Button, DateTime, Loader } from "~/components";
import StatusMsg from "~/components/StatusMsg";

type getStudent = {
  id: string;
  name: string;
  email: string;
  stream: {
    id: string;
    name: string;
  };
};

function AddExam() {
  const [exam, setExam] = useState<Exam | undefined>();
  const [admid, setAdmid] = useState("");
  const [student, setStudent] = useState<getStudent | undefined>();
  // const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setExam((prevExam: Exam | undefined) => {
      if (!prevExam) {
        return undefined; // or some default value if you have one
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

  const getStudent = () => {
    setSubmit(true);
    try {
      const { data, isLoading, error } = api.student.getById.useQuery(admid);
      if (error) {
        setStatus({ type: "error", message: "error check your input" });
      }
      setStudent(data as getStudent | undefined);
      setLoading(isLoading);
      setSubmit(false);
      console.log("add exam student data", data);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };
  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Exam Results</h3>
      </div>
      {loading && <Loader />}
      <div>
        <h2 className="px-4 text-sm">Search for student in the system first</h2>
        <div className="flex justify-between px-4 md:justify-start">
          <div className="md:mr-8">
            <div>
              <input
                onChange={(e) => setAdmid(e.target.value)}
                value={admid}
                type="text"
                className="focus:shadow-outline w-full appearance-none rounded border-[1px] bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-800 shadow focus:outline-none"
                placeholder="Enter Admission No"
              />
            </div>
          </div>
          <div>
            <div>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={() => getStudent()}
                  type="button"
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="m-4 flex flex-col justify-between rounded-xl bg-[#F7F6FB] p-4 md:flex-row">
          <div>
            Student :{" "}
            <span className="text-lg font-semibold">{student?.name}</span>
          </div>
          <div>
            Stream:{" "}
            <span className="text-lg font-semibold">
              {student?.stream?.name}
            </span>
          </div>
          <div>
            Date: <span className="text-lg font-semibold">{DateTime()}</span>
          </div>
        </div>

        <div className="m-4 flex flex-col gap-4 rounded-xl bg-[#F7F6FB] p-4 md:flex-row md:p-6">
          <div>
            <label>
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={exam?.name}
              className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
              className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
              className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="eg: 282021i"
              name="slug"
            />
          </div>
        </div>
      </div>
      <div className="m-4 rounded-xl bg-[#F7F6FB] p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-[#eexamf4] p-4 text-lg">
              <th className=" p-4 text-xl">Subject</th>
              <th className="text-xl">Score</th>
            </tr>
          </thead>
          <tbody>
            {Subjects?.map((subject, index) => {
              const slug = subject.slug;
              return (
                <tr
                  key={index}
                  className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                >
                  <td className="px-4 py-2 text-lg">{subject.name}</td>
                  <td className="px-4 py-2">
                    <input
                      onInput={(e) => {
                        handleResult(e);
                      }}
                      value={
                        exam?.results?.find((result) => result.slug === slug)
                          ?.marks || ""
                      }
                      className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      type="text"
                      placeholder="eg: 80"
                      name={slug}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className=" mt-8">
          <div>
            {submit ? (
              <Button />
            ) : (
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="rounded bg-blue-500 py-2 px-10 font-bold text-white hover:bg-blue-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExam;
