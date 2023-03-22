import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../components";
import StatusMsg from "../components/StatusMsg";

function Account() {
  const [user, setUser] = useState();
  const [editUser, setEditUser] = useState({
    email: user?.email,
    phone: user?.phone,
  });
  const [passManager, setPassManager] = useState(false);
  const [confPass, setConfPass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const user = JSON?.parse(localStorage?.getItem("user"));
    user && setUser(user);
  }, []);

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = (inputType) => {
    setSubmit(true);
    axios
      .post(`https://lmsadmin.onrender.com/${user.type}s/${inputType}`, {
        slug: user.slug,
        data: editUser,
      })
      .then((res) => {
        setSubmit(false);
        console.log("res", res.data.message);
        res.data.message === "success" && setConfPass("");
        setEditUser({
          password: "",
          oldPassword: "",
        });
        console.log(res.data);
        setStatus(
          res.data.message === "success"
            ? {
                type: "success",
                message: `succesfully updated your credidentials`,
              }
            : { type: "error", message: res.data.message }
        );
        setTimeout(() => {
          res.data.message === "success" && window.location.reload(true);
        }, 2000);
      });
  };

  const logOut = () => {
    localStorage.setItem("saved", JSON.stringify(false));
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    window.location.reload(true);
  };

  const handleVerify = (e) => {
    setConfPass(e.target.value);
  };

  console.log(editUser);

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="flex flex-col gap-4 h-[100vh_-_4rem]">
        <div className="w-full h-60 bg-[url('https://b1311116.smushcdn.com/1311116/wp-content/uploads/2021/12/great-school-website-01.png?size=912x479&lossy=1&strip=1&webp=1')] bg-cover bg-center">
          <div className="min-w-full text-2xl font-semibold h-full flex text-white justify-center items-center backdrop-brightness-50">
            Welcome to your account page
          </div>
        </div>
        <div className="flex relative flex-col">
          <div className="bg-[#F7F6FB] md:absolute md:-top-16 rounded-lg md:ml-10 md:w-[25%] h-[max-content] pb-6 md:py-6 flex flex-col items-center justify-center">
            <img
              className="w-28  rounded-full bg-gray-300 p-2"
              src="https://img.icons8.com/ios-glyphs/120/000000/user--v1.png"
              alt=""
            />
            <div className="text-blue-600 pb-4 pt-2">{user?.type}</div>
            <div className="p-2 text-start text-slate-800 flex flex-col gap-2">
              <div className="p-1">Name: {user?.name} </div>
              <div className="p-1">Phone: {user?.phone} </div>
              <div className="p-1">Email: {user?.email} </div>
            </div>
            <div
              onClick={() => {
                logOut();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
            >
              Log Out
            </div>
          </div>
          <div className="grow md:ml-[30%] md:w-[68%] bg-[#F7F6FB] md:absolute -top-16 rounded-lg">
            <div className=" flex justify-around border-b-2 text-lg p-2">
              <div
                className={` cursor-pointer ${
                  !passManager && " border-b-4 border-blue-600"
                }`}
                onClick={() => {
                  setPassManager(false);
                }}
              >
                Edit Details
              </div>
              <div
                className={` cursor-pointer ${
                  passManager && " border-b-4 border-blue-600"
                }`}
                onClick={() => {
                  setPassManager(true);
                }}
              >
                Password Manager
              </div>
            </div>
            {passManager && (
              <div className="p-4">
                <h1 className="text-xl py-4 text-center mx-auto">
                  Change your Password
                </h1>
                <div>
                  <div className="mx-auto flex flex-col w-80 gap-4 gap-y-8 pb-4">
                    <div className="col-12 col-sm-4">
                      <div>
                        <label>
                          Old Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          value={editUser.oldPassword}
                          name="oldPassword"
                          type="password"
                          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Enter Old Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div>
                        <label>
                          New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          onChange={(e) => {
                            handleInput(e);
                          }}
                          value={editUser.password}
                          name="password"
                          type="password"
                          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Enter New Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Repeat Password{" "}
                          <span className="text-red-500">*</span>
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
                          required
                        />
                        {confPass && confPass !== editUser.password && (
                          <div className="text-xs text-red-500">
                            passwords do not match
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {submit ? (
                        <Button />
                      ) : (
                        <button
                          onClick={() => handleSubmit("password")}
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!passManager && (
              <div className="p-4">
                <h1 className="text-xl py-4 text-center mx-auto">
                  Update your Details
                </h1>
                <div className="flex mx-auto flex-col w-80 gap-4 gap-y-8 pb-4">
                  <div>
                    <div>
                      <label>
                        E-Mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          handleInput(e);
                        }}
                        value={editUser.email}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Phone </label>
                      <input
                        onInput={(e) => {
                          handleInput(e);
                        }}
                        value={editUser.phone}
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Enter Phone Number"
                        name="phone"
                      />
                    </div>
                  </div>
                  <div>
                    {submit ? (
                      <Button />
                    ) : (
                      <button
                        onClick={() => handleSubmit("edit")}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
