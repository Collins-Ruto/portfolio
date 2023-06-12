"use client";
import { api } from "@/utils/api";
import type { Stream, Task, Teacher, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "~/components";

// 8797fredrick 736judy 4535brenda

function TeacherTask() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  // const [search, setSearch] = useState("");

  const { data, isLoading, error } = api.task?.getAllTeacher.useQuery(
    (user?.id as string) || "621dd16f2eece6ce9587cb0d"
  );

  const tasks: (Task & { stream: Stream; teacher: Teacher })[] | undefined =
    data;

  useEffect(() => {
    const user = session?.user as User;
    setUser(user);
  }, [session]);

  if (error) {
    console.log(error);
  }

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-screen md:w-full md:pb-8">
      <div className="p-4 text-2xl font-semibold">Your Tasks</div>
      {isLoading && <Loader />}
      <div className="">
        <div className="flex flex-col justify-end gap-4 px-4 md:flex-row">
          {/* <div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              name="name"
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border bg-[#F7F6FB] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Search by Name ..."
            />
          </div> */}

          <div className="order-last flex justify-between gap-4">
            {/* {submit ? (
              <Button />
            ) : (
              <button
                onClick={() => {
                  // searchSubmit();
                  setSubmit(true);
                }}
                type="button"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Search
              </button>
            )} */}
            <div>
              <Link
                href="/teacher/tasks/addtask"
                type="button"
                className="order-last flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                {" "}
                <Image
                  width={100}
                  height={100}
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                  className="mr-1 w-5"
                  alt=""
                />
                Add
              </Link>
            </div>
          </div>
        </div>
        <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
          <table className=" w-full overflow-scroll text-justify">
            <thead>
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">File</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr
                  className={` cursor-pointer p-4 ${
                    index % 2 === 0 ? "bg-white" : ""
                  }`}
                  key={index}
                  onClick={() =>
                    void router.push(`/teacher/tasks/task/${task?.id ?? ""}`)
                  }
                >
                  <td className="p-4">{task.name}</td>
                  <td className="p-4">{task.original_filename}</td>
                  <td className="p-4">{task.subject.name}</td>
                  <td className="p-4">{task.teacher.name}</td>
                  <td className="p-4">{task.due}</td>
                  <td className="flex gap-2 p-4">
                    {task.file !== "" && (
                      <div
                        onClick={() => {
                          task &&
                            downloadURI(
                              task.secure_url ?? "",
                              task.original_filename ?? ""
                            );
                        }}
                        className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        download
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherTask;
