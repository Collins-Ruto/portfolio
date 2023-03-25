'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "~/components";
import {  DummyUser, Subjects } from '~/api/types';
import type { Exam, User } from '~/api/types';
import { api } from "@/utils/api";

function Exam() {
  useEffect(() => {
    
    //  setUserType(user)
    // axios
    //   .get(`https://lmsadmin.onrender.com/exams/studentexams?slug=${user.slug}`)
    //   .then((res) => {
    //     setExam(res.data.student.exams);
    //   });

    // axios.get("https://lmsadmin.onrender.com/infos").then((res) => {
    //   setSubjects(res.data.subjects);
    //   setLoading(false);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const id = "641dd16f2eece6ce9587cb0d"

  const userFromLocalStorage = localStorage.getItem("user");
  const user: User = userFromLocalStorage !== null ? JSON.parse(userFromLocalStorage) as User : DummyUser

  const {data, isLoading, error} = api.exam.studentExams.useQuery(id);
  //  const [exam, setExam] = useState<Exam[]>(data);
  const exam: Exam[] | undefined = data
  console.log("exam", exam);

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>Your exam Results</h3>
      </div>
      {isLoading && <Loader />}
      <div>
        {exam?.length === 0 ? (
          <div>
            <h1>Sorry, Your results have not been uploaded yet</h1>
          </div>
        ) : (
          <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 overflow-auto">
            <table className=" w-full text-justify">
              <thead>
                <tr className="text-lg p-4">
                  <th className="p-4">Exam</th>
                  <th className="p-4">Term</th>
                  <th className="p-4">Date</th>
                  {Subjects.map((subject, index) => (
                    <th className="p-4 border-x-2" key={index}>
                      {subject.slug}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  exam?.map((exam, index) => {
                    return (
                      <tr
                        className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                        key={index}
                      >
                        <td className="p-4">{exam?.name}</td>
                        <td className="p-4">{exam?.term}</td>
                        <td className="p-4">{exam.examDate}</td>
                        {Subjects.map((subject, index) => (
                          <td className="p-4 border-x-2" key={index}>
                            {(exam.results[subject.slug  as keyof typeof exam.results]).toString() || "-"}
                          </td>
                        ))}
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

export default Exam;
