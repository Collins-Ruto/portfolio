export type RepositoryData = {
  id: number;
  name: string;
  html_url: string;
  created_at: string;
  stargazers_count: number;
  description: string;
  homepage: string;
  pin_url: string;
}

// export type Blog = {
//   title: string
//   description: string
//   slug: string
//   markdown: string
//   github: string
//   devto_url: string
//   created_at: string
//   tag_list: string[]
//   public_reactions_count: number
//   comments_count: number
//   cover_image: string
// }

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

