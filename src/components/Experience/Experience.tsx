import Section from "../Section/Section"
import { experiences } from "../../data/experience"
import { motion } from "framer-motion"
import "./Experience.css"

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Where I've worked">
      <div className="experience">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="experience__item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="experience__timeline">
              <div className="experience__dot" />
            </div>
            <div className="experience__content">
              <div className="experience__header">
                <div>
                  <h3 className="experience__role">{exp.role}</h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="experience__company"
                  >
                    {exp.company}
                  </a>
                </div>
                <span className="experience__date">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <ul className="experience__list">
                {exp.description.map((desc, j) => (
                  <li key={j} className="experience__desc">
                    {desc}
                  </li>
                ))}
              </ul>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="experience__techs">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="experience__tech">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
