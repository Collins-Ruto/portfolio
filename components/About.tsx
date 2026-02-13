import React from "react";
import Link from "next/link";

export function AboutSection({
  headFontClassName = "",
}: {
  headFontClassName?: string;
}) {
  const chips = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "REST APIs",
    "Firebase",
    "MongoDB",
    "MySQL",
    "Docker",
    "Vercel",
    "CI/CD",
    "RBAC",
    "M-Pesa Daraja",
  ];

  const process = [
    {
      label: "Discovery",
      body: "I translate business requirements into technical specs. I focus on defining clear data models and API contracts before writing a single line of UI code.",
    },
    {
      label: "Architecture",
      active: true,
      body: "I build for scale and security. This means implementing type-safe communication (tRPC/TypeScript), secure RBAC, and cloud-native deployments.",
    },
    {
      label: "Build",
      body: "I specialize in the 'Heavy Lifting' complex backend logic, 3rd party integrations (M-Pesa/KCB), and building reusable frontend components.",
    },
    {
      label: "Optimize",
      body: "Software isn't done at 'Ship'. I monitor performance, fix edge-case bottlenecks, and ensure the SEO/UX meets production-grade standards.",
    },
  ];

  return (
    <section className="py-24 text-slate-900 transition-colors duration-500 dark:text-white">
      {/* BACKGROUND GLOW LAYER */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-20%] top-[5%] h-[400px] w-[140%] -rotate-12 rounded-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-[120px] dark:via-emerald-400/30" />
        <div className="absolute right-[-20%] top-[40%] h-[400px] w-[140%] rotate-12 rounded-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-[120px] dark:via-indigo-500/25" />
        <div className="absolute left-[-20%] top-[80%] h-[400px] w-[140%] -rotate-12 rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[120px] dark:via-cyan-500/25" />
      </div> */}

      {/* Hero Section */}
      <div className="mx-auto text-center">
        <span className="mb-6 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-indigo-400">
          Software Engineering
        </span>

        <h2
          className={`${headFontClassName} text-5xl font-extrabold leading-[1.1] md:text-7xl`}
        >
          Building{" "}
          <span className="block text-indigo-600 dark:text-indigo-500">
            Production-Ready
          </span>{" "}
          Web Systems.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
          I am a Full-stack software engineer focused on building reliable web
          applications, secure APIs, and real-world payment integrations (M-Pesa
          Daraja, KCB Buni). I design clean architectures that work in
          production not just demos.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-slate-200 bg-white/50 px-2 py-1 text-xs font-semibold shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-40">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            Technical Stack
          </span>
        </div>

        <h3 className={`${headFontClassName} mb-10 text-3xl font-bold`}>
          What I actually work with
        </h3>

        {/* Core Values Section */}
        <div className="grid  gap-6 md:grid-cols-3">
          {[
            {
              title: "Application Architecture",
              desc: "I design and ship full-stack web applications using React / Next.js and TypeScript. I focus on clear API boundaries, maintainable structure, and secure authentication flows with role-based access control.",
            },
            {
              title: "Payments & Transaction Systems",
              desc: "I build reliable payment integrations using M-Pesa (Daraja) and KCB Buni. I handle callbacks, prevent duplicate transactions, and design systems that remain stable under real-world usage.",
            },
            {
              title: "Deployment & Delivery",
              desc: "I deploy applications using Vercel and Firebase, with Docker-based development environments for consistency. I prioritize predictable releases and simple CI workflows.",
            },
            {
              title: "Database Design",
              desc: "I design schemas across MySQL, PostgreSQL, MongoDB, and Firebase with a focus on data integrity, query efficiency, and long-term maintainability.",
            },
            {
              title: "Authentication & Access Control",
              desc: "I implement secure authentication and authorization patterns using middleware and RBAC. My focus is protecting user data while keeping systems straightforward and understandable.",
            },
            {
              title: "Performance & Usability",
              desc: "I care about performance, accessibility, and clarity. I optimize for real-world usage thus faster load times, good SEO practices, and interfaces that simplify complex workflows.",
            },
          ].map((val, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border-2 border-slate-200 bg-white/40 p-4 backdrop-blur-xl transition-all hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-indigo-400/40"
            >
              <h4 className="mb-4 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {val.title}
              </h4>
              <p className="text-base text-slate-600 dark:text-white/70">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Process with Hover Effects */}
      <div className="mx-auto mt-32 ">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            Work Process
          </span>
        </div>

        <h3 className={`${headFontClassName} mb-10 text-3xl font-bold`}>
          How I ship features
        </h3>
        <div className="group grid gap-4 md:grid-cols-2">
          {process.map((step) => (
            <div
              key={step.label}
              className={[
                "group/inner relative flex flex-col justify-between rounded-xl  border p-8 transition-all duration-300",
                // everyone: dim on group hover, but the hovered card pops
                "hover:scale-[1.02] hover:!opacity-100 hover:shadow-xl group-hover:opacity-70",

                step.active
                  ? [
                      // DEFAULT highlighted (when nothing is hovered)
                      "scale-[1.02] border-indigo-400/50 bg-indigo-50 dark:border-indigo-400/30 dark:bg-indigo-400/10",

                      // when ANYTHING in the group is hovered, remove highlight (and dim)
                      "group-hover:scale-100 group-hover:border-slate-200 group-hover:bg-white/40 dark:group-hover:border-white/5 dark:group-hover:bg-white/[0.02]",

                      // if THIS active card is hovered, re-apply highlight
                      "hover:!scale-[1.02] hover:!border-indigo-400/50 hover:!bg-indigo-50 dark:hover:!border-indigo-400/30 dark:hover:!bg-indigo-400/10",
                    ].join(" ")
                  : [
                      // non-active defaults
                      "border-slate-200 bg-white/40 hover:!scale-[1.02] hover:!border-indigo-400/50 hover:border-indigo-400 hover:!bg-indigo-50 dark:border-white/5 dark:bg-white/[0.02] dark:hover:!border-indigo-400/30 dark:hover:!bg-indigo-400/10",
                    ].join(" "),
              ].join(" ")}
            >
              <div>
                <span
                  className={[
                    "mb-6 inline-block rounded-full px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest",
                    step.active
                      ? "bg-indigo-500 text-white group-hover:bg-slate-200"
                      : "bg-slate-200 text-black",
                    // optional: dim badges too when group hovered, but restore on hover
                    " group-hover/inner:!bg-indigo-500 group-hover/inner:!text-white group-hover:text-black group-hover/inner:!opacity-100 group-hover:opacity-70",
                  ].join(" ")}
                >
                  {step.label}
                </span>

                <p className="text-base font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials - Fixed Bottom Info */}
      <div className="mx-auto mt-32 ">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            Testimonials
          </span>
        </div>

        <h3 className={`${headFontClassName} mb-10 text-3xl font-bold`}>
          What collaborators say
        </h3>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {[
            {
              quote:
                "Collins built our event registration and payment system end-to-end. The M-Pesa integration handled callbacks reliably even under heavy load.",
              name: "Abiud Kigen",
              role: "Project Lead, EREF",
            },
            {
              quote:
                "He takes true ownership of backend architecture. APIs are clean, RBAC is structured properly, and deployments are seamless.",
              name: "Kiptoo Victor",
              role: "Full Stack Collaborator",
            },
            {
              quote:
                "Strong technical depth in Rust and Smart Contracts. He explains complex trade-offs clearly and delivers on time.",
              name: "Roy Maingi",
              role: "TUM Web Developers Chair",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border-2 border-slate-200 bg-white/40 p-6 backdrop-blur-xl transition-all hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-indigo-400/40"
            >
              <p className="text-lg italic leading-relaxed text-slate-700 dark:text-white/75">
                “{t.quote}”
              </p>
              <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10">
                <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                  {t.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/50">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 text-center">
        <Link
          href="/projects"
          className="rounded-full bg-indigo-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-indigo-700"
        >
          Explore My Projects
        </Link>
      </div>
    </section>
  );
}
