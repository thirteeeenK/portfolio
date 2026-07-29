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
    id: "aws-saa",
    name: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    url: "https://aws.amazon.com/certification/",
    credentialId: "AWS-SAA-12345",
  },
  {
    id: "meta-react",
    name: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2023",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
]
