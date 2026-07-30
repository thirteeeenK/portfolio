export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  thumbnail?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: string
}

export const projects: Project[] = [
  {
    id: "dealOrNoDeal",
    title: "Deal Or No Deal",
    description:
      "A simple probability and statistics game developed for educational purpose only.",
    technologies: ["HTML", "CSS", "Javascript"],
    githubUrl: "https://github.com/stooopidkenly/Deal-or-No-Deal",
    liveUrl: "https://dealornodeal-black.vercel.app/",
    featured: true,
    category: "Frontend",
  },
  {
    id: "nasa-apod",
    title: "Astronomy Picture of the Day",
    description:
      "Simple API fetching using NASA API Key to get real daily data.",
    technologies: ["HTML", "CSS", "Javascript"],
    // githubUrl: "https://github.com",
    liveUrl: "https://nasa-apod-alpha-two.vercel.app/",
    featured: true,
    category: "Frontend",
  },
  // {
  //   id: "task-manager",
  //   title: "Task Manager",
  //   description:
  //     "A Kanban-style project management tool with drag-and-drop boards, team collaboration, deadline tracking, and real-time notifications.",
  //   technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
  //   liveUrl: "https://example.com",
  //   featured: false,
  //   category: "Full-Stack",
  // },
  // {
  //   id: "weather-dashboard",
  //   title: "Weather Dashboard",
  //   description:
  //     "A weather visualization app that displays forecasts, historical data, and interactive maps. Uses geolocation and third-party weather APIs.",
  //   technologies: ["React", "TypeScript", "GraphQL", "Chart.js"],
  //   githubUrl: "https://github.com",
  //   liveUrl: "https://example.com",
  //   featured: false,
  //   category: "Frontend",
  // },
  // {
  //   id: "cli-tool",
  //   title: "CLI Scaffolding Tool",
  //   description:
  //     "A command-line tool for scaffolding project templates with customizable configurations. Supports multiple frameworks and deployment targets.",
  //   technologies: ["Node.js", "TypeScript", "Commander.js"],
  //   githubUrl: "https://github.com",
  //   featured: false,
  //   category: "Tools",
  // },
]
