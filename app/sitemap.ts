import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
});

export default async function sitemap() {
    const baseUrl = "https://learnhq.vercel.app";

    const courses = await caller.course.getAll();
    const tasks = await caller.task.getAll();

    const courseUrls = courses.map((course) => ({
        url: `${baseUrl}/learn/courses/course/${course.id}`,
        lastModified: new Date(),
    }));
    const taskUrls = tasks.map((task) => ({
        url: `${baseUrl}/learn/tasks/task/${task.id}`,
        lastModified: new Date(),
    }));

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/login`, lastModified: new Date() },
        { url: `${baseUrl}/calender`, lastModified: new Date() },
        { url: `${baseUrl}/learn/courses`, lastModified: new Date() },
        { url: `${baseUrl}/learn/tasks`, lastModified: new Date() },

        ...courseUrls,
        ...taskUrls,
    ];
}