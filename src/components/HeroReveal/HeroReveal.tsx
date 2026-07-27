import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import "./HeroReveal.css";

/* ── Helpers ──────────────────────────────────────────── */

/** Preload an image and resolve when it's decoded. */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
}

/** Linear interpolation. */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ── Props ────────────────────────────────────────────── */

export interface HeroRevealProps {
  /** URL for the always-visible base image. */
  baseSrc?: string;
  /** URL for the flame image revealed by the spotlight. */
  flameSrc?: string;
  /** Lerp factor (0–1). Lower = smoother/slower. @default 0.1 */
  smoothing?: number;
  /** Content rendered on top of the two layers. */
  children?: ReactNode;
}

/* ── Component ────────────────────────────────────────── */

export default function HeroReveal({
  baseSrc = "/transparent-base.png",
  flameSrc = "/transparent-flame.png",
  smoothing = 0.1,
  children,
}: HeroRevealProps) {
  const flameRef = useRef<HTMLDivElement>(null);

  // Raw mouse position (target).
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  // Smoothed position written to CSS vars each frame.
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  // Whether the user has moved their cursor/touch at all.
  const hasMovedRef = useRef(false);
  // RAF handle for cleanup.
  const rafRef = useRef<number>(0);

  // Reveal phases: loading → open → done
  const [phase, setPhase] = useState<"loading" | "open" | "done">("loading");
  const timersRef = useRef<number[]>([]);

  /* ── Preload images ───────────────────────────────── */

  useEffect(() => {
    let cancelled = false;
    Promise.all([preloadImage(baseSrc), preloadImage(flameSrc)])
      .then(() => {
        if (!cancelled) {
          // Phase 1: trigger curtain open + wipe line
          setPhase("open");
          // Phase 2: remove curtain from DOM after animation finishes
          const t = window.setTimeout(() => {
            if (!cancelled) setPhase("done");
          }, 1900);
          timersRef.current.push(t);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPhase("open");
          const t = window.setTimeout(() => {
            if (!cancelled) setPhase("done");
          }, 1900);
          timersRef.current.push(t);
        }
      });
    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
    };
  }, [baseSrc, flameSrc]);

  const isRevealed = phase === "open" || phase === "done";

  /* ── Update raw cursor position ────────────────────── */

  const updateCursor = useCallback((clientX: number, clientY: number) => {
    const el = flameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
    hasMovedRef.current = true;
  }, []);

  /* ── Listeners + animation loop ────────────────────── */

  useEffect(() => {
    const el = flameRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => updateCursor(e.clientX, e.clientY);

    const onTouchEvent = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateCursor(t.clientX, t.clientY);
    };

    el.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("touchstart", onTouchEvent, { passive: true });
    el.addEventListener("touchmove", onTouchEvent, { passive: true });

    const tick = () => {
      const target = mouseRef.current;
      const sm = smoothRef.current;

      sm.x = lerp(sm.x, target.x, smoothing);
      sm.y = lerp(sm.y, target.y, smoothing);

      el.style.setProperty("--x", `${(sm.x * 100).toFixed(2)}%`);
      el.style.setProperty("--y", `${(sm.y * 100).toFixed(2)}%`);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchstart", onTouchEvent);
      el.removeEventListener("touchmove", onTouchEvent);
    };
  }, [smoothing, updateCursor]);

  /* ── Render ─────────────────────────────────────────── */

  const curtainCls = [
    "hero-reveal__curtain",
    phase === "open" ? "hero-reveal__curtain--open" : "",
    phase === "done" ? "hero-reveal__curtain--done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`hero-reveal${isRevealed ? " hero-reveal--revealed" : ""}`}
      aria-label="Hero"
    >
      {/* Curtain overlay */}
      <div className={curtainCls} aria-hidden="true">
        <div className="hero-reveal__curtain-half hero-reveal__curtain-half--top" />
        <div className="hero-reveal__curtain-half hero-reveal__curtain-half--bottom" />
        <div className="hero-reveal__wipe" />
      </div>

      {/* Base image — always visible */}
      <div
        className="hero-reveal__layer hero-reveal__base"
        style={{ backgroundImage: `url(${baseSrc})` }}
        aria-hidden="true"
      />

      {/* Flame image — masked by spotlight */}
      <div
        ref={flameRef}
        className="hero-reveal__layer hero-reveal__flame"
        style={{ backgroundImage: `url(${flameSrc})` }}
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div
        className={`hero-reveal__content${
          isRevealed ? " hero-reveal__content--visible" : ""
        }`}
      >
        {children}
      </div>

      {/* Hint
      <span
        className={`hero-reveal__hint${
          isRevealed ? " hero-reveal__hint--visible" : ""
        }`}
        aria-hidden="true"
      >
        <span className="hero-reveal__hint-dot" />
        Move your cursor to reveal
      </span> */}
    </section>
  );
}
