"use client";
import { api } from "@/utils/api";
import type { Task, Teacher } from "@prisma/client";
import { useRouter } from "next/navigation";
// import React, { useState } from "react";
import { Loader } from "~/components";

function Tasks() {
  const router = useRouter();

  const { data, isLoading, error } = api.task?.getAll.useQuery();

  const tasks: (Task & { teacher: Teacher })[] | undefined =
    data;

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
      {isLoading && <Loader />}
      <div className="">
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
                  className={`cursor-pointer p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                  key={index}
                  onClick={() =>
                    void router.push(`/learn/tasks/task/${task?.id ?? ""}`)
                  }
                >
                  <td className="p-4">{task.name}</td>
                  <td className="p-4">{task.original_filename}</td>
                  <td className="p-4">{task.subject.name}</td>
                  <td className="p-4">{task.teacher.name}</td>
                  <td className="p-4">{task.due}</td>
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

export default Tasks;
