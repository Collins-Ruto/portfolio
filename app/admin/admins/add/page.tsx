import axios from "axios";
import React, { useState } from "react";
import { Button, StatusMsg } from "../../components";

// eslint-disable-next-line no-unused-vars
const dum2 = {
  name: "Isaac Mayers",
  tid: "4564",
  gender: "Male",
  dob: "23-05-2002",
  email: "isaac@gmail.com",
  phone: 213124124,
  jod: "12-04-2023",
  quali: "Physics & Geography",
  slug: "123isaac",
  password: "123isaac",
};

function AddAdmin() {
  const [admin, setAdmin] = useState({ dum2 });
  const [confPass, setConfPass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  const handleInput = (event) => {
    const target = event.target;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = () => {
    setSubmit(true);
    axios.post("https://lmsadmin.onrender.com/admins", admin).then((res) => {
      setSubmit(false);
      setStatus(
        res.data.message === "success"
          ? {
              type: "success",
              message: `succesfully added ${admin.name} as a ${admin.quali} admin`,
            }
          : { type: "error", message: res.data.message }
      );
      setTimeout(() => {
        res.data.message === "success" && window.location.reload(true);
      }, 2000);
    });
  };

  const handleVerify = (e) => {
    setConfPass(e.target.value);
  };

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add admins</h3>
      </div>

      <form>
        <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
          <div>
            <h5 className="text-xl pb-4">
              admin Information{" "}
              <span>
                <a href="javascript">
                  <i className="feather-more-vertical"></i>
                </a>
              </span>
            </h5>
          </div>
          <div className="flex flex-col md:grid grid-cols-2 max-w-[52rem] gap-4 md:gap-y-8 pb-4">
            <div>
              <label>
                Full Names <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin.name}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Full Names"
                name="name"
              />
            </div>
            <div>
              <label>admin ID </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin.tid}
                name="tid"
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter admin ID"
              />
            </div>

            <div>
              <label>
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin.email}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Email Address"
                name="email"
              />
            </div>
            <div>
              <label>Phone </label>
              <input
                onInput={(e) => {
                  handleInput(e);
                }}
                value={admin.phone}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter Phone Number"
                name="phone"
              />
            </div>
          </div>
        </div>
        <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
          <div className="col-12">
            <h5 className="text-xl pb-4">
              <span>Login Details</span>
            </h5>
          </div>
          <div className="flex flex-col md:grid grid-cols-3 gap-4 md:gap-y-8 pb-4">
            <div>
              <label>Username </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin.slug?.toLowerCase()}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Username"
                name="slug"
              />
            </div>
            <div className="form-group local-forms">
              <label>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={admin.password}
                name="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group local-forms">
              <label>
                Repeat Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleVerify(e);
                }}
                value={confPass}
                name="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
              />
              {confPass && confPass !== admin.password && (
                <div className="text-xs text-red-500">
                  passwords do not match
                </div>
              )}
            </div>
          </div>
          <div className=" mt-4">
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
  );
}

export default AddAdmin;
