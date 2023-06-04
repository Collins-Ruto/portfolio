// Generate segments for [product] using the `params` passed from
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import type { Metadata } from "next";
import type { Task, Stream, Teacher } from "@prisma/client";
import TaskDownload from "~/components/TaskDownload";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const data = await caller.task.getById(id || "621dd16f2eece6ce9587cb0d");
  const task = data[0] as Task;

  return {
    title: task.name,

    authors: [
      {
        name: "Collins Ruto",
        url: "https://collinsruto.netlify.app/",
      },
    ],
    keywords: ["learnhq", task.subject.name, task.name],
    twitter: { creator: "@ruto_collins_" },
  };
}

// the parent segment's `generateStaticParams` function
export default async function Task({
  params: { id },
}: {
  params: { id: string };
}) {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const data = await caller.task.getById(id || "621dd16f2eece6ce9587cb0d");
  const task = data[0] as Task & { stream: Stream; teacher: Teacher };
  console.log("course", data);

  return (
    <div className="w-screen p-4 md:w-full">
      <div className="mb-4 text-2xl font-semibold">
        <h3>Your Task</h3>
      </div>
      <div className="mx-auto ">
        <div className="text-blue-500">
          {task?.subject.name} / by {task?.teacher.name}
        </div>
        <div className="text-bold py-2 text-4xl text-orange-800">
          {task?.name}
        </div>
        <div className="mb-2 rounded-md bg-[#F7F6FB] p-4">
          <div className="py-4">
            <span className="rounded-3xl bg-gray-300 px-2 py-1">
              <span className="bold text-sm">To do: </span>
              <span className="text-xs">make a submission</span>
            </span>
          </div>
          <div className="flex flex-col border-y py-4">
            <span className="">
              <span className="bold text-sm">Posted: </span>
              <span className="text-xs">
                Wednesday, 15 December 2022, 1:00 AM
              </span>
            </span>
            <span className="">
              <span className="bold text-sm">To do: </span>
              <span className="text-xs">Monday, 5 December 2022, 1:00 AM</span>
            </span>
          </div>

          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: task?.description ?? "" }}
          ></div>
        </div>
        {!(task?.secure_url === "") && <TaskDownload task={task} />}
      </div>
    </div>
  );
}
