import Section from "../Section/Section"
import { educations } from "../../data/education"
import { motion } from "framer-motion"
import "./Education.css"

export default function Education() {
  return (
    <Section id="education" title="Education" subtitle="Where I've studied">
      <div className="education">
        {educations.map((edu, i) => (
          <motion.div
            key={edu.id}
            className="education__item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "50px" }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="education__timeline">
              <div className="education__dot" />
            </div>
            <div className="education__content">
              <div className="education__header">
                <div>
                  {/* <h3 className="education__program">{edu.program}</h3>
                  <span className="education__school">{edu.school}</span> */}
                  <span className="education__program">{edu.school}</span>
                  <h3 className="education__school">{edu.program}</h3>
                </div>
                <span className="education__year">{edu.year}</span>
              </div>
              <span className="education__level">{edu.level}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
