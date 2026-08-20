import Section from "../Section/Section"
import { skills } from "../../data/skills"
import { motion } from "framer-motion"
import "./Skills.css"

const categories = [...new Set(skills.map((s) => s.category))]

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Technologies and abilities I work with" background="dark">
      <div className="skills">
        {categories.map((category) => (
          <div key={category} className="skills__group">
            <h3 className="skills__category">{category}</h3>
            <div className="skills__list">
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    className="skills__tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.1, margin: "50px" }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}