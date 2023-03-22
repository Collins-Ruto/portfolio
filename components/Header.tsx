"use client";

import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import type { User } from "api/types";

type Props = {
  user: User
}

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
    <div className="mx-auto sticky top-0 z-40 bg-blend-darken bg-[#F7F6FB]">
      <div className="pl-4">
        <nav className="flex items-center justify-between">
          <div
            className="space-y-1 md:space-y-2 cursor-pointer p-2"
            onClick={() => {
              setOpened(!opened);
            }}
          >
            <div className="w-6 rounded md:w-8 h-1 bg-blue-600"></div>
            <div className="w-6 rounded md:w-8 h-1 bg-blue-600"></div>
            <div className="w-6 rounded md:w-8 h-1 bg-blue-600"></div>
          </div>
          <div>
            <div className="relative inline-block text-left">
              <div>
                <div
                  onClick={() => {
                    setDropdown(!dropdown);
                  }}
                  className="inline-flex cursor-pointer py-1 items-center w-full justify-center bg-[#F7F6FB] px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-2 focus:border-gray-500"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                    src="https://img.icons8.com/material-rounded/24/000000/user.png"
                    alt=""
                  />
                  <div className="flex flex-col ">
                    <span className="text-md md:text-lg -mb-2">
                      {user.name}
                    </span>
                    <span className="text-sm text-center text-blue-600">
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
                  className="absolute right-0 px-1 z-10 -mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      tabIndex={-1}
                    />
                      Account
                    </div>
                    <div
                      onClick={() => {
                        logOut();
                        setDropdown(false);
                      }}
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
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
            className="md:hidden absolute right-0 w-screen h-screen opacity-20 bg-blend-darken bg-black"
            onClick={() => {
              setOpened(!opened);
            }}
          ></div>
          <div
            onClick={() => {
              setOpened(!opened);
            }}
            className="
                flex flex-col absolute left-0 w-[60%] md:w-60 p-4 h-screen opacity-100 bg-blend-darken bg-[#F7F6FB] overflow-y-auto "
          >
            <Link
              href="/"
              className={
                `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                  currentRoute === "/"
                    ? "bg-blue-700 text-white hover:text hover:text-white"
                    : ""
                }`
              }
            >
              <Image
              width={10}
              height={10}
                className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                src="https://img.icons8.com/material-rounded/24/000000/dashboard-layout.png"
                alt=""
              />
              <span className="text-lg">Dashboard</span>
            </Link>
            {!(user.type === "student") && (
              <Link
                href="/students"
                className={
                  `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                    currentRoute === "/students"
                      ? "bg-blue-700 text-white hover:text hover:text-white"
                      : ""
                  }`
                }
              >
                <Image
                width={10}
                height={10}
                  className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                  src="https://img.icons8.com/material-rounded/24/000000/student-center.png"
                  alt=""
                />
                <span className="text-lg">Students</span>
              </Link>
            )}
            {user.type === "admin" && (
              <div className="">
                <Link
                  href="/teachers"
                  className={
                    `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                      currentRoute === "/teachers"
                        ? "bg-blue-700 text-white hover:text hover:text-white"
                        : ""
                    }`
                  }
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                    src="https://img.icons8.com/material-rounded/24/000000/teacher.png"
                    alt=""
                  />
                  <span className="text-lg">Teachers</span>
                </Link>
              </div>
            )}
            <Link
              href="/exams"
              className={
                `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                  currentRoute === "/exams"
                    ? "bg-blue-700 text-white hover:text hover:text-white"
                    : ""
                }`
              }
            >
              <Image
              width={10}
              height={10}
                className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                src="https://img.icons8.com/material-rounded/24/000000/test-partial-passed.png"
                alt=""
              />
              <span className="text-lg">Exam Results</span>
            </Link>
            <Link
              href="/calender"
              className={
                `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                  currentRoute === "/calender"
                    ? "bg-blue-700 text-white hover:text hover:text-white"
                    : ""
                }`
              }
            >
              <Image
              width={10}
              height={10}
                className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                src="https://img.icons8.com/material-rounded/24/000000/2012.png"
                alt=""
              />
              <span className="text-lg">Calender</span>
            </Link>

            <Link
              href="/fee"
              className={
                `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                  currentRoute === "/fee"
                    ? "bg-blue-700 text-white hover:text hover:text-white"
                    : ""
                }`
              }
            >
              <Image
              width={10}
              height={10}
                className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                src="https://img.icons8.com/material-rounded/24/000000/currency-exchange.png"
                alt=""
              />
              <span className="text-lg">Finance</span>
            </Link>
            {user.type === "admin" && (
              <div className="">
                <h2 className="text-sm px-2 text-gray-600 border-b pt-1 w-fit">
                  Data Management
                </h2>
                <Link
                  href="/addadmin"
                  className={
                    `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                      currentRoute === "/addadmin"
                        ? "bg-blue-700 text-white hover:text hover:text-white"
                        : ""
                    }`
                  }
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                    src="https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png"
                    alt=""
                  />
                  <span className="text-lg">Add Admin</span>
                </Link>
                <Link
                  href="/addlesson"
                  className={
                    `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                      currentRoute === "/addlesson"
                        ? "bg-blue-700 text-white hover:text hover:text-white"
                        : ""
                    }`
                  }
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                    src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-lesson-university-vitaliy-gorbachev-fill-vitaly-gorbachev-1.png"
                    alt=""
                  />
                  <span className="text-lg">Add Lessons</span>
                </Link>
                <Link
                  href="/addstream"
                  className={
                    `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                      currentRoute === "/addstream"
                        ? "bg-blue-700 text-white hover:text hover:text-white"
                        : ""
                    }`
                  }
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
                    src="https://img.icons8.com/material/24/000000/school-building.png"
                    alt=""
                  />
                  <span className="text-lg">Add Stream</span>
                </Link>
                <Link
                  href="/addsubject"
                  className={
                    `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                      currentRoute === "/addsubject"
                        ? "bg-blue-700 text-white hover:text hover:text-white"
                        : ""
                    }`
                  }
                >
                  <Image
                  width={10}
                  height={10}
                    className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
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
              className={
                `mt-4 align-middle p-2 rounded-md flex items-center text-gray-800 hover:text-blue-700 cursor-pointer ${
                  currentRoute === "/account"
                    ? "bg-blue-700 text-white hover:text hover:text-white"
                    : ""
                }`
              }
            >
              <Image
              width={10}
              height={10}
                className="w-6 mr-2 bg-[#F7F6FB] rounded-sm"
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
