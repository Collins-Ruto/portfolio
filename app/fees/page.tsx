"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Loader } from "~/components";
import Image from "next/image";
import { DummyUser } from "~/api/types";
import type { Search, User, Fee, Student } from "~/api/types";
import { api } from "@/utils/api";

function FeeData() {
  const [userType, setUserType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState<Search>();
  const [pages, setPages] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // https://lmsadmin.onrender.com

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const user: User =
      userFromLocalStorage !== null
        ? (JSON.parse(userFromLocalStorage) as User)
        : DummyUser;
    setUserType(user.type);

    // axios.get("https://lmsadmin.onrender.com/fees").then((res) => {
    //   setFees(res.data.edges);
    //   setPages(res.data.pageInfo);
    //   setLoading(false);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, error } = api.fee.getAll.useQuery();
  // const initialFees = data?.map((fee: Fee & { student: Student }) => ({
  //   ...fee,
  //   student: fee.student || undefined,
  // })) as Fee[] | undefined;
  const fees: Fee[] | undefined = data;
  console.log("fees", fees);

  // const changePage = (direction) => {
  //   const data = {
  //     ...pages,
  //     direction: direction,
  //     cursor: direction === "after" ? pages.endCursor : pages.startCursor,
  //   };
  //   axios.post("https://lmsadmin.onrender.com/fees/page", data).then((res) => {
  //     setPages(res.data.pageInfo);
  //     setFees(res.data.edges);
  //   });
  // };

  // const handleInput = (event) => {
  //   const target = event.target;
  //   // const value = target.type === "checkbox" ? target.checked : target.value;
  //   const value =
  //     target.type === "number" ? parseInt(target.value) : target.value;
  //   const name = target.name;

  //   setSearch({ ...search, [name]: value });
  // };

  // const searchSubmit = async () => {
  //   const data = await axios.get(
  //     `https://lmsadmin.onrender.com/fees/search?name=${search.name}&id=${search.id}`
  //   );
  //   const neData = data.data.feeSearch.concat(
  //     data.data.studentSearch.length ? data.data.studentSearch[0].node.fees : []
  //   );
  //   setFees(neData);
  //   setSubmit(false);
  //   setSearch({ name: "", id: "" });
  // };

  return (
    <div className="w-screen md:w-full md:pb-8">
      <div className="p-4 text-2xl font-semibold">
        <h3>Fee Details</h3>
      </div>
      {isLoading && <Loader />}
      <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
        <div>
          <div>
            <input
              onChange={(e) => {
                // handleInput(e);
              }}
              name="id"
              value={search?.id}
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Search by ID ..."
            />
          </div>
        </div>
        <div>
          <div>
            <input
              onChange={(e) => {
                // handleInput(e);
              }}
              name="name"
              value={search?.name}
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                  // searchSubmit();
                  setSubmit(true);
                }}
                type="button"
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Search
              </button>
            )}
          </div>
          {userType === "admin" && (
            <div>
              <Link
                href="admin/addfee"
                type="button"
                className="flex items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                {" "}
                <Image
                  width={100}
                  height={100}
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                  className="mr-1 w-5"
                  alt=""
                />
                Add Fee
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-6">
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
            {fees?.map((fee, index) => {
              const studentFees = fees.filter(
                (f) => f.studentId === fee.studentId
              );
              const invoiceSum = studentFees
                .filter((f) => f.type === "invoice")
                .reduce((acc, f) => acc + parseFloat(f.amount), 0);
              const creditSum = studentFees
                .filter((f) => f.type === "credit")
                .reduce((acc, f) => acc + parseFloat(f.amount), 0);

              const balance = invoiceSum - creditSum;

              return (
                <tr
                  key={index}
                  className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
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
                  <td className="p-4">{balance}</td>
                  <td className="p-4">{fee.payday}</td>
                  <td className="p-4 text-end">
                    <span>
                      {/* {parseFloat(fees.balance) < 1 ? "Paid" : "Arrears"} */}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center pb-10 align-middle md:pb-0">
        <div
          onClick={() => {
            // pages.hasPreviousPage && changePage("before");
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
            // pages?.hasNextPage && changePage("after");
          }}
          className={` ${
            pages?.hasNextPage
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
  );
}

export default FeeData;
