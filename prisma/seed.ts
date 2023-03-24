/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, type Prisma } from '@prisma/client'

const prisma = new PrismaClient()

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
const streamData: Prisma.StreamCreateInput[] =  [
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
const taskData: Prisma.TaskCreateInput[] = [
      {
        "name": "Geo Asg1",
        "description": "Due next class",
        "subject": {
          "name": "Geography",
          "slug": "geo"
        },
        "stream": {
          "connect": {"id": "641ca7dbbe8caf6d48376e4d"}
        },
        "teacher": {
          "connect": {"id": "641dd5f1590da608c00b4e78"}
        }
      },
      {
        "name": "English Asg 2",
        "description": "Due next class",
        "subject": {
          "name": "English",
          "slug": "eng"
        },
        "stream": {
          "connect": {"id": "641ca7dcbe8caf6d48376e4e"}
        },
        "teacher": {
          "connect": {"id": "641dd5f8590da608c00b4e7e"}
        }
      },
      {
        "name": "CRE Asg 4",
        "description": "Due next week",
        "subject": {
          "name": "CRE",
          "slug": "cre"
        },
        "stream": {
          "connect": {"id": "641ca7debe8caf6d48376e4f"}
        },
        "teacher": {
          "connect": {"id": "641dd5f5590da608c00b4e7b"}
        }
      },
      {
        "name": "agri Asg 5",
        "description": "Due next week",
        "subject": {
          "name": "Agriculture",
          "slug": "agri"
        },
        "stream": {
          "connect": {"id": "641ca7dfbe8caf6d48376e50"}
        },
        "teacher": {
          "connect": {"id": "641dd5fb590da608c00b4e80"}
        }
      },
      
      {
        "name": "Bio Asg 7",
        "description": "Due next week",
        "subject": {
          "name": "Biology",
          "slug": "bio"
        },
        "stream": {
          "connect": {"id": "641ca7e0be8caf6d48376e51"}
        },
        "teacher": {
          "connect": {"id": "641dd5fb590da608c00b4e80"}
        }
      }
    ]
const examData: Prisma.ExamCreateInput[] = [
      {
        "name": "End Term 1",
        "examDate": "10-03-2020",
        "slug": "242021i",
        "term": "2021 I",
        "results": {
          "bio": 74,
          "bss": 86,
          "eng": 69,
          "geo": 76,
          "phy": 54,
          "chem": 69,
          "kisw": 66,
          "math": 67
        },
        "student": {
          "connect": {"id": "641dd16d2eece6ce9587cb0c"}
        }
      },
      {
        "name": "End Term 1",
        "examDate": "10-03-2020",
        "slug": "252020i",
        "term": "2020 I",
        "results": {
          "bio": 89,
          "bss": null,
          "eng": 88,
          "phy": 68,
          "agri": 69,
          "hist": 78,
          "kisw": 79,
          "math": 78
        },
        "student": {
          "connect": {"id": "641dd5d8590da608c00b4e69"}
        }
      },
      {
        "name": "End Term 1",
        "examDate": "10-03-2020",
        "slug": "282021i",
        "term": "2021 I",
        "results": {
          "bio": 88,
          "bss": 75,
          "eng": 86,
          "phy": 79,
          "chem": 78,
          "hist": 67,
          "kisw": 87,
          "math": 92
        },
        "student": {
          "connect": {"id": "641dd16f2eece6ce9587cb0d"}
        }
      },
      {
        "name": "End Term 3",
        "examDate": "10-03-2020",
        "slug": "282021iii",
        "term": "2021 III",
        "results": {
          "bio": 67,
          "bss": 78,
          "eng": 75,
          "phy": 74,
          "chem": 76,
          "hist": 64,
          "kisw": 89,
          "math": 72
        },
        "student": {
          "connect": {"id": "641dd5df590da608c00b4e6d"}
        }
      },
      {
        "name": "End Term 1",
        "examDate": "10-03-2020",
        "slug": "142021i",
        "term": "2021 I",
        "results": {
          
          "bio": 76,
          "bss": null,
          "eng": 78,
          "phy": 85,
          "agri": 86,
          "chem": 65,
          "hist": 68,
          "kisw": 77,
          "math": 67
        },
        "student": {
          "connect": {"id": "641dd5e2590da608c00b4e6f"}
        }
      },
      {
        "name": "End Term 1",
        "examDate": "10-03-2020",
        "slug": "172021i",
        "term": "2021 I",
        "results": {
          
          "bio": 86,
          "bss": 77,
          "eng": 78,
          "phy": 67,
          "agri": 66,
          "chem": 67,
          "kisw": 87,
          "math": 75
        },
        "student": {
          "connect": {"id": "641dd16d2eece6ce9587cb0c"}
        }
      },
      {
        "name": "End Term 2",
        "examDate": "10-03-2020",
        "slug": "292021ii",
        "term": "2021 II",
        "results": {
          "bio": 77,
          "bss": 77,
          "eng": 67,
          "geo": 80,
          "phy": 89,
          "agri": null,
          "chem": 68,
          "kisw": 92,
          "math": 78
        },
        "student": {
          "connect": {"id": "641dd16f2eece6ce9587cb0d"}
        }
      }
    ]

// const adminData: Prisma.AdminCreateInput[] = 

async function main() {
  console.log(`Start seeding ...`)

  for (const u of taskData) {
    const task = await prisma.task.create({
      data: u,
    })
    console.log(`Created task with id: ${task.id}`)
  }

  for (const u of examData) {
    const exam = await prisma.exam.create({
      data: u,
    })
    console.log(`Created exam with id: ${exam.id}`)
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