export interface PersonalInfo {
  name: string
  titles: string[]
  tagline: string
  bio: string[]
  location: string
  email: string
  resumeUrl?: string
}

export const personal: PersonalInfo = {
  name: "John Kenly Pamor",
  titles: [
    "IT Student",
    "Backend Developer",
    "Full-Stack AI Developer",
    "UI/UX Enthusiast",
  ],
  tagline: "I build things for the web.",
  bio: [
    "I'm a full-stack developer passionate about crafting clean, performant web applications. I specialize in React, TypeScript, and modern JavaScript ecosystems.",
    "I enjoy solving complex problems with simple, elegant solutions. Currently exploring distributed systems and developer tooling.",
  ],
  location: "Pili, Camarines Sur, Philippines",
  email: "johnkenlypamor13@gmail.com",
  resumeUrl: "#",
}
