/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, type Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    emailVerified: new Date(),
    image: "https://"
  }
]

const adminData: Prisma.AdminCreateInput[] = [
      {
        "email": "johndoe@gmail.com",
        "name": "John Doe",
        "password": "$2a$10$ARdjEE3vZW1U5TfC7BiDke.0KTJKRB58FSAT5zjU2SvCB60oEEVl.",
        "phone": 711339134,
        "slug": "johndoe"
      },
      {
        "email": "jane@gmail.com",
        "name": "Jane Doe",
        "password": "$2a$10$ARdjEE3vZW1U5TfC7BiDke.0KTJKRB58FSAT5zjU2SvCB60oEEVl.",
        "phone": 746646235,
        "slug": "janedoe"
      },
      {
        "email": "elias@gmail.com",
        "name": "Elvis May",
        "password": "$2a$10$fslLdUnzc1S5XQgnBvwhtO.YtWYtCCrXdQGmjJs1iTKFFDI2ANZHS",
        "phone": 9877667676,
        "slug": "elvismay"
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
// const adminData: Prisma.AdminCreateInput[] = 
// const adminData: Prisma.AdminCreateInput[] = 

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  for (const u of streamData) {
    const stream = await prisma.stream.create({
      data: u,
    })
    console.log(`Created stream with id: ${stream.id}`)
  }

  for (const u of adminData) {
    const admin = await prisma.admin.create({
      data: u,
    })
    console.log(`Created admin with id: ${admin.id}`)
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