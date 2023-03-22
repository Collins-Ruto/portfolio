import axios from "axios";
import React, { useState } from "react";
import { Button } from "../components";
import StatusMsg from "../components/StatusMsg";

// eslint-disable-next-line no-unused-vars

function AddLesson() {
  const [lesson, setLesson] = useState({});
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = () => {
    setSubmit(true);
    // axios
    //   .post("https://lmsadmin.onrender.com/lessons", lesson)
    //   .then((res) => console.log(res.message));
    axios.post("https://lmsadmin.onrender.com/lessons", lesson).then((res) => {
      setSubmit(false);
      console.log(res.data);
      setStatus(
        res.data.message === "success"
          ? {
              type: "success",
              message: `succesfully Created a ${res.data.subject.name} lesson for ${res.data.stream.name} on ${res.data.day}`,
            }
          : { type: "error", message: res.data.message }
      );
      setTimeout(() => {
        res.data.message === "success" && window.location.reload(true);
      }, 2000);
    });
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-2 md:p-4 text-2xl font-semibold">
        <h3>Add lessons</h3>
      </div>
      <div>
        <div>
          <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="text-xl pb-4">
                    lesson Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div className="flex flex-col md:grid grid-cols-3 gap-2 gap-y-4 md:gap-y-8">
                  <div>
                    <div>
                      <label>
                        Subject ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={lesson.sid}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter subject ID"
                        name="sid"
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
                        value={lesson.stid}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Stream ID"
                        name="stid"
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
                        value={lesson.tid}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Teacher Username"
                        name="tid"
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
                        value={lesson.day}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline datetimepicker"
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
                        value={lesson.start}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline datetimepicker"
                        type="time"
                        placeholder="eg: 14:00"
                        name="start"
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
                        value={lesson.end}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline datetimepicker"
                        type="time"
                        placeholder="eg: 15:20"
                        name="end"
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
                        value={lesson.attnd}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Attendance list"
                        name="attnd"
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
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
