"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  status: {
    type: string
    message: string
  }
}

function StatusMsg({ status }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
      status.message && status.message !== "" && setShow(true);
      
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
            status.type === "success"
              ? "bg-green-600 "
              : status.type === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          } text-white px-4 py-2`}
        >
          <div className="flex justify-between">
            {status.message}
            <Image
              onClick={() => {
                setShow(false);
              }}
              className="w-8 h-8 ml-4 cursor-pointer"
              src="https://img.icons8.com/material-rounded/24/FFE6E6/multiply--v1.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusMsg;
