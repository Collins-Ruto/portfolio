import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tools1, tools2 } from "~/assets/homedata";
import "~/styles/themetoogle.css";

import localFont from "@next/font/local";
import { Contact } from ".";

const font = localFont({
  // src: "../assets/fonts/Saira/Saira-VariableFont_wdth,wght.ttf",
  // src: "../assets/fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf",
  src: "../assets/fonts/Roboto/Roboto-Regular.ttf",
  // src: "../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "fallback",
});
const helloFont = localFont({
  src: "../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "fallback",
});
const headFont = localFont({
  src: "../assets/fonts/Saira/Saira-VariableFont_wdth,wght.ttf",
  // src: "../assets/fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf",
  // src: "../assets/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "fallback",
});

function MyHome() {
  return (
    <div className={`${font.className}`}>
      <div className="">
        <div className="px- mx-auto">
          <section className=" flex h-[82vh] flex-col justify-center text-center sm:mt-12 sm:h-fit lg:py-16 xl:h-fit xl:pt-24 ">
            <h1 className={`${helloFont.className} text-6xl font-extrabold tracking-tight md:text-6xl`}>
              {" "}
              HELLO, I&apos;M{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                COLLINS RUTO
                {/* Samuel Kibet */}
              </span>{" "}
            </h1>
            <p className="mx-auto mt-6 max-w-[30rem] py-4 text-lg font-medium text-gray-600 dark:text-gray-400">
              A Full-Stack Developer focused on building the Frontend & Backend
              of Websites and Web Applications that leads to the success of the
              overall product
            </p>

            <Link
              href="https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/collinsruto.pdf"
              className="mx-auto my-12 flex w-fit items-center rounded bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg hover:bg-indigo-700"
            >
              <Image
                src="https://img.icons8.com/sf-regular-filled/24/FFFFFF/downloading-updates.png"
                className="mr-1 w-6 "
                height={100}
                width={100}
                alt=""
              />
              Download Résumé
            </Link>
            <div id="mouse-scroll" className=" mx-auto transform">
              <div className="mouse">
                <div className="mouse-in bg-black dark:bg-white"></div>
              </div>
              <div className="mx-auto flex flex-col gap-1">
                <span className="down-arrow-1 mx-auto animate-bounce"></span>
                <span className="down-arrow-2 mx-auto animate-bounce"></span>
                <span className="down-arrow-3 mx-auto animate-bounce"></span>
              </div>
            </div>
          </section>
          <section className="my-services bg-dark text-accent relative py-16 text-center">
            <h2
              className={` ${headFont.className} section__title section__title--services transition-delay-300 mb-6 text-4xl font-bold`}
            >
              What I do
            </h2>
            <div className="services mx-auto flex-wrap justify-between gap-4 md:flex">
              <div className="service mx-auto mb-12 max-w-lg grow md:w-1/4">
                <h3
                  className={` ${headFont.className} section__subtitle--services transition-delay-400 mb-4 text-2xl font-bold`}
                >
                  Web Design
                </h3>
                <p className="transition-delay-500 text-sm">
                  I build and design impressive and user-friendly websites with
                  a focus on exceptional user experience and functionality. I
                  integrate high-quality search engine optimization (SEO)
                  practices to achieve high Google rankings, ensuring your
                  offerings reach a wider audience.
                </p>
              </div>

              <div className="service mx-auto mb-12 max-w-lg grow md:w-1/4">
                <h3
                  className={` ${headFont.className} section__subtitle--services transition-delay-600 mb-4 text-2xl font-bold`}
                >
                  Software Development
                </h3>
                <p className="transition-delay-700 text-sm">
                  I develop high-end software solutions tailored to your
                  specific needs across multiple platforms. With expertise in
                  JavaScript, TypeScript, React, Next.js, Node.js, Express,
                  MongoDB, Python, and Rust, I deliver exceptional software that
                  aligns with your business goals.
                </p>
              </div>

              <div className="service mx-auto mb-12 max-w-lg grow md:w-1/4">
                <h3
                  className={` ${headFont.className} section__subtitle--services transition-delay-800 mb-4 text-2xl font-bold`}
                >
                  Web3 Development
                </h3>
                <p className="transition-delay-900 text-sm">
                  As a NEAR Protocol certified web3 developer, I build secure
                  smart contracts on the blockchain using Rust and Solidity. I
                  connect these contracts with intuitive front-end interfaces
                  using ReactJS and Next.js to create fast and responsive web
                  applications for the decentralized future.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className="btnn inline-block rounded bg-black px-6 py-3 font-semibold text-white transition duration-300 hover:bg-opacity-90 dark:bg-white dark:text-black"
            >
              My Work
            </Link>
          </section>
          <section className="about--me text-dark py-16">
            <div className="about-me flex items-center gap-4">
              <Image
                width={450}
                height={40}
                src="/img/25.webp"
                alt="collins"
                className="about-me__img rounded-l4 mx-auto hidden h-[26rem] shadow-md lg:block"
              />
              <div className="">
                <div className="text-center">
                  <h2
                    className={` ${headFont.className}section__title section__title--about mb-4 text-4xl font-bold`}
                  >
                    Who Am I
                  </h2>
                  <p className="section__subtitle section__subtitle--about mb-8 text-lg font-semibold">
                    Designer & Developer based in Mombasa, Kenya
                  </p>
                </div>
                <div className="about-me__body mb-8 text-lg">
                  <p>
                    I am a freelance web developer based in Mombasa, Kenya. I
                    strongly believe that life is about pursuing our dreams and
                    finding genuine happiness. My objective is to assist
                    individuals and businesses in transforming their ideas into
                    functional websites and applications. I strive to create
                    digital solutions that not only perform effectively but also
                    reach their intended audience, enabling exponential growth
                  </p>
                  <p>
                    You may wonder why you should choose me. Well, I can help
                    you build a website that serves to enhance your business by
                    providing an exceptional client experience. I understand the
                    importance of making a great first impression, and a
                    well-designed website allows you to establish a positive and
                    productive relationship with your clients right from the
                    beginning.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="lifestyle items-center py-16 ">
            <h2
              className={` ${headFont.className}section__title section__title--life-style mb-8 text-center text-4xl font-bold`}
            >
              Lifestyle
            </h2>
            <div className="life-style mx-auto md:flex">
              <div className="lifestyle-item flex flex-col items-center md:flex-row md:items-start">
                <div className="lifestyle-text md:mr-8">
                  <p className="w-[] text-lg">
                    I love open source because it provides opportunities for
                    learning, growth, and helping others. Although I&apos;m
                    relatively new to web development with less than a year of
                    experience, I dedicate time to contribute to other
                    developers&apos; projects on platforms like GitHub and Stack
                    Overflow. This approach allows me to learn more and enhance
                    my foundational knowledge.
                  </p>
                </div>
              </div>

              <div className="life-img mx-auto max-w-[80%] sm:max-w-[60%]">
                <Image
                  width={1800}
                  height={800}
                  src="/img/lifestyle.png"
                  alt="teams"
                  className="lifestyle__img rounded-l "
                />
              </div>
            </div>
          </section>
          <section className="tools py-16">
            <div className="toolss mx-auto">
              <h2
                className={` ${headFont.className}section__title section__title--tools mb-8 text-center text-4xl font-bold`}
              >
                My Tools
              </h2>
              <div className="toolbox-wrapper flex flex-col  gap-8">
                <div className="toolbox-card">
                  <div className="tools-container">
                    <ul className="tool-list flex flex-wrap justify-center gap-4 md:justify-around">
                      {tools1.map((tool, index) => (
                        <div
                          key={index}
                          className="tool-card flex w-[9rem] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
                        >
                          <Image
                            width={50}
                            height={50}
                            src={tool.url}
                            alt={tool.alt}
                            className="tool-icon mb-1 h-14 w-14"
                          />
                          <span className="tool-name text-center text-sm font-semibold">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="toolbox-card">
                  <div className="tools-container">
                    <ul className="tool-list l flex flex-wrap justify-center gap-2 md:justify-around">
                      {tools2.map((tool, index) => (
                        <div
                          key={index}
                          className="tool-card flex w-[9rem] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
                        >
                          <Image
                            width={50}
                            height={50}
                            src={tool.url}
                            alt={tool.alt}
                            className="tool-icon mb-1 h-14 w-14"
                          />
                          <span className="tool-name text-center text-sm font-semibold">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MyHome;
