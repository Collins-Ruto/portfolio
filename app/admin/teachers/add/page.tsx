"use client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";
import { api } from "@/utils/api";
import { type Teacher } from "@prisma/client";

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

interface IndexedInput extends Teacher {
  [key: string]: string | Date;
}

function AddTeacher() {
  const [teacher, setTeacher] = useState<Teacher | undefined>();
  const [confPass, setConfPass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setTeacher((prevTeacher: Teacher | undefined) => {
      if (!prevTeacher) {
        return { [name]: value } as unknown as Teacher; // or some default value if you have one
      }

      const updatedTeacher = {
        ...prevTeacher,
        [name]: value,
      };

      return updatedTeacher;
    });
  };

  const inputValidate = (action: string) => {
    const fields = [
      "name",
      "gender",
      "dateOfBirth",
      "email",
      "phone",
      "joiningDate",
      "qualification",
      "slug",
      "password",
    ];
    const input = teacher as IndexedInput;
    let message = "Please fill: ";
    if (action === "clear") {
      setTeacher(() => {
        let newInput = {} as unknown as Teacher;
        fields.forEach((field) => {
          newInput = { ...newInput, [field]: "" };
        });
        return newInput;
      });
    }
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

  const addTeacherMutation = api.teacher.addTeacher.useMutation();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputValidate("") === false) {
      return;
    }
    setSubmit(true);
    try {
      addTeacherMutation.mutate(teacher as Teacher, {
        onSuccess: () => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${teacher?.name ?? ""} as a ${
              teacher?.qualification ?? ""
            } teacher`,
          });
          setTimeout(() => {
            inputValidate("clear");
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
        <h3>Add Teachers</h3>
      </div>

      <form>
        <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
          <div>
            <h5 className="pb-4 text-xl">
              Teacher Information{" "}
              <span>
                <a href="javascript">
                  <i className="feather-more-vertical"></i>
                </a>
              </span>
            </h5>
          </div>
          <div className="flex grid-cols-3 flex-col gap-4 pb-4 md:grid md:gap-y-8">
            <div>
              <label>
                Full Names <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={teacher?.name}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Full Names"
                name="name"
              />
            </div>

            <div className="relative inline-block items-center">
              <label>
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex cursor-pointer items-center">
                <select
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  name="gender"
                  value={teacher?.gender}
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                >
                  <option>Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Others</option>
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
            <div className=" calendar-icon">
              <label>
                Date Of Birth <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={teacher?.dateOfBirth}
                className="focus:shadow-outline datetimepicker w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="DD-MM-YYYY"
                name="dateOfBirth"
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
                value={teacher?.email}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. example@gmail.com"
                name="email"
              />
            </div>
            <div>
              <label>Phone </label>
              <input
                onInput={(e) => {
                  handleInput(e);
                }}
                value={teacher?.phone}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. 722123456"
                name="phone"
              />
            </div>
            <div className=" calendar-icon">
              <label>
                Joining Date <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={teacher?.joiningDate}
                className="focus:shadow-outline datetimepicker w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="DD-MM-YYYY"
                name="joiningDate"
              />
            </div>
            <div>
              <label>Qualification </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={teacher?.qualification}
                type="text"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="eg. Geography & History"
                name="qualification"
              />
            </div>
          </div>
        </div>
        <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
          <div className="col-12">
            <h5 className="py-4 text-xl">
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
                value={teacher?.slug?.toLowerCase()}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. 562jane"
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
                value={teacher?.password}
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
              {confPass && confPass !== teacher?.password && (
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
          <div className=" mt-2">
            {submit ? (
              <Button />
            ) : (
              <button
                onClick={(e) => handleSubmit(e)}
                // type="submit"
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

export default AddTeacher;
