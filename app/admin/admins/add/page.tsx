'use client'
import { api } from "@/utils/api";
import { type Admin } from "@prisma/client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";

// eslint-disable-next-line no-unused-vars
// const dum2 = {
//   name: "Isaac Mayers",
//   tid: "4564",
//   gender: "Male",
//   dob: "23-05-2002",
//   email: "isaac@gmail.com",
//   phone: 213124124,
//   jod: "12-04-2023",
//   quali: "Physics & Geography",
//   slug: "123isaac",
//   password: "123isaac",
// };

interface IndexedInput extends Admin {
  [key: string]: any;
}

function AddAdmin() {
  const [admin, setAdmin] = useState<Admin | undefined>();
  const [confPass, setConfPass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

 const handleInput = (event: React.SyntheticEvent) => {
   const target = event.target as HTMLInputElement;
   const value = target.value;
   const name = target.name;

   setAdmin((prevAdmin: Admin | undefined) => {
     if (!prevAdmin) {
       return undefined; // or some default value if you have one
     }

     const updatedAdmin = {
       ...prevAdmin,
       [name]: value,
     };

     return updatedAdmin;
   });
 };
  
  const inputValidate = () => {
    const fields = [
    "name",
    "slug",
    "email",
    "password",
    "phone",
    ];
    const input = admin as IndexedInput;
    let message = "Please fill: ";
    fields.forEach((field) => {
      if (input?.[field] === "" || input?.[field] === undefined) {
        message += `${field}, `;
        setValidInput(message);
      }
    });
    if (message === "Please fill: ") {
      return true;
    } else {
      return false;
    }
  };

  const addAdminMutation = api.admin.addAdmin.useMutation();

  const handleSubmit = () => {
    if (inputValidate() === false) {
      return;
    }
    setSubmit(true);
    try {
      addAdminMutation.mutate(admin as Admin, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${admin?.name ?? ""} as  admin`,
          });
          setTimeout(() => {
            res && window.location.reload();
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  const handleVerify = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setConfPass(target.value);
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add admins</h3>
      </div>

      <form>
        <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
          <div>
            <h5 className="pb-4 text-xl">
              admin Information{" "}
              <span>
                <a href="javascript">
                  <i className="feather-more-vertical"></i>
                </a>
              </span>
            </h5>
          </div>
          <div className="flex max-w-[52rem] grid-cols-2 flex-col gap-4 pb-4 md:grid md:gap-y-8">
            <div>
              <label>
                Full Names <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin?.name}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Full Names"
                name="name"
              />
            </div>

            <div>
              <label>
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin?.email}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Email Address"
                name="email"
              />
            </div>
            <div>
              <label>Phone </label>
              <input
                onInput={(e) => {
                  handleInput(e);
                }}
                value={admin?.phone}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="number"
                placeholder="Enter Phone Number"
                name="phone"
              />
            </div>
          </div>
        </div>
        <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
          <div className="col-12">
            <h5 className="pb-4 text-xl">
              <span>Login Details</span>
            </h5>
          </div>
          <div className="flex grid-cols-3 flex-col gap-4 pb-4 md:grid md:gap-y-8">
            <div>
              <label>Username </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin?.slug?.toLowerCase()}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Username"
                name="slug"
              />
            </div>
            <div className="form-group local-forms">
              <label>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin?.password}
                name="password"
                type="password"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group local-forms">
              <label>
                Repeat Password <span className="text-red-500">*</span>
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
              />
              {confPass && confPass !== admin?.password && (
                <div className="text-xs text-red-500">
                  passwords do not match
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <div className="opacity80 rounded text-xs text-red-500">
              <span className="">{validInput}</span>
              <span className="text-transparent">.</span>
            </div>
          </div>
          <div className=" mt-4">
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
      </form>
    </div>
  );
}

export default AddAdmin;
