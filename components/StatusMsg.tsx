"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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
    status?.message && status?.message !== "" && setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="fixed right-4 top-14 z-10 rounded">
      {show && (
        <div
          className={`opacity-90 ${
            status?.type === "success"
              ? "bg-green-600 "
              : status?.type === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          } rounded px-4 py-2 text-white`}
        >
          <div className="flex items-center justify-between">
            {status?.message}
            <Image
              onClick={() => {
                setShow(false);
              }}
              width={100}
              height={100}
              className="ml-4 h-8 w-8 cursor-pointer"
              src="https://img.icons8.com/material-rounded/50/FFE6E6/multiply--v1.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusMsg;
