import { useState, useEffect, useRef } from "react"
import "./Typewriter.css"

interface TypewriterProps {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export default function Typewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<number>()

  useEffect(() => {
    const current = words[wordIdx]

    if (!deleting && charIdx < current.length) {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, typeSpeed)
    } else if (!deleting && charIdx === current.length) {
      timeoutRef.current = window.setTimeout(() => setDeleting(true), pauseDuration)
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, deleteSpeed)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [charIdx, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseDuration])

  return (
    <span>
      {displayed}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}
