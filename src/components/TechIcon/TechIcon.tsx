import "./TechIcon.css"

interface TechIconProps {
  name: string
}

function iconPath(name: string): string | null {
  const map: Record<string, string> = {
    react: "M12 2.5c-2.5 0-4.5 2-4.5 4.5 0 1.2.5 2.3 1.3 3.1-1.1.5-3.3 1.8-4.3 3.4C3 15 2.5 17 3.5 19c1 1.8 3 3 5.5 3 1.8 0 3.3-.5 4.5-1.5 1.2 1 2.7 1.5 4.5 1.5 2.5 0 4.5-1.2 5.5-3 1-2 .5-4-.7-5.5-1-1.6-3.2-2.9-4.3-3.4.8-.8 1.3-1.9 1.3-3.1 0-2.5-2-4.5-4.5-4.5z",
    typescript: "M2 2h20v20H2V2zm11.5 11.5h3.5v2h-2v4h-2v-4H11v-2h2.5zM10 9.5c0-.8-.7-1.5-1.5-1.5H6v2h2.5c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H6v2h2.5c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5H6V8h2.5c.8 0 1.5.7 1.5 1.5z",
    javascript: "M2 2h20v20H2V2zm12.5 15.5c.7 0 1.3-.3 1.7-.8l1.6 1c-.7 1-1.8 1.6-3.3 1.6-2 0-3.5-1.3-3.5-3.5 0-2.2 1.5-3.5 3.5-3.5 1.2 0 2.1.5 2.7 1.2l-1.4 1c-.3-.5-.7-.8-1.3-.8-.8 0-1.3.6-1.3 1.4 0 .8.5 1.4 1.3 1.4zM8 11.5h2v5.5H8v-5.5zm0-3h2v2H8v-2z",
    "node.js": "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 3.7v4.6L14 10V7.5l-2 1-2-1V10l-5.5 2.8V8.2L12 4.5z",
    python: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 4h2v2h-2V6zm0 4h2v6h-2v-6z",
    docker: "M2 12h4v4H2v-4zm6-6h4v4H8V6zm0 6h4v4H8v-4zm6-8h4v4h-4V4zm0 6h4v4h-4v-4z",
    git: "M2 2h20v20H2V2zm16.6 7.6l-5-5c-.4-.4-1-.4-1.4 0L4.4 12.2c-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l7.8-7.8c.4-.4.4-1 0-1.4z",
    figma: "M12 2H8.5C6 2 4 4 4 6.5S6 11 8.5 11H12V2zM12 11h3.5c2.5 0 4.5-2 4.5-4.5S18 2 15.5 2H12v9zM12 11v3.5c0 2.5-2 4.5-4.5 4.5S3 17 3 14.5 5 11 8.5 11H12z",
    nextjs: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    "tailwind css": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    express: "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 3.7v4.6L14 10V7.5l-2 1-2-1V10l-5.5 2.8V8.2L12 4.5z",
    mongodb: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    postgresql: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    redis: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    aws: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
    "vue.js": "M12 2L2 21h20L12 2z",
    go: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z",
    graphql: "M12 2L2 7v10l10 5 10-5V7L12 2z",
    prisma: "M12 2L2 12l10 10 10-10L12 2z",
  }
  const key = name.toLowerCase()
  return map[key] ?? null
}

function colorFor(name: string): string {
  const colors: Record<string, string> = {
    react: "#61DAFB",
    typescript: "#3178C6",
    javascript: "#F7DF1E",
    "node.js": "#339933",
    python: "#3776AB",
    docker: "#2496ED",
    git: "#F05032",
    figma: "#F24E1E",
    nextjs: "#000000",
    "tailwind css": "#06B6D4",
    express: "#000000",
    mongodb: "#47A248",
    postgresql: "#4169E1",
    redis: "#DC382D",
    aws: "#FF9900",
    "vue.js": "#4FC08D",
    go: "#00ADD8",
    graphql: "#E10098",
    prisma: "#2D3748",
    "vs code": "#007ACC",
  }
  return colors[name.toLowerCase()] ?? "var(--accent)"
}

export default function TechIcon({ name }: TechIconProps) {
  const path = iconPath(name)
  const color = colorFor(name)

  if (path) {
    return (
      <span className="tech-icon" style={{ color }} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d={path} />
        </svg>
      </span>
    )
  }

  return (
    <span className="tech-icon tech-icon--fallback" aria-hidden="true">
      {name.charAt(0)}
    </span>
  )
}
