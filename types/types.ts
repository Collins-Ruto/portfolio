import type { User } from "@prisma/client"

export type Search = {
  form: string,
  subject: Subject,
  search: string
}

export type Result = {
  slug: string
  marks: string
}

export const DummyUser: User = {
  id:"",
  slug: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  streamId: "",
  emailVerified: ("") as unknown as Date,
  image: ""
}

export type Subject = {
  name: string
  slug: string
}

export const Subjects: Subject[] = [
  {
    "name": "Chemistry",
    "slug": "chem"
  },
  {
    "name": "Biology",
    "slug": "bio"
  },
  {
    "name": "Maths",
    "slug": "math"
  },
  {
    "name": "English",
    "slug": "eng"
  },
  {
    "name": "Kiswahili",
    "slug": "kisw"
  },
  {
    "name": "Physics",
    "slug": "phy"
  },
  {
    "name": "Bussiness",
    "slug": "bss"
  },
  {
    "name": "Agriculture",
    "slug": "agri"
  },
  {
    "name": "History",
    "slug": "hist"
  },
  {
    "name": "Geography",
    "slug": "geo"
  },
  {
    "name": "CRE",
    "slug": "cre"
  },
  {
    "name": "Music",
    "slug": "msc"
  }
]
