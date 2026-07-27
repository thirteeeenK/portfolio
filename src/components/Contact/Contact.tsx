import Section from "../Section/Section"
import { personal } from "../../data/personal"
import SocialLinks from "../SocialLinks/SocialLinks"
import CtaButton from "../CtaButton/CtaButton"
import "./Contact.css"

export default function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Get in touch" background="accent">
      <div className="contact">
        <p className="contact__text">
          I'm always open to new opportunities, collaborations, or just a friendly chat.
          Feel free to reach out.
        </p>
        <div className="contact__actions">
          <CtaButton href={`mailto:${personal.email}`}>
            Send Email
          </CtaButton>
        </div>
        <div className="contact__social">
          <SocialLinks />
        </div>
      </div>
    </Section>
  )
}
