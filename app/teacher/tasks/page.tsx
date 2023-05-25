"use client";
import { api } from "@/utils/api";
import type { Stream, Task, Teacher, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const dumt = [
  {
    name: "Refraction Assignmets",
    stream: "1n",
    teacher: "8797fredrick",
    subject: "bio",
    description: "some task for you",
    url: "",
  },
  {
    name: "Poetry Essay",
    stream: "1e",
    teacher: "8797fredrick",
    subject: "eng",
    description: "some task for you",
    url: "",
  },
  {
    name: "Rocks Assignmets",
    stream: "1s",
    teacher: "736judy",
    subject: "geo",
    description: "some task for you",
    url: "",
  },
];

function TeacherTask() {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();

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
    <div>
      <div className="p-4 text-2xl font-semibold">Your Tasks</div>
      <div className="">
        <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
          <table className=" w-full overflow-scroll text-justify">
            <thead>
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">File</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                  <tr
                    className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                    key={index}
                    onClick={() =>
                      void router.push(`/teacher/tasks/task/${task?.id ?? ""}`)
                    }
                  >
                    <td className="p-4">{task.name}</td>
                    <td className="p-4">{task.original_filename}</td>
                    <td className="p-4">{task.subject.name}</td>
                    <td className="p-4">{task.teacher.name}</td>
                    <td className="p-4">{task.description}</td>
                    <td className="flex gap-2 p-4">
                      <div
                        onClick={() => {
                          task &&
                            downloadURI(
                              task.secure_url ?? "",
                              task.original_filename ?? ""
                            );
                        }}
                        className="cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                      >
                        download
                      </div>
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
