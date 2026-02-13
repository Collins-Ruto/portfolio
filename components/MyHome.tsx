import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tools1, tools2 } from "~/assets/homedata";
import "~/styles/themetoogle.css";
import localFont from "@next/font/local";
import pinnedProjects from "~/assets/pinnedProjects2.json";
import { Contact, PinnedCard } from ".";
import { FloatingSocialBar } from "./FloatingSocials";

interface Experience {
  role: string;
  company: string;
  period: string;
  year?: string; // Optional property
  bullets: string[];
}

const helloFont = localFont({
  src: "../assets/fonts/Open_Sans/static/OpenSans-ExtraBold.ttf",
  display: "fallback",
});

const headFont = localFont({
  src: "../assets/fonts/Saira/static/Saira-Medium.ttf",
  display: "fallback",
});

const experiences: Experience[] = [
  {
    role: "Software Engineer / Full Stack Developer",
    company: "Eldama Ravine Education Foundation (EREF)",
    period: "May 2024 – Present",
    bullets: [
      "Architected an event registration and foundation management system using Next.js and Firebase, automating complex administrative workflows.",
      "Engineered secure payment integrations for M-Pesa (Daraja) and KCB Buni, ensuring reliable real-time callback handling and transaction reconciliation.",
      "Optimized application performance and SEO on Vercel, resulting in significantly faster page loads and improved search visibility.",
      "Collaborated in an Agile environment using PR reviews and weekly sprints to maintain high code quality.",
    ],
  },
  {
    role: "Freelance Software Engineer",
    company: "Self-employed",
    period: "2022 – 2024",
    bullets: [
      "Delivered full-stack applications leveraging Next.js, Node.js, and MongoDB/MySQL for diverse client needs.",
      "Implemented robust authentication, authorization, and protected admin dashboards to ensure data security.",
      "Standardized development environments across machines using Docker to streamline deployment and local testing.",
      "Managed the full software lifecycle, from requirements gathering with stakeholders to rapid iterative shipping.",
    ],
  },
  {
    role: "Web Developer Lead & Treasurer",
    company: "TUM Developers Club",
    period: "2022 – 2024",
    bullets: [
      "Directed student development teams on web and Web3 initiatives, contributing to three regional hackathon victories.",
      "Facilitated technical workshops on Linux administration, modern web fundamentals, and Rust smart contracts.",
      "Coordinated with industry partners like AWS and Google to organize community technology events.",
    ],
  },
];

function MyHome() {
  return (
    <div className="text-[16px] md:text-[17px] lg:text-[18px]">
      <div className="mx-auto">
        <div className="flex py-4 ">
          <FloatingSocialBar />
          <div className="container mx-auto max-w-7xl">
            {/* HERO SECTION */}
            <section className=" flex h-[82vh] flex-col justify-center text-center sm:mt-12 sm:h-fit sm:pt-14 md:px-0 lg:py-16 xl:h-fit xl:pt-24 ">
              <h1
                className={`${helloFont.className} text-6xl font-extrabold uppercase tracking-tight md:text-6xl`}
              >
                HELLO, I&apos;M{" "}
                <span className="text-indigo-600 dark:text-indigo-500">
                  COLLINS RUTO
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-[35rem] pt-4 text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                Full-Stack Software Engineer
              </p>
              <div className="my-2 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                  {/* icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Nairobi, Kenya
                </div>
              </div>

              <p className="mx-auto max-w-[32rem] pb-4 text-lg font-medium text-gray-600 dark:text-gray-400">
                3+ years of experience designing and maintaining scalable web
                applications, secure payment systems, and blockchain solutions.
              </p>
              <div className="my-12 flex justify-center gap-4">
                <a
                  href="https://raw.githubusercontent.com/Collins-Ruto/collins-ruto.github.io/main/collinsruto.pdf"
                  className="flex items-center rounded bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-700"
                >
                  <Image
                    src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/downloading-updates.png"
                    className="mr-1 w-6 "
                    height={100}
                    width={100}
                    alt=""
                  />
                  Résumé
                </a>
                <Link
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/collins-ruto"
                  type="button"
                  aria-label="collins ruto github"
                  className="h-12 w-12 rounded uppercase leading-normal text-indigo-500 transition-all duration-150 ease-in-out hover:border-none hover:border-gray-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-0 dark:text-indigo-200"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/in/collins-ruto"
                  type="button"
                  aria-label="collins ruto linkedin "
                  className="h-12 w-12 rounded uppercase leading-normal text-indigo-500 transition-all duration-150 ease-in-out hover:border-none hover:border-gray-500 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-0 dark:text-indigo-200"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-full w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
              </div>
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

            {/* EXPERIENCE SECTION */}
            <section className="rounded-xl bg-gray-50 px-4 py-16  dark:bg-slate-900/50 max-md:px-0">
              <h2
                className={`${headFont.className} mb-12 text-center text-4xl font-bold`}
              >
                Professional Experience
              </h2>

              <div className="mx-auto max-w-4xl space-y-10">
                {experiences.map((exp, idx) => {
                  // Prefer an explicit year if you have one; else try to grab a 4-digit year from period.
                 const year =
                   exp.year ?? exp.period?.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";

                  return (
                    <div key={idx} className="flex gap-6">
                      {/* Left timeline rail */}
                      <div className="relative flex flex-col items-center max-md:hidden">
                        {/* Year pill */}
                        <span className="mb-3 rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-white shadow-sm dark:bg-slate-600">
                          {year}
                        </span>

                        {/* Dot */}
                        <span className="relative z-10 h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_0_6px_rgba(251,191,36,0.20)] dark:shadow-[0_0_0_6px_rgba(251,191,36,0.18)]" />

                        {/* Vertical line to next item */}
                        {
                          <span className="mt-3 w-px flex-1 bg-slate-300 dark:bg-slate-700" />
                        }
                      </div>

                      {/* Right content card */}
                      <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm  dark:border-slate-700 dark:bg-slate-900 max-md:px-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {exp.role}
                            </h3>
                            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                              {exp.company}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {exp.period}
                          </p>
                        </div>

                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                          {exp.bullets.map((bullet: string, i: number) => (
                            <li key={i} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TECHNICAL PROFILE SECTION */}
            <section className="about--me text-dark py-24">
              <div className="about-me mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 max-md:px-0 lg:flex-row">
                <Image
                  width={400}
                  height={400}
                  src="/img/26.webp" // Ensure this path is correct in your public folder
                  alt="Collins Ruto"
                  className="h-[30rem] w-full rounded-2xl object-cover shadow-2xl lg:w-1/2"
                />
                <div className="lg:w-1/2">
                  <h2
                    className={`${headFont.className} mb-6 text-4xl font-bold`}
                  >
                    Technical Profile
                  </h2>
                  <div className="space-y-6 text-gray-700 dark:text-gray-300">
                    {/* Marine Engineering Narrative */}
                    <p className="border-l-4 border-indigo-500 bg-indigo-500/5 py-2 pl-4 text-lg italic leading-relaxed">
                      I am a Software Engineer with a background in{" "}
                      <strong>Marine Engineering</strong> from the Technical
                      University of Mombasa. This unique transition has equipped
                      me with a rigorous approach to system architecture,
                      technical accountability, and the ability to operate under
                      strict safety and compliance standards.
                    </p>

                    {/* Product Engineering */}
                    <div>
                      <h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Product Engineering
                      </h4>
                      <p>
                        I build web applications end-to-end: UI, data models,
                        APIs, and deployment. My focus is on clarity,
                        reliability, and writing maintainable code that scales.
                      </p>
                    </div>

                    {/* Backend & APIs */}
                    <div>
                      <h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Backend & APIs
                      </h4>
                      <p>
                        I design REST APIs, database schemas, and background
                        workflows. I am proficient in Node.js, Firebase,
                        SQL/NoSQL, and serverless deployments via Vercel.
                      </p>
                    </div>

                    {/* Payments & Integrations */}
                    <div>
                      <h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Payments & Integrations
                      </h4>
                      <p>
                        Experienced in integrating payment systems like{" "}
                        <strong>M-Pesa (Daraja)</strong> and{" "}
                        <strong>KCB Buni</strong>. I handle real-time callbacks,
                        reconciliation, and edge cases to ensure payments are
                        dependable and secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section className="py-16">
              <h2
                className={`${headFont.className} mb-8 text-center text-4xl font-bold text-slate-900 dark:text-white`}
              >
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pinnedProjects.map((project, index) => (
                  <div
                    key={index}
                    className="transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <PinnedCard project={project} />
                  </div>
                ))}
              </div>
              <div className="mt-12 flex w-full justify-center">
                <Link
                  href="/projects"
                  className="rounded-full border-2 border-black px-8 py-3 font-semibold transition duration-300 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  Explore Full Portfolio
                </Link>
              </div>
            </section>

            {/* TOOLS SECTION */}
            <section className="tools py-16">
              <h2
                className={` ${headFont.className} mb-12 text-center text-4xl font-bold`}
              >
                Technical Stack
              </h2>
              <div className="toolbox-wrapper flex flex-col gap-8">
                {[tools1, tools2].map((toolSet, i) => (
                  <ul key={i} className="flex flex-wrap justify-center gap-4">
                    {toolSet.map((tool, index) => (
                      <li
                        key={index}
                        className="flex w-32 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-slate-800"
                      >
                        <Image
                          width={40}
                          height={40}
                          src={tool.url}
                          alt={tool.alt}
                          className="mb-2 h-10 w-10"
                        />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {tool.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </section>

            <section>
              <Contact />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHome;
