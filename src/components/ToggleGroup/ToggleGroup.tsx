import { motion } from "framer-motion"
import { FiMoon, FiSun, FiUser, FiGrid } from "react-icons/fi"
import { BsGrid3X3Gap, BsStars } from "react-icons/bs"

type Props = {
  theme: "dark" | "light"
  heroMode?: "voxel" | "photo"
  onToggleHeroImage?: () => void
  bgMode?: "grid" | "network"
  onToggleBg?: () => void
  onToggleTheme: () => void
  variant?: "hero" | "nav"
}

export default function ToggleGroup({
  theme,
  heroMode,
  onToggleHeroImage,
  bgMode,
  onToggleBg,
  onToggleTheme,
  variant = "nav",
}: Props) {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <motion.div
      layoutId="toggle-group"
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 28 }
      }
      className={`toggle-group toggle-group--${variant}`}
    >
      {onToggleBg && bgMode && (
        <button
          className="navbar__action"
          onClick={onToggleBg}
          aria-label={bgMode === "network" ? "Switch to kinetic grid" : "Switch to particle network"}
          title={bgMode === "network" ? "Switch to kinetic grid" : "Switch to particle network"}
        >
          {bgMode === "network" ? <BsGrid3X3Gap size={variant === "hero" ? 20 : 18} /> : <BsStars size={variant === "hero" ? 20 : 18} />}
        </button>
      )}
      <button
        className="navbar__action"
        onClick={onToggleHeroImage}
        aria-label={heroMode === "photo" ? "Switch to voxel avatar" : "Switch to real photo"}
        title={heroMode === "photo" ? "Switch to voxel avatar" : "Switch to real photo"}
      >
        {heroMode === "photo" ? <FiGrid size={variant === "hero" ? 20 : 18} /> : <FiUser size={variant === "hero" ? 20 : 18} />}
      </button>
      <button
        className="navbar__action"
        onClick={onToggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <FiSun size={variant === "hero" ? 20 : 18} /> : <FiMoon size={variant === "hero" ? 20 : 18} />}
      </button>
    </motion.div>
  )
}
