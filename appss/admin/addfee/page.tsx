import React, { useState } from "react";
import { Button, DateTime } from "../../components";
import axios from "axios";
import StatusMsg from "../../components/StatusMsg";

function AddFee() {
  const [fee, setFee] = useState({ pday: DateTime() });
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({});

  const handleInput = (event) => {
    const target = event.target;
    const type =
      target.name === "type" && target.value === "invoice" ? "INV" : "CRD";
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number"
        ? Number(target.value).toFixed(
            Math.max(target.value.split(".")[1]?.length, 2) || 2
          )
        : target.value;
    const name = target.name;

    setFee({ ...fee, [name]: value, slug: `${type}${Math.floor(Date.now() / 1000)}` });
  };

  const handleSubmit = () => {
    setSubmit(true);
    axios.post("https://lmsadmin.onrender.com/fees", fee).then((res) => {
      setSubmit(false);
      console.log(res.data)
      const data = res.data;
      setStatus(
        res.data.message === "success"
          ? {
              type: "success",
              message: `${fee.type} of ${fee.amount} to ${fee.stdt_slug} is succesfull`,
            }
          : { type: "error", message: data.message }
      );
      setTimeout(() => {
        res.data.message === "success" && window.location.reload(true);
      }, 2000);
    });
    //   http://localhost:8000
  };

  console.log(fee)

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Fees</h3>
      </div>
      <div className="m-4 bg-[#F7F6FB] rounded-xl p-4 md:p-6">
        <form>
          <div>
            <h5 className="text-xl pb-4">
              <span>Fees Information</span>
            </h5>
          </div>
          <div className="flex flex-col md:grid grid-cols-3 gap-4 md:gap-y-8">
            <div>
              <label>
                Student Username <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee.stdt_slug}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Username"
                name="stdt_slug"
              />
            </div>
            <div>
              <label>
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee.name}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Name"
                name="name"
              />
            </div>
            <div className="inline-block relative items-center">
              <label>
                Term<span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee.term}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Associated Term"
                name="term"
              />
            </div>
            <div>
              <label>
                Fee Amount <span className="text-red-500">*</span>
              </label>
              <input
                onInput={(e) => {
                  handleInput(e);
                }}
                value={fee.amount}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter amount"
                name="amount"
              />
            </div>
            <div className="inline-block relative items-center">
              <label>
                Fee Type <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center cursor-pointer">
                <select
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  name="type"
                  value={fee.type}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option>Select type</option>
                  <option value="invoice">invoice</option>
                  <option value="credit">credit</option>
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
            <div className="form-group local-forms calendar-icon">
              <label>
                Paid Date <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee.pday}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline datetimepicker"
                type="text"
                placeholder="DD-MM-YYYY"
                name="pday"
              />
            </div>
          </div>
          <div className=" mt-4">
            {submit ? (
              <Button />
            ) : (
              <div
                onClick={() => handleSubmit()}
                // type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-32 py-2 px-10 rounded"
              >
                Submit
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFee;
