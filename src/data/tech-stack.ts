export interface TechItem {
  name: string
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Tools" | "Language"
  icon?: string
  url?: string
}

export const techStack: TechItem[] = [
  { name: "React", category: "Frontend", url: "https://react.dev" },
  { name: "TypeScript", category: "Language", url: "https://www.typescriptlang.org" },
  { name: "Next.js", category: "Frontend", url: "https://nextjs.org" },
  { name: "Tailwind CSS", category: "Frontend", url: "https://tailwindcss.com" },
  { name: "JavaScript", category: "Language", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Node.js", category: "Backend", url: "https://nodejs.org" },
  { name: "Express", category: "Backend", url: "https://expressjs.com" },
  { name: "Python", category: "Language", url: "https://www.python.org" },
  { name: "PostgreSQL", category: "Database", url: "https://www.postgresql.org" },
  { name: "MongoDB", category: "Database", url: "https://www.mongodb.com" },
  { name: "Docker", category: "DevOps", url: "https://www.docker.com" },
  { name: "Git", category: "Tools", url: "https://git-scm.com" },
  { name: "VS Code", category: "Tools", url: "https://code.visualstudio.com" },
  { name: "Figma", category: "Tools", url: "https://www.figma.com" },
  { name: "Redis", category: "Database", url: "https://redis.io" },
  { name: "AWS", category: "DevOps", url: "https://aws.amazon.com" },
  { name: "Vue.js", category: "Frontend", url: "https://vuejs.org" },
  { name: "Go", category: "Language", url: "https://go.dev" },
  { name: "GraphQL", category: "Backend", url: "https://graphql.org" },
  { name: "Prisma", category: "Backend", url: "https://www.prisma.io" },
]
