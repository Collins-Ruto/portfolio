"use client";
import { api } from "@/utils/api";
import { type Lesson } from "@prisma/client";
import React, { useState } from "react";
import { Subjects } from "~/types/types";
import { Button } from "~/components";
import StatusMsg from "~/components/StatusMsg";

// eslint-disable-next-line no-unused-vars

function AddLesson() {
  const [lesson, setLesson] = useState<Lesson | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    setLesson((prevLesson) => {
      if (!prevLesson) {
        return;
        undefined;
      }

      if (target.name === "subject") {
        return {
          ...prevLesson,
          [name]: value,
          subject: {
            slug: value,
            name:
              Subjects.find((subject) => subject.slug === value)?.name || "",
          },
        };
      }
      return {
        ...prevLesson,
        [name]: value,
      };
    });
  };

  const addLessonMutation = api.lesson.addLesson.useMutation();

  const handleSubmit = () => {
    setSubmit(true);

    try {
      console.log("add lesson", lesson);
      const data = addLessonMutation.mutate(lesson as Lesson);

      setSubmit(false);
      console.log("add lesson data", data);
      setStatus({
        type: "success",
        message: `${lesson?.subject.name ?? "lesson"} of  is succesfull`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 text-2xl font-semibold md:p-4">
        <h3>Add lessons</h3>
      </div>
      <div>
        <div>
          <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="pb-4 text-xl">
                    lesson Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div className="flex grid-cols-3 flex-col gap-2 gap-y-4 md:grid md:gap-y-8">
                  <div>
                    <div>
                      <label>
                        Subject ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.subject?.slug}
                        className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter subject ID"
                        name="subject"
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
                        value={lesson?.streamId}
                        className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Stream ID"
                        name="streamId"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>
                        Teacher Username <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.teacherId}
                        className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="Enter Teacher Username"
                        name="teacherId"
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" calendar-icon">
                      <label>
                        Day of Week<span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.day}
                        className="focus:shadow-outline datetimepicker w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="text"
                        placeholder="eg, Fri"
                        name="day"
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" calendar-icon">
                      <label>
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.startTime}
                        className="focus:shadow-outline datetimepicker w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="time"
                        placeholder="eg: 14:00"
                        name="startTime"
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" calendar-icon">
                      <label>
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.endTime}
                        className="focus:shadow-outline datetimepicker w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        type="time"
                        placeholder="eg: 15:20"
                        name="endTime"
                      />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label>Attendance List</label>
                      <textarea
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson?.attendance}
                        className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Enter Attendance list"
                        name="attendance"
                      />
                    </div>
                  </div>
                </div>
                <div className=" mt-4">
                  <div>
                    {submit ? (
                      <Button />
                    ) : (
                      <button
                        onClick={() => handleSubmit()}
                        type="submit"
                        className="rounded bg-blue-500 py-2 px-10 font-bold text-white hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
