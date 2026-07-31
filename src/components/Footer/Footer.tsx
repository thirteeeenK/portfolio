import { personal } from "../../data/personal"
import { navItems } from "../../data/navigation"
import "./Footer.css"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="footer__link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer__meta">
          <span className="footer__location">{personal.location}</span>
          <span className="footer__copy">
            &copy; {year} {personal.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
