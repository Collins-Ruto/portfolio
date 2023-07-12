"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "~/styles/globals.css";
import ThemeToogle from "./ThemeToogle";
import localFont from "@next/font/local";

const logoFont = localFont({
  src: "../assets/fonts/Saira_Stencil_One/SairaStencilOne-Regular.ttf",
  display: "fallback",
});

function Header() {
  const [opened, setOpened] = useState(false);
  const currentRoute = usePathname();

  return (
    <div className="  sticky top-0 z-40 bg-gray-100 px-5 py-2 text-black bg-blend-darken shadow-lg dark:bg-slate-900 sm:px-6 lg:px-28">
      <div className="container mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between py-1.5 md:hidden">
            <Link href="/" className="flex items-center">
              <Image
                width={64}
                height={64}
                src="/c-bg-y.png"
                alt="Collins"
                className="h-11 w-11"
              />
              <h1
                className={`${logoFont.className} ml-2 text-lg dark:text-white  `}
              >
                RUTO COLLINS
              </h1>
            </Link>
            <div
              id="menuButton"
              className={`flex ${
                opened ? "open" : ""
              } cursor-pointer flex-col items-center justify-center space-y-1.5 p-2  md:hidden`}
              onClick={() => {
                setOpened(!opened);
              }}
            >
              <span className="duration-400 h-1 w-8 rounded bg-blue-600 transition-all sm:w-8"></span>
              <span className="duration-400 h-1 w-8 rounded bg-blue-600 transition-all sm:w-8"></span>
              <span className="duration-400 h-1 w-8 rounded bg-blue-600 transition-all sm:w-8"></span>
            </div>
          </div>
          <header className="hidden w-full md:block">
            <div className="container mx-auto flex items-center justify-between">
              <Link href="/" className="flex cursor-pointer items-center">
                <Image
                  width={128}
                  height={128}
                  src="/c-bg-y.png"
                  alt="Collins"
                  className="mr-2 h-12 w-12"
                  loading="eager"
                />
                <span
                  className={`${logoFont.className} ml-1 text-2xl dark:text-white md:ml-2`}
                >
                  RUTO COLLINS
                </span>
              </Link>
              <div className="">
                <nav className="w-full text-gray-700 dark:text-gray-300">
                  <ul className="flex items-center space-x-4 text-sm font-semibold md:text-lg lg:space-x-8">
                    <li>
                      <Link
                        href={`/`}
                        className={` cursor-pointer items-center border-b-2 align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute === "/"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">HOME</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={`/blogs`}
                        className={` cursor-pointer items-center border-b-2  align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute?.substring(0, 6) === "/blogs"
                            ? "  border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">BLOGS</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/projects`}
                        className={` cursor-pointer items-center border-b-2 align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute === "/projects"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">PROJECTS</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/about`}
                        className={` cursor-pointer items-center border-b-2 align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute === "/about"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">ABOUT ME</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/contact`}
                        className={` cursor-pointer items-center border-b-2 align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute === "/contact"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">CONTACT</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/cv`}
                        className={` cursor-pointer items-center border-b-2 align-middle transition duration-200 ease-in-out hover:text-blue-600 ${
                          currentRoute === "/cv"
                            ? " border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <span className="rounded">CV</span>
                      </Link>
                    </li>

                    {/* <li>
                      <Link
                        href="#"
                        className="bg-primary-500 hover:bg-primary-700 focus:border-primary-700 focus:shadow-outline-indigo inline-block rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-base font-semibold leading-6 text-white transition duration-150 ease-in-out focus:outline-none active:bg-indigo-700"
                      >
                        Résumé
                      </Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </nav>
      </div>
      <div className="md:hidden">
        <div
          className={`hidde absolute right-0 h-screen w-screen bg-black opacity-20 bg-blend-darken md:hidden ${
            opened ? "active block " : ` hidden `
          }`}
          onClick={() => {
            setOpened(false);
          }}
        ></div>
        <div
          className={`sidebar translate-x-4 transition-transform  duration-300 ease-in-out ${
            opened ? "active block " : ` hidden`
          }`}
        >
          <div
            onClick={() => {
              setOpened(!opened);
            }}
            className="
               absolute right-0 flex h-screen w-[60%] max-w-[20rem] flex-col  gap-4 overflow-y-auto bg-[#F7F6FB] p-4 pt-[5rem] text-end text-2xl font-semibold opacity-100 bg-blend-darken  dark:bg-slate-900 dark:text-white sm:text-3xl md:w-60 "
          >
            <div className="ml-auto w-fit items-center px-2 md:hidden">
              <ThemeToogle place="sidebar-toogle" />
            </div>
            <Link
              href={`/`}
              className={` ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/"
                  ? "  border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="rounded">Home</span>
            </Link>

            <Link
              href={`/blogs`}
              className={` ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute?.substring(0, 6) === "/blogs"
                  ? "  border-orange-500"
                  : "border-transparent"
              }`}
            >
              {/* <Image
                width={20}
                height={20}
                className="mr-2 w-6 rounded-sm bg-[#F7F6FB]"
                src="https://img.icons8.com/material-rounded/24/000000/dashboard-layout.png"
                alt=""
              /> */}
              <span className="rounded">Blogs</span>
            </Link>
            <Link
              href={`/projects`}
              className={`ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/projects"
                  ? " border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="rounded">Projects</span>
            </Link>
            <Link
              href={`/about`}
              className={`ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/about"
                  ? " border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="rounded">About Me</span>
            </Link>
            <Link
              href={`/contact`}
              className={` ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/contact"
                  ? "  border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="rounded">Contact</span>
            </Link>
            <Link
              href={`/cv`}
              className={` ml-auto w-fit cursor-pointer items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/cv"
                  ? "  border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="rounded">Read CV</span>
            </Link>
            <a
              href="https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/collinsruto.pdf"
              className=" ml-auto flex items-center rounded p-2 px-2"
            >
              Résumé
              <Image
                src="https://img.icons8.com/sf-regular-filled/48/000000/downloading-updates.png"
                className="ml-1 w-7 dark:hidden"
                height={100}
                width={100}
                alt=""
              />
              <Image
                src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/downloading-updates.png"
                className="ml-1 hidden w-7 dark:block"
                height={100}
                width={100}
                alt=""
              />
            </a>
            {/* <Link
              href={`/faq`}
              className={` w-fit cursor-pointer ml-auto items-center border-b-2 px-2 transition duration-200 ease-in-out hover:text-blue-600 ${
                currentRoute === "/faq"
                  ? "  border-orange-500"
                  : "border-transparent"
              }`}
            >
              FAQs
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
