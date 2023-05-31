// Generate segments for [product] using the `params` passed from
// "use client";
import { api } from "@/utils/api";
import type { Task, Stream, Teacher } from "@prisma/client";
import { Loader } from "~/components";

import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

// the parent segment's `generateStaticParams` function
export default async function Task({ params: { id } }: { params: { id: string } }) {
  // const { data, isLoading, error } = api.task?.getById.useQuery(
  //   id || "621dd16f2eece6ce9587cb0d"
  // );

  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma
  });

  const data = await caller.task.getById(
    id || "621dd16f2eece6ce9587cb0d"
  );

  console.log("server task", data);

  console.log("task pars", id);

  // if (error) {
  //   console.log(error);
  // }

  const tasks: (Task & { stream: Stream; teacher: Teacher })[] | undefined =
    data;

  console.log("id task", tasks);

  const task = tasks?.[0];

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-screen p-4 md:w-full">
      <div className="mb-4 text-2xl font-semibold">
        <h3>Your Task</h3>
      </div>
      {/* {isLoading && <Loader />} */}
      <div className="mx-auto ">
        <div className="text-blue-500">
          {task?.subject.name} / by {task?.teacher.name}
        </div>
        <div className="text-bold py-2 text-4xl text-orange-800">
          {task?.name}
        </div>
        <div className="mb-2 rounded-md bg-[#F7F6FB] p-4">
          <div className="py-4">
            <span className="rounded-3xl bg-gray-300 py-1 px-2">
              <span className="bold text-sm">To do: </span>
              <span className="text-xs">review submissions</span>
            </span>
          </div>
          <div className="flex flex-col border-y py-4">
            <span className="">
              <span className="bold text-sm">Posted: </span>
              <span className="text-xs">{task?.posted}</span>
            </span>
            <span className="">
              <span className="bold text-sm">Due: </span>
              <span className="text-xs">{task?.due}</span>
            </span>
          </div>
          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: task?.description ?? "" }}
          ></div>
        </div>
        {task?.secure_url !== "" && (
          <div>
            <span className="mb-2">File: {task?.original_filename}</span>
            <div
              onClick={() => {
                task &&
                  downloadURI(
                    task.secure_url ?? "",
                    task.original_filename ?? ""
                  );
              }}
              className="w-28 cursor-pointer rounded bg-blue-500 py-2 px-4 text-center font-bold text-white hover:bg-blue-700"
            >
              download
            </div>
          </div>
        )}
        {/* <div className="">
          <h1 className="text-orange-600 text-3xl font-semibold">Submissions</h1>
          <div className="mb-2 rounded-md bg-[#F7F6FB] p-4"></div>
        </div> */}
      </div>
    </div>
  );
}
