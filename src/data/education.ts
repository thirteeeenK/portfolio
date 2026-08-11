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
    // year: "2023 — 2027",
    year: "2023 - Present"
  },
  {
    id: "edu-2",
    school: "Universidad de Sta. Isabel - Pili",
    level: "Senior High School",
    program: "STEM Strand",
    year: "2021 — 2023",
  },
  {
    id: "edu-3",
    school: "Universidad de Sta. Isabel - Pili",
    level: "Junior High School",
    program: "General Curriculum",
    year: "2017 — 2021",
  },
    {
    id: "edu-4",
    school: "Pili Central School",
    level: "Elementary",
    program: "General Curriculum",
    year: "2011 — 2017",
  }
]
