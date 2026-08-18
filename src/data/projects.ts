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
  {
    id: "deleteMeWeb",
    title: "Delete Me",
    description:
      "Side project I vibecoded because of curiosity and for fun. Close hand - vanish.",
    technologies: ["HTML", "CSS", "Javascript", "MediaPipe", "OpenCV"],
    githubUrl: "https://github.com/thirteeeenK/deleteMeWeb",
    liveUrl: "/src/assets/recording.mp4",
    featured: true,
    category: "Vibecode",
  },
]
