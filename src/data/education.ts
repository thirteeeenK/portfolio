export interface Education {
  id: string
  school: string
  level: string
  program: string
  year: string
}

export const educations: Education[] = [
  {
    id: "edu-1",
    school: "Camarines Sur Polytechnic Colleges",
    level: "College",
    program: "Bachelor of Science in Information Technology",
    year: "2023 — 2027",
  },
  {
    id: "edu-2",
    school: "Universidad de Sta. Isabel - Pili",
    level: "Senior High School",
    program: "STEM Strand",
    year: "2021 — 2023",
  },
]
