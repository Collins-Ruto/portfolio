import React, { useState } from "react";
import axios from "axios";
import { Button, StatusMsg } from "../../components";

function CreateTask() {
  const [task, setTask] = useState({});
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  const handleInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "file" ? target.files[0] : target.value;
    target.type === "file"
      ? setFile(target.files[0])
      : setTask({ ...task, [name]: value });
  };

  async function handleSubmit() {
    const formData = new FormData();
    // Object.entries(task).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    formData.append("file", file);

    // const formData2 = new FormData();
    
    const res = await axios.post("http://localhost:8000/infos/addasset", formData);
    console.log(res)

    const taskData = {...task, fileId: res.data.id}

    const resTask = await axios.post("http://localhost:8000/infos/addtask", taskData);
    setSubmit(false);
    // setStatus(
    //   res.data.message === "success"
    //     ? {
    //         type: "success",
    //         message: `succesfully Created a ${res.data.subject.name} lesson for ${res.data.stream.name} on ${res.data.day}`,
    //       }
    //     : { type: "error", message: res.data.message }
    // );
    // setTimeout(() => {
    //   res.data.message === "success" && window.location.reload(true);
    // }, 2000);
  }

  console.log(task);

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 md:p-4 text-2xl font-semibold">
        <h3>Add Tasks</h3>
      </div>
      <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
        <form>
          <div className="flex flex-col md:grid grid-cols-3 gap-2 gap-y-4 md:gap-y-8">
            <div>
              <div>
                <label>
                  Task title <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  value={task.title}
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="eg. Assignmets 1"
                  name="title"
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
                  value={task.subjectId}
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  value={task.streamId}
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={task.teacherId}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                value={task.description}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="eg. assignments 1"
                name="description"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="file_input">
              Upload file
            </label>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              className="block w-fit leading-loose text-lg text-gray-900 bg-gray-500 rounded cursor-pointer focus:outline-none"
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
                  onClick={() => handleSubmit()}
                  className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
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
