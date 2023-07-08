"use client";
import { api } from "@/utils/api";
import React, { useState } from "react";

type Message = {
  name: string;
  email: string;
  message: string;
};

const cleanField = {
  name: "",
  email: "",
  message: "",
};

function ContactForm() {
  const [message, setMessage] = useState<Message>();
  const [status, setStatus] = useState(false);

  const handleInput = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setMessage((prevUser) => {
      if (!prevUser) {
        return {
          [name]: value,
        } as Message;
      }
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  console.log(message);

  const sendMessage = api.form.addForm.useMutation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }
    try {
      console.log("send  message", message);
      const data = sendMessage.mutate(message);

      setStatus(true);
      setTimeout(() => {
      setMessage(cleanField)
        setStatus(false);
      }, 4000);

      console.log("send  message data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" noValidate>
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            name="name"
            value={message?.name}
            className="focus:shadow-outline block w-full rounded border  bg-slate-900 bg-opacity-70 px-3 py-4 leading-tight placeholder-white shadow focus:outline-none"
            type="text"
            placeholder="Your Name"
          />
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            name="email"
            value={message?.email}
            className="focus:shadow-outline block w-full appearance-none rounded border bg-slate-900 bg-opacity-70 px-3 py-4 leading-tight placeholder-white shadow focus:outline-none"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className=" ">
          <textarea
            onChange={(e) => {
              handleInput(e);
            }}
            value={message?.message}
            name="message"
            className="focus:shadow-outline block w-full rounded border bg-slate-900 bg-opacity-70 px-3 py-4 leading-tight text-white placeholder-white shadow focus:outline-none"
            rows={3}
            placeholder="A message for us ..."
          />
        </div>

        <div className="flex w-full justify-center sm:justify-start">
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="hover:bg-primary-700 text-black focus:border-primary-700 focus:shadow-outline-indigo inline-block w-full rounded-md border border-transparent bg-[#16e0bd] px-8 py-3 text-base font-semibold leading-6 txt-white transition duration-150 ease-in-out focus:outline-none active:bg-indigo-700 sm:mt-8 sm:w-1/2"
          >
            {status ? "Well Recieved 😁 " : "Mail Me 🙂"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
