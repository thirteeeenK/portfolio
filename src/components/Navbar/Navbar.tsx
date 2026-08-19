import { useState, useEffect, useRef } from "react"
import { FiMoon, FiSun, FiUser, FiGrid } from "react-icons/fi"
import { navItems } from "../../data/navigation"
import "./Navbar.css"

interface NavbarProps {
  theme: "dark" | "light"
  onToggleTheme: () => void
  heroMode?: "voxel" | "photo"
  onToggleHeroImage?: () => void
}

export default function Navbar({ theme, onToggleTheme, heroMode, onToggleHeroImage }: NavbarProps) {
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
        <div className="navbar__actions">
          <button
            className="navbar__action"
            onClick={onToggleHeroImage}
            aria-label={heroMode === "photo" ? "Switch to voxel avatar" : "Switch to real photo"}
            title={heroMode === "photo" ? "Switch to voxel avatar" : "Switch to real photo"}
          >
            {heroMode === "photo" ? <FiGrid size={18} /> : <FiUser size={18} />}
          </button>

          <button
            className="navbar__action"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

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
