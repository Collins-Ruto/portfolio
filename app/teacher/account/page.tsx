"use client";
import React, { useEffect, useState } from "react";
import { Button, Loader } from "~/components";
import StatusMsg from "~/components/StatusMsg";
import Image from "next/image";
import { api } from "@/utils/api";
import type { User, Teacher } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

function Account() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>();
  const [teacher, setTeacher] = useState<Teacher>();
  const [editUser, setEditUser] = useState<Teacher>(teacher as Teacher);
  const [passManager, setPassManager] = useState(false);
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [validInput, setValidInput] = useState<boolean>(true);
  const [oldPassword, setOldPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const { data, isLoading, error } = api.teacher.getById.useQuery(
    user?.id || "621dd16f2eece6ce9587cb0d"
  );

  const passwordVerify = api.teacher.passwordVerify.useQuery({
    password: oldPassword,
    id: user?.id || "621dd16f2eece6ce9587cb0d",
  });

  useEffect(() => {
    const user = session?.user as User;
    setUser(user);
    console.log("teach data", data);
    if (data) {
      setEditUser(data);
      setTeacher(data);
    }
  }, [data, session]);

  if (error) {
    console.log(error);
  }

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    if (name === "password") {
      setPassword(value)
    }

    setEditUser((prevEditUser) => {
      return {
        ...prevEditUser,
        id: user?.id || "",
        [name]: value,
      };
    });
  };

  console.log("tech user edt",editUser);
  console.log("techer",teacher);

  const editPasswordMutation = api.teacher.editPassword.useMutation();
  const editInfoMutation = api.teacher.editInfo.useMutation();

  const handleSubmit = () => {
    if (confPass !== "") {
      if (!handleVerify()) {
        return;
      }
    }
    setSubmit(true);

    try {
      console.log("edit teacher", editUser);
      confPass === ""
        ? editInfoMutation.mutate(editUser)
        : editPasswordMutation.mutate(editUser);

      setSubmit(false);
      console.log("add editUser data", data);
      setStatus({
        type: "success",
        message: `${editUser?.name ?? "User"} update is succesfull`,
      });
      setTimeout(() => {
        // window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  const handleVerify = () => {
    const { data } = passwordVerify;
    setValidInput(data || false);
    console.log(data);
    return data;
  };

  console.log(editUser);

  return (
    <div>
      {<StatusMsg status={status} />}
      {isLoading && <Loader />}
      <div className="flex  flex-col gap-4">
        <div className="h-60 w-full bg-[url('https://b1311116.smushcdn.com/1311116/wp-content/uploads/2021/12/great-school-website-01.png?size=912x479&lossy=1&strip=1&webp=1')] bg-cover bg-center">
          <div className="flex h-full min-w-full items-center justify-center text-2xl font-semibold text-white backdrop-brightness-50">
            Welcome to your account page
          </div>
        </div>
        <div className="relative flex flex-col">
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#F7F6FB] pb-6 md:absolute md:-top-16 md:ml-10 md:w-[25%] md:py-6">
            <Image
              width={100}
              height={100}
              className="w-28  rounded-full bg-gray-300 p-2"
              src="https://img.icons8.com/ios-glyphs/120/000000/user--v1.png"
              alt=""
            />
            <div className="pb-4 pt-2 text-blue-600">{user?.role}</div>
            <div className="flex flex-col gap-2 p-2 text-start text-slate-800">
              <div className="p-1">Name: {user?.name} </div>
              <div className="p-1">Phone: {user?.phone} </div>
              <div className="p-1">Email: {user?.email} </div>
            </div>
            <div
              onClick={() => {
                void signOut();
              }}
              className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
            >
              Log Out
            </div>
          </div>
          <div className="-top-16 grow rounded-lg bg-[#F7F6FB] md:ml-[30%] md:w-[68%]">
            <div className=" flex justify-around border-b-2 p-2 text-lg">
              <div
                className={` cursor-pointer ${
                  !passManager ? " border-b-4 border-blue-600" : ""
                }`}
                onClick={() => {
                  setPassManager(false);
                }}
              >
                Edit Details
              </div>
              <div
                className={` cursor-pointer ${
                  passManager ? " border-b-4 border-blue-600" : ""
                }`}
                onClick={() => {
                  setPassManager(true);
                }}
              >
                Password Manager
              </div>
            </div>
            {passManager && (
              <div className="p-4">
                <h1 className="mx-auto py-4 text-center text-xl">
                  Change your Password
                </h1>
                <div>
                  <div className="mx-auto flex w-80 flex-col  pb-4">
                    <div className="flex flex-col gap-4 gap-y-8">
                      <div className="col-12 col-sm-4">
                        <div>
                          <label>
                            Old Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                              setValidInput(true);
                            }}
                            value={oldPassword}
                            name="oldPassword"
                            type="password"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Enter Old Password"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div>
                          <label>
                            New Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            onChange={(e) => {
                              handleInput(e);
                            }}
                            value={editUser?.password}
                            name="password"
                            type="password"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Enter New Password"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Repeat Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            onChange={(e) => {
                              setConfPass(e.target.value);
                            }}
                            value={confPass}
                            name="password"
                            type="password"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Confirm Password"
                            required
                          />
                          {confPass && confPass !== editUser?.password && (
                            <div className="text-xs text-red-500">
                              new passwords do not match
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="my-2">
                      <div className="opacity80 rounded text-sm text-red-500">
                        <span className="">
                          {validInput ? "" : "Incorrect password, try again"}
                        </span>
                        <span className="text-transparent">.</span>
                      </div>
                    </div>
                    <div>
                      {submit ? (
                        <Button />
                      ) : (
                        <button
                          onClick={() => handleSubmit()}
                          type="submit"
                          className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!passManager && (
              <div className="p-4">
                <h1 className="mx-auto py-4 text-center text-xl">
                  Update your Details
                </h1>
                <div className="mx-auto flex w-80 flex-col gap-4 gap-y-8 pb-4">
                  <div>
                    <div>
                      <label>
                        E-Mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={editUser?.email}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Phone </label>
                      <input
                        onInput={(e) => {
                          handleInput(e);
                        }}
                        value={editUser?.phone}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Phone Number"
                        name="phone"
                      />
                    </div>
                  </div>
                  <div>
                    {submit ? (
                      <Button />
                    ) : (
                      <button
                        onClick={() => handleSubmit()}
                        type="submit"
                        className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
