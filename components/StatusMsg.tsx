"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "~/styles/globals.css";

type Props = {
  status:
    | {
        type: string;
        message: string;
      }
    | undefined;
};

function StatusMsg({ status }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    status?.message === "" && setShow(false);
    status?.message && status?.message !== "" && setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 9200);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className={` fixed right-4 top-2 z-10 rounded-lg border`}>
      {show && (
        <div className="animate-fade-in opacit-90 relative max-w-md translate-y-full transform rounded-lg bg-gray-800 text-green-500 shadow-lg transition-all duration-300 ease-in-out">
          <div
            className={`opacity-90 ${
              status?.type === "success"
                ? "bg-green-900 text-green-300 "
                : status?.type === "error"
                ? "bg-red-500 text-white"
                : "bg-slate-800 text-white"
            }  rounded-lg p-2 pb-3`}
          >
            <div className="flex items-center justify-between">
              <Image
                onClick={() => {
                  setShow(false);
                }}
                width={100}
                height={100}
                className="mr-2 h-8 w-8 cursor-pointer"
                src={`${
                  status?.type === "success"
                    ? "https://img.icons8.com/sf-regular/24/90EE90/ok.png"
                    : "https://img.icons8.com/windows/32/FFFFFF/xbox-x.png"
                }`}
                alt="success"
              />
              {status?.message} &#128640;
            </div>
          </div>
          <div
            className={`absolute bottom-2 mx-1 h-1 w-full origin-left transform rounded bg-gradient-to-r ${
              status?.type === "success"
                ? "from-green-900 to-green-300"
                : "from-gray-600 to-white"
            } ${progress()}`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default StatusMsg;

function progress() {
  return "notification__progress";
}
