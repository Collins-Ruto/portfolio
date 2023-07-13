"use client";
import React from "react";
import { signOut } from "next-auth/react";

function Login() {
  return (
    <div className="relative flex   min-h-screen w-full flex-col justify-center text-black">
      <div className="mx-4 items-center rounded-lg bg-gray-200 p-2 sm:mx-auto sm:flex ">
        <button
          onClick={() => void signOut()}
          className="w-full rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Login;
