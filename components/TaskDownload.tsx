'use client'
import type { Task } from '@prisma/client';
import React from 'react'

function TaskDownload({task}:{task: Task}) {
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
      <span className="mb-2">File: {task?.original_filename}</span>
      <div
        onClick={() => {
          task &&
            downloadURI(task.secure_url ?? "", task.original_filename ?? "");
        }}
        className="w-28 cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
      >
        download
      </div>
    </div>
  );
}

export default TaskDownload