/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, type Prisma } from '@prisma/client'
// import { setTimeout } from 'timers/promises'

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

  // for (const u of examData) {
  //   const exam = await prisma.exam.create({
  //     data: u,
  //   })
  //   console.log(`Created exam with id: ${exam.id}`)
  // }

  // const data = await caller.course.getAll();
  // for (const u of data) {
  //   const entry = await prisma.course.update({
  //     where: { id: u.id },
  //     data: {deleted: false}
  //   })
  //   console.log(`updated entry with id: ${entry.id}`)
  //   await setTimeout(2000)
  // }

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