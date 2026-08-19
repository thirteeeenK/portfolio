import { useState, useEffect, useRef } from 'react'
import HeroReveal from './components/HeroReveal/HeroReveal'
import CtaButton from './components/CtaButton/CtaButton'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import TechStackSection from './components/TechStack/TechStack'
import Projects from './components/Projects/Projects'
// import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import CertificationsSection from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import SocialLinks from './components/SocialLinks/SocialLinks'
import Typewriter from './components/Typewriter/Typewriter'
import KineticGrid from './components/KineticGrid/KineticGrid'
import { personal } from './data/personal'
import ThemeReveal from './components/ThemeReveal/ThemeReveal'
import './App.css'

type Theme = "dark" | "light"
type HeroImage = "voxel" | "photo"
const HERO_SPLIT_MS = 500
const HERO_DONE_MS = 1800

function App() {
  const [scrollSplit, setScrollSplit] = useState(false)
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
  )
  const [wiping, setWiping] = useState<Theme | null>(null)
  const activatedRef = useRef(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const applyTheme = (target: Theme) => {
    setTheme(target)
    document.documentElement.setAttribute("data-theme", target)
    try {
      localStorage.setItem("theme", target)
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", target === "light" ? "#fafafa" : "#0a0a0a")
  }

  const handleToggleTheme = () => {
    if (wiping) return
    setWiping(theme === "dark" ? "light" : "dark")
  }

  const [heroImage, setHeroImage] = useState<HeroImage>(() => {
    try {
      return localStorage.getItem("hero-image") === "photo" ? "photo" : "voxel"
    } catch {
      return "voxel"
    }
  })
  const [heroSwapping, setHeroSwapping] = useState(false)
  const heroSwapTimersRef = useRef<number[]>([])

  const handleToggleHeroImage = () => {
    if (heroSwapping) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const next: HeroImage = heroImage === "voxel" ? "photo" : "voxel"
    const persist = () => {
      try {
        localStorage.setItem("hero-image", next)
      } catch {
        /* ignore */
      }
    }
    if (reduced) {
      setHeroImage(next)
      persist()
      return
    }
    setHeroSwapping(true)
    const swap = window.setTimeout(() => {
      setHeroImage(next)
      persist()
    }, HERO_SPLIT_MS)
    const done = window.setTimeout(() => setHeroSwapping(false), HERO_DONE_MS)
    heroSwapTimersRef.current.push(swap, done)
  }

  useEffect(() => {
    const timers = heroSwapTimersRef.current
    return () => timers.forEach(window.clearTimeout)
  }, [])

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
    <KineticGrid theme={theme}>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        heroMode={heroImage}
        onToggleHeroImage={handleToggleHeroImage}
      />

      {wiping && (
        <ThemeReveal
          onComplete={() => applyTheme(wiping)}
          onDone={() => setWiping(null)}
        />
      )}

      <div className="hero-spacer" />

      <div ref={heroRef} className={`hero-wrapper${scrollSplit ? ' hero-wrapper--split' : ''}`}>
        <HeroReveal disableCursorShift={scrollSplit} mode={heroImage} swapping={heroSwapping} />

        <section className="hero-text">
          <h1 className="hero-text__name">{personal.name}</h1>
          <p className="hero-text__title">
            <Typewriter words={personal.titles} />
          </p>
          <p className="hero-text__tagline">{personal.tagline}</p>
          <div className="hero-text__actions">
            <CtaButton href="#projects">View Work</CtaButton>
            {/* <CtaButton href="#contact">Contact</CtaButton> */}
            {personal.resumeUrl && (
                          <CtaButton href={personal.resumeUrl} className="about__resume">
                            View Resume
                          </CtaButton>
                        )}
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
        {/* <Experience /> */}
        <Education />
        <CertificationsSection />
        <Contact />
      </main>

      <Footer />
    </KineticGrid>
  )
}

export default App
