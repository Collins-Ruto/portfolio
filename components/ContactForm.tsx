import React from "react";

function ContactForm() {
  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action="https://formsubmit.co/76e790e2609584c53fda7e9658fbf3ae"
        method="POST"
      >
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
          <input
            name="name"
            className="focus:shadow-outline block w-full appearance-none rounded border bg-slate-900 bg-opacity-80 px-3 py-4 leading-tight placeholder-white shadow focus:outline-none"
            type="text"
            placeholder="Your Name"
          />

          <input
            name="email"
            className="focus:shadow-outline block w-full appearance-none rounded border bg-slate-900 bg-opacity-80 px-3 py-4 leading-tight placeholder-white shadow focus:outline-none"
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className=" flex cursor-pointer">
          <textarea
            name="message"
            className="focus:shadow-outline block w-full rounded border bg-slate-900 bg-opacity-80 px-3 py-4 leading-tight text-white placeholder-white shadow focus:outline-none"
            rows={3}
            placeholder="A message for us ..."
          />
        </div>
        <input
          type="hidden"
          name="_next"
          value="https://learnhqhome.vercel.app"
        ></input>
        <input
          type="hidden"
          name="_subject"
          value="New LearnHq submission!"
        ></input>
        <input type="hidden" name="_captcha" value="false"></input>
        <input type="hidden" name="_template" value="table"></input>
        <div className="flex w-full justify-center sm:justify-start">
          <button className="bg-primary-500 hover:bg-primary-700 w-full sm:w-1/2 focus:border-primary-700 focus:shadow-outline-indigo mt-6 inline-block w-[50%] rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-semibold leading-6 text-white transition duration-150 ease-in-out focus:outline-none active:bg-indigo-700 sm:mt-8">
            Mail Me 🙂
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
