"use client";
import { type Fee } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "~/components";
import StatusMsg from "~/components/StatusMsg";
import { api } from "@/utils/api";

function AddFee() {
  const [fee, setFee] = useState<Fee | undefined>();
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const type =
      target.name === "type" && target.value === "invoice" ? "INV" : "CRD";
    // const value = target.type === "checkbox" ? target.checked : target.value;
    const value =
      target.type === "number"
        ? Number(target.value).toFixed(
            Math.max(target?.value.split(".")[1]?.length ?? 0, 2) || 2
          )
        : target.value;
    const name = target.name;

    setFee((prevFee) => {
      if (!prevFee) {
        return {
          [name]: value,
          slug: `${type}${Math.floor(Date.now() / 1000)}`,
        } as Fee;
      }

      return {
        ...prevFee,
        [name]: value,
        slug: `${type}${Math.floor(Date.now() / 1000)}`,
      };
    });
  };

  const addFeeMutation = api.fee.addFee.useMutation();
  
  const handleSubmit = () => {
    setSubmit(true);
        
    try {
      console.log("add fee", fee)
      const data = addFeeMutation.mutate(fee as Fee);

      setSubmit(false);
      console.log("add fee data",data);
      setStatus({
              type: "success",
              message: `${fee?.type ?? "fee"} of ${fee?.amount ?? ""} is succesfull`,
            }
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmit(false);
      setStatus({ type: "error", message: "error check your input" });
    }
  };

  console.log(fee);

  return (
    <div>
      {<StatusMsg status={status} />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Add Fees</h3>
      </div>
      <div className="m-4 rounded-xl bg-[#F7F6FB] p-4 md:p-6">
        <form>
          <div>
            <h5 className="pb-4 text-xl">
              <span>Fees Information</span>
            </h5>
          </div>
          <div className="flex grid-cols-3 flex-col gap-4 md:grid md:gap-y-8">
            <div>
              <label>
                Student Username <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee?.studentId}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Username"
                name="studentId"
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
                value={fee?.name}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="Enter Name"
                name="name"
              />
            </div>
            <div className="relative inline-block items-center">
              <label>
                Term<span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee?.term}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                value={fee?.amount}
                className="focus:shadow-outline w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="number"
                placeholder="Enter amount"
                name="amount"
              />
            </div>
            <div className="relative inline-block items-center">
              <label>
                Fee Type <span className="text-red-500">*</span>
              </label>
              <div className="flex cursor-pointer items-center">
                <select
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  name="type"
                  value={fee?.type}
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                >
                  <option>Select type</option>
                  <option value="invoice">invoice</option>
                  <option value="credit">credit</option>
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
            <div className="form-group local-forms calendar-icon">
              <label>
                Paid Date <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                value={fee?.payday}
                className="focus:shadow-outline datetimepicker w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="DD-MM-YYYY"
                name="payday"
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
                className="w-32 rounded bg-blue-500 py-2 px-10 font-bold text-white hover:bg-blue-700"
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
