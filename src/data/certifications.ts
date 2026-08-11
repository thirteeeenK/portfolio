export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
  credentialId?: string
}

export const certifications: Certification[] = [
  {
    id: "jpcs12",
    name: "12th Bicol Youth Congress in Information Technology",
    issuer: "Junior Philippine Computer Society",
    date: "April 19, 2024",
  },

  {
    id: "jpcs13",
    name: "13th Bicol Youth Congress in Information Technology",
    issuer: "Junior Philippine Computer Society",
    date: "April 11, 2025",
  },

  {
    id: "dict1",
    name: "Work Smarter, Not Harder: Optimize Work with AI",
    issuer: "Department of Information and Communications Technology",
    date: "February 9, 2026",
    credentialId: "R5ILCBD:2026-T-WSNH-1",
  },

  {
    id: "dict2",
    name: "ChatGPT Unleashed: Smart Prompting for Smarter Work",
    issuer: "Department of Information and Communications Technology",
    date: "April 26, 2026",
    credentialId: "R5ILCBD:2026-W-CUSP-1",
  },

   {
    id: "code-red",
    name: "HTML Fundamentals",
    issuer: "CodeCred",
    date: "2026",
    url: "https://www.codecred.dev/verify/89845556-60f9-4194-99dd-7072b6e89005",
  },



  // HTML Fundamentals
]
