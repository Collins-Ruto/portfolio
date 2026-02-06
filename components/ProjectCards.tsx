import React from "react";
import ProjectIcon from "./ProjectIcon";
import Link from "next/link";
import Image from "next/image";
import type { RepositoryData } from "~/types/types";

export const ProjectCard = ({ project }: { project: RepositoryData }) => {
  return (
    <div className="flex h-full flex-col justify-between gap-2 rounded-lg border border-gray-200  bg-gray-50 p-5 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">
          {project.created_at.substring(0, 4)}
        </span>
        <Link
          target="_blank"
          rel="noopener"
          href={`${project.html_url}/stargazers`}
          className="lex-end flex justify-between text-gray-400 "
        >
          {project.stargazers_count}
          <Image
            width={100}
            height={45}
            alt="demo"
            className="ml-1 h-5 w-5"
            src="https://img.icons8.com/windows/32/FFAE00/star--v1.png"
          />
        </Link>
      </div>
      <Link
        target="_blank"
        rel="noopener"
        href={project.html_url}
        className="text-xl underline-offset-2 hover:underline"
      >
        {project.name}
      </Link>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {project.description}
      </span>
      <div className="flex flex-wrap items-center">
        {project.topics?.map((tag, index) => (
          <span
            key={index}
            className="uppercas m-[0.1rem] inline-block rounded-full bg-indigo-200 px-2 py-[0.15rem] text-xs font-semibold tracking-wide text-indigo-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex-end flex justify-between pt-1 font-medium">
        <Link
          target="_blank"
          rel="noopener"
          href={project.homepage == "" ? project.html_url : project.homepage}
          className="flex items-center rounded border px-2 py-1 dark:border-0 dark:bg-gray-800"
        >
          Demo
          <div className="ml-1 h-5 w-5">
            <ProjectIcon
              lighturl={
                "https://img.icons8.com/ios/25/000000/screensharing.png"
              }
              darkurl={"https://img.icons8.com/ios/25/FFFFFF/screensharing.png"}
            />
          </div>
        </Link>

        <Link
          target="_blank"
          rel="noopener"
          href={project.html_url}
          className="flex items-center rounded border px-2 py-1 dark:border-0 dark:bg-gray-800"
        >
          Source
          <div className="ml-1 h-4 w-4">
            <ProjectIcon
              lighturl={
                "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/external-share-ui-anggara-basic-outline-anggara-putra.png"
              }
              darkurl={
                "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/FFFFFF/external-share-ui-anggara-basic-outline-anggara-putra.png"
              }
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export const PinnedCard2 = ({ project }: { project: RepositoryData }) => {
  return (
    <div className="flex h-full flex-col rounded-md  border border-gray-200 bg-gray-50 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <Image
        width={600}
        height={200}
        alt="project | collins ruto"
        className="cover h-56 w-full  rounded-t-md"
        style={{ objectFit: "cover", justifyContent: "start" }}
        src={project.pin_url}
      />
      <div className="flex h-full flex-col justify-between p-3 ">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {project.created_at.substring(0, 4)}
          </span>
          <Link
            target="_blank"
            rel="noopener"
            href={`${project.html_url}/stargazers`}
            className=" flex justify-between text-gray-400 "
          >
            {project.stargazers_count}
            <Image
              width={100}
              height={45}
              alt="demo"
              className="ml-1 h-5 w-5"
              src="https://img.icons8.com/windows/32/FFAE00/star--v1.png"
            />
          </Link>
        </div>
        <Link
          target="_blank"
          rel="noopener"
          href={project.html_url}
          className="text-xl underline-offset-2 hover:underline"
        >
          {project.name}
        </Link>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </span>
        <div className="justify-cente flex flex-wrap items-center py-1">
          {project.topics?.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="uppercas m-[0.1rem] inline-block rounded-full bg-indigo-200 px-2 py-[0.15rem] text-xs font-semibold tracking-wide text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex-end pt- flex justify-between font-medium">
          <Link
            target="_blank"
            rel="noopener"
            href={project.homepage == "" ? project.html_url : project.homepage}
            className="flex items-center rounded border px-2 py-1 dark:border-0 dark:bg-gray-800"
          >
            Demo
            <div className="ml-1 h-5 w-5">
              <ProjectIcon
                lighturl={
                  "https://img.icons8.com/ios/25/000000/screensharing.png"
                }
                darkurl={
                  "https://img.icons8.com/ios/25/FFFFFF/screensharing.png"
                }
              />
            </div>
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href={project.html_url}
            className="flex items-center rounded border px-2 py-1 dark:border-0 dark:bg-gray-800"
          >
            Source
            <div className="ml-1 h-4 w-4">
              <ProjectIcon
                lighturl={
                  "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/external-share-ui-anggara-basic-outline-anggara-putra.png"
                }
                darkurl={
                  "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/FFFFFF/external-share-ui-anggara-basic-outline-anggara-putra.png"
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};


export const PinnedCard = ({ project }: { project: RepositoryData }) => {
  return (
    <div className="group flex h-full w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      {/* Top Section: Brand Header */}
      <div className="flex flex-col items-center justify-center gap-2 px-4 pb-4 pt-4">
        <div className="size-10 flex w-full items-center justify-between rounded-full text-blue-500">
          <div className="relative h-11 w-fit items-start flex-grow">
            <Image
              alt={project.name}
              fill
              className="!w-fit object-contain"
              src={project.logo || "/img/photo.png"}
            />
          </div>
          <h2 className="rounded-full border border-slate-200 bg-blue-500/10 px-4 py-1 text-sm font-semibold shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            {project.created_at.substring(0, 4)}
          </h2>
        </div>
      </div>

      {/* Middle Section: Floating Screenshot */}
      <div className="px-4 pb-4">
        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/10 opacity-25 blur transition duration-500 group-hover:opacity-50"></div>

          {/* The "Floating" Screenshot */}
          <Link
            href={project.homepage || project.html_url}
            target="_blank"
            className="relative block aspect-video transform overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg transition-transform duration-500 group-hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-800"
          >
            <Image
              alt={project.name}
              fill
              className="object-contain"
              src={project.pin_url}
            />
          </Link>
        </div>
      </div>

      {/* Bottom Section: Info Footer */}
      <div className="mt-aut h-full rounded-t-xl flex flex-col justify-between border-t border-slate-100 bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:border-slate-700/50 dark:bg-slate-800">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link
              href={project.html_url}
              target="_blank"
              className="text-lg font-bold leading-tight text-slate-900 transition-colors hover:!text-blue-500 dark:text-white"
            >
              {project.name}
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
              {project.stargazers_count}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {project.description ||
              "No description provided for this repository."}
          </p>
        </div>

        {/* Tags/Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.topics?.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex-end flex justify-between pt-2 font-medium">
          <Link
            target="_blank"
            rel="noopener"
            href={project.homepage == "" ? project.html_url : project.homepage}
            className="flex items-center rounded border border-slate-200 bg-indigo-300/10 px-2 py-1 shadow-sm backdrop-blur-md hover:bg-indigo-100 dark:border-0 dark:border-white/20 dark:bg-white/10 dark:hover:bg-indigo-700"
          >
            Demo
            <div className="ml-1 h-4 w-4">
              <ProjectIcon
                lighturl={
                  "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/external-share-ui-anggara-basic-outline-anggara-putra.png"
                }
                darkurl={
                  "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/FFFFFF/external-share-ui-anggara-basic-outline-anggara-putra.png"
                }
              />
            </div>
          </Link>
          <Link
            target="_blank"
            rel="noopener"
            href={project.html_url}
            className="flex items-center rounded border border-slate-200 bg-indigo-300/10 px-2 py-1 shadow-sm backdrop-blur-md hover:bg-indigo-100 dark:border-0 dark:border-white/20 dark:bg-white/10 dark:hover:bg-indigo-700"
          >
            Source
            <div className="ml-1 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};