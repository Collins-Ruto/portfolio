import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Metadata } from "next";
import { RepositoryData } from "~/types/types";
import projects from "~/assets/sortedArray.json";
import ProjectIcon from "~/components/ProjectIcon";
import ThemeToogle from "~/components/ThemeToogle";

const Page = async () => {
  const data = await getServerSession(authOptions);

  console.log("user data", data);

  const ProjectCard = ({ project }: { project: RepositoryData }) => {
    return (
      <div className="flex h-full flex-col justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            {project.created_at.substring(0, 4)}
          </span>
          <Link
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
        <span className="text-xl ">{project.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </span>
        <div className="flex-end flex justify-between pt-4">
          {/* <Link href={project.html_url} className="rounded border px-2 py-1">
            Article
          </Link> */}
          <Link
            href={project.html_url}
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

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <main className=" md: py-4">
          <div className="flex items-center justify-between">
            <h1 className="py-6 text-5xl font-bold md:py-16">Projects</h1>
            <ThemeToogle />
          </div>
          <div className="md:flex-nowra flex flex-wrap gap-4 sm:flex-row">
            {projects.map((project, index) => (
              <div className="w-1/2 grow md:w-1/3 lg:w-1/4" key={index}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Projects",
};
