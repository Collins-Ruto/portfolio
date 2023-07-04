import Link from "next/link";
import Image from "next/image";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Metadata } from "next";
import { RepositoryData } from "~/types/types";
import projects from "~/assets/sortedArray.json";

const Page = async () => {
  const data = await getServerSession(authOptions);

  console.log("user data", data);

  const ProjectCard = ({ project }: { project: RepositoryData }) => {
    return (
      <div className="flex h-full flex-col gap-2 rounded bg-gray-600 p-4">
        <div className="flex justify-between">
          <span className="text-yellow-300">
            {project.created_at.substring(0, 4)}
          </span>
          <span className="text-gray-400">{project.stargazers_count}</span>
        </div>
        <span className="text-xl font-bold">{project.name}</span>
        <span className="text-gray-400">{project.description}</span>
        <div className="flex"></div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
        <main className="container mx-auto px-4 py-4 md:flex">
          <h1>Projects</h1>
          <div className="md:flex-nowra flex flex-wrap gap-4 p-4 py-4 sm:flex-row">
            {projects.map((project, index) => (
              <div className="w-1/3 grow md:w-1/4" key={index}>
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
