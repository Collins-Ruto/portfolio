export type Lesson = {
    startTime: string
    endTime: string
    day: string,
    id:string
    stream: {
      slug: string
      name: string
    }
    teacher: {
      slug: string
      name: string
    }
    subject: {
      name: string
    }
}

export type User = {
  slug: string
  name: string
  type: string
  email: string
  phone: string
  password: string
  oldPassword: string
  stream: Stream
}

export type Admin = {
  name: string
  password: string
  emai: string
  slug: string
  phone: number
}

export interface Student = {
  dateOfBirth: string
  name: string
  parent: string
  gender: string
  slug: string
  email: string
  phone: string
  password: string
  stream: Stream
}

export type Student = {
  dateOfBirth: string
  name: string
  parent: string
  gender: string
  slug: string
  email: string
  phone: string
  password: string
  stream: Stream
}

export type Teacher = {
  dateOfBirth: string
  joiningDate: string
  name: string
  phone: string
  gender: string
  slug: string
  email: string
  password: string
  qualification: string
}

export type Exam = {
  examDate: string
  name: string
  slug: string
  term: string
  results: JSON
  student: Student
}

export type Fee = {
  name: string
  slug: string
  term: string
  type: string
  payday: string
  amount: string
  studentId: string
  student: Student | undefined
}

export type Stream = {
      id: string
      name: string
      slug: string
    }

export type Search = {
  name: string
  id: string
}

export type Result = {
    slug:   string
    marks:  string
}

export const DummyUser: User = {
  slug: "",
    name: "",
    type: "admin",
    email: "",
    phone: "",
    password: "",
    oldPassword: "",
    stream: {
      id: "",
      name: "",
      slug: "",
    }
}

export type Subject = {
  name: string
  slug: string
}

export const Subjects: Subject[] =  [
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