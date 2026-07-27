import Section from "../Section/Section"
import { techStack } from "../../data/tech-stack"
import TechIcon from "../TechIcon/TechIcon"
import { motion } from "framer-motion"
import "./TechStack.css"

const categories = [...new Set(techStack.map((t) => t.category))]

export default function TechStackSection() {
  return (
    <Section id="tech-stack" title="Tech Stack" subtitle="Tools and technologies I use regularly">
      <div className="techstack">
        {categories.map((category) => (
          <div key={category} className="techstack__group">
            <h3 className="techstack__category">{category}</h3>
            <div className="techstack__grid">
              {techStack
                .filter((t) => t.category === category)
                .map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="techstack__item"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                  >
                    <TechIcon name={item.name} />
                    <span className="techstack__name">{item.name}</span>
                  </motion.a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
