"use client";
import React, { useState } from "react";
import { Button, Editor, Loader, StatusMsg } from "~/components";
import type { Subject, Task } from "@prisma/client";
import { api } from "@/utils/api";
import { Subjects } from "~/types/types";

interface IndexedTask extends Task {
  [key: string]: string | Date | Boolean | Subject;
}

function CreateTask() {
  const [task, setTask] = useState<Task | undefined>();
  const [file, setFile] = useState<File>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [validInput, setValidInput] = useState("");

  const { data: streams, isLoading } = api.stream.getAll.useQuery();

  const handleInput = (event: React.SyntheticEvent) => {
    setValidInput("");
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    setTask((prevTask) => {
      if (!prevTask) {
        if (target.name === "subject") {
          return {
            subject: {
              slug: value,
              name:
                Subjects.find((subject) => subject.slug === value)?.name || "",
            },
          } as unknown as Task;
        }
        return {
          [name]: value,
        } as unknown as Task; // or some default value if you have one
      }
      if (target.name === "subject") {
        return {
          ...prevTask,
          [name]: value,
          subject: {
            slug: value,
            name:
              Subjects.find((subject) => subject.slug === value)?.name || "",
          },
        };
      }

      const updatedTask = {
        ...prevTask,
        [name]: value,
        posted: new Date().toDateString(),
      };

      console.log(updatedTask);

      return updatedTask;
    });
  };

  const inputValidate = (action: string) => {
    const fields = [
      "name",
      "description",
      "due",
      "subject",
      "streamId",
      "teacherId",
    ];
    const inputTask = task as IndexedTask;
    let message = "Please fill: ";
    if (action === "clear") {
      setTask(() => {
        let newInput = {} as unknown as Task;
        fields.forEach((field) => {
          newInput = { ...newInput, [field]: "" };
        });
        return newInput;
      });
    }
    fields.forEach((field) => {
      if (inputTask?.[field] === "" || inputTask?.[field] === undefined) {
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

  const handleQuillChange = (content: string) => {
    const jsonContent: string = JSON.stringify(content);

    setTask((prevTask) => {
      if (!prevTask) {
        return {
          description: jsonContent,
        } as unknown as Task; // or some default value if you have one
      }
      const updatedTask = {
        ...prevTask,
        description: jsonContent,
      };

      console.log(updatedTask);

      return updatedTask;
    });
  };

  const handleFileInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files !== null ? target?.files[0] : undefined;

    setFile(file);
  };

  console.log("task", task);

  const addTaskMutation = api.task.addTask.useMutation();

  console.log("file", file);

  const fileSubmit = async (): Promise<Task> => {
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
      asset_id: json.asset_id ?? "",
      file: json.original_filename ?? "",
      original_filename: json.original_filename ?? "",
      secure_url: json.secure_url ?? "",
    } as Task;

    return updatedTask;
  };

  async function handleSubmit() {
    if (inputValidate("") === false) {
      return;
    }
    setSubmit(true);

    const newTask = {
      ...task,
      asset_id: "",
      file: "",
      original_filename: "",
      secure_url: "",
    } as Task;

    const fileTask = file ? await fileSubmit() : newTask;

    console.log("fileTask task", fileTask);
    console.log("new task", newTask);

    try {
      addTaskMutation.mutate(fileTask, {
        onSuccess: () => {
          setSubmit(false);
          setStatus({
            type: "success",
            message: `succesfully added ${fileTask?.name ?? ""} as a task`,
          });
          setTimeout(() => {
            inputValidate("clear");
          }, 2000);
        },
      });
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  }

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 text-2xl font-semibold md:p-4">
        <h3>Add Tasks</h3>
      </div>
      {isLoading && <Loader />}
      <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
        <form>
          <div className="flex grid-cols-3 flex-col gap-2 gap-y-4 md:grid md:gap-y-8">
            <div>
              <div>
                <label>
                  Task Name <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={task?.name}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                  value={task?.subject?.slug}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  placeholder="eg. geo"
                  name="subject"
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
                  value={task?.streamId}
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
              <label>
                Teacher Username <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={task?.teacherId}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="eg. 456erick"
                name="teacherId"
              />
            </div>
            <div>
              <label>
                Due <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={task?.due}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="date"
                name="due"
              />
            </div>
          </div>
          <div className="py-4 md:pt-8">
            <label>
              Task Description <span className="text-red-500">*</span>
            </label>
            <Editor handleQuillChange={handleQuillChange} />
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
          <div className="mt-2">
            <div className="opacity80 rounded text-sm text-red-500">
              <span className="">{validInput}</span>
              <span className="text-transparent">.</span>
            </div>
          </div>
          <div className=" my-2">
            <div>
              {submit ? (
                <Button />
              ) : (
                <div
                  onClick={() => void handleSubmit()}
                  className="w-fit cursor-pointer rounded bg-blue-500  px-10 py-2 font-bold text-white hover:bg-blue-700"
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
