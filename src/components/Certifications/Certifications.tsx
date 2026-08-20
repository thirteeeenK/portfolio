import Section from "../Section/Section"
import { certifications } from "../../data/certifications"
import { motion } from "framer-motion"
import "./Certifications.css"

export default function CertificationsSection() {
  if (certifications.length === 0) return null

  return (
    <Section id="certifications" title="Certifications" background="dark">
      <div className="certs">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="certs__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "50px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div className="certs__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="certs__info">
              <h3 className="certs__name">{cert.name}</h3>
              <p className="certs__issuer">{cert.issuer}</p>
              <span className="certs__date">{cert.date}</span>
              {cert.credentialId && (
                <span className="certs__credential">ID: {cert.credentialId}</span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}
