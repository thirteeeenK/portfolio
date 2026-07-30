import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiPostman,
  SiFigma,
  SiClaude,
  SiOpencode,
  SiHtml5,
  SiCss,
} from "react-icons/si"
import { BiLogoVisualStudio } from "react-icons/bi"
import { TbBrandOpenai, TbRocket } from "react-icons/tb"
import type { IconType } from "react-icons"
import "./TechIcon.css"

interface TechIconProps {
  name: string
}

const iconMap: Record<string, IconType> = {
  react: SiReact,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  "tailwind css": SiTailwindcss,
  php: SiPhp,
  laravel: SiLaravel,
  "node.js": SiNodedotjs,
  express: SiExpress,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  git: SiGit,
  postman: SiPostman,
  figma: SiFigma,
  "vs code": BiLogoVisualStudio,
  "claude code": SiClaude,
  claude: SiClaude,
  chatgpt: TbBrandOpenai,
  opencode: SiOpencode,
  antigravity: TbRocket,
}

const colorMap: Record<string, string> = {
  react: "#61DAFB",
  javascript: "#F7DF1E",
  html: "#E34F26",
  css: "#1572B6",
  "tailwind css": "#06B6D4",
  php: "#777BB4",
  laravel: "#FF2D20",
  "node.js": "#339933",
  express: "#000000",
  postgresql: "#4169E1",
  mysql: "#4479A1",
  git: "#F05032",
  postman: "#FF6C37",
  figma: "#F24E1E",
  "vs code": "#007ACC",
  "claude code": "#D97757",
  claude: "#D97757",
  chatgpt: "#10A37F",
  opencode: "#000000",
  antigravity: "#4285F4",
}

export default function TechIcon({ name }: TechIconProps) {
  const key = name.toLowerCase()
  const Icon = iconMap[key]
  const color = colorMap[key] ?? "var(--accent)"

  if (Icon) {
    return (
      <span className="tech-icon" style={{ color }} aria-hidden="true">
        <Icon size={20} />
      </span>
    )
  }

  return (
    <span className="tech-icon tech-icon--fallback" aria-hidden="true">
      {name.charAt(0)}
    </span>
  )
}
