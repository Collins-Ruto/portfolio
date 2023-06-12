"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [opened, setOpened] = useState(false);

  const currentRoute = usePathname();

  return (
    <div className="sticky top-0 z-40 mx-auto bg-white text-black bg-blend-darken">
      <div className="pl-4">
        <nav className="flex items-center justify-between">
          <div className="flex w-full justify-between px-2 py-1.5 md:hidden">
            <Link href="https://learnhqhome.vercel.app/" className="flex">
              <Image
                width={90}
                height={90}
                src="/lhlogo.webp"
                alt="learnhq"
                className=""
              />
            </Link>
            <div
              className="cursor-pointer space-y-1 p-2 px-4 sm:space-y-1.5 md:hidden"
              onClick={() => {
                setOpened(!opened);
              }}
            >
              <div className="h-1 w-6 rounded bg-blue-600 sm:w-8"></div>
              <div className="h-1 w-6 rounded bg-blue-600 sm:w-8"></div>
              <div className="h-1 w-6 rounded bg-blue-600 sm:w-8"></div>
            </div>
          </div>
          <header className="hidden w-full border-b border-gray-300 md:block">
            <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-20">
              <Link
                href="https://learnhqhome.vercel.app/"
                className="flex cursor-pointer"
              >
                <Image
                  width={100}
                  height={100}
                  src="/lhlogo.webp"
                  alt="learnhq"
                  className="mr-2"
                />
              </Link>
              <div className="flex items-center">
                <nav className="text-gray-700">
                  <ul className="flex space-x-2 text-sm font-semibold md:space-x-4 md:text-lg">
                    <li>
                      <Link
                        href={`https://learnhqhome.vercel.app/`}
                        className={` cursor-pointer items-center border-b-2  align-middle hover:text-blue-600 ${
                          currentRoute === "/"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://twitter.com/learnhqafrica"
                        className="hover:text-blue-600"
                      >
                        Forums
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="https://learnhq.vercel.app/learn/courses"
                        className="hover:text-blue-600"
                      >
                        Courses
                      </Link>
                    </li>
                    <Link
                      href={`https://learnhqhome.vercel.app/about`}
                      className={` cursor-pointer items-center border-b-2  align-middle hover:text-blue-600 ${
                        currentRoute === "/about"
                          ? " border-orange-500"
                          : "border-transparent"
                      }`}
                    >
                      <span className="rounded">About</span>
                    </Link>
                    <li>
                      <Link
                        href={`https://learnhqhome.vercel.app/contact`}
                        className={` cursor-pointer items-center border-b-2 align-middle hover:text-blue-600 ${
                          currentRoute === "/contact"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">Contact</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`https://learnhqhome.vercel.app/faq`}
                        className={` cursor-pointer items-center border-b-2  align-middle hover:text-blue-600 ${
                          currentRoute === "/faq"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">FAQs</span>
                      </Link>
                    </li>
                    <li></li>
                  </ul>
                </nav>
                <Link
                  href="https://learnhq.vercel.app/login"
                  className="bg-primary-500 hover:bg-primary-700 focus:border-primary-700 focus:shadow-outline-indigo inline-block rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-semibold leading-6 text-white transition duration-150 ease-in-out focus:outline-none active:bg-indigo-700"
                >
                  Demo
                </Link>
              </div>
            </div>
          </header>
        </nav>
      </div>
      <div className="md:hidden">
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
               absolute right-0 flex h-screen w-[60%]  max-w-[20rem] flex-col gap-2 overflow-y-auto bg-[#F7F6FB] p-4 pt-[5rem] text-2xl font-semibold text-gray-800 opacity-100 bg-blend-darken md:w-60 "
          >
            <Link
              href={`https://learnhqhome.vercel.app/`}
              className={` cursor-pointer items-center rounded p-2 px-4 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <span className="rounded">Home</span>
            </Link>
            <Link
              href={`https://twitter.com/learnhqafrica`}
              className={` flex cursor-pointer items-center rounded-md p-2 px-4 align-middle text-gray-800 hover:text-blue-700 `}
            >
              {/* <Image
                width={20}
                height={20}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/dashboard-layout.png"
                alt=""
              /> */}
              <span className="">Forums</span>
            </Link>

            <Link
              href={`https://learnhqhome.vercel.app/about`}
              className={` cursor-pointer items-center rounded p-2 px-4 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/about"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <span className="rounded">About Us</span>
            </Link>
            <Link
              href="https://learnhq.vercel.app/learn/courses"
              className="rounded p-2 px-4 hover:text-blue-600"
            >
              Courses
            </Link>
            <Link
              href={`https://learnhqhome.vercel.app/contact`}
              className={` cursor-pointer items-center rounded p-2 px-4 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/contact"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              <span className="rounded">Contact</span>
            </Link>
            <Link
              href="https://learnhq.vercel.app/login"
              className=" rounded p-2 px-4"
            >
              Demo
            </Link>
            <Link
              href={`https://learnhqhome.vercel.app/faq`}
              className={`flex cursor-pointer items-center rounded p-2 px-4 align-middle text-gray-800 hover:text-blue-700 ${
                currentRoute === "/faq"
                  ? "hover:text bg-blue-700 text-white hover:text-white"
                  : ""
              }`}
            >
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
