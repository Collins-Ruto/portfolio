"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "~/components";
import { DummyUser } from "~/api/types";
import type { User } from "~/api/types";
import { api } from "@/utils/api";
import type { Fee } from "@prisma/client";

function FeeData() {
  // const [student, setStudent] = useState({});
  const [fees, setFees] = useState<Fee[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const id = "641dd16f2eece6ce9587cb0d";

    const userFromLocalStorage = localStorage.getItem("user");
    const user: User =
      userFromLocalStorage !== null
        ? (JSON.parse(userFromLocalStorage) as User)
        : DummyUser;

    const { data, isLoading, error } = api.fee.studentFees.useQuery(id);
    const fees: Fee[] | undefined = data;
    setFees(fees);
    setIsLoading(isLoading);
  }, []);

  console.log("fee", fees);

  const balance = () => {
    let invoice = 0;
    let credit = 0;

    fees?.forEach((fee) => {
      fee.type === "invoice"
        ? (invoice += parseFloat(fee.amount))
        : (credit += parseFloat(fee.amount));
    });
    return (invoice - credit).toString();
  };

  // console.log(student);

  return (
    <div className="w-screen md:w-full">
      <div className="p-4 text-2xl font-semibold">
        <h3>Your Fee Details</h3>
      </div>
      {isLoading && <Loader />}

      <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-6">
        <table className="w-full text-justify">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Invoiced</th>
              <th className="p-4">Credited</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {fees?.map((fee, index) => {
              return (
                <tr key={index}>
                  <td className="p-4">{fee.slug}</td>
                  <td className="p-4">
                    {fee.type === "invoice" ? fee.amount : "0.00"}
                  </td>
                  <td className="p-4">
                    {fee.type === "credit" ? fee.amount : "0.00"}
                  </td>
                  <td className="p-4">{balance()}</td>
                  <td className="p-4">{fee.payday}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeeData;
