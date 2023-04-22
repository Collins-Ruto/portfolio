"use client";
import axios from "axios";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { User } from "api/types";

type Props = {
  user: User;
};

function Header({ user }: Props) {
  const [opened, setOpened] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  // const [bgColor, setbgColor] = useState("000000");

  // const router = useRouter();
  const currentRoute = usePathname();

  const logOut = () => {
    localStorage.setItem("saved", JSON.stringify(false));
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    window.location.reload();
  };

  return (
    <div className="sticky top-0 z-40 mx-auto bg-[#F7F6FB] bg-blend-darken">
      <div className="pl-4">
        <nav className="flex items-center justify-between">
          <div
            className="cursor-pointer space-y-1 p-2 md:space-y-2"
            onClick={() => {
              setOpened(!opened);
            }}
          >
            <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
            <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
            <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
          </div>
          <div>
            <div className="relative inline-block text-left">
              <div>
                <div
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                  className="inline-flex w-full cursor-pointer items-center justify-center bg-[#F7F6FB] py-1 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-2 focus:border-gray-500"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/material-rounded/24/000000/user.png"
                    alt=""
                  />
                  <div className="flex flex-col ">
                    <span className="text-md -mb-2 md:text-lg">
                      {user.name}
                    </span>
                    <span className="text-center text-sm text-blue-600">
                      {user.type}
                    </span>
                  </div>
                  <svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {dropdown && (
                <div
                  className="absolute right-0 z-10 -mt-1 w-56 origin-top-right rounded-md bg-white px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <Link
                      onClick={() => {
                        setDropdown(false);
                      }}
                      href="/account"
                      className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      tabIndex={-1}
                    />
                    Account
                  </div>
                  <div
                    onClick={() => {
                      logOut();
                      setDropdown(false);
                    }}
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    tabIndex={-1}
                  >
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div>
        <div className={`${opened ? "block " : "hidden md:block"}`}>
          <div
            className="absolute right-0 h-screen w-screen bg-black opacity-20 bg-blend-darken md:hidden"
            onClick={() => {
              setOpened(!opened);
            }}
          ></div>
          <div
            onClick={() => {
              setOpened(!opened);
            }}
            className="
                absolute left-0 flex h-screen w-[60%] flex-col overflow-y-auto bg-[#F7F6FB] p-4 opacity-100 bg-blend-darken md:w-60 "
          >
            <Link
              href="/"
              className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/admin"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <Image
                width={10}
                height={10}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/dashboard-layout.png"
                alt=""
              />
              <span className="text-lg">Dashboard</span>
            </Link>
            {!(user.type === "student") && (
              <Link
                href="/allstudents"
                className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                  currentRoute === "/students"
                    ? "hover:text bg-blue-700 text-white hover:text-white"
                    : ""
                }`}
              >
                <Image
                  width={10}
                  height={10}
                  className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                  src="https://img.icons8.com/material-rounded/24/000000/student-center.png"
                  alt=""
                />
                <span className="text-lg">Students</span>
              </Link>
            )}
            {user.type === "admin" && (
              <div className="">
                <Link
                  href="/admin/teachers"
                  className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                    currentRoute === "/teachers"
                      ? "hover:text bg-blue-700 text-white hover:text-white"
                      : ""
                  }`}
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/material-rounded/24/000000/teacher.png"
                    alt=""
                  />
                  <span className="text-lg">Teachers</span>
                </Link>
              </div>
            )}
            <Link
              href="/exams"
              className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/exams"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <Image
                width={10}
                height={10}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/test-partial-passed.png"
                alt=""
              />
              <span className="text-lg">Exam Results</span>
            </Link>
            <Link
              href="/calender"
              className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/calender"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <Image
                width={10}
                height={10}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/2012.png"
                alt=""
              />
              <span className="text-lg">Calender</span>
            </Link>

            <Link
              href="/fees"
              className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/fee"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <Image
                width={10}
                height={10}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/currency-exchange.png"
                alt=""
              />
              <span className="text-lg">Finance</span>
            </Link>
            {user.type === "admin" && (
              <div className="">
                <h2 className="w-fit border-b px-2 pt-1 text-sm text-gray-600">
                  Data Management
                </h2>
                <Link
                  href="/admin/admins/add"
                  className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                    currentRoute === "/addadmin"
                      ? "hover:text bg-blue-700 text-white hover:text-white"
                      : ""
                  }`}
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png"
                    alt=""
                  />
                  <span className="text-lg">Add Admin</span>
                </Link>
                <Link
                  href="/addlesson"
                  className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                    currentRoute === "/addlesson"
                      ? "hover:text bg-blue-700 text-white hover:text-white"
                      : ""
                  }`}
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-lesson-university-vitaliy-gorbachev-fill-vitaly-gorbachev-1.png"
                    alt=""
                  />
                  <span className="text-lg">Add Lessons</span>
                </Link>
                <Link
                  href="/admin/streams/add"
                  className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                    currentRoute === "/addstream"
                      ? "hover:text bg-blue-700 text-white hover:text-white"
                      : ""
                  }`}
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/material/24/000000/school-building.png"
                    alt=""
                  />
                  <span className="text-lg">Add Stream</span>
                </Link>
                <Link
                  href="/admin/subjects/add"
                  className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                    currentRoute === "/addsubject"
                      ? "hover:text bg-blue-700 text-white hover:text-white"
                      : ""
                  }`}
                >
                  <Image
                    width={10}
                    height={10}
                    className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                    src="https://img.icons8.com/ios-filled/50/000000/wordbook.png"
                    alt=""
                  />
                  <span className="text-lg">Add Subject</span>
                </Link>
              </div>
            )}
            {/* <Link
                href="/class"
                className={
                  `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                    currentRoute === "/class"
                      ? "bg-blue-700 text-white hover:text hover:text-white"
                      : ""
                  }`
                }
              >
                <Image
                width={10} className="w-6 mr-2 bg-[#F7F6FB] rounded-sm" src="https://img.icons8.com/material-rounded/24/000000/user.png" alt="" />
                height={10}
                <span className="text-lg">Assignments</span>
              </Link> */}
            <Link
              href="/account"
              className={`mt-4 flex cursor-pointer items-center rounded-md p-2 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/account"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <Image
                width={10}
                height={10}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/user.png"
                alt=""
              />
              <span className="text-lg">Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
