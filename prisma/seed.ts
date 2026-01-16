/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, type Prisma } from '@prisma/client'
// import { setTimeout } from 'timers/promises'
import blogs from '../assets/blogs.json'
import pinnedProjects from '../assets/pinnedProjects2.json'
import projects from '../assets/sortedArray2.json'

// import { appRouter } from "@/server/api/root";
// import { prisma } from "@/server/db";

const prisma = new PrismaClient()

// const caller = appRouter.createCaller({
//   session: null,
//   prisma: prisma,
// });


// const adminData: Prisma.AdminCreateInput[] = 

async function main() {
  console.log(`Start seeding ...`)

  // for (const u of taskData) {
  //   const task = await prisma.task.create({
  //     data: u,
  //   })
  //   console.log(`Created task with id: ${task.id}`)
  // }

  // for (const u of pinnedProjects) {
  //   const entry = await prisma.pinnedProject.create({
  //     data: u,
  //   })
  //   console.log(`Created entry with id: ${entry.id}`)
  //   //  setTimeout(2000)
  // }

  // const data = await caller.course.getAll();
  // for (const u of blogs) {
  //   const entry = await prisma.blog.upsert({
  //     where: { slug: u.slug },
  //     update: u,
  //     create: u
  //   })
  //   console.log(`updated entry with id: ${entry}`)
  //   // await setTimeout(2000)
  // }

  // await prisma.blog.delete({
  //   where: {
  //     slug: "add-google-analytics-to-nextjs-134-app-dir-51c5",
  //   },
  // });

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })