export type Lesson = {
  node: {
    startTime: string
    endTime: string
    day: string,
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

export const DummyUser: User = {
  slug: "",
    name: "",
    type: "admin",
    stream: {
        slug: "",
    }
}