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
    // "Frontend AI Developer",
    // "Full-Stack AI Developer",
    "Agentic AI Developer",
    // "Full-time Frontend Vibe Coder"
  ],
  tagline: "I build things for the web. I vibe code for the web.",
  bio: [
    "I'm a full-stack developer passionate about crafting clean, performant web applications. I specialize in Backend Web Development using Laravel PHP and PostgreSQL. I use AI-enhanced frontend development using React, TypeScript, and modern JavaScript ecosystems.",
    "I enjoy solving complex problems with simple, elegant solutions. Currently exploring Agentic AI Development and Full-Stack AI Development.",
  ],
  location: "Pili, Camarines Sur, Philippines",
  email: "johnkenlypamor13@gmail.com",
  // resumeUrl: "#",
}
