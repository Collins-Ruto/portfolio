"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "~/components";
import { DummyUser, Subjects } from "~/types/types";
import type { User, Result } from "~/types/types";
import { api } from "@/utils/api";
import { type Exam } from "@prisma/client";

function ExamPage() {
  const [user, setUser] = useState<User | undefined>();
  const [exams, setExams] = useState<Exam[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const id = "641dd16f2eece6ce9587cb0d";

    const userFromLocalStorage = localStorage.getItem("user");
    const user: User =
      userFromLocalStorage !== null
        ? (JSON.parse(userFromLocalStorage) as User)
        : DummyUser;
    setUser(user);

    const { data, isLoading, error } = api.exam.studentExams.useQuery(id);
    const exams: Exam[] | undefined = data;
    setExams(exams);
    setIsLoading(isLoading);
    console.log("exam error", error);
  }, []);
  console.log("exam", exams);
  console.log("exam user", user);

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>Your exam Results</h3>
      </div>
      {isLoading && <Loader />}
      <div>
        {exams?.length === 0 ? (
          <div>
            <h1>Sorry, Your results have not been uploaded yet</h1>
          </div>
        ) : (
          <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
            <table className=" w-full text-justify">
              <thead>
                <tr className="p-4 text-lg">
                  <th className="p-4">Exam</th>
                  <th className="p-4">Term</th>
                  <th className="p-4">Date</th>
                  {Subjects.map((subject, index) => (
                    <th className="border-x-2 p-4" key={index}>
                      {subject.slug}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exams?.map((exam, index) => {
                  return (
                    <tr
                      className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                      key={index}
                    >
                      <td className="p-4">{exam?.name}</td>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamPage;
