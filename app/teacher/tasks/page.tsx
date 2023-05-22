"use client";
import React, { useState } from "react";
import { Button, StatusMsg } from "~/components";
import type { Task } from "@prisma/client";
import { api } from "@/utils/api";

type Status = {
  type: string;
  message: string;
};

function CreateTask() {
  const [task, setTask] = useState<Task>();
  const [file, setFile] = useState<File>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState<Status>();

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setTask((prevTask: Task | undefined) => {
      if (!prevTask) {
        return undefined; // or some default value if you have one
      }

      const updatedTask = {
        ...prevTask,
        [name]: value,
      };

      return updatedTask;
    });
  };

  const handleFileInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files !== null ? target?.files[0] : undefined;

    setFile(file);
  };

  const addTaskMutation = api.task.addTask.useMutation();

  async function handleSubmit() {
    const formdata = new FormData();

    formdata.append("file", file as Blob);
    formdata.append("cloud_name", "dhlbhtrym");
    formdata.append("upload_preset", "learnhqdoc");

    console.log("formdata", formdata);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhlbhtrym/auto/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata,
      }
    );

    const json = (await res.json()) as Task;
    console.log(json);
    console.log(JSON.stringify(json.secure_url));

    const updatedTask = {
      ...task,
      asset_id: json.asset_id,
      file: json.file,
      original_filename: json.original_filename,
      secure_url: json.secure_url,
    };

    try {
      addTaskMutation.mutate(updatedTask as Task, {
        onSuccess: (res) => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${
              updatedTask?.name ?? ""
            } as a student`,
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

    //   const res = await axios.post("http://localhost:8000/infos/addasset", formData);
    //   console.log(res)

    //   const taskData = {...task, fileId: res.data.id}

    //   const resTask = await axios.post("http://localhost:8000/infos/addtask", taskData);
    //   setSubmit(false);
    //   // setStatus(
    //   //   res.data.message === "success"
    //   //     ? {
    //   //         type: "success",
    //   //         message: `succesfully Created a ${res.data.subject.name} lesson for ${res.data.stream.name} on ${res.data.day}`,
    //   //       }
    //   //     : { type: "error", message: res.data.message }
    //   // );
    //   // setTimeout(() => {
    //   //   res.data.message === "success" && window.location.reload(true);
    //   // }, 2000);
  }

  console.log(task);

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 text-2xl font-semibold md:p-4">
        <h3>Add Tasks</h3>
      </div>
      <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
        <form>
          <div className="flex grid-cols-3 flex-col gap-2 gap-y-4 md:grid md:gap-y-8">
            <div>
              <div>
                <label>
                  Task title <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={task?.name}
                  className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  placeholder="eg. Assignmets 1"
                  name="name"
                />
              </div>
            </div>
            <div>
              <div>
                <label>
                  Subject ID <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={task?.subject.slug}
                  className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  placeholder="eg. geo"
                  name="subjectId"
                />
              </div>
            </div>
            <div>
              <div>
                <label>Stream ID </label>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={task?.streamId}
                  className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  placeholder="eg. 1n"
                  name="streamId"
                />
              </div>
            </div>
            <div>
              <label>
                Teacher Username <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={task?.teacherId}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. 456erick"
                name="teacherId"
              />
            </div>
            <div>
              <label>Task Description & rules</label>
              <textarea
                onChange={(e) => {
                  handleInput(e);
                }}
                value={task?.description}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="eg. assignments 1"
                name="description"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block font-medium" htmlFor="file_input">
              Upload file
            </label>
            <input
              onChange={(e) => {
                handleFileInput(e);
              }}
              className="block w-fit cursor-pointer rounded bg-gray-500 text-lg leading-loose text-gray-900 focus:outline-none"
              type="file"
              name="file"
              id="file_input"
            />
            <p className="mt-1 text-sm text-gray-600" id="file_input_help">
              SVG, PNG, JPG or Any Document Type.
            </p>
          </div>

          <div className=" mt-4">
            <div>
              {submit ? (
                <Button />
              ) : (
                <div
                  onClick={() => void handleSubmit()}
                  className="w-fit rounded bg-blue-500 py-2 px-10 font-bold text-white hover:bg-blue-700"
                >
                  Submit
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
