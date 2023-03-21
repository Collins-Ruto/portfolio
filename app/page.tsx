import { type NextPage } from "next";
import Link from 'next/link';

import "@/styles/globals.css";

const HomePage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col justify-between items-center min-h-screen bg-gray-100">
      <header className="w-full bg-white border-b border-gray-300">
        <div className="container mx-auto flex items-center justify-between py-4">
          <h1 className="text-lg font-semibold text-gray-800">LearnHQ</h1>
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
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8 max-w-[30rem]">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Welcome to LearnHQ
        </h2>
        <p className="text-lg text-justify text-gray-700 mb-8">
          LearnHQ is a modern learning management system designed to provide quality education and resources to students, teachers, and parents.
        </p>
        <Link href="https://twitter.com/Ruto_Collins_" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full">
          Get Started
        </Link>
      </main>
      <footer className="w-full bg-gray-200 border-t border-gray-300 py-4">
        <div className="container mx-auto text-center text-gray-700">
          © 2023 LearnHQ. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
