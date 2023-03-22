import axios from "axios";
import React, { useState } from "react";
import homepic from "../res/homepic1.webp";
import { Button } from "../components";
import {  useNavigate } from "react-router-dom";

function Login({ setLogin }) {
  const navigate = useNavigate()
  
  const [user, setUser] = useState({ password: "" });
  const [submit, setSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [passView, setPassView] = useState(false);

  const handleInput = (event) => {
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    target.type === "checkbox" && setIsChecked(!isChecked);

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    if (!window.navigator.onLine) {
      return;
    }
    setSubmit(true);

    axios
      .post(`https://lmsadmin.onrender.com/user/${user.group}`, user)
      .then((res) => {
        if (res.data[user.group]) {
          setLogin({ ...res.data[user.group], type: user.group });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...res.data[user.group], type: user.group })
          );
          localStorage.setItem("saved", JSON.stringify(isChecked));
          axios.defaults.headers.common["Authorization"] = `${
            res.data[user.group].token
            }`;
          navigate("/")
        } else {
          setInvalid(true);
        }
        setSubmit(false);
      });
  };

  return (
    <div className="h-screen p-2 flex justify-center w-full text-black">
      <div className="sm:flex m-auto items-center rounded-lg bg-[#F7F6FB] ">
        <div className="p-4">
          <img
            className="h-96 mx-auto cover"
            // src="https://preschool.dreamguystech.com/template/assets/img/login.png"
            src={homepic}
            alt="Logo"
          />
        </div>
        <div className="mx-0 p-4 ">
          <h1 className="text-2xl text-center font-semibold mb-4">
            Welcome to Ace Accademy
          </h1>
          {invalid && (
            <div className="text-red-500">Invalid username or password</div>
          )}
          <form
            action="index.html"
            className="mt-4"
            onClick={() => {
              setInvalid(false);
            }}
          >
            <div className="relative items-center">
              <label>
                Log in as <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center cursor-pointer">
                <select
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  required
                  name="group"
                  value={user.group}
                  className="block appearance-none w-full text-black bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option>Select group</option>
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                  <option value="admin">adminstrator</option>
                </select>
                <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label>
                userName <span className="text-red-500">*</span>
              </label>
              <div className="flex relative items-center cursor-pointer">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  name="userName"
                  value={user.userName}
                  className="block shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="eg: 01john"
                />
                <div className="cursor-pointer right-0 absolute px-2 text-gray-700">
                  <img
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-user-interface-kiranshastry-lineal-kiranshastry.png"
                    alt="user"
                    className="fill-current w-8"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 ">
              <label>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex relative items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  checked={isChecked}
                  name="password"
                  value={user.password}
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pass-input"
                  type={`${passView ? "text" : "password"}`}
                />
                <div className="cursor-pointer right-0 absolute px-2 text-gray-700">
                  <img
                    onClick={() => {setPassView(!passView)}}
                    src={`${passView ? "https://img.icons8.com/ios-filled/50/000000/visible--v2.png" : "https://img.icons8.com/ios/50/000000/closed-eye.png"}`}
                    alt="user"
                    className="fill-current w-8 p-1"
                  />
                </div>
              </div>
            </div>
            <div className="forgotpass">
              <div className="remember-me">
                <label>
                  {" "}
                  <input
                    onChange={(e) => {
                      handleInput(e);
                    }}
                    value={user.radio}
                    className="mr-2 w-4 h-4"
                    type="checkbox"
                    name="radio"
                  />
                  Remember me
                </label>
              </div>
            </div>
            <div className="my-4">
              {submit ? (
                <Button />
              ) : (
                <div>
                  <button
                    onClick={() => handleSubmit()}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
                    type="submit"
                  >
                    Login
                  </button>
                  {!window.navigator.onLine && (
                    <span className="text-sm mt-2 flex flex-col">
                      <span className="text-red-600">Error!</span> Please check
                      your network connection
                    </span>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
