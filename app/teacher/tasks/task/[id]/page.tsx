// Generate segments for [product] using the `params` passed from
'use client'
import { api } from "@/utils/api";
import type { Task, Stream, Teacher } from "@prisma/client";

// the parent segment's `generateStaticParams` function
export default function Task({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading, error } = api.task?.getById.useQuery(
    (id) || "621dd16f2eece6ce9587cb0d"
  );

  const tasks: (Task & { stream: Stream; teacher: Teacher })[] | undefined =
      data;

  console.log("id task",tasks)
    
    const task = tasks?.[0]

    const downloadURI = (uri: string, name: string) => {
      const link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


    return (
      <div className="">
        <div className="w-96">
          
            <div className="text-blue-500">
              {task?.subject.name} / by {task?.teacher.name}
            </div>
            <div className="text-2xl">{task?.name}</div>
            <div className="">{task?.description}</div>
            <div
              onClick={() => {
                task && downloadURI(task.secure_url, task.original_filename);
              }}
              className="cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >
              download
            </div>
        </div>
      </div>
    );
}
