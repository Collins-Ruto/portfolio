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
      tone: "default" as const,
      body: "Clarify the goal, users, and constraints. I translate requirements into a simple data model, API surface, and a delivery plan (MVP → iteration).",
    },
    {
      label: "Architecture",
      tone: "active" as const,
      body: "Pick the smallest architecture that survives production: clean routes, clear data ownership, secure auth (RBAC), and observability-friendly endpoints.",
    },
    {
      label: "Build",
      tone: "default" as const,
      body: "Implement UI + backend together, integrate payments if needed, handle edge cases (callbacks, retries), and keep changes reviewable with PRs.",
    },
    {
      label: "Ship & Maintain",
      tone: "default" as const,
      body: "Deploy on Vercel/serverless, automate checks where possible (CI/CD), and improve performance + SEO based on real usage.",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-16 dark:text-white">
      {/* BACKGROUND GLOW LAYER */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Main snake ribbon - increased opacity and narrowed blur for visibility */}
        <div
          className="
            absolute left-[-30%] top-[10%]
            h-[300px] w-[160%]
            -rotate-12
            rounded-full
            bg-gradient-to-r
            from-transparent via-emerald-400/40 to-transparent
            blur-[100px]
          "
        />
        {/* Secondary depth ribbon */}
        <div
          className="
            absolute left-[-40%] top-[45%]
            h-[250px] w-[170%]
            -rotate-12
            rounded-full
            bg-gradient-to-r
            from-transparent via-indigo-500/30 to-transparent
            blur-[120px]
          "
        />
        {/* Adjusted vignette: lighter center to allow glow to show through */}
        <div className="absolute inset-0 bg-gradient-to-b " />
      </div>

      {/* Header pill */}
      <div className="mb-10 flex justify-center">
        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/50 text-[10px]">
            ↓
          </span>
          Technical Profile
        </span>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className={`${headFontClassName} text-4xl font-extrabold leading-tight md:text-5xl`}
        >
          I build{" "}
          <span className="rounded border border-indigo-500/30 bg-indigo-600/30 px-2 py-1">
            full-stack web apps
          </span>{" "}
          with{" "}
          <span className="rounded border border-emerald-500/30 bg-emerald-600/30 px-2 py-1">
            secure APIs
          </span>{" "}
          and{" "}
          <span className="rounded border border-amber-500/30 bg-amber-600/30 px-2 py-1">
            payment integrations
          </span>
          .
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/80 dark:text-white/80 md:text-lg">
          Full-stack software engineer with experience building and maintaining
          Next.js/Node applications, database-backed APIs, and M-Pesa Daraja +
          KCB Buni payment flows, deployed on Vercel with Docker-based dev
          workflows.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-black/90 dark:text-white/90 backdrop-blur-md"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/projects"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition hover:bg-white/90"
          >
            View Projects
          </Link>
          <a
            href="#contact"
            className="rounded-full border border-white/30 bg-white/5 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Process block */}
      <div className="mx-auto mt-14 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 backdrop-blur-xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            Work Process
          </span>
        </div>

        <h3 className={`${headFontClassName} mb-10 text-3xl font-bold`}>
          How I ship features
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {process.map((step) => {
            const active = step.tone === "active";
            return (
              <div
                key={step.label}
                className={[
                  "rounded-2xl border p-6 transition-all",
                  active
                    ? "border-emerald-400/50 bg-emerald-400/10 text-white"
                    : "border-white/5 bg-white/[0.02] text-black/80 dark:text-white/80",
                ].join(" ")}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={[
                      "rounded-full px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider",
                      active
                        ? "bg-emerald-400 text-black"
                        : "border border-white/20 bg-white/5 text-black/70 dark:text-white/70",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto mt-20 max-w-5xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            Testimonials
          </span>
        </div>

        <h3 className={`${headFontClassName} mb-10 text-3xl font-bold`}>
          What collaborators say
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Collins built our event registration and payment system end-to-end. The M-Pesa integration handled callbacks reliably.",
              name: "Project Lead",
              role: "EREF Foundation",
            },
            {
              quote:
                "He takes ownership of backend architecture. APIs were clean, auth was structured properly, and deployments were smooth.",
              name: "Team Member",
              role: "Freelance Collaboration",
            },
            {
              quote:
                "Strong technical depth—especially around integrating smart contracts. He explains trade-offs clearly.",
              name: "Developer Peer",
              role: "Web3 / NEAR Project",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-emerald-400/30 hover:bg-white/[0.05]"
            >
              {/* Individual card glow on hover */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              <p className="text-sm italic leading-relaxed text-black/75 dark:text-white/75">
                “{t.quote}”
              </p>
              <div className="mt-6">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-black/50 dark:text-white/50">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
