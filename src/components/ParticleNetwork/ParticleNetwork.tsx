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
    const color = isDark ? "#3a3a3a" : "#2563eb"
    const linkColor = isDark ? "#d6d0d0" : "#2563eb"
    return {
      autoPlay: true,
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      background: { color: { value: isDark ? "#0a0a0a" : "#fafafa" } },
      particles: {
        number: { value: isDark ? 52 : 85, density: { enable: true, width: 1100 } },
        color: { value: color },
        opacity: { value: isDark ? 0.55 : 0.85 },
        size: { value: { min: 1.4, max: 2.8 } },
        links: {
          enable: true,
          distance: isDark ? 150 : 160,
          opacity: isDark ? 0.32 : 0.45,
          width: isDark ? 1.0 : 1.3,
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
          grab: { distance: isDark ? 160 : 210, links: { opacity: isDark ? 0.5 : 0.85 } },
          push: { quantity: isDark ? 2 : 3 },
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
