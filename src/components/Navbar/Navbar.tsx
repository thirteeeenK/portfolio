import { useState, useEffect, useRef } from "react"
import { navItems } from "../../data/navigation"
import "./Navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const links = navRef.current?.querySelectorAll<HTMLAnchorElement>(".navbar__link")
    if (links) {
      const isMobile = window.innerWidth <= 768
      links.forEach((link) => {
        link.tabIndex = isMobile && !open ? -1 : 0
      })
    }
  }, [open])

  const handleNavClick = () => setOpen(false)

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <button
          className={`navbar__toggle${open ? " navbar__toggle--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="navbar-nav"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="navbar-nav"
          className={`navbar__nav${open ? " navbar__nav--open" : ""}`}
          aria-label="Main navigation"
          ref={navRef}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar__link"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
