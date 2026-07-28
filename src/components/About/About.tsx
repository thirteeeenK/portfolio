import Section from "../Section/Section"
import { personal } from "../../data/personal"
import CtaButton from "../CtaButton/CtaButton"
import "./About.css"

export default function About() {
  const [lead, ...rest] = personal.bio

  return (
    <Section id="about" title="About" subtitle="A bit about me">
      <div className="about">
        <div className="about__content">
          <p className="about__lead">{lead}</p>
          <div className="about__body">
            {rest.map((paragraph, i) => (
              <p key={i} className="about__text">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="about__footer">
            <div className="about__details">
              <div className="about__detail">
                <span className="about__detail-label">Location</span>
                <span className="about__detail-value">{personal.location}</span>
              </div>
              <div className="about__detail">
                <span className="about__detail-label">Email</span>
                <span className="about__detail-value">{personal.email}</span>
              </div>
            </div>
            {personal.resumeUrl && (
              <CtaButton href={personal.resumeUrl} className="about__resume">
                View Resume
              </CtaButton>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
