import HeroReveal from './components/HeroReveal/HeroReveal'
import WordReveal from './components/HeroReveal/WordReveal'
import CtaButton from './components/CtaButton/CtaButton'
import './App.css'

function App() {
  return (
    <>
      <HeroReveal>
        {/* <h1 className="hero-reveal__title">
          <WordReveal text="Stooopidkenly" />
        </h1>
        <p className="hero-reveal__subtitle">
          Move your cursor around to reveal the hidden flames beneath the surface.
        </p> */}
        {/* <CtaButton href="#next-steps">
          Explore
        </CtaButton> */}
      </HeroReveal>

      <section>
        <h1>Next Steps</h1>
        <p>Some content here...</p>
      </section>
    </>
  )
}

export default App
