import "@/styles/globals.css";
import type { Metadata } from "next";
import projects from "~/assets/sortedArray2.json";
import pinnedProjects2 from "~/assets/pinnedProjects2.json";
import ThemeToogle from "~/components/ThemeToogle";
import { ProjectCard } from "~/components";
import { PinnedCard2 } from "~/components/ProjectCards";

export const metadata: Metadata = {
  title: "Projects",
};

const Page = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <main className=" md: py-4">
          <div className="flex items-center justify-between">
            <h1 className="py-6 text-5xl font-bold md:py-16">Projects</h1>
            <ThemeToogle place="projects-toogle" />
          </div>
          <div className="md:flex-nowra mb-4 flex flex-wrap gap-4 sm:flex-row">
            {pinnedProjects2.map((project, index) => (
              <div className="w-1/2 grow md:w-1/3 lg:w-1/4" key={index}>
                <PinnedCard2 project={project} />
              </div>
            ))}
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

