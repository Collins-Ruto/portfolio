'use client'

import React, { useEffect, useState } from "react";
import { Calender, Loader } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "next/image";
import type { User } from '../../api/types'

type Data = {
  subjects: number
  students: number
  teachers: number
}

function Dashboard() {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  //localhost:8000
  useEffect(() => {
    const user: User = JSON?.parse(localStorage.getItem("user"));
    const getData = async () => {
      const response = await axios.post("https://lmsadmin.onrender.com/data", { slug: user?.slug })
      const data: Data = await response.json()
        setData(data);
        setLoading(false);
      
    };
    getData()
  }, []);
  const termVvalue = "II";

  const datas = [
    {
      title: "Current Term",
      value: termVvalue,
      url: "https://cdn-icons-png.flaticon.com/512/4850/4850682.png",
    },
    {
      title: "Subjects offered",
      value: data?.subjects || "...",
      url: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
    },
    {
      title: "Students",
      value: data?.students || "...",
      url: "https://preschool.dreamguystech.com/template/assets/img/icons/dash-icon-01.svg",
    },
    {
      title: "Teachers",
      value: data?.teachers || "...",
      url: "https://cdn-icons-png.flaticon.com/512/194/194936.png",
    },
  ];

  const editInfo = [
    {
      title: "Students",
      path: "/addstudent",
    },
    {
      title: "Teachers",
      path: "/addteacher",
    },
    {
      title: "Fees",
      path: "/addfee",
    },
    {
      title: "Lessons",
      path: "/addlesson",
    },
    {
      title: "Exams",
      path: "/addexam",
    },
    {
      title: "Admins",
      path: "/addadmin",
    },
  ];

  return (
    <div className="p-4 pb-6 sm:p-6 ">
      <div className=" text-2xl font-semibold">
        <h3>Admin Dashboard</h3>
      </div>
      {loading && <Loader />}
      <div className="flex flex-wrap justify-between gap-4  py-6 ">
        {datas.map((data) => (
          <div
            className="min-w- flex min-w-[16rem] grow justify-between rounded-lg bg-[#F7F6FB] py-4 px-6 sm:max-w-[20rem]"
            key={data.title}
          >
            <div className="flex flex-col rounded-lg">
              <span className="font-light text-gray-500 ">{data?.title}</span>
              <span className="text-2xl font-semibold lg:mx-auto">
                {data?.value}
              </span>
            </div>
            <Image
              src={data?.url}
              alt={data?.title}
              className="w-16 rounded-full bg-slate-700 p-0"
            />
          </div>
        ))}
      </div>
      <div className="lg:grid lg:grid-cols-3 ">
        <div className="mb-4 bg-[#F7F6FB] p-4 lg:m-0">
          <span className="text-xl">Manage Data</span>
          {editInfo.map((data) => (
            <div className="mt-4 flex justify-between p-1" key={data.title}>
              <span className="text-lg">{data.title}</span>
              <Link
                to={data.path}
                type="btn"
                className="flex items-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                {" "}
                <Image
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/plus-math.png"
                  className="mr-1 w-5"
                  alt=""
                />
                Add
              </Link>
            </div>
          ))}
        </div>
        <div className=" lg:col-span-2 lg:col-start-2">
          <Calender full={false} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
