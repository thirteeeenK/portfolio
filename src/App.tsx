import HeroReveal from './components/HeroReveal/HeroReveal'
import CtaButton from './components/CtaButton/CtaButton'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import TechStackSection from './components/TechStack/TechStack'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import CertificationsSection from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import SocialLinks from './components/SocialLinks/SocialLinks'
import { personal } from './data/personal'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <HeroReveal />

      <section className="hero-text">
        <h1 className="hero-text__name">{personal.name}</h1>
        <p className="hero-text__title">{personal.title}</p>
        <p className="hero-text__tagline">{personal.tagline}</p>
        <div className="hero-text__actions">
          <CtaButton href="#projects">View Work</CtaButton>
          <CtaButton href="#contact">Contact</CtaButton>
        </div>
        <div className="hero-text__social">
          <SocialLinks />
        </div>
      </section>

      <main>
        <About />
        <Skills />
        <TechStackSection />
        <Projects />
        <Experience />
        <CertificationsSection />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
