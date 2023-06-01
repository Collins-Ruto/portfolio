"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components";
import StatusMsg from "~/components/StatusMsg";
import Image from "next/image";
import { api } from "@/utils/api";
import type { User, Teacher } from "@prisma/client";
import { useSession } from "next-auth/react";

function Account() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>();
  const [editUser, setEditUser] = useState<Teacher>();
  const [passManager, setPassManager] = useState(false);
  const [confPass, setConfPass] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    const user = session?.user as User;
    setUser(user);
  }, [session]);

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number"
        ? Number(target.value).toFixed(
            Math.max(target?.value.split(".")[1]?.length ?? 0, 2) || 2
          )
        : target.value;
    const name = target.name;

    setEditUser((prevEditUser) => {
      if (!prevEditUser) {
        return undefined;
      }

      return {
        ...prevEditUser,
        [name]: value,
      };
    });
  };

  const editTeacherMutation = api.teacher.editTeacher.useMutation();

  const handleSubmit = () => {
    setSubmit(true);

    try {
      console.log("edit teacher", editUser);
      const data = editTeacherMutation.mutate(editUser as Teacher);

      setSubmit(false);
      console.log("add editUser data", data);
      setStatus({
        type: "success",
        message: `${editUser?.name ?? "User"} update is succesfull`,
      });
      setTimeout(() => {
        // data.message === "success" && window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  // const handleSubmit = (inputType) => {
  //   setSubmit(true);
  //   axios
  //     .post(`https://lmsteacher.onrender.com/${user.type}s/${inputType}`, {
  //       slug: user.slug,
  //       data: editUser,
  //     })
  //     .then((res) => {
  //       setSubmit(false);
  //       console.log("res", res.data.message);
  //       res.data.message === "success" && setConfPass("");
  //       setEditUser({
  //         password: "",
  //         oldPassword: "",
  //       });
  //       console.log(res.data);
  //       setStatus(
  //         res.data.message === "success"
  //           ? {
  //               type: "success",
  //               message: `succesfully updated your credidentials`,
  //             }
  //           : { type: "error", message: res.data.message }
  //       );
  //       setTimeout(() => {
  //         res.data.message === "success" && window.location.reload(true);
  //       }, 2000);
  //     });
  // };

  const logOut = () => {
    localStorage.setItem("saved", JSON.stringify(false));
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleVerify = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setConfPass(target.value);
  };

  console.log(editUser);

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="flex h-[100vh_-_4rem] flex-col gap-4">
        <div className="h-60 w-full bg-[url('https://b1311116.smushcdn.com/1311116/wp-content/uploads/2021/12/great-school-website-01.png?size=912x479&lossy=1&strip=1&webp=1')] bg-cover bg-center">
          <div className="flex h-full min-w-full items-center justify-center text-2xl font-semibold text-white backdrop-brightness-50">
            Welcome to your account page
          </div>
        </div>
        <div className="relative flex flex-col">
          <div className="flex h-[max-content] flex-col items-center justify-center rounded-lg bg-[#F7F6FB] pb-6 md:absolute md:-top-16 md:ml-10 md:w-[25%] md:py-6">
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
                logOut();
              }}
              className="rounded bg-blue-500 px-10 py-2 font-bold text-white hover:bg-blue-700"
            >
              Log Out
            </div>
          </div>
          <div className="-top-16 grow rounded-lg bg-[#F7F6FB] md:absolute md:ml-[30%] md:w-[68%]">
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
                  <div className="mx-auto flex w-80 flex-col gap-4 gap-y-8 pb-4">
                    <div className="col-12 col-sm-4">
                      <div>
                        <label>
                          Old Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={(e) => {
                            setOldPassword(e.target.value);
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
                            handleVerify(e);
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
                            passwords do not match
                          </div>
                        )}
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
                        type="number"
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
