import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
});

export default async function sitemap() {
    const baseUrl = "https://collinsruto.vercel.app";

    const blogs = await caller.blog.getAll();
    // const projects = await caller.project.getAll();

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/blog/${blog.slug}`,
        lastModified: new Date(),
    }));
    // const projectUrls = projects.map((project) => ({
    //     url: `${baseUrl}/projects/project/${project.id}`,
    //     lastModified: new Date(),
    // }));

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/blogs`, lastModified: new Date() },
        { url: `${baseUrl}/projects`, lastModified: new Date() },
        { url: `${baseUrl}/about`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
        // { url: `${baseUrl}/projects`, lastModified: new Date() },

        ...blogUrls,
        // ...projectUrls,
    ];
}