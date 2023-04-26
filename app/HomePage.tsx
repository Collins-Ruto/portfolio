import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";

const HomePage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      {" "}
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
          <nav className="text-gray-700">
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="rounded-md bg-blue-500 py-1.5 px-4 font-medium text-white hover:bg-blue-600"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container md:flex mx-auto px-4 py-4">
        <div className="">
          <h2 className="mb-8 text-blue-500 text-center md:text-start text-5xl font-bold">
            Welcome to LearnHQ
          </h2>
          <p className="mb-8 md:pr-8 text-justify text-2xl text-gray-700">
            LearnHQ is a modern school learning management system designed to
            provide quality education and resources to students, teachers, and
            parents.
          </p>
          <Link
            href="https://twitter.com/Ruto_Collins_"
            className="rounded-lg bg-blue-500 py-3 px-6 font-bold text-white hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>
        <div className="ml-2 pt-4 md:p-0">
          <Image
            width={1200}
            height={400}
            src="/hero.webp"
            alt="hero"
          />
        </div>
      </main>
      <footer className="w-full border-t border-gray-300 bg-gray-200 py-4">
        <div className="container mx-auto text-center text-gray-700">
          © 2023 LearnHQ. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
