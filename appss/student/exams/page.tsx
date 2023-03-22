import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components";

function Exam() {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const user = JSON?.parse(localStorage.getItem("user"));
    console.log(user);
    axios
      .get(`https://lmsadmin.onrender.com/exams/studentexams?slug=${user.slug}`)
      .then((res) => {
        setExam(res.data.student.exams);
      });

    axios.get("https://lmsadmin.onrender.com/infos").then((res) => {
      setSubjects(res.data.subjects);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>Your exam Results</h3>
      </div>
      {loading && <Loader />}
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
                  {subjects.map((subject, index) => (
                    <th className="p-4 border-x-2" key={index}>
                      {subject.slug}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exam.length &&
                  exam.map((exam, index) => {
                    return (
                      <tr
                        className={` p-4 ${index % 2 === 0 && "bg-white"}`}
                        key={index}
                      >
                        <td className="p-4">{exam?.name}</td>
                        <td className="p-4">{exam?.term}</td>
                        <td className="p-4">{exam.examDate}</td>
                        {subjects.map((subject, index) => (
                          <td className="p-4 border-x-2" key={index}>
                            {exam.results[subject.slug] || "-"}
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
