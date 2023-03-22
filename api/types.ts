export type Lesson = {
  node: {
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
}

export type User = {
  slug: string
  name: string,
  type: string,
  stream: {
      slug: string
  }
}

export type Admin = {
  name: string
  password: string
  emai: string
  slug: string
  phone: number
}

export type Student = {
  dateOfBirth: string
  name: string
  email: string
  parent: string
  phone: number
  gender: string
  slug: string
  password: string
  stream: {
    slug: string
    name: string
  }
}
export type Teacher = {
  node: {dateOfBirth: string
  joiningDate: string
  name: string
  parent: string
  phone: number
  gender: string
  slug: string
  email: string
  password: string
  qualification: string}
}

export type Exam = {
  examDate: string
  name: string
  slug: string
  term: string
  results: string
  student: {
    name: string
    slug: string
  }
}

export type Fee = {
  name: string
  slug: string
  term: string
  type: string
  payday: string
  amount: string
  student: {
    name: string
    slug: string
    fees: {
      type: string
      amount: string
    }
    stream: {
      id: string
      name: string
      slug: string
    }
  }
}

export const DummyUser: User = {
  slug: "",
    name: "",
    type: "admin",
    stream: {
        slug: "",
    }
}