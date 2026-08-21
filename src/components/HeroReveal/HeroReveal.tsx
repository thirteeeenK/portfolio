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
  /** URL for the static real-photo cutout shown in "photo" mode. */
  photoSrc?: string;
  /** Variant to apply grid-aligned offset for no-shades (shorter by ~1 cell). */
  photoVariant?: "shades" | "no-shades";
  /** Lerp factor (0–1). Lower = smoother/slower. @default 0.1 */
  smoothing?: number;
  /** When true, disable the cursor-driven parallax shift. */
  disableCursorShift?: boolean;
  /** Which hero image to show: voxel (spotlight) or static photo. */
  mode?: "voxel" | "photo";
  /** When true, play the localized line-split wipe over the hero. */
  swapping?: boolean;
  /** Content rendered on top of the two layers. */
  children?: ReactNode;
}

/* ── Component ────────────────────────────────────────── */

export default function HeroReveal({
  baseSrc = "/transparent-base.png",
  flameSrc = "/transparent-flame.png",
  photoSrc = "/with-shades-cropped.png",
  photoVariant = "shades",
  smoothing = 0.1,
  disableCursorShift = false,
  mode = "voxel",
  swapping = false,
  children,
}: HeroRevealProps) {
  const revealRef = useRef<HTMLElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const photoRevealRef = useRef<HTMLDivElement>(null);

  // Raw mouse position (target).
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  // Smoothed position written to CSS vars each frame.
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  // Whether the user has moved their cursor/touch at all.
  const hasMovedRef = useRef(false);
  // Timestamp of last mouse movement for stationary 0.8s shrink decay.
  const lastMoveTimeRef = useRef(0);
  // Smoothed spotlight mask radius.
  const smoothRadiusRef = useRef(200);
  // RAF handle for cleanup.
  const rafRef = useRef<number>(0);

  // Track whether cursor shift is disabled.
  const disableShiftRef = useRef(disableCursorShift);

  useEffect(() => {
    disableShiftRef.current = disableCursorShift;
  }, [disableCursorShift]);

  // Track the current display mode (voxel/photo) so the RAF loop reads it
  // without restarting the effect.
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Reveal phases: loading → open → done
  const [phase, setPhase] = useState<"loading" | "open" | "done">("loading");
  const timersRef = useRef<number[]>([]);

  /* ── Preload images (both photo variants so theme toggle is instant behind curtain) ── */

  useEffect(() => {
    let cancelled = false;
    const timers = timersRef.current;
    Promise.all([
      preloadImage(baseSrc),
      preloadImage(flameSrc),
      preloadImage("/with-shades-cropped.png"),
      preloadImage("/no-shades-cropped.png"),
    ])
      .then(() => {
        if (!cancelled) {
          setPhase("open");
          const t = window.setTimeout(() => {
            if (!cancelled) setPhase("done");
          }, 1900);
          timers.push(t);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPhase("open");
          const t = window.setTimeout(() => {
            if (!cancelled) setPhase("done");
          }, 1900);
          timers.push(t);
        }
      });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [baseSrc, flameSrc]);

  const isRevealed = phase === "open" || phase === "done";

  /* ── Update raw cursor position & reset move timer ── */

  const updateCursor = useCallback((clientX: number, clientY: number) => {
    const el = revealRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
    hasMovedRef.current = true;
    lastMoveTimeRef.current = performance.now();
  }, []);

  /* ── Listeners + animation loop ────────────────────── */

  useEffect(() => {
    const section = revealRef.current;
    if (!section) return;

    const onMouseMove = (e: MouseEvent) => updateCursor(e.clientX, e.clientY);
    const onMouseLeave = () => {
      lastMoveTimeRef.current = 0; // Trigger instant shrink decay when mouse leaves
    };

    const onTouchEvent = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateCursor(t.clientX, t.clientY);
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave, { passive: true });
    section.addEventListener("touchstart", onTouchEvent, { passive: true });
    section.addEventListener("touchmove", onTouchEvent, { passive: true });
    section.addEventListener("touchend", onMouseLeave, { passive: true });

    const tick = () => {
      const base = baseRef.current;
      const fl = flameRef.current;
      const photoReveal = photoRevealRef.current;
      const target = mouseRef.current;
      const sm = smoothRef.current;

      // ── Photo mode: whole photo drifts with cursor + opposite-shade variant revealed by spotlight
      if (modeRef.current === "photo") {
        if (fl) fl.style.transform = "";

        sm.x = lerp(sm.x, target.x, smoothing);
        sm.y = lerp(sm.y, target.y, smoothing);

        // cursor parallax drift (same as voxel, applied to the wrapper so base+reveal stay aligned)
        const maxOffset = 12;
        const tx = ((sm.x - 0.5) * 2) * maxOffset;
        const ty = ((sm.y - 0.5) * 2) * maxOffset;
        const t = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
        if (disableShiftRef.current) {
          if (base) base.style.transform = "";
        } else {
          if (base) base.style.transform = t;
        }

        if (photoReveal) {
          photoReveal.style.setProperty("--x", `${(sm.x * 100).toFixed(2)}%`);
          photoReveal.style.setProperty("--y", `${(sm.y * 100).toFixed(2)}%`);

          const now = performance.now();
          const idleTime = now - lastMoveTimeRef.current;
          const width = section.getBoundingClientRect().width || window.innerWidth;
          const isMobile = width < 600;
          const maxRadius = isMobile ? (width < 480 ? 100 : 140) : 200;
          const DECAY_TIME = 1000;
          let targetRadius = 0;
          if (hasMovedRef.current && idleTime < DECAY_TIME) {
            const progress = idleTime / DECAY_TIME;
            const shrinkFactor = Math.pow(1 - progress, 1.3);
            targetRadius = maxRadius * shrinkFactor;
          }
          const lerpSpeed = targetRadius > smoothRadiusRef.current ? 0.3 : 0.12;
          smoothRadiusRef.current = lerp(smoothRadiusRef.current, targetRadius, lerpSpeed);
          photoReveal.style.setProperty("--size", `${smoothRadiusRef.current.toFixed(1)}px`);
        }

        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      sm.x = lerp(sm.x, target.x, smoothing);
      sm.y = lerp(sm.y, target.y, smoothing);

      if (fl) {
        fl.style.setProperty("--x", `${(sm.x * 100).toFixed(2)}%`);
        fl.style.setProperty("--y", `${(sm.y * 100).toFixed(2)}%`);

        // 1-second spotlight shrink decay when mouse stops moving
        const now = performance.now();
        const idleTime = now - lastMoveTimeRef.current;
        const width = section.getBoundingClientRect().width || window.innerWidth;
        const isMobile = width < 600;
        const maxRadius = isMobile ? (width < 480 ? 100 : 140) : 200;

        const DECAY_TIME = 1000; // 1 second
        let targetRadius = 0;

        if (hasMovedRef.current && idleTime < DECAY_TIME) {
          const progress = idleTime / DECAY_TIME; // 0..1
          const shrinkFactor = Math.pow(1 - progress, 1.3);
          targetRadius = maxRadius * shrinkFactor;
        }

        // Fast expansion on cursor movement, smooth 0.8s decay shrink when idle
        const lerpSpeed = targetRadius > smoothRadiusRef.current ? 0.3 : 0.12;
        smoothRadiusRef.current = lerp(smoothRadiusRef.current, targetRadius, lerpSpeed);

        fl.style.setProperty("--size", `${smoothRadiusRef.current.toFixed(1)}px`);
      }

      const maxOffset = 12;
      const tx = ((sm.x - 0.5) * 2) * maxOffset;
      const ty = ((sm.y - 0.5) * 2) * maxOffset;
      const t = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
      if (disableShiftRef.current) {
        if (base) base.style.transform = "";
        if (fl) fl.style.transform = "";
      } else {
        if (base) base.style.transform = t;
        if (fl) fl.style.transform = t;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      section.removeEventListener("touchstart", onTouchEvent);
      section.removeEventListener("touchmove", onTouchEvent);
      section.removeEventListener("touchend", onMouseLeave);
    };
  }, [smoothing, updateCursor]);

  /* ── Render ─────────────────────────────────────────── */

  const photoRevealVariant = photoVariant === "shades" ? ("no-shades" as const) : ("shades" as const);
  const photoRevealSrc = photoRevealVariant === "shades" ? "/with-shades-cropped.png" : "/no-shades-cropped.png";

  const curtainCls = [
    "hero-reveal__curtain",
    phase === "open" ? "hero-reveal__curtain--open" : "",
    phase === "done" ? "hero-reveal__curtain--done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={revealRef}
      className={`hero-reveal${isRevealed ? " hero-reveal--revealed" : ""}`}
      aria-label="Hero"
    >
      {/* Curtain overlay */}
      <div className={curtainCls} aria-hidden="true">
        <div className="hero-reveal__curtain-half hero-reveal__curtain-half--top" />
        <div className="hero-reveal__curtain-half hero-reveal__curtain-half--bottom" />
        <div className="hero-reveal__wipe" />
      </div>

      {mode === "photo" ? (
        <div ref={baseRef} className="hero-reveal__layer hero-reveal__base hero-reveal__base--photo" aria-hidden="true">
          <div
            className={`hero-reveal__photo hero-reveal__photo--${photoVariant}`}
            style={{ backgroundImage: `url(${photoSrc})` }}
            aria-hidden="true"
          />
          {/* Opposite shade variant revealed by cursor spotlight (mirrors voxel flame) */}
          <div
            ref={photoRevealRef}
            className={`hero-reveal__photo hero-reveal__photo--reveal hero-reveal__photo--${photoRevealVariant}`}
            style={{ backgroundImage: `url(${photoRevealSrc})` }}
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          {/* Base image — always visible */}
          <div
            ref={baseRef}
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
        </>
      )}

      {/* Localized wipe played on image-mode swap */}
      {swapping && (
        <div className="hero-reveal__swap" aria-hidden="true">
          <div className="hero-reveal__swap-half hero-reveal__swap-half--top">
            <div className="hero-reveal__swap-half-bg" />
          </div>
          <div className="hero-reveal__swap-half hero-reveal__swap-half--bottom">
            <div className="hero-reveal__swap-half-bg" />
          </div>
          <div className="hero-reveal__swap-wipe" />
        </div>
      )}

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
