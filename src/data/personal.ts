export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string[]
  location: string
  email: string
  resumeUrl?: string
}

export const personal: PersonalInfo = {
  name: "John Kenly Pamor",
  title: "Full-Stack Developer",
  tagline: "I build things for the web.",
  bio: [
    "I'm a full-stack developer passionate about crafting clean, performant web applications. I specialize in React, TypeScript, and modern JavaScript ecosystems.",
    "I enjoy solving complex problems with simple, elegant solutions. Currently exploring distributed systems and developer tooling.",
  ],
  location: "Philippines",
  email: "john@example.com",
  resumeUrl: "#",
}
