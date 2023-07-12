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

export const PinnedCard = ({ project }: { project: RepositoryData }) => {
  return (
    <div className="flex h-full flex-col rounded-md  border border-gray-200 bg-gray-50 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <Image
        width={600}
        height={200}
        alt="project | collins ruto"
        className="cover h-40 w-full  rounded-t-md"
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
          {project.topics?.slice(0, 4).map((tag, index) => (
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
