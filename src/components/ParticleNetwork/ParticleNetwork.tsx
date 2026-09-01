import { useMemo, useCallback } from "react"
import Particles, { ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"
import "./ParticleNetwork.css"

export default function ParticleNetwork({ theme }: { theme: "dark" | "light" }) {
  const init = useCallback(async (engine: Parameters<typeof loadSlim>[0]) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo<ISourceOptions>(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDark = theme === "dark"
    const color = isDark ? "#ffffff" : "#2563eb"
    const linkColor = isDark ? "#e5e7eb" : "#2563eb"
    return {
      autoPlay: true,
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      background: { color: { value: isDark ? "#0a0a0a" : "#fafafa" } },
      particles: {
        number: { value: 85, density: { enable: true, width: 900 } },
        color: { value: color },
        opacity: { value: isDark ? 0.9 : 0.85 },
        size: { value: { min: 2, max: 4.2 } },
        links: {
          enable: true,
          distance: 160,
          opacity: isDark ? 0.5 : 0.45,
          width: 1.3,
          color: linkColor,
        },
        move: {
          enable: !reduced,
          speed: 0.7,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 210, links: { opacity: 0.85 } },
          push: { quantity: 3 },
        },
      },
    }
  }, [theme])

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles-network" className="particle-network" options={options} />
    </ParticlesProvider>
  )
}
