import Section from "../Section/Section"
import { personal } from "../../data/personal"
import SocialLinks from "../SocialLinks/SocialLinks"
import CtaButton from "../CtaButton/CtaButton"
import "./Contact.css"

export default function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Let's work together" background="accent">
      <div className="contact">
        <p className="contact__text">Have an idea worth building? I’m open to internships, freelance and collaborations — let’s make it real.</p>
        <div className="contact__actions">
          <CtaButton href={`mailto:${personal.email}`}>
            {personal.email}
          </CtaButton>
        </div>
        <div className="contact__social">
          <SocialLinks />
        </div>
      </div>
    </Section>
  )
}
