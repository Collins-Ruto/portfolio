"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Loader } from "~/components";
import Image from "next/image";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import type { Stream, Student, User } from "@prisma/client";

function Students() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | undefined>();
  const [isDelete, setisDelete] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [delStudent, setDelStudent] = useState("");
  const [search, setSearch] = useState<string>("");
  const [pagesCount, setPagesCount] = useState(0);
  const [pages, setPages] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [students, setStudents] = useState<
    (Student & { stream: Stream })[] | undefined
  >();

  const { data, isLoading, error } = api.student.getAll.useQuery(pagesCount);
  const { data: count } = api.student.count.useQuery();
  useEffect(() => {
    const user = session?.user as User;
    setUser(user);
    if (data) {
      setStudents(data);
    }

    if (count) {
      if (count - 10 > pagesCount) {
        setPages((pages) => {
          return { ...pages, hasNextPage: true };
        });
      } else {
        setPages((pages) => {
          return { ...pages, hasNextPage: false };
        });
      }
      if (pagesCount + 10 > count) {
        setPages((pages) => {
          return { ...pages, hasPreviousPage: true };
        });
      } else {
        setPages((pages) => {
          return { ...pages, hasPreviousPage: false };
        });
      }
    }
  }, [data, session, count, pagesCount]);

  if (error) {
    console.log(error);
  }

  console.log("del Stdt", delStudent);
  console.log("count Stdt", pagesCount);

  const deleteMutation = api.student.delete.useMutation();

  const deleteStudent = () => {
    try {
      deleteMutation.mutate(delStudent);
      setisDelete(false);

      const newStudent: (Student & { stream: Stream })[] | undefined =
        students?.filter((student) => student.slug !== delStudent);
      setStudents(newStudent);
    } catch (error) {
      console.log(error);
    }
  };

  const searchStudents = api.student.search.useQuery(search);

  const searchSubmit = () => {
    console.log("search std", search);
    const { data } = searchStudents;
    console.log("search data std", data);
    setStudents(data);
    setSubmit(false);
  };

  console.log("students", students);
  console.log("pages", pages);

  const ConfirmDel = () => {
    return (
      <div className="absolute w-full">
        <div
          className="fixed right-0 h-full w-[100%] bg-[#979799] p-4 opacity-40 bg-blend-darken lg:w-screen"
          onClick={() => {
            setisDelete(!isDelete);
          }}
        ></div>
        <div
          className="
                fixed left-[45%] flex h-screen flex-col pt-[10%] opacity-100 bg-blend-darken "
        >
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 text-center md:relative md:mx-auto md:max-w-md">
            <Image
              width={100}
              height={100}
              onClick={() => {
                setisDelete(false);
              }}
              className="absolute right-2 top-2 w-8 cursor-pointer rounded p-1 hover:bg-gray-200"
              src="https://img.icons8.com/color/48/000000/delete-sign--v1.png"
              alt=""
            />
            <div className="items-center md:flex md:flex-col">
              <div className="mt-4 text-center md:mt-0 md:ml-6 ">
                <p className="text-xl font-bold">Confirm student deletion</p>
                <p className="my-2 text-base text-gray-600">
                  Are you sure you want to delete this student from the school
                  platform?
                </p>
              </div>
              <div className="rounded-xl bg-[#F7F6FB] p-2 text-start text-orange-500">
                <div className="flex text-orange-600">
                  <Image
                    width={100}
                    height={100}
                    className="mr-1 w-6"
                    src="https://img.icons8.com/ios-glyphs/30/EE640C/error--v2.png"
                    alt=""
                  />
                  Warning
                </div>
                By deleting this student all associated data will also be
                permanently deleted.
              </div>
            </div>
            <div className="mt-4 flex justify-around text-center text-white md:flex md:px-8">
              <button
                onClick={() => {
                  setisDelete(false);
                }}
                className="mt-4 block w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold hover:bg-gray-400 md:mt-0 md:w-auto"
              >
                Cancel
              </button>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={() => {
                    deleteStudent();
                    setSubmit(true);
                  }}
                  className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 hover:text-white md:w-auto md:py-2 "
                >
                  Yes, confirm delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  console.log("students", students);
  return (
    <div>
      <div className="w-screen md:w-full">
        {isDelete && <ConfirmDel />}
        <div className="px-4 pt-4 text-2xl font-semibold">
          <h3>Students</h3>
        </div>
        {isLoading && <Loader />}
        <div>
          <div>
            <div className="flex flex-col justify-end gap-4 p-4 md:flex-row">
              <div className="">
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  name="name"
                  type="text"
                  className="focus:shadow-outline w-full appearance-none rounded border-[1px] bg-[#F7F6FB] py-2 px-3 leading-tight text-gray-800 shadow focus:outline-none"
                  placeholder="Search ID, name, username ..."
                />
              </div>
              <div className="flex justify-between gap-4">
                <div>
                  {submit ? (
                    <Button />
                  ) : (
                    <button
                      onClick={() => {
                        searchSubmit();
                        // setSubmit(true);
                      }}
                      type="button"
                      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      Search
                    </button>
                  )}
                </div>
                {user?.role === "admin" && (
                  <div>
                    <Link
                      href="/admin/addstudent"
                      type="button"
                      className="flex w-fit items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    >
                      {" "}
                      <Image
                        width={100}
                        height={100}
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                        className="mr-1 w-5 text-white"
                        alt=""
                      />
                      Add
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
              <table className=" w-full overflow-scroll text-justify">
                <thead>
                  <tr>
                    <th className="p-4">ADM</th>
                    <th className="p-4">username</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Stream</th>
                    <th className="p-4">DOB</th>
                    <th className="p-4">Guardian Name</th>
                    <th className="p-4">Mobile Number</th>
                    <th className="p-4">Gender</th>
                    {user?.role === "admin" && <th className="p-4">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, index) => (
                    <tr
                      className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                      key={index}
                    >
                      <td className="p-4">{student.admissionId}</td>
                      <td className="p-4">{student.slug}</td>
                      <td className="p-4">
                        <h2 className="table-avatar">
                          <a href="student-details.html">{student.name}</a>
                        </h2>
                      </td>
                      <td className="p-4">{student?.stream?.name}</td>
                      <td className="p-4">{student.dateOfBirth}</td>
                      <td className="p-4">{student.parent}</td>
                      <td className="p-4">{student.phone}</td>
                      <td className="p-4">{student.gender}</td>
                      {user?.role === "admin" && (
                        <td className="flex gap-2 p-4">
                          <Link href="/admin/addstudent">
                            <Image
                              width={100}
                              height={100}
                              src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-edit-interface-kiranshastry-solid-kiranshastry.png"
                              alt=""
                              className="w-6 cursor-pointer"
                            />
                          </Link>
                          <div
                            onClick={() => {
                              setisDelete(true);
                              setDelStudent(student.slug);
                            }}
                          >
                            <Image
                              width={100}
                              height={100}
                              src="https://img.icons8.com/ios-filled/50/000000/waste.png"
                              alt=""
                              className="w-6 cursor-pointer"
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center pb-10 align-middle md:pb-8">
              <div
                onClick={() => {
                  setPagesCount(pagesCount - 10);
                  // pages.hasPreviousPage && changePage("before");
                }}
                className={` ${
                  pages.hasPreviousPage
                    ? "cursor-pointer bg-slate-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                    : "bg-gray-300 text-gray-800"
                }  mr-3 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium `}
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Previous
              </div>
              <div
                onClick={() => {
                  setPagesCount(pagesCount + 10);
                  // pages.hasNextPage && changePage("after");
                }}
                className={` ${
                  pages.hasNextPage
                    ? "cursor-pointer bg-slate-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                    : "bg-gray-300 text-gray-800"
                }  mr-3 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium `}
              >
                Next
                <svg
                  aria-hidden="true"
                  className="ml-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
