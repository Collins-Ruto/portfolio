import React, { useState } from "react";

const dumt = [
  {
    name: "Refraction Assignmets",
    stream: "1n",
    teacher: "8797fredrick",
    subject: "bio",
    description: 'some task for you',
    url: "",
  },
  {
    name: "Poetry Essay",
    stream: "1e",
    teacher: "8797fredrick",
    subject: "eng",
    description: 'some task for you',
    url: "",
  },
  {
    name: "Rocks Assignmets",
    stream: "1s",
    teacher: "736judy",
    subject: "geo",
    description: 'some task for you',
    url: "",
  },
];

function Task() {
  const [tasks, setTasks] = useState(dumt);

  const downloadURI = (uri, name) => {
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

      <div
        onClick={() =>
          downloadURI(
            "https://ccsuniversity.ac.in/bridge-library/pdf/Lecture-3-Engine.pdf", "lecture3.pdf"
          )
        }
      >
        download
      </div>

      <div className="">
        <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 overflow-auto">
          <table className=" w-full overflow-scroll text-justify">
            <thead>
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr
                  className={` p-4 ${index % 2 === 0 ? "bg-white": ""}`}
                  key={index}
                >
                  <td className="p-4">{task.name}</td>
                  <td className="p-4">{task.subject}</td>
                  <td className="p-4">{task.teacher}</td>
                  <td className="p-4 flex gap-2">
                    <div
                      onClick={() => {
                        // setisDelete(true);
                        // setDeltask(task.slug);
                      }}
                    >
                      Download
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

export default Task;
