import { useState, useEffect } from "react"
import { navItems } from "../../data/navigation"
import "./Navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = () => setOpen(false)

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <button
          className={`navbar__toggle${open ? " navbar__toggle--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__nav${open ? " navbar__nav--open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar__link" onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
