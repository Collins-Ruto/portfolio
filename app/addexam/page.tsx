import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, DateTime, Loader } from "../components";
import StatusMsg from "../components/StatusMsg";

const data = {
  examDate: "10-03-2020",
  results: JSON.stringify({}),
};

function AddExam() {
  const [exam, setExam] = useState(data);
  const [admid, setAdmid] = useState("");
  const [student, setStudent] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios.get("https://lmsadmin.onrender.com/infos").then((res) => {
      setSubjects(res.data.subjects);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setExam({ ...exam, [name]: value });
  };

  const handleResult = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name.toString();

    setExam({ ...exam, results: { ...exam.results, [name]: value } });
  };

  const handleSubmit = () => {
    setSubmit(true);
    axios
      .post("https://lmsadmin.onrender.com/exams", { data: exam })
      .then((res) => {
        res.status === 200 && setExam(data);
        setSubmit(false);
        setStatus(
          res.data.message === "success"
            ? {
                type: "success",
                message: `succesfully added ${exam.dame} results for ${student.name}`,
              }
            : { type: "error", message: res.data.message }
        );
        setTimeout(() => {
          res.data.message === "success" && window.location.reload(true);
        }, 2000);
      });
  };

  const getStudent = () => {
    setSubmit(true);
    axios
      .get(`https://lmsadmin.onrender.com/exams/student?admissionId=${admid}`)
      .then((res) => {
        setStudent(res.data.student);
        setExam({
          ...exam,
          student: { connect: { Student: { slug: res.data.student.slug } } },
        });
        setSubmit(false);
      });
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
        <div className="flex px-4 justify-between md:justify-start">
          <div className="md:mr-8">
            <div>
              <input
                onChange={(e) => setAdmid(e.target.value)}
                value={admid}
                type="text"
                className="shadow bg-[#F7F6FB] appearance-none border-[1px] rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
                  type="btn"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="m-4 bg-[#F7F6FB] rounded-xl flex flex-col md:flex-row justify-between p-4">
          <div>
            Student :{" "}
            <span className="font-semibold text-lg">{student?.name}</span>
          </div>
          <div>
            Stream:{" "}
            <span className="font-semibold text-lg">
              {student?.stream?.name}
            </span>
          </div>
          <div>
            Date: <span className="font-semibold text-lg">{DateTime()}</span>
          </div>
        </div>

        <div className="m-4 flex-col bg-[#F7F6FB] flex md:flex-row gap-4 rounded-xl p-4 md:p-6">
          <div>
            <label>
              Exam Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              value={exam.name}
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={exam.term}
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={exam.slug}
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="eg: 282021i"
              name="slug"
            />
          </div>
        </div>
      </div>
      <div className="m-4 bg-[#F7F6FB] p-4 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="p-4 text-lg bg-[#efeef4]">
              <th className=" text-xl p-4">Subject</th>
              <th className="text-xl">Score</th>
            </tr>
          </thead>
          <tbody>
            {subjects?.map((subject, index) => {
              const slug = subject.slug;
              return (
                <tr
                  key={index}
                  className={` p-4 ${index % 2 === 0 && "bg-white"}`}
                >
                  <td className="px-4 py-2 text-lg">{subject.name}</td>
                  <td className="px-4 py-2">
                    <input
                      onInput={(e) => {
                        handleResult(e);
                      }}
                      value={exam.results[slug]}
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
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
