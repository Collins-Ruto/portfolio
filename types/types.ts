export type RepositoryData = {
  name: string;
  html_url: string;
  created_at: string;
  stargazers_count: number;
  description: string;
  homepage: string;
  pin_url: string;
  topics: string[]
}

export type Search = {
  form: string,
  subject: Subject,
  search: string
}

export type Result = {
  slug: string
  marks: string
}

export type Subject = {
  name: string
  slug: string
}

