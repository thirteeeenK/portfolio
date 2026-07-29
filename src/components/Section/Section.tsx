import type { ReactNode } from "react"
import { motion } from "framer-motion"
import "./Section.css"

export interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  background?: "light" | "dark" | "accent"
}

export default function Section({ id, title, subtitle, children, className = "", background = "light" }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`section section--${background} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="section__container">
        {title && (
          <div className="section__header">
            <h2 className="section__title">{title}</h2>
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  )
}
