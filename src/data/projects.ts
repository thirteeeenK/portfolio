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
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with product management, shopping cart, payment integration, and admin dashboard. Built with a focus on performance and accessibility.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    category: "Full-Stack",
  },
  {
    id: "realtime-chat",
    title: "Real-Time Chat",
    description:
      "A WebSocket-powered chat application supporting private messaging, group rooms, file sharing, and message history. Designed for low-latency communication.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    githubUrl: "https://github.com",
    featured: true,
    category: "Full-Stack",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "A Kanban-style project management tool with drag-and-drop boards, team collaboration, deadline tracking, and real-time notifications.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    liveUrl: "https://example.com",
    featured: false,
    category: "Full-Stack",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "A weather visualization app that displays forecasts, historical data, and interactive maps. Uses geolocation and third-party weather APIs.",
    technologies: ["React", "TypeScript", "GraphQL", "Chart.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    category: "Frontend",
  },
  {
    id: "cli-tool",
    title: "CLI Scaffolding Tool",
    description:
      "A command-line tool for scaffolding project templates with customizable configurations. Supports multiple frameworks and deployment targets.",
    technologies: ["Node.js", "TypeScript", "Commander.js"],
    githubUrl: "https://github.com",
    featured: false,
    category: "Tools",
  },
]
