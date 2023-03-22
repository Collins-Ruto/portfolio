import React, { useEffect, useState } from "react";
import { Calender, Loader } from "../../components";
// import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function Dashboard() {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //https://lmsadmin.onrender.com
  useEffect(() => {
    const user = JSON?.parse(localStorage.getItem("user"));
    setUser(user);
    console.log(user);
    axios
      .post("https://lmsadmin.onrender.com/data", { slug: user?.stream?.slug })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);
  const termVvalue = "II";

  const currentTime = new Date();

  const todayLessons = data.lessonsToday?.lessons.filter(
    (lesson) => format(currentTime, "EEE") === lesson.day
  );

  console.log("data", data);

  const datas = [
    {
      title: "Lessons Today",
      value: todayLessons?.length || "...",
      url: "https://icons-for-free.com/iconfiles/png/512/reading-131964753179295908.png",
    },
    {
      title: "Current Term",
      value: termVvalue,
      url: "https://cdn-icons-png.flaticon.com/512/4850/4850682.png",
    },
    {
      title: "Subjects offered",
      value: data.subjects || "...",
      url: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
    },
    {
      title: "Students",
      value: data.students || "...",
      url: "https://preschool.dreamguystech.com/template/assets/img/icons/dash-icon-01.svg",
    },
  ];

  return (
    <div className="p-4 pb-6 sm:p-6">
      <div className=" text-2xl font-semibold">
        <h3>Your Dashboard</h3>
      </div>
      {loading && <Loader />}
      <div className="flex justify-between py-6 gap-4 flex-wrap">
        {datas.map((data) => (
          <div
            className="flex grow min-w-[16rem] sm:max-w-[20rem] py-4 px-6 min-w- justify-between rounded-lg bg-[#F7F6FB]"
            key={data.title}
          >
            <div className="flex flex-col rounded-lg">
              <span className="text-gray-500 font-light ">{data?.title}</span>
              <span className="lg:mx-auto text-2xl font-semibold">
                {data?.value}
              </span>
            </div>
            <img
              src={data?.url}
              alt={data?.title}
              className="w-16 rounded-full bg-slate-700 p-0"
            />
          </div>
        ))}
      </div>
      <div className="lg:grid lg:grid-cols-3">
        <div className="bg-[#F7F6FB] p-4 mb-4 lg:m-0">
          <h2 className="font-semibold text-gray-800 text-lg">Your Tasks</h2>
          <ol className="mt-4 space-y-1 text-sm border-b-2 border-gray-600 leading-6 text-gray-500">
            <p>No Tasks currently</p>
          </ol>
        </div>
        <div className="lg:col-start-2 lg:col-span-2">
          <Calender full={false} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
