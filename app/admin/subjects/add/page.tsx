import axios from "axios";
import React, { useState } from "react";
import { Button, StatusMsg } from "../../components";

// eslint-disable-next-line no-unused-vars

function AddSubject() {
  const [subject, setSubject] = useState({});
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = () => {
    setSubmit(true);

    axios
      .post("https://lmsadmin.onrender.com/infos/subjects", subject)
      .then((res) => {
        setSubmit(false);
        console.log(res.data);
        setStatus(
          res.data.message === "success"
            ? {
                type: "success",
                message: `succesfully Created a ${subject.name} subject of id ${subject.id}`,
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
        <h3>Add Subjects</h3>
      </div>
      <div>
        <div>
          <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
            <div className="card-body">
              <form>
                <div className="col-12">
                  <h5 className="text-xl pb-4">
                    Subject Information{" "}
                    <span>
                      <a href="javascript">
                        <i className="feather-more-vertical"></i>
                      </a>
                    </span>
                  </h5>
                </div>
                <div>
                  <div className="flex pb-4 flex-col md:grid grid-cols-3 gap-2 gap-y-4 md:gap-y-8">
                    <div>
                      <label>
                        Subject Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={subject.name}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Subject Name"
                        name="name"
                      />
                    </div>
                    <div>
                      <label>Subject ID </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={subject.id}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter unique Subject ID"
                        name="id"
                      />
                    </div>
                  </div>
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

export default AddSubject;
