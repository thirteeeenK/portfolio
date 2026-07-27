import { useState, useEffect, useRef } from 'react'
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
import Typewriter from './components/Typewriter/Typewriter'
import { personal } from './data/personal'
import './App.css'

function App() {
  const [scrollSplit, setScrollSplit] = useState(false)
  const activatedRef = useRef(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (activatedRef.current) return
      if (window.scrollY > 2) {
        activatedRef.current = true
        setScrollSplit(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <Navbar />

      <div className="hero-spacer" />

      <div ref={heroRef} className={`hero-wrapper${scrollSplit ? ' hero-wrapper--split' : ''}`}>
        <HeroReveal />

        <section className="hero-text">
          <h1 className="hero-text__name">{personal.name}</h1>
          <p className="hero-text__title">
            <Typewriter words={personal.titles} />
          </p>
          <p className="hero-text__tagline">{personal.tagline}</p>
          <div className="hero-text__actions">
            <CtaButton href="#projects">View Work</CtaButton>
            <CtaButton href="#contact">Contact</CtaButton>
          </div>
          <div className="hero-text__social">
            <SocialLinks />
          </div>
        </section>
      </div>

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
