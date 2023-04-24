"use client";
import React, { useEffect, useState } from "react";
import { Calender, Loader } from "~/components";
// import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { DummyUser, type User } from "~/api/types";

function Dashboard() {
  const [user, setUser] = useState<User | undefined>();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const user: User =
      userFromLocalStorage !== null
        ? (JSON.parse(userFromLocalStorage) as User)
        : DummyUser;

    setUser(user);
    setIsLoading(isLoading);
  }, []);

  const termVvalue = "II";

  const currentTime = new Date();

  // const todayLessons = data.lessonsToday?.lessons.filter(
  //   (lesson) => format(currentTime, "EEE") === lesson.day
  // );

  console.log("data", data);

  const datas = [
    {
      title: "Lessons Today",
      // value: todayLessons?.length || "...",
      url: "https://icons-for-free.com/iconfiles/png/512/reading-131964753179295908.png",
    },
    {
      title: "Current Term",
      value: termVvalue,
      url: "https://cdn-icons-png.flaticon.com/512/4850/4850682.png",
    },
    {
      title: "Subjects offered",
      // value: data.subjects || "...",
      url: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
    },
    {
      title: "Students",
      // value: data.students || "...",
      url: "https://preschool.dreamguystech.com/template/assets/img/icons/dash-icon-01.svg",
    },
  ];

  return (
    <div className="p-4 pb-6 sm:p-6">
      <div className=" text-2xl font-semibold">
        <h3>Your Dashboard</h3>
      </div>
      {isLoading && <Loader />}
      <div className="flex flex-wrap justify-between gap-4 py-6">
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
              width={100}
              height={100}
              src={data?.url}
              alt={data?.title}
              className="w-16 rounded-full bg-slate-700 p-0"
            />
          </div>
        ))}
      </div>
      <div className="lg:grid lg:grid-cols-3">
        <div className="mb-4 bg-[#F7F6FB] p-4 lg:m-0">
          <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
          <ol className="mt-4 space-y-1 border-b-2 border-gray-600 text-sm leading-6 text-gray-500">
            <p>No Tasks currently</p>
          </ol>
        </div>
        <div className="lg:col-span-2 lg:col-start-2">
          <Calender full={false} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
