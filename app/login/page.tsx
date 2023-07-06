"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  // const [user, setUser] = useState<userInput | undefined>();
  // const { data: session } = useSession();

  // console.log("user input", user);

  return (
    <div className="relative flex   min-h-screen w-full flex-col justify-center text-black">
      <div className="mx-4 items-center rounded-lg bg-gray-200 p-2 sm:mx-auto sm:flex ">
        <div className="mx-0 p-2 ">
          <form className="">
            <div className="">
              <div>
                <button
                  onClick={() => void signIn("google", { callbackUrl: 'http://localhost:3000/projects'})}
                  className="w-full rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
                  // type="submit"
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
