import { useEffect, useRef, useState } from "react"
import "./ThemeReveal.css"

interface ThemeRevealProps {
  onComplete: () => void
  onDone: () => void
}

const SPLIT_MS = 500
const DONE_MS = 1800

export default function ThemeReveal({ onComplete, onDone }: ThemeRevealProps) {
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  const [colors] = useState(() => {
    const styles = window.getComputedStyle(document.documentElement)
    const bg = styles.getPropertyValue("--bg").trim()
    const codeBg = styles.getPropertyValue("--code-bg").trim()
    const core = styles.getPropertyValue("--wipe-core").trim()
    const glow = styles.getPropertyValue("--wipe-glow").trim()
    return {
      half: `linear-gradient(135deg, ${bg} 0%, ${codeBg} 40%, ${bg} 60%, ${codeBg} 100%)`,
      wipe: `linear-gradient(90deg, transparent 0%, #00f0ff 30%, ${core} 50%, #00f0ff 70%, transparent 100%)`,
      shadow: `0 0 4px 1px ${core}, 0 0 12px 2px ${glow}`,
    }
  })
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onCompleteRef.current = onComplete
    onDoneRef.current = onDone
  }, [onComplete, onDone])

  useEffect(() => {
    if (reduced) {
      onCompleteRef.current()
      onDoneRef.current()
      return
    }
    const split = window.setTimeout(() => onCompleteRef.current(), SPLIT_MS)
    const done = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true
        onDoneRef.current()
      }
    }, DONE_MS)
    return () => {
      window.clearTimeout(split)
      window.clearTimeout(done)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className="theme-reveal" aria-hidden="true">
      <div className="theme-reveal__curtain-half theme-reveal__curtain-half--top">
        <div className="theme-reveal__curtain-half-bg" style={{ background: colors.half }} />
      </div>
      <div className="theme-reveal__curtain-half theme-reveal__curtain-half--bottom">
        <div className="theme-reveal__curtain-half-bg" style={{ background: colors.half }} />
      </div>
      <div
        className="theme-reveal__wipe"
        style={{ background: colors.wipe, boxShadow: colors.shadow }}
      />
    </div>
  )
}