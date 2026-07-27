export interface Experience {
  id: string
  company: string
  role: string
  location?: string
  startDate: string
  endDate: string | "Present"
  description: string[]
  technologies?: string[]
  companyUrl?: string
}

export const experiences: Experience[] = [
  {
    id: "senior-dev",
    company: "Tech Corp",
    role: "Senior Full-Stack Developer",
    location: "Remote",
    startDate: "Jan 2024",
    endDate: "Present",
    description: [
      "Led the migration of the legacy monolith to a microservices architecture, improving deployment frequency by 4x.",
      "Designed and implemented a GraphQL API layer serving 10k+ requests per minute.",
      "Mentored 3 junior developers through structured code reviews and pair programming sessions.",
    ],
    technologies: ["React", "Node.js", "GraphQL", "PostgreSQL", "Docker"],
    companyUrl: "https://example.com",
  },
  {
    id: "fullstack-dev",
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    location: "Manila, Philippines",
    startDate: "Jun 2022",
    endDate: "Dec 2023",
    description: [
      "Built the core SaaS product from MVP to production, serving 500+ active users.",
      "Implemented CI/CD pipelines reducing deployment time from 30min to 5min.",
      "Developed a real-time notification system using WebSockets and Redis pub/sub.",
    ],
    technologies: ["Vue.js", "Express", "MongoDB", "Redis", "AWS"],
    companyUrl: "https://example.com",
  },
  {
    id: "junior-dev",
    company: "WebAgency Co.",
    role: "Junior Developer",
    location: "Manila, Philippines",
    startDate: "Mar 2021",
    endDate: "May 2022",
    description: [
      "Developed responsive web applications for 10+ clients across various industries.",
      "Created reusable component libraries that reduced project setup time by 30%.",
    ],
    technologies: ["React", "JavaScript", "Sass", "Firebase"],
  },
]
