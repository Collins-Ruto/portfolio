/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, type Prisma } from '@prisma/client'
import { setTimeout } from 'timers/promises'

import { appRouter } from "@/server/api/root";
// import { prisma } from "@/server/db";

const prisma = new PrismaClient()

const caller = appRouter.createCaller({
  session: null,
  prisma: prisma,
});

const teacherData: Prisma.TeacherCreateInput[] = [
  {
    "email": "isaac@gmail.com",
    "gender": "Male",
    "joiningDate": "12-04-2023",
    "name": "Isaac Mayers",
    "password": "123isaac",
    "phone": "213124124",
    "slug": "123isaac",
    "dateOfBirth": "23-05-2002",
    "qualification": "Physics & Geography"
  },
  {
    "email": "fredrick@gmail.com",
    "gender": "Male",
    "joiningDate": "15-04-2023",
    "name": "Fredrick Dumont",
    "password": "8797fredrick",
    "phone": "21312412",
    "slug": "8797fredrick",
    "dateOfBirth": "02-05-2005",
    "qualification": "Chemistry & Mathematics"
  },
  {
    "email": "mavin@gmail.com",
    "gender": "Male",
    "joiningDate": "12-04-2023",
    "name": "Mavin Brates",
    "password": "4534mavin",
    "phone": "2343422",
    "slug": "4534mavin",
    "dateOfBirth": "23-05-1989",
    "qualification": "Mathematics and Physics"
  },
  {
    "email": "brenda1@gmail.com",
    "gender": "Female",
    "joiningDate": "12-04-2023",
    "name": "Brenda Hover",
    "password": "$2a$10$ARdjEE3vZW1U5TfC7BiDke.0KTJKRB58FSAT5zjU2SvCB60oEEVl.",
    "phone": "7234343",
    "slug": "4535brenda",
    "dateOfBirth": "20-05-1993",
    "qualification": "History and CRE"
  },
  {
    "email": "evans@gmail.com",
    "gender": "Male",
    "joiningDate": "12-04-2023",
    "name": "Evans Blue",
    "password": "$2a$10$K9dt1VVbkhAq.vZQa.0LJOmrxXFk9ELUSZGjegD6MeuD4kjve10sG",
    "phone": "764535232",
    "slug": "876evans",
    "dateOfBirth": "23-05-1987",
    "qualification": "Agriculture & Biology"
  },
  {
    "email": "erick@gmail.com",
    "gender": "Male",
    "joiningDate": "12-04-2022",
    "name": "Erick Bond",
    "password": "$2a$10$76VM6bBNZHDStsTBsjVzYO5cVnkP9XESvWML7v24xs5HssNRGazV2",
    "phone": "764535535",
    "slug": "878erick",
    "dateOfBirth": "23-05-1984",
    "qualification": "Business & Maths"
  },
  {
    "email": "judy@gmail.com",
    "gender": "Female",
    "joiningDate": "12-08-2023",
    "name": "Judy Sims",
    "password": "$2a$10$IHRukVRJB.2Bda4XMZ0saOvianyvdSKyp4hBlNo7S4QwQ4rNXJdBO",
    "phone": "76987322",
    "slug": "736judy",
    "dateOfBirth": "23-05-1992",
    "qualification": "English & Geography"
  },
  {
    "email": "loislane@gmail.com",
    "gender": "Female",
    "joiningDate": "12/6/2022",
    "name": "Lois Lane",
    "password": "$2a$10$AHtqJ.RwoA86PS3mXX6c8uI0NFJPGxtjGYcVjWJjmY/T.sZeu3p/a",
    "phone": "786543212",
    "slug": "lane",
    "dateOfBirth": "3/5/1980",
    "qualification": "maths and science"
  },
  {
    "email": "natalierobinson@yahoo.com",
    "gender": "Female",
    "joiningDate": "23-1-1988",
    "name": "Natalie Robinson",
    "password": "$2a$10$8enplFh7aClxiof4mDPPSOSo/f2g5FnAQIATpXLS4xYiRr28HzmMy",
    "phone": "736262718",
    "slug": "robinson",
    "dateOfBirth": "3/5/1980",
    "qualification": "biology and agriculture"
  },
  {
    "email": "justinwright@gmail.com",
    "gender": "Male",
    "joiningDate": "7-7-2011",
    "name": "Justin Wright",
    "password": "$2a$10$7v5fDG7cvFQn0IuTi9KVxuYgKF/gb0u57dYle3GqZcS.3WrcoD/be",
    "phone": "734764652",
    "slug": "justin",
    "dateOfBirth": "4-5-1970",
    "qualification": "history and kiswahili"
  }
]
const streamData: Prisma.StreamCreateInput[] = [
  {
    "name": "1 North",
    "slug": "1n"
  },
  {
    "name": "1 East",
    "slug": "1e"
  },
  {
    "name": "1 West",
    "slug": "1w"
  },
  {
    "name": "2 North",
    "slug": "2n"
  },
  {
    "name": "1 South",
    "slug": "1s"
  },
  {
    "name": "2 West",
    "slug": "2w"
  },
  {
    "name": "2 South",
    "slug": "2s"
  },
  {
    "name": "2 East",
    "slug": "2e"
  },
  {
    "name": "3 East",
    "slug": "3e"
  },
  {
    "name": "3 North",
    "slug": "3n"
  }
]
// const taskData: Prisma.TaskCreateInput[] = [
//       {
//         "name": "Geo Asg1",
//     "description": "Due next class",
//     "file": "",
//     "secure_url": "",
//     "asset_id": "",
//     "original_filename": "",
//         "subject": {
//           "name": "Geography",
//           "slug": "geo"
//         },
//         "stream": {
//           "connect": {"id": "641ca7dbbe8caf6d48376e4d"}
//         },
//         "teacher": {
//           "connect": {"id": "641dd5f1590da608c00b4e78"}
//         }
//       },
//       {
//         "name": "English Asg 2",
//         "description": "Due next class",
//         "file": "",
//         "secure_url": "",
//         "asset_id": "",
//         "original_filename": "",
//         "subject": {
//           "name": "English",
//           "slug": "eng"
//         },
//         "stream": {
//           "connect": {"id": "641ca7dcbe8caf6d48376e4e"}
//         },
//         "teacher": {
//           "connect": {"id": "641dd5f8590da608c00b4e7e"}
//         }
//       },
//       {
//         "name": "CRE Asg 4",
//         "description": "Due next week",
//         "subject": {
//           "name": "CRE",
//           "slug": "cre"
//         },
//         "stream": {
//           "connect": {"id": "641ca7debe8caf6d48376e4f"}
//         },
//         "teacher": {
//           "connect": {"id": "641dd5f5590da608c00b4e7b"}
//         }
//       },
//       {
//         "name": "agri Asg 5",
//         "description": "Due next week",
//         "subject": {
//           "name": "Agriculture",
//           "slug": "agri"
//         },
//         "stream": {
//           "connect": {"id": "641ca7dfbe8caf6d48376e50"}
//         },
//         "teacher": {
//           "connect": {"id": "641dd5fb590da608c00b4e80"}
//         }
//       },

//       {
//         "name": "Bio Asg 7",
//         "description": "Due next week",
//         "subject": {
//           "name": "Biology",
//           "slug": "bio"
//         },
//         "stream": {
//           "connect": {"id": "641ca7e0be8caf6d48376e51"}
//         },
//         "teacher": {
//           "connect": {"id": "641dd5fb590da608c00b4e80"}
//         }
//       }
//     ]
const examData: Prisma.ExamCreateInput[] = [
  {
    "name": "End Term 1",
    "examDate": "10-03-2020",
    "slug": "242021i",
    "term": "2021 I",
    "results": [
      { slug: "bio", marks: "74" },
      { slug: "bss", marks: "86" },
      { slug: "eng", marks: "69" },
      { slug: "geo", marks: "76" },
      { slug: "phy", marks: "54" },
      { slug: "chem", marks: "69" },
      { slug: "kisw", marks: "66" },
      { slug: "math", marks: " 67" }
    ],
    "student": {
      "connect": { "id": "641dd16d2eece6ce9587cb0c" }
    }
  },
  {
    "name": "End Term 1",
    "examDate": "10-03-2020",
    "slug": "252020i",
    "term": "2020 I",
    "results": [
      { slug: "bio", marks: "89" },
      { slug: "bss", marks: "69" },
      { slug: "eng", marks: "88" },
      { slug: "phy", marks: "68" },
      { slug: "agri", marks: "69" },
      { slug: "hist", marks: "78" },
      { slug: "kisw", marks: "79" },
      { slug: "math", marks: "78" }
    ],
    "student": {
      "connect": { "id": "641dd5d8590da608c00b4e69" }
    }
  },
  {
    "name": "End Term 1",
    "examDate": "10-03-2020",
    "slug": "282021i",
    "term": "2021 I",
    "results": [
      { slug: "bio", marks: "88" },
      { slug: "bss", marks: "75" },
      { slug: "eng", marks: "86" },
      { slug: "phy", marks: "79" },
      { slug: "chem", marks: "78" },
      { slug: "hist", marks: " 67" },
      { slug: "kisw", marks: "87" },
      { slug: "math", marks: "92" }
    ],
    "student": {
      "connect": { "id": "641dd16f2eece6ce9587cb0d" }
    }
  },
  {
    "name": "End Term 3",
    "examDate": "10-03-2020",
    "slug": "282021iii",
    "term": "2021 III",
    "results": [
      { slug: "bio", marks: " 67" },
      { slug: "bss", marks: "78" },
      { slug: "eng", marks: "75" },
      { slug: "phy", marks: "74" },
      { slug: "chem", marks: "76" },
      { slug: "hist", marks: "64" },
      { slug: "kisw", marks: "89" },
      { slug: "math", marks: "72" }
    ],
    "student": {
      "connect": { "id": "641dd5df590da608c00b4e6d" }
    }
  },
  {
    "name": "End Term 1",
    "examDate": "10-03-2020",
    "slug": "142021i",
    "term": "2021 I",
    "results": [

      { slug: "bio", marks: "76" },
      { slug: "bss", marks: "69" },
      { slug: "eng", marks: "78" },
      { slug: "phy", marks: "85" },
      { slug: "agri", marks: "86" },
      { slug: "chem", marks: "65" },
      { slug: "hist", marks: "68" },
      { slug: "kisw", marks: "77" },
      { slug: "math", marks: "67" }
    ],
    "student": {
      "connect": { "id": "641dd5e2590da608c00b4e6f" }
    }
  },
  {
    "name": "End Term 1",
    "examDate": "10-03-2020",
    "slug": "172021i",
    "term": "2021 I",
    "results": [
      { slug: "bio", marks: "86" },
      { slug: "bss", marks: "77" },
      { slug: "eng", marks: "78" },
      { slug: "phy", marks: "67" },
      { slug: "agri", marks: "66" },
      { slug: "chem", marks: "67" },
      { slug: "kisw", marks: "87" },
      { slug: "math", marks: "75" }
    ],
    "student": {
      "connect": { "id": "641dd16d2eece6ce9587cb0c" }
    }
  },
  {
    "name": "End Term 2",
    "examDate": "10-03-2020",
    "slug": "292021ii",
    "term": "2021 II",
    "results": [
      { slug: "bio", marks: "77" },
      { slug: "bss", marks: "77" },
      { slug: "eng", marks: " 67" },
      { slug: "geo", marks: "80" },
      { slug: "phy", marks: "89" },
      { slug: "agri", marks: "86" },
      { slug: "chem", marks: "68" },
      { slug: "kisw", marks: "92" },
      { slug: "math", marks: "78" }
    ],
    "student": {
      "connect": { "id": "641dd16f2eece6ce9587cb0d" }
    }
  }
]

// const adminData: Prisma.AdminCreateInput[] = 
const studentData = [{ "id": "641dd16d2eece6ce9587cb0c" }, { "id": "641dd16f2eece6ce9587cb0d" }, { "id": "641dd1712eece6ce9587cb0e" }, { "id": "641dd5d8590da608c00b4e69" }, { "id": "641dd5da590da608c00b4e6a" }, { "id": "641dd5db590da608c00b4e6b" }, { "id": "641dd5dd590da608c00b4e6c" }, { "id": "641dd5df590da608c00b4e6d" }, { "id": "641dd5e2590da608c00b4e6f" }, { "id": "641dd5e4590da608c00b4e70" }, { "id": "641dd5e5590da608c00b4e71" }, { "id": "641dd5e7590da608c00b4e72" }, { "id": "641dd5e9590da608c00b4e73" }, { "id": "641dd5eb590da608c00b4e74" }, { "id": "641dd5ec590da608c00b4e75" }, { "id": "641dd5ee590da608c00b4e76" }, { "id": "641dd5f0590da608c00b4e77" }]
const teacherIds = [{ "id": "641dd5f1590da608c00b4e78" }, { "id": "641dd5f2590da608c00b4e79" }, { "id": "641dd5f3590da608c00b4e7a" }, { "id": "641dd5f5590da608c00b4e7b" }, { "id": "641dd5f6590da608c00b4e7c" }, { "id": "641dd5f7590da608c00b4e7d" }, { "id": "641dd5f8590da608c00b4e7e" }, { "id": "641dd5fa590da608c00b4e7f" }, { "id": "641dd5fb590da608c00b4e80" }, { "id": "641dd5fc590da608c00b4e81" }]
const examIds = [{ "id": "641f07ab91a1902d2455bee2" }, { "id": "641f07ad91a1902d2455bee3" }, { "id": "641f07af91a1902d2455bee4" }, { "id": "641f07b091a1902d2455bee5" }, { "id": "641f07b291a1902d2455bee6" }, { "id": "641f07b491a1902d2455bee7" }, { "id": "641f07b591a1902d2455bee8" }]
const feeIds = [{ "id": "641deb971630a3915741cb66" }, { "id": "641deb981630a3915741cb67" }, { "id": "641deb9a1630a3915741cb68" }, { "id": "641deb9c1630a3915741cb69" }, { "id": "641deb9d1630a3915741cb6a" }, { "id": "641deb9f1630a3915741cb6b" }, { "id": "641deba11630a3915741cb6c" }, { "id": "641deba21630a3915741cb6d" }, { "id": "641deba41630a3915741cb6e" }, { "id": "641deba61630a3915741cb6f" }, { "id": "641deba81630a3915741cb70" }, { "id": "641deba91630a3915741cb71" }, { "id": "6443e866a71dba4b124ed87a" }]
const taskIds = [{ "id": "646cba28bfc1a0ce0f76ce6f" }, { "id": "646e13f3a7163b4ce0d86cce" }, { "id": "646e6e381b69baa93c5bb95e" }, { "id": "646e6f621b69baa93c5bb95f" }, { "id": "646e74d11b69baa93c5bb960" }, { "id": "646f6fed208eddbed304e068" }]

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

  const data = await caller.course.getAll();
  for (const u of data) {
    const entry = await prisma.course.update({
      where: { id: u.id },
      data: {deleted: false}
    })
    console.log(`updated entry with id: ${entry.id}`)
    await setTimeout(2000)
  }

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