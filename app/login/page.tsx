"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {

  return (
    <div className="relative flex   min-h-screen w-full flex-col justify-center text-black">
      <div className="mx-4 items-center rounded-lg bg-gray-200 p-2 sm:mx-auto sm:flex ">
        <div className="mx-0 p-2 ">
          <form className="">
            <div className="">
              <div>
                <button
                  onClick={async () => await signIn("google", { callbackUrl: 'http://localhost:3000/projects'})}
                  className="w-full rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
