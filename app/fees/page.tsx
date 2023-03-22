import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Loader } from "../components";

function FeeData() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState({});
  const [pages, setPages] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // https://lmsadmin.onrender.com

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserType(user.type);

    axios.get("https://lmsadmin.onrender.com/fees").then((res) => {
      setFees(res.data.edges);
      setPages(res.data.pageInfo);
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
    axios.post("https://lmsadmin.onrender.com/fees/page", data).then((res) => {
      setPages(res.data.pageInfo);
      setFees(res.data.edges);
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
      `https://lmsadmin.onrender.com/fees/search?name=${search.name}&id=${search.id}`
    );
    const neData = data.data.feeSearch.concat(
      data.data.studentSearch.length ? data.data.studentSearch[0].node.fees : []
    );
    setFees(neData);
    setSubmit(false);
    setSearch({ name: "", id: "" });
  };

  return (
    <div className="w-screen md:w-full md:pb-8">
      <div className="p-4 text-2xl font-semibold">
        <h3>Fee Details</h3>
      </div>
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row gap-4 justify-between p-4">
        <div>
          <div>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              name="id"
              value={search.id}
              type="text"
              className="shadow appearance-none border bg-[#F7F6FB] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search by ID ..."
            />
          </div>
        </div>
        <div>
          <div>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              name="name"
              value={search.name}
              type="text"
              className="shadow appearance-none border bg-[#F7F6FB] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Search by student Name ..."
            />
          </div>
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
          {userType === "admin" && (
            <div>
              <Link
                to="/addfee"
                type="btn"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                {" "}
                <img
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                  className="w-5 mr-1"
                  alt=""
                />
                Add Fee
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="m-4 bg-[#F7F6FB] rounded-xl p-6 overflow-auto">
        <table className="w-full text-justify">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Student</th>
              <th className="p-4">Stream</th>
              <th className="p-4">Invoiced</th>
              <th className="p-4">Credited</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Paid Date</th>
              <th className="text-end">Status</th>
            </tr>
          </thead>
          <tbody>
            {fees?.map((fees, index) => {
              const fee = fees && (fees?.node || fees);

              return (
                <tr
                  key={index}
                  className={` p-4 ${index % 2 === 0 && "bg-white"}`}
                >
                  <td className="p-4">{fee.slug}</td>
                  <td className="p-4">
                    <h2 className=" ">
                      <span>{fee.student?.name}</span>
                    </h2>
                  </td>
                  <td className="p-4">{fee.student?.stream?.name}</td>
                  <td className="p-4">
                    {fee.type === "invoice" ? fee.amount : "0.00"}
                  </td>
                  <td className="p-4">
                    {fee.type === "credit" ? fee.amount : "0.00"}
                  </td>
                  <td className="p-4">{fees.balance}</td>
                  <td className="p-4">{fee.payday}</td>
                  <td className="text-end p-4">
                    <span>
                      {parseFloat(fees.balance) < 1 ? "Paid" : "Arrears"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
            pages?.hasNextPage && changePage("after");
          }}
          className={` ${
            pages?.hasNextPage
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
  );
}

export default FeeData;
