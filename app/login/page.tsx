"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import homepic from "~/assets/homepic1.webp";
import { Button } from "~/components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/utils/api";
import { type User } from "~/types/types";

type userInput = {
  group: string;
  password: string;
  userName: string;
  radio: boolean;
};

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<userInput | undefined>>;
};

function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<userInput | undefined>();
  const [submit, setSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passView, setPassView] = useState(false);

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    target.type === "checkbox" && setIsChecked(!isChecked);

    setUser((prevUser) => {
      if (!prevUser) {
        return {
          [name]: value,
        } as userInput;
      }
      return {
        ...prevUser,
        [name]: value,
      };
    });
    console.log("user change", value);
  };

  console.log("user input", user);
  console.log("login session", { session });

  const getAdmin = api.admin.getById.useQuery(user?.userName ?? "");
  const getTeacher = api.teacher.getById.useQuery(user?.userName ?? "");
  const getStudent = api.student.getById.useQuery(user?.userName ?? "");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmit(true);
    const result = signIn("credentials", {
      username: user?.userName,
      password: user?.password,
      group: user?.group,
      redirect: true,
      callbackUrl: `/${user?.group ?? "login"}`,
    });
    console.log("submit result", result);
    // const { data, isLoading, error } = getAdmin;
    // console.log("all data", data)
    // try {
    //   console.log("passed submit");
    //   setSubmit(true);

    //   if (user?.group === "admin") {
    //     const { data, isLoading, error } = getAdmin;
    //     console.log("admin data", data);
    //     setLoading(isLoading);
    //     // setLogin({ ...data, type: user?.group } as User);
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({ ...data, type: user?.group })
    //     );
    //     setSubmit(false);
    //   } else if (user?.group === "teacher") {
    //     console.log("passed t submit");
    //     const { data, isLoading, error } = getTeacher;
    //     console.log("teacher data", data);
    //     setLoading(isLoading);
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({ ...data, type: user?.group })
    //     );
    //     setSubmit(false);
    //   } else if (user?.group === "student") {
    //     const { data, isLoading, error } = getStudent;
    //     setLoading(isLoading);
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({ ...data, type: user?.group })
    //     );
    //     setSubmit(false);
    //   }

    //   // router.push(`/${user?.group ?? "/login"}`)
    // } catch (error) {
    //   setSubmit(false);
    // }
  };

  // const handleSubmit = () => {
  //   if (!window.navigator.onLine) {
  //     return;
  //   }
  //   setSubmit(true);

  //   axios
  //     .post(`https://lmsadmin.onrender.com/user/${user?.group}`, user)
  //     .then((res) => {
  //       if (res.data[user?.group]) {
  //         setLogin({ ...res.data[user?.group], type: user?.group });
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({ ...res.data[user?.group], type: user?.group })
  //         );
  //         localStorage.setItem("saved", JSON.stringify(isChecked));
  //         // axios.defaults.headers.common["Authorization"] = `${
  //         //   res.data[user?.group].token
  //         //   }`;
  //         // navigate("/")
  //       } else {
  //         setInvalid(true);
  //       }
  //       setSubmit(false);
  //     });
  // };

  return (
    <div className="flex h-screen w-full justify-center p-2 text-black">
      <div className="m-auto items-center rounded-lg bg-[#F7F6FB] sm:flex ">
        <div className="p-4">
          <Image
            width={250}
            height={100}
            className="cover mx-auto h-96"
            // src="https://preschool.dreamguystech.com/template/assets/img/login.png"
            src={homepic}
            alt="Logo"
          />
        </div>
        <div className="mx-0 p-4 ">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Welcome to Ace Accademy
          </h1>
          {invalid && (
            <div className="text-red-500">Invalid username or password</div>
          )}
          <form
            // action="index.html"
            className="mt-4"
            // onClick={() => {
            //   setInvalid(false);
            // }}
          >
            <div className="relative items-center">
              <label>
                Log in as <span className="text-red-500">*</span>
              </label>
              <div className="flex cursor-pointer items-center">
                <select
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  required
                  name="group"
                  value={user?.group}
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight text-black shadow hover:border-gray-500 focus:outline-none"
                >
                  <option>Select group</option>
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                  <option value="admin">adminstrator</option>
                </select>
                <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label>
                userName <span className="text-red-500">*</span>
              </label>
              <div className="relative flex cursor-pointer items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  name="userName"
                  value={user?.userName}
                  className="focus:shadow-outline block w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  placeholder="eg: 01john"
                />
                <div className="absolute right-0 cursor-pointer px-2 text-gray-700">
                  <Image
                    width={100}
                    height={100}
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-user-interface-kiranshastry-lineal-kiranshastry.png"
                    alt="user"
                    className="w-8 fill-current"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 ">
              <label>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  checked={isChecked}
                  name="password"
                  value={user?.password}
                  className="focus:shadow-outline pass-input w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type={`${passView ? "text" : "password"}`}
                />
                <div className="absolute right-0 cursor-pointer px-2 text-gray-700">
                  <Image
                    width={100}
                    height={100}
                    onClick={() => {
                      setPassView(!passView);
                    }}
                    src={`${
                      passView
                        ? "https://img.icons8.com/ios-filled/50/000000/visible--v2.png"
                        : "https://img.icons8.com/ios/50/000000/closed-eye.png"
                    }`}
                    alt="user"
                    className="w-8 fill-current p-1"
                  />
                </div>
              </div>
            </div>
            <div className="forgotpass">
              <div className="remember-me">
                <label>
                  {" "}
                  <input
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    checked={user?.radio}
                    className="mr-2 h-4 w-4"
                    type="checkbox"
                    name="radio"
                  />
                  Remember me
                </label>
              </div>
            </div>
            <div className="my-4">
              {submit ? (
                <Button />
              ) : (
                <div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
                    // type="submit"
                  >
                    Login
                  </button>
                  {/* {!window.navigator.onLine && (
                    <span className="mt-2 flex flex-col text-sm">
                      <span className="text-red-600">Error!</span> Please check
                      your network connection
                    </span>
                  )} */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
