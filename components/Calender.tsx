"use client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import type { User } from "api/types";
import axios from "axios";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  full: boolean;
  user: User | null | undefined;
};

type Lesson = {
  node: {
    startTime: string;
    endTime: string;
    day: string;
    stream: {
      slug: string;
      name: string;
    };
    teacher: {
      slug: string;
      name: string;
    };
    subject: {
      name: string;
    };
  };
};

export default function Calender({ full, user }: Props) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [lessons, setLessons] = useState<Lesson[] | undefined>();

  useEffect(() => {
    axios
      .get<Lesson[] | undefined>("https://lmsadmin.onrender.com/lessons")
      .then((res) => {
        if (res.data) {
          setLessons(res.data);
        } else {
          setLessons(undefined);
        }
      })
      .catch((err) => console.log(err))
      .then(() => console.log("this will succeed"))
      .catch(() => "obligatory catch");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // we want to only show the classes for a specific user
  const selectedDayLessonsFun = (): Lesson[] | undefined => {
    if (!user) {
      return lessons?.filter(
        (lesson) => format(selectedDay, "EEE") === lesson.node.day
      );
    }
    if (user.type === "teacher") {
      return lessons?.filter(
        (lesson) =>
          format(selectedDay, "EEE") === lesson.node.day &&
          lesson.node.teacher.slug === user.slug
      );
    }
    if (user.type === "student") {
      return lessons?.filter(
        (lesson) =>
          format(selectedDay, "EEE") === lesson.node.day &&
          lesson.node.stream.slug === user?.stream?.slug
      );
    }
    if (user.type === "admin") {
      return lessons?.filter(
        (lesson) => format(selectedDay, "EEE") === lesson.node.day
      );
    }
  };
  const selectedDayLessons: Lesson[] | undefined = selectedDayLessonsFun();

  return (
    <div className={` rounded-lg ${full ? "w-full p-4" : "sm:w-full"}`}>
      <div className="md:max-w-m mx-auto lg:max-w-4xl lg:px-4">
        <div
          className={` mx-auto divide-x divide-gray-200 bg-[#F7F6FB] p-4 md:grid md:grid-cols-2 ${
            full ? "" : ""
          }`}
        >
          <div className="mx-auto ">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                className=" mr-2 w-10 items-center px-1.5 pb-1 text-gray-400 hover:text-gray-500"
              >
                <Image
                  width={20}
                  height={16}
                  src="https://img.icons8.com/ios-filled/50/000000/less-than.png"
                  alt=""
                />
              </button>
              <h2 className="mx-auto text-xl font-semibold text-gray-800">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>

              <button
                onClick={nextMonth}
                type="button"
                className=" ml-2 -mt-2 w-10 items-center px-1.5 pb-1 text-gray-400 hover:text-gray-500"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://img.icons8.com/ios-filled/50/000000/more-than.png"
                  alt=""
                />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs font-semibold leading-6 text-gray-700">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx: number) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "p-2 "
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-300",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-green-700",
                      !isEqual(day, selectedDay) &&
                        "hover:bg-gray-900 hover:text-white ",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-700"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 px-2 md:mt-0">
            <h2 className="text-lg font-semibold text-gray-800">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>

            <ol className="mt-4 space-y-1 border-b-2 border-gray-600 text-sm leading-6 text-gray-500">
              {selectedDayLessons?.length ? (
                selectedDayLessons?.map((lesson, index) => (
                  <Lesson node={lesson.node} key={index} />
                ))
              ) : (
                <p>No lessons for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Lesson({ node }: Lesson) {
  const lesson = node;
  // const inputDate = new Date();
  // const inputTime = "05:59";
  // inputDate.setHours(inputTime?.split(":")[0]);
  // inputDate.setMinutes(inputTime?.split(":")[1]);

  return (
    <div className="mb-2 grid grid-flow-col gap-4 divide-x-4 divide-blue-600 border-b pb-2 text-gray-700 ">
      <div className="border-r-3 flex flex-col">
        <span className="flex-1 font-semibold">{lesson.day}</span>
        <span className="flex-1">{lesson.stream?.name}</span>
      </div>
      <div className="flex grow justify-between pl-2 ">
        <div>
          <h2 className="text-base font-semibold text-gray-700">
            {lesson.subject.name}
          </h2>
          <h2>{lesson.teacher?.name}</h2>
        </div>
        <div className="flex flex-col justify-end">
          <div>{lesson.startTime}</div>
          <div>{lesson.endTime}</div>
        </div>
      </div>
    </div>
  );
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
