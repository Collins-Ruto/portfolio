"use client";
import { api } from "@/utils/api";
import { type Student } from "@prisma/client";
import React, { useState } from "react";
import { Button, Loader, StatusMsg } from "~/components";

// eslint-disable-next-line no-unused-vars
// const dum2 = {
//   name: "Cynthia Graham",
//   email: "cynthia@gmail.com",
//   gender: "Female",
//   parent: "George Graham",
//   admid: "19",
//   phone: 7122342729,
//   dob: "2-6-2002",
//   slug: "19cynthia",
//   stream_slug: "1e",
// };

interface IndexedInput extends Student {
  [key: string]: any;
}

function AddStudent() {
  const [student, setStudent] = useState<Student | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

  const { data: streams, isLoading } = api.stream.getAll.useQuery();

  const handleInput = (event: React.SyntheticEvent) => {
    setValidInput("");
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setStudent((prevStudent: Student | undefined) => {
      if (!prevStudent) {
        return { [name]: value } as unknown as Student; // or some default value if you have one
      }

      const updatedStudent = {
        ...prevStudent,
        [name]: value,
        password: "student"
      };

      return updatedStudent;
    });
  };

  const inputValidate = () => {
    const fields = [
      "dateOfBirth",
      "name",
      "slug",
      "email",
      "phone",
      "parent",
      "gender",
      "admissionId",
      "streamId",
    ];
    const input = student as IndexedInput;
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

  //http://localhost:8000
  const addStudentMutation = api.student.addStudent.useMutation();

  const handleSubmit = () => {
    if (inputValidate() === false) {
      return;
    }
    setSubmit(true);
    try {
      addStudentMutation.mutate(student as Student, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${student?.name ?? ""} as a student`,
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

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Students</h3>
      </div>
      {isLoading && <Loader />}
      <div className="row">
        <div className="col-sm-12">
          <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="pb-4 text-xl">
                    Student Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div className="flex grid-cols-3 flex-col gap-4 md:grid md:gap-y-8">
                  <div>
                    <div>
                      <label>
                        Full Names <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.name}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Full Names"
                        name="name"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Admission ID </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.admissionId}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="eg. 49"
                        name="admissionId"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>
                        Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.parent}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Guardian Name"
                        name="parent"
                      />
                    </div>
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
                        value={student?.gender}
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
                  <div>
                    <div className=" calendar-icon">
                      <label>
                        Date Of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.dateOfBirth}
                        className="focus:shadow-outline datetimepicker w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="date"
                        name="dateOfBirth"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Username </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.slug?.toLowerCase()}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="eg. 49mike"
                        name="slug"
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label>
                        E-Mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.email}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="eg. example@gmail.com"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="relative inline-block items-center">
                    <label>
                      Stream ID<span className="text-red-500">*</span>
                    </label>
                    <div className="flex cursor-pointer items-center">
                      <select
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={student?.streamId}
                        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                        name="streamId"
                      >
                        <option>Select Stream</option>
                        {streams?.map((stream, index) => {
                          return (
                            <option key={index} value={stream.slug}>
                              {stream.name}
                            </option>
                          );
                        })}
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

                  <div>
                    <div>
                      <label>Phone </label>
                      <input
                        onInput={(e) => {
                          handleInput(e);
                        }}
                        value={student?.phone}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="number"
                        placeholder="eg. 722123456"
                        name="phone"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group students-up-files">
                      <label>Upload Student Photo (150px X 150px)</label>
                      <div className="mt-2">
                        <label className="mx-auto inline-flex cursor-pointer items-center rounded border bg-gray-300 px-6 py-2 font-bold text-gray-800 hover:bg-gray-400">
                          Choose File
                          <input className="hidden" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="opacity80 rounded text-xs text-red-500">
                    <span className="">{validInput}</span>
                    <span className="text-transparent">.</span>
                  </div>
                </div>
                <div className=" my-2">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
