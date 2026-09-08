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
  id: "portfolio",
  title: "Portfolio",
  description: "Personal portfolio — React 19 + TypeScript + Vite, Tailwind and Framer Motion. Data-driven sections with Quiet Monolith editorial styling, built fast and fully responsive.",
  technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  githubUrl: "https://github.com/thirteeeenK/portfolio",
  liveUrl: "https://johnkenlypamor.dev",
  featured: true, // or false -> shows under "More Projects"
  category: "Frontend / Vibecode",
},
  {
    id: "deleteMeWeb",
    title: "Delete Me",
    description:
      "Gesture eraser using MediaPipe Hands + OpenCV. Close your hand — subject vanishes from canvas. Vibecoded to explore browser-based hand tracking",
    technologies: ["HTML", "CSS", "Javascript", "MediaPipe", "OpenCV"],
    githubUrl: "https://github.com/thirteeeenK/deleteMeWeb",
    liveUrl: "/videos/recording.mp4",
    featured: true,
    category: "Vibecode",
  },
  {
    id: "dealOrNoDeal",
    title: "Deal Or No Deal",
    description:
      "Browser recreation of Deal or No Deal. Open cases, evaluate banker offers, and play probability against instinct",
    technologies: ["HTML", "CSS", "Javascript"],
    githubUrl: "https://github.com/stooopidkenly/Deal-or-No-Deal",
    liveUrl: "https://dealornodeal-black.vercel.app/",
    featured: false,
    category: "Frontend",
  },
  {
    id: "nasa-apod",
    title: "Astronomy Picture of the Day",
    description:
      "NASA APOD viewer via official API. Fetch daily imagery by date with HD view and metadata caching.",
    technologies: ["HTML", "CSS", "Javascript"],
    githubUrl: "https://github.com/thirteeeenK/NASA_APOD",
    liveUrl: "https://nasa-apod-alpha-two.vercel.app/",
    featured: false,
    category: "Frontend",
  },
]
