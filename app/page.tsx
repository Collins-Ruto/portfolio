import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import type { User } from "@prisma/client";
import Head from "next/head";

const HomePage = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user as User;

  console.log("user data", data);

  return (
    <div>
      <Head>
        <title>LearnHq</title>
        <meta
          name="description"
          content="LearnHQ is a comprehensive learning management system that provides quality education and resources to students, teachers, and parents."
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
        <header className="w-full border-b border-gray-300">
          <div className="container mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex">
              <Image
                width={20}
                height={20}
                src="/learnhq.png"
                alt="learnhq"
                className="mr-2"
              />
              <h1 className="text-lg font-semibold text-gray-800">LearnHQ</h1>
            </div>
            <div className="flex items-center">
              <nav className="text-gray-700">
                <ul className="flex font-semibold md:text-lg space-x-2 md:space-x-4 text-sm">
                  <li>
                    <Link
                      href={`/${user?.role ?? "#"}`}
                      className="hover:text-blue-500"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-500">
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-500">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-500 hidden md:block">
                      Contact
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </nav>
              <Link
                href="/login"
                className="rounded-md md:mx-2 bg-blue-500 px-4 py-1.5 font-medium text-white hover:bg-blue-600"
              >
                Sign In
              </Link>
              {/* <div className="cursor-pointer md:hidden space-y-1 p-2 md:space-y-2">
                <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
                <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
                <div className="h-1 w-6 rounded bg-blue-600 md:w-8"></div>
              </div> */}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-4 md:flex">
          <div className="md:pt-16">
            <h2 className="mb-8 text-center text-5xl font-bold text-blue-500 md:text-start">
              Welcome to LearnHQ
            </h2>
            <p className="mb-8 text-justify text-2xl text-gray-700 md:pr-8">
              LearnHQ is a modern school learning management system designed to
              provide quality education and resources to students, teachers, and
              parents.
            </p>
            <Link
              href="https://twitter.com/Ruto_Collins_"
              className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
          <div className="ml-2 pt-4 md:p-0">
            <Image width={1200} height={400} src="/hero.webp" alt="hero" />
          </div>
        </main>
        <footer className="w-full border-t border-gray-300 bg-gray-200 py-4">
          <div className="container mx-auto text-center text-gray-700">
            © 2023 LearnHQ. All rights reserved. by{" "}
            <a href="https://collinsruto.netlify.app">Collins Ruto</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
