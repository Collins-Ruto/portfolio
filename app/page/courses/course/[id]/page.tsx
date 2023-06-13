import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import type { Course } from "@prisma/client";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const data = await caller.course.getById(id);
  const course = data[0] as Course;

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: course.topic,
    openGraph: {
      images: [course.thumbnail_url, ...previousImages],
    },
    alternates: {
      canonical: `https://learnhq.vercel.app/learn/courses/course/${id}`,
    },
    authors: [
      {
        name: "Collins Ruto",
        url: "https://collinsruto.netlify.app/",
      },
    ],
    keywords: ["learnhq", course.subject.name, course.topic],
    twitter: { creator: "@ruto_collins_" },
  };
}

export default async function CoursePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const data = await caller.course.getById(id || "621dd16f2eece6ce9587cb0d");
  const course = data[0] as Course;
  console.log("course", data);

  function convertYouTubeURL(url: string): string {
    let videoId = "";

    // Check if URL format is "https://www.youtube.com/watch?v=v5SuSB_93FM&..."
    if (url.includes("youtube.com/watch")) {
      const searchParams = new URLSearchParams(new URL(url).search);
      videoId = searchParams.get("v") || "";
    }
    // Check if URL format is "https://youtu.be/v5SuSB_93FM"
    else if (url.includes("youtu.be/")) {
      videoId = url.split("/").pop() || "";
    }

    return `https://youtube.com/embed/${videoId}`;
  }

  const videoUrl = convertYouTubeURL(course.video_url);
  console.log(videoUrl);

  return (
    <div className="w-screen p-4 md:w-full">
      <div className="mb-4  flex flex-col">
        <span className="text-lg font-medium text-gray-500 ">{`Form ${course.form} : ${course.subject.name}`}</span>
        <span className="text-2xl font-semibold text-orange-800 ">{`Chapter ${course.unit_code}: ${course.topic}`}</span>
      </div>
      <div className="">
        <div className="mx-auto flex flex-col lg:w-[70%]">
          <div className="relative h-0 overflow-hidden pb-[56.25%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              width="560"
              height="315"
              src={videoUrl}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <span className="mt-2 text-xl text-blue-600">{course.title}</span>
          <span className="mt-2 text-xl text-gray-700">
            {course.description}
          </span>
        </div>
      </div>
    </div>
  );
}
