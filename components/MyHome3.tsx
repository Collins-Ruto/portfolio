import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tools1, tools2 } from "~/assets/homedata";
import "~/styles/themetoogle.css";
import localFont from "@next/font/local";
import pinnedProjects from "~/assets/pinnedProjects2.json";
import { Contact, PinnedCard } from ".";

const helloFont = localFont({
  src: "../assets/fonts/Open_Sans/static/OpenSans-ExtraBold.ttf",
  display: "fallback",
});

const headFont = localFont({
  src: "../assets/fonts/Saira/static/Saira-Medium.ttf",
  display: "fallback",
});

const experience = [
  {
    role: "Software Engineer / Full Stack Developer",
    company: "Eldama Ravine Education Foundation (EREF)",
    period: "May 2024 – Present",
    bullets: [
      "Built an event registration + foundation management web app using Next.js and Firebase.",
      "Designed APIs and database structure for registrations, payments, and admin workflows.",
      "Integrated M-Pesa Daraja and KCB Buni payments, including reliable callback handling.",
      "Deployed on Vercel and improved SEO + performance for faster page loads.",
      "Worked with a small team using PR reviews, issues, and weekly planning.",
    ],
  },
  {
    role: "Freelance Software Engineer",
    company: "Self-employed",
    period: "2022 – 2024",
    bullets: [
      "Delivered full-stack apps with Next.js/React, Node/Express, and MongoDB/MySQL.",
      "Implemented authentication/authorization and protected routes for admin dashboards.",
      "Used Docker locally to keep dev environments consistent across machines.",
      "Worked directly with clients to define requirements, ship iterations, and fix bugs quickly.",
    ],
  },
  {
    role: "Web Developer Lead & Treasurer",
    company: "TUM Developers Club",
    period: "2022 – 2024",
    bullets: [
      "Led student teams building web and Web3 projects and supported multiple hackathon builds.",
      "Ran workshops on Linux setup, web fundamentals, and smart contract basics.",
      "Helped coordinate community tech events with external partners.",
    ],
  },
];

const services = [
  {
    title: "Product Engineering",
    body: "I build web apps end-to-end: UI, data models, APIs, and deployment. My focus is clarity, reliability, and maintainable code.",
  },
  {
    title: "Backend & APIs",
    body: "I design REST APIs, database schemas, and background workflows. I’m comfortable with Node.js, Firebase, SQL/NoSQL, and serverless deployments.",
  },
  {
    title: "Payments & Integrations",
    body: "I integrate payment systems like M-Pesa (Daraja) and handle callbacks, reconciliation, and edge cases so payments are dependable.",
  },
];

function MyHome() {
  return (
    <div className="text-[16px] md:text-[17px] lg:text-[18px]">
      <div className="mx-auto">
        {/* HERO */}
        <section className="flex min-h-[82vh] flex-col justify-center text-center sm:mt-12 sm:min-h-fit sm:pt-14 lg:py-16 xl:pt-24">
          <h1
            className={`${helloFont.className} text-5xl font-extrabold tracking-tight sm:text-6xl`}
          >
            HELLO, I&apos;M{" "}
            <span className="text-indigo-600 dark:text-indigo-500">
              COLLINS RUTO
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[42rem] text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300 sm:text-xl">
            Full-stack software engineer based in Nairobi, Kenya — I build web apps,
            backend APIs, and payment integrations.
          </p>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/collinsruto.pdf"
              className="inline-flex items-center rounded bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700"
            >
              <Image
                src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/downloading-updates.png"
                className="mr-2 w-6"
                height={24}
                width={24}
                alt=""
              />
              Download Résumé
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              View Projects
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center rounded border border-transparent px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-slate-800"
            >
              Contact
            </a>
          </div>

          <div id="mouse-scroll" className="mx-auto mt-10 transform">
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

        {/* WHAT I DO */}
        <section className="relative bg-dark py-16 text-center text-accent">
          <h2
            className={`${headFont.className} mb-6 text-4xl font-bold`}
          >
            What I do
          </h2>

          <div className="services mx-auto flex flex-wrap justify-between gap-6 md:flex">
            {services.map((s) => (
              <div
                key={s.title}
                className="service mx-auto mb-2 max-w-xl grow rounded-xl bg-white/60 p-6 text-left shadow-sm backdrop-blur dark:bg-slate-900/40 md:w-1/3"
              >
                <h3
                  className={`${headFont.className} mb-3 text-2xl font-bold`}
                >
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/projects"
            className="btnn mt-8 inline-block rounded bg-black px-6 py-3 font-semibold text-white transition duration-300 hover:bg-opacity-90 dark:bg-white dark:text-black"
          >
            My Work
          </Link>
        </section>

        {/* ABOUT */}
        <section className="about--me py-16 text-dark">
          <div className="about-me flex items-center gap-6">
            <Image
              width={450}
              height={40}
              src="/img/26.webp"
              alt="collins"
              className="about-me__img rounded-l4 mx-auto hidden h-[26rem] shadow-md lg:block"
            />
            <div className="w-full">
              <div className="text-center">
                <h2
                  className={`${headFont.className} mb-3 text-4xl font-bold`}
                >
                  About
                </h2>
                <p className="mb-8 text-lg font-semibold text-gray-700 dark:text-gray-300 sm:text-xl">
                  I build reliable web products with clean UI, solid APIs, and practical deployments.
                </p>
              </div>

              <div className="mx-auto max-w-[52rem] space-y-4 text-left text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                <p>
                  Most of my work is full-stack: I design the UI, implement backend endpoints,
                  model data, and ship to production. I’m comfortable working in small teams,
                  reviewing PRs, and iterating fast when requirements change.
                </p>
                <p>
                  Recently I’ve focused on admin dashboards, event registration flows, and
                  payment integrations (including callback handling and edge cases) — because
                  “it works in production” matters more than fancy demos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE (NEW) */}
        <section className="py-16">
          <h2
            className={`${headFont.className} mb-8 text-center text-4xl font-bold`}
          >
            Experience
          </h2>

          <div className="mx-auto max-w-[58rem] space-y-6">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.role}`}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="text-base font-semibold text-gray-700 dark:text-gray-300 sm:text-lg">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                    {job.period}
                  </p>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="items-center py-16">
          <h2
            className={`${headFont.className} mb-8 text-center text-4xl font-bold`}
          >
            Projects
          </h2>

          <div className="mb-4 flex flex-wrap gap-4 py-4 sm:flex-row">
            {pinnedProjects.map((project, index) => (
              <div className="w-1/2 grow md:w-1/3 lg:w-1/4" key={index}>
                <PinnedCard project={project} />
              </div>
            ))}
          </div>

          <div className="flex w-full justify-center">
            <Link
              href="/projects"
              className="btnn mx-auto inline-block rounded bg-black px-6 py-3 font-semibold text-white transition duration-300 hover:bg-opacity-90 dark:bg-white dark:text-black"
            >
              See more projects
            </Link>
          </div>
        </section>

        {/* TOOLS */}
        <section className="py-16">
          <div className="mx-auto">
            <h2
              className={`${headFont.className} mb-8 text-center text-4xl font-bold`}
            >
              Tools
            </h2>

            <div className="flex flex-col gap-8">
              <div className="tools-container">
                <ul className="flex flex-wrap justify-center gap-4 md:justify-around">
                  {tools1.map((tool, index) => (
                    <li
                      key={index}
                      className="flex w-[10rem] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
                    >
                      <Image
                        width={50}
                        height={50}
                        src={tool.url}
                        alt={tool.alt}
                        className="mb-2 h-14 w-14"
                      />
                      <span className="text-center text-sm font-semibold sm:text-base">
                        {tool.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tools-container">
                <ul className="flex flex-wrap justify-center gap-4 md:justify-around">
                  {tools2.map((tool, index) => (
                    <li
                      key={index}
                      className="flex w-[10rem] flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800"
                    >
                      <Image
                        width={50}
                        height={50}
                        src={tool.url}
                        alt={tool.alt}
                        className="mb-2 h-14 w-14"
                      />
                      <span className="text-center text-sm font-semibold sm:text-base">
                        {tool.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default MyHome;
