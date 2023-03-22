import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Loader } from "../components";

function Exam() {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState({});
  const [pages, setPages] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // https://lmsadmin.onrender.com
  useEffect(() => {
    axios.get("https://lmsadmin.onrender.com/exams").then((res) => {
      setExam(res.data.edges);
      setPages(res.data.pageInfo);
    });

    axios.get("https://lmsadmin.onrender.com/infos").then((res) => {
      setSubjects(res.data.subjects);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (direction) => {
    const data = {
      ...pages,
      direction: direction,
      cursor: direction === "after" ? pages.endCursor : pages.startCursor,
    };
    axios.post("https://lmsadmin.onrender.com/exams/page", data).then((res) => {
      setPages(res.data.pageInfo);
      setExam(res.data.edges);
    });
  };

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setSearch({ ...search, [name]: value });
  };

  const searchSubmit = async () => {
    const data = await axios.get(
      `https://lmsadmin.onrender.com/exams/search?name=${search.name}&id=${search.id}`
    );
    const neData = data.data.examSearch.concat(
      data.data.studentSearch.length
        ? data.data.studentSearch[0].node.exams
        : []
    );
    setExam(neData);
    setSubmit(false);
    setSearch({ name: "", id: "" });
  };

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>exam</h3>
      </div>
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row gap-4 justify-between p-4">
        <div>
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            name="id"
            value={search.id}
            type="text"
            className="shadow bg-[#F7F6FB] appearance-none border-[1px] rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search by exam ID ..."
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            name="name"
            value={search.name}
            type="text"
            className="shadow appearance-none border bg-[#F7F6FB] rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search by student Name ..."
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
                  setSubmit(true);
                }}
                type="btn"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
            )}
          </div>
          <div>
            <Link
              to="/addexam"
              type="btn"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              {" "}
              <img
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                className="w-5 mr-1 text-white"
                alt=""
              />
              Add
            </Link>
          </div>
        </div>
      </div>
      <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 overflow-auto">
        <table className=" w-full text-justify">
          <thead>
            <tr className="text-lg p-4">
              <th className="p-4">Exam</th>
              <th className="p-4">Student</th>
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
              exam.map((data, index) => {
                const exam = data.node || data;
                return (
                  <tr
                    className={` p-4 ${index % 2 === 0 && "bg-white"}`}
                    key={index}
                  >
                    <td className="p-4">{exam.name}</td>
                    <td className="p-4">{exam.student?.name}</td>
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
        <div className="flex align-middle justify-center pb-10 md:pb-0">
          <div
            onClick={() => {
              pages.hasPreviousPage && changePage("before");
            }}
            className={` ${
              pages.hasPreviousPage
                ? "bg-slate-700 cursor-pointer text-gray-100 hover:bg-gray-600 hover:text-white"
                : "bg-gray-300 text-gray-800"
            }  inline-flex items-center px-4 py-2 mr-3 text-sm font-medium border border-gray-300 rounded-lg `}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
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
              pages.hasNextPage && changePage("after");
            }}
            className={` ${
              pages.hasNextPage
                ? "bg-slate-700 cursor-pointer text-gray-100 hover:bg-gray-600 hover:text-white"
                : "bg-gray-300 text-gray-800"
            }  inline-flex items-center px-4 py-2 mr-3 text-sm font-medium border border-gray-300 rounded-lg `}
          >
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
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

export default Exam;
