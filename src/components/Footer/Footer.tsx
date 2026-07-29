import { personal } from "../../data/personal"
// import { navItems } from "../../data/navigation"
import "./Footer.css"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* <nav className="footer__nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="footer__link">
              {item.label}
            </a>
          ))}
        </nav> */}
        <p className="footer__copy">
          &copy; {year} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
