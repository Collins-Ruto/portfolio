import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { contacts, socials } from "~/assets/data";
import Link from "next/link";
import { ContactForm } from "~/components";
import localFont from "@next/font/local";

type Contact = {
  icon: string;
  title: string;
  info1: string;
  info2: string;
};

const headFont = localFont({
  src: "../assets/fonts/Saira/static/Saira-Medium.ttf",
  display: "fallback",
});

function page() {
  const contactCard = (contact: Contact) => {
    return (
      <div className="borde dark:border-gray flex flex-col gap-3 rounded-md bg-slate-800  py-6 text-center text-white">
        <div className="mx-auto flex items-center">
          <Image
            width={60}
            height={60}
            className="mr-2 h-6 w-6 rounded-sm"
            src={contact.icon}
            alt={contact.title}
          />
          <span className="text-blac font-semibold dark:text-white">
            {contact.title}
          </span>
        </div>
        <span className=" dark:">{contact.info1}</span>
        <span className=" dark:">{contact.info2}</span>
      </div>
    );
  };
  return (
    <div>
      <div className="bg-[url('/contactbg.webp') mt-8 rounded bg-cover bg-center ">
        <div className="bg-slate-90 b-opacity-60 rounded">
          <div className="container mx-auto  py-6 ">
            <div className="mx-auto flex max-w-full grid-cols-3 flex-col flex-wrap gap-6 py-4 lg:grid">
              <div className="col-span-1 min-w-[16rem]">
                <div className="flex justify-between">
                  <div className="mx-auto flex flex-col sm:mx-0">
                    <span
                      className={` ${headFont.className} text-4xl font-medium`}
                    >
                      Contact Me
                    </span>
                    <span className="mx-auto py-2 text-sm  sm:mx-0">
                      via quick socials?
                    </span>
                  </div>
                </div>
                <div className="col-span-1 flex flex-wrap gap-4 lg:grid">
                  <div className=" flex w-full flex-col gap-3">
                    <div className="flex flex-wrap justify-around">
                      {socials.map((social, index) => (
                        <Link
                          target="_blank"
                          rel="noopener"
                          href={social.link}
                          className="flex w-1/2 items-center rounded-lg p-1 py-2 opacity-90 hover:bg-gray-300 hover:opacity-100 "
                          key={index}
                        >
                          <Image
                            width={80}
                            height={80}
                            className="mr-2 h-9 w-9 rounded-sm"
                            src={social.icon}
                            alt={`Collins ${social.name}`}
                          />
                          <span className="text-md font-medium ">
                            {social.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <span className="font-base hidden text-xl underline  underline-offset-4 md:block">
                      Get in Touch
                    </span>
                    <span className="hidden  md:block lg:max-w-[24rem]">
                      Have a question, wish to collaborate or learn more about
                      any service I offer? Get in touch. I value your response
                      and look forward to working with you.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className=" mb-4 flex grow flex-wrap gap-4">
                  {contacts.map((contact, index) => (
                    <div className="w-1/2 grow sm:w-1/3 lg:w-1/3" key={index}>
                      {contactCard(contact)}
                    </div>
                  ))}
                </div>

                <div className="col-span-2 w-full">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

export const metadata: Metadata = {
  title: "Contact Us",
  metadataBase: new URL("https://collinsruto.vercel.app/contact"),
  keywords: ["contact collins ", "collins ruto phone", "collins ruto email"],
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: "Collins Ruto",
      url: "https://collinsruto.netlify.app",
    },
  ],
};
