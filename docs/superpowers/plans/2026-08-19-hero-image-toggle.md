# Hero Image Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a navbar toggle button that switches the hero between the voxel avatar (spotlight effect) and a static real-photo cutout, using the existing line-split wipe animation localized to the hero.

**Architecture:** `App.tsx` owns `heroImage` state (persisted to localStorage) + a `heroSwapping` flag, mirroring the existing `theme`/`wiping` pattern. `HeroReveal` gains a `mode` prop (renders photo layer vs voxel layers) and a `swapping` prop (mounts a localized curtain+line overlay reusing `ThemeReveal`'s keyframes). `Navbar` gains a second icon button beside the sun/moon.

**Tech Stack:** React 19 + TS 6 + Vite 8, `react-icons`. No test framework (per AGENTS.md) → verification is `npm run lint` + `npm run build` + manual `npm run dev` browser check.

## Global Constraints

- `verbatimModuleSyntax` → `import type` for type-only imports
- `erasableSyntaxOnly` → no enums; use string-literal unions
- `noUnusedLocals`/`noUnusedParameters` on
- Follow existing `ThemeReveal` timing: `SPLIT_MS = 500`, `DONE_MS = 1800`
- No new dependencies
- Do NOT commit — the user commits manually

---

### Task 1: Rename asset + photo mode in HeroReveal

**Files:**
- Rename: `public/kenly no bg.png` → `public/kenly-no-bg.png`
- Modify: `src/components/HeroReveal/HeroReveal.tsx`

- [ ] **Step 1: Rename the asset**

```bash
Rename-Item -LiteralPath "public/kenly no bg.png" "public/kenly-no-bg.png"
```

- [ ] **Step 2: Update the props interface and defaults**

```ts
export interface HeroRevealProps {
  baseSrc?: string;
  flameSrc?: string;
  photoSrc?: string;
  smoothing?: number;
  disableCursorShift?: boolean;
  mode?: "voxel" | "photo";
  swapping?: boolean;
  children?: ReactNode;
}
```

```ts
export default function HeroReveal({
  baseSrc = "/transparent-base.png",
  flameSrc = "/transparent-flame.png",
  photoSrc = "/kenly-no-bg.png",
  smoothing = 0.1,
  disableCursorShift = false,
  mode = "voxel",
  swapping = false,
  children,
}: HeroRevealProps) {
```

- [ ] **Step 3: Add `modeRef`**

Next to `disableShiftRef`:

```ts
const modeRef = useRef(mode);

useEffect(() => {
  modeRef.current = mode;
}, [mode]);
```

- [ ] **Step 4: Add `photoSrc` to the preload**

`Promise.all([preloadImage(baseSrc), preloadImage(flameSrc), preloadImage(photoSrc)])`

- [ ] **Step 5: Restructure the animation effect**

Setup guard becomes `if (!section) return;`. Do NOT capture `base`/`fl` at setup; read them in `tick`:

```ts
const tick = () => {
  const base = baseRef.current;
  const fl = flameRef.current;

  if (modeRef.current === "photo") {
    if (base) base.style.transform = "";
    if (fl) fl.style.transform = "";
    rafRef.current = requestAnimationFrame(tick);
    return;
  }

  const target = mouseRef.current;
  const sm = smoothRef.current;

  sm.x = lerp(sm.x, target.x, smoothing);
  sm.y = lerp(sm.y, target.y, smoothing);

  if (fl) {
    fl.style.setProperty("--x", `${(sm.x * 100).toFixed(2)}%`);
    fl.style.setProperty("--y", `${(sm.y * 100).toFixed(2)}%`);

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
```

Effect deps stay `[smoothing, updateCursor]`.

- [ ] **Step 6: Mode-conditional layer render**

```tsx
{mode === "photo" ? (
  <div
    ref={baseRef}
    className="hero-reveal__layer hero-reveal__base"
    style={{ backgroundImage: `url(${photoSrc})` }}
    aria-hidden="true"
  />
) : (
  <>
    <div
      ref={baseRef}
      className="hero-reveal__layer hero-reveal__base"
      style={{ backgroundImage: `url(${baseSrc})` }}
      aria-hidden="true"
    />
    <div
      ref={flameRef}
      className="hero-reveal__layer hero-reveal__flame"
      style={{ backgroundImage: `url(${flameSrc})` }}
      aria-hidden="true"
    />
  </>
)}
```

- [ ] **Step 7: Add the swap overlay markup**

Between the flame layer and the content div:

```tsx
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
```

- [ ] **Step 8: Verify**

Run: `npm run lint; if ($?) { npm run build }`
Expected: PASS, no type/lint errors.

---

### Task 2: Swap overlay CSS in HeroReveal

**Files:**
- Modify: `src/components/HeroReveal/HeroReveal.css`

- [ ] **Step 1: Append swap overlay styles**

Reuses existing `skeleton-pulse` keyframes:

```css
.hero-reveal__swap {
  position: absolute;
  inset: 0;
  z-index: 4;
  overflow: hidden;
}

.hero-reveal__swap-half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  will-change: transform;
}

.hero-reveal__swap-half--top {
  top: 0;
  animation: hero-swap-top 1.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.hero-reveal__swap-half--bottom {
  bottom: 0;
  animation: hero-swap-bottom 1.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.hero-reveal__swap-half-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--bg) 0%,
    var(--code-bg) 40%,
    var(--bg) 60%,
    var(--code-bg) 100%
  );
  background-size: 400% 400%;
  animation: skeleton-pulse 1.8s ease-in-out infinite;
}

.hero-reveal__swap-wipe {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%) scaleX(0);
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #00f0ff 30%,
    var(--wipe-core) 50%,
    #00f0ff 70%,
    transparent 100%
  );
  box-shadow:
    0 0 4px 1px var(--wipe-core),
    0 0 12px 2px var(--wipe-glow);
  animation: hero-swap-line 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.12s forwards;
  z-index: 1;
}

@keyframes hero-swap-top {
  0% { transform: translateY(-102%); animation-timing-function: ease-out; }
  14.7% { transform: translateY(0); }
  29.4% { transform: translateY(0); animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1); }
  100% { transform: translateY(-102%); }
}

@keyframes hero-swap-bottom {
  0% { transform: translateY(102%); animation-timing-function: ease-out; }
  14.7% { transform: translateY(0); }
  29.4% { transform: translateY(0); animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1); }
  100% { transform: translateY(102%); }
}

@keyframes hero-swap-line {
  0% { transform: translateY(-50%) scaleX(0); opacity: 1; }
  60% { transform: translateY(-50%) scaleX(1); opacity: 1; }
  100% { transform: translateY(-50%) scaleX(1); opacity: 0; }
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint; if ($?) { npm run build }`
Expected: PASS.

---

### Task 3: Navbar image-toggle button

**Files:**
- Modify: `src/components/Navbar/Navbar.tsx`
- Modify: `src/components/Navbar/Navbar.css`

- [ ] **Step 1: Import icons**

```ts
import { FiMoon, FiSun, FiUser, FiGrid } from "react-icons/fi"
```

- [ ] **Step 2: Extend props**

```ts
interface NavbarProps {
  theme: "dark" | "light"
  onToggleTheme: () => void
  heroMode?: "voxel" | "photo"
  onToggleHeroImage?: () => void
}
```

- [ ] **Step 3: Wrap buttons in an actions group**

Replace the theme button block with:

```tsx
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
```

- [ ] **Step 4: CSS — shared action group**

Replace `.navbar__theme` rules with:

```css
.navbar__actions {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.navbar__action {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: var(--text);
  transition: color 0.2s;
}

.navbar__action:hover {
  color: var(--text-h);
}

.navbar__action:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 2px;
}
```

In `@media (max-width: 768px)`, replace the `.navbar__theme` mobile rule with:

```css
.navbar__actions {
  position: static;
  transform: none;
  margin-right: 0.75rem;
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint; if ($?) { npm run build }`
Expected: PASS.

---

### Task 4: App state + wiring

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Type + constants**

After `type Theme`:

```ts
type HeroImage = "voxel" | "photo"
const HERO_SPLIT_MS = 500
const HERO_DONE_MS = 1800
```

- [ ] **Step 2: State + handler**

After `handleToggleTheme`:

```ts
const [heroImage, setHeroImage] = useState<HeroImage>(() => {
  try {
    return localStorage.getItem("hero-image") === "photo" ? "photo" : "voxel"
  } catch {
    return "voxel"
  }
})
const [heroSwapping, setHeroSwapping] = useState(false)
const heroSwapTimersRef = useRef<number[]>([])

const handleToggleHeroImage = () => {
  if (heroSwapping) return
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const next: HeroImage = heroImage === "voxel" ? "photo" : "voxel"
  const persist = () => {
    try {
      localStorage.setItem("hero-image", next)
    } catch {
      /* ignore */
    }
  }
  if (reduced) {
    setHeroImage(next)
    persist()
    return
  }
  setHeroSwapping(true)
  const swap = window.setTimeout(() => {
    setHeroImage(next)
    persist()
  }, HERO_SPLIT_MS)
  const done = window.setTimeout(() => setHeroSwapping(false), HERO_DONE_MS)
  heroSwapTimersRef.current.push(swap, done)
}
```

- [ ] **Step 3: Cleanup timers**

```ts
useEffect(() => {
  const timers = heroSwapTimersRef.current
  return () => timers.forEach(window.clearTimeout)
}, [])
```

- [ ] **Step 4: Wire props**

Navbar:

```tsx
<Navbar
  theme={theme}
  onToggleTheme={handleToggleTheme}
  heroMode={heroImage}
  onToggleHeroImage={handleToggleHeroImage}
/>
```

HeroReveal:

```tsx
<HeroReveal disableCursorShift={scrollSplit} mode={heroImage} swapping={heroSwapping} />
```

- [ ] **Step 5: Verify**

Run: `npm run lint; if ($?) { npm run build }`
Expected: PASS.

---

### Task 5: Manual verification

- [ ] **Step 1:** `npm run dev`, open the site
- [ ] **Step 2:** Initial load still shows the full-screen curtain → voxel avatar with spotlight
- [ ] **Step 3:** Click `FiUser` → localized wipe plays over hero → real photo appears, static (no spotlight/mask/parallax)
- [ ] **Step 4:** Click `FiGrid` → wipe plays → voxel + spotlight return
- [ ] **Step 5:** Rapid double-click during wipe → ignored
- [ ] **Step 6:** Toggle to photo, reload → persists (localStorage)
- [ ] **Step 7:** Toggle theme while in photo mode → both work independently
- [ ] **Step 8:** Resize to ≤768px → both buttons sit left of the hamburger and work
