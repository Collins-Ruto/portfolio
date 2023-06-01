"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Loader } from "~/components";
import Image from "next/image";
import { api } from "@/utils/api";
import { type Admin } from "@prisma/client";

function Admins() {
  const [admins, setAdmins] = useState<Admin[] | undefined>();
  const [isDelete, setisDelete] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [delAdmin, setDelAdmin] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = api.admin.getAll.useQuery();
  useEffect(() => {
    if (data) {
      setAdmins(data);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  const deleteMutation = api.admin.delete.useMutation();

  const deleteAdmin = () => {
    try {
      deleteMutation.mutate(delAdmin);
      setisDelete(false);

      const newAdmin: Admin[] | undefined = admins?.filter(
        (admin) => admin.slug !== delAdmin
      );
      setAdmins(newAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const ConfirmDel = () => {
    return (
      <div className="absolute z-20 h-screen w-full">
        <div
          className="fixed right-0 h-full w-[100%] bg-[#979799] p-4 opacity-40 bg-blend-darken lg:w-screen"
          onClick={() => {
            setisDelete(!isDelete);
          }}
        ></div>
        <div
          className="
                fixed left-[45%] mx-auto flex h-screen flex-col pt-[10%] opacity-100 bg-blend-darken "
        >
          <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 text-center md:relative md:mx-auto md:max-w-md">
            <Image
              width={100}
              height={100}
              onClick={() => {
                setisDelete(false);
              }}
              className="absolute right-2 top-2 w-8 cursor-pointer rounded p-1 hover:bg-gray-200"
              src="https://img.icons8.com/color/48/000000/delete-sign--v1.png"
              alt=""
            />
            <div className="items-center md:flex md:flex-col">
              <div className="mt-4 text-center md:ml-6 md:mt-0 ">
                <p className="text-xl font-bold">Confirm admin deletion</p>
                <p className="my-2 text-base text-gray-600">
                  Are you sure you want to delete this admin from the school
                  platform?
                </p>
              </div>
              <div className="rounded-xl bg-[#F7F6FB] p-2 text-start text-orange-500">
                <div className="flex text-orange-600">
                  <Image
                    width={100}
                    height={100}
                    className="mr-1 w-6"
                    src="https://img.icons8.com/ios-glyphs/30/EE640C/error--v2.png"
                    alt=""
                  />
                  Warning
                </div>
                By deleting this admin all associated data will also be
                permanently deleted.
              </div>
            </div>
            <div className="mt-4 flex justify-around text-center text-white md:flex md:px-8">
              <button
                onClick={() => {
                  setisDelete(false);
                }}
                className="mt-4 block w-full rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold hover:bg-gray-400 md:mt-0 md:w-auto"
              >
                Cancel
              </button>
              {submit ? (
                <Button />
              ) : (
                <button
                  onClick={() => {
                    deleteAdmin();
                    setSubmit(true);
                  }}
                  className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 hover:text-white md:w-auto md:py-2 "
                >
                  Yes, confirm delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  console.log(admins);

  return (
    <div className="w-screen md:w-full md:pb-8">
      {isDelete && <ConfirmDel />}
      <div className="p-4 text-2xl font-semibold">
        <h3>Admins</h3>
      </div>
      {isLoading && <Loader />}
      <div>
        <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
          <div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              name="name"
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border bg-[#F7F6FB] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Search by Name ..."
            />
          </div>

          <div className="flex justify-between gap-4">
            {submit ? (
              <Button />
            ) : (
              <button
                onClick={() => {
                  // searchSubmit();
                  setSubmit(true);
                }}
                type="button"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Search
              </button>
            )}
            <div>
              <Link
                href="/addadmin"
                type="button"
                className="flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                {" "}
                <Image
                  width={100}
                  height={100}
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                  className="mr-1 w-5"
                  alt=""
                />
                Add
              </Link>
            </div>
          </div>
        </div>
        <div className="m-4 overflow-auto rounded-xl bg-[#F7F6FB] p-4">
          <table className=" w-full text-justify">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins?.map((admin, index) => (
                <tr
                  className={` p-4 ${index % 2 === 0 ? "bg-white" : ""}`}
                  key={index}
                >
                  <td className="p-4">{admin.slug}</td>
                  <td className="p-4">
                    <h2 className="table-avatar">
                      <a href="student-details.html">{admin.name}</a>
                    </h2>
                  </td>
                  <td className="p-4">{admin.email?.substring(0, 29)}</td>
                  <td className="p-4">{admin.phone}</td>
                  <td className="flex gap-2 p-4">
                    <Link href="/addadmin">
                      <Image
                        width={100}
                        height={100}
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-edit-interface-kiranshastry-solid-kiranshastry.png"
                        alt=""
                        className="w-6 cursor-pointer"
                      />
                    </Link>
                    <div
                      onClick={() => {
                        setisDelete(true);
                        setDelAdmin(admin.slug);
                      }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src="https://img.icons8.com/ios-filled/50/000000/waste.png"
                        alt=""
                        className="w-6 cursor-pointer"
                      />
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

export default Admins;
