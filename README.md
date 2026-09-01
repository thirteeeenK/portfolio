# Personal Portfolio

Animated personal portfolio — **light & dark themes**, **Vibe Coded**, **React 19 + TypeScript 6 + Vite 8**. Cursor-driven two-layer hero reveal (voxel ↔ static cutout), switchable background (**Kinetic Grid** warp grid vs **Particle Network** via `tsParticles` — default **network**), full-screen wipe transitions, and fully data-driven content (`src/data/`).

> Feel free to modify and improve. All content is data — no component edits needed to customize.

## Features

- **Two-layer voxel hero** — stacked PNGs with cursor spotlight reveal; drifts with cursor (parallax), idle shrink.
- **Hero image toggle** — swaps voxel animation ↔ static real-photo cutout (navbar + hero dock); persisted `localStorage: "hero-image"`, theme-aware cutout (`no-shades` dark / `with-shades` light), local line-split wipe, instant on `prefers-reduced-motion`.
- **Hero dock FLIP** — three toggles centered at hero (`ToggleGroup` / `framer-motion` `LayoutGroup` + `layoutId`) → FLIP to navbar on scroll (`scrollY > 2`); navbar hidden until split; hero-dock centered at `1.15rem`.
- **Two switchable backgrounds** — **Kinetic Grid** (canvas grid warps to cursor, click ripples) ↔ **Particle Network** (`tsparticles/slim`, 85 dots, links 160px, grab/push, 0.7 speed); default `network`; toggle persisted `localStorage: "bg-mode"`; shares `ThemeReveal` curtain wipe (500/1800ms) with theme, guarded against concurrent wipes; theme-aware colors (blue `#2563eb` light / white dark).
- **Light & dark mode** — sun/moon toggle with full-screen curtain wipe; persists `localStorage: "theme"`, FOUC guard in `index.html` (`prefers-color-scheme` fallback), `<meta theme-color>` sync.
- **Premium editorial sections** — hairline dividers, card tokens (`--hairline/--card-bg/--card-border/--card-shadow`), `Switzer` + `IBM Plex Mono` type system (see below); `Section` hairline dividers, `About` lead with left accent, `TechStack` icon cards, `Projects` featured vs grid, `Contact` centered CTA.
- **Video demo modal** — `liveUrl` ending `.mp4/.webm/.mov/.ogg` opens inline modal (`public/videos/...`).
- **Typewriter hero titles** — rotating roles from `personal.titles`.
- **100% static** — no backend, no env vars, no secrets.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 + `@vitejs/plugin-react` |
| Styling | Custom CSS per-component + Tailwind CSS 4 (`@tailwindcss/vite`) |
| Animation | `framer-motion` 12 (LayoutGroup/FLIP), custom RAF loops (hero, grid) |
| Particles | `@tsparticles/react` + `@tsparticles/slim` (`tsparticles` engine) |
| Icons | `react-icons` (Feather `Fi*`, Bootstrap `Bs*`) |
| Fonts | **Switzer** (Fontshare, 400/500/600/700) + **IBM Plex Mono** (Google, 400/500) — vars `--heading/--sans/--mono` in `src/index.css` |
| Compiler | React Compiler via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` |
| Lint | ESLint 10 (flat `eslint.config.js`) |

## Typography

One-line swap system:

- `index.html:17-20` — Fontshare Switzer + Google IBM Plex Mono (preconnect both)
- `src/index.css:26-29` — `--heading`/`--sans` = `'Switzer'`, `--mono` = `'IBM Plex Mono'`; `h1,h2,h3` weight `700`, section/project titles `600`

To change fonts, replace those 2 blocks only.

## Quick Start

```sh
npm install
npm run dev       # HMR at http://localhost:5173
npm run build     # tsc -b && vite build → dist/
npm run preview   # preview built site
npm run lint      # eslint .
```

Requires Node 18+.

## Project Structure

```
├── index.html               # shell, OG meta, theme FOUC guard, fonts
├── public/                  # static roots (hero PNGs, meta.png, favicon, videos/)
├── src/
│   ├── App.tsx              # layout: hero → sections → footer; bg/theme/hero state + wipes
│   ├── App.css              # hero-text + hero-dock
│   ├── index.css            # tokens (--bg/--text/--hairline/--card-*) + fonts
│   ├── components/
│   │   ├── HeroReveal/      # voxel + photo reveal (+ WordReveal, swap wipe)
│   │   ├── ThemeReveal/     # full-screen curtain wipe (theme + bg)
│   │   ├── KineticGrid/     # canvas warp grid
│   │   ├── ParticleNetwork/ # tsparticles network (tsparticles/slim)
│   │   ├── ToggleGroup/     # 3-toggle pill (hero & nav variants, layoutId FLIP)
│   │   ├── Navbar/          # fixed nav + toggles (revealed/hidden slide)
│   │   ├── Typewriter/  Section/  CtaButton/  TechIcon/  SocialLinks/  Footer/
│   │   ├── About/  Skills/  TechStack/  Projects/  Education/  Certifications/  Contact/
│   │   └── ...
│   └── data/                # ★ all content (no component edits needed)
└── vite.config.ts           # React + Babel React Compiler
```

## The Hero Section

Two modes via navbar/hero-dock button (beside theme/bg toggles):

### Voxel mode (default)

Two stacked PNGs + cursor spotlight:

- **Base** — `public/transparent-base.png` — full photo, masked linear bottom fade.
- **Flame** — `public/transparent-flame.png` — transparent cutout with glow, revealed via radial mask (`--x/--y/--size`) + idle decay; `flame` layer `source-in` blend.

### Photo mode

Fully static cutout, still interactive:

- **Theme-aware variant** — `App.tsx:142-143` picks `with-shades-cropped.png` (light) vs `no-shades-cropped.png` (dark); curtain hides swap at `HERO_SPLIT_MS=500`.
- **Hover spotlight** — moving cursor (or finger drag on touch) reveals *opposite* shade through same radial mask; idle 1s shrinks it (`HeroReveal.tsx:167-206`, `.hero-reveal__photo--reveal`). Whole photo drifts ~12px parallax (`HeroReveal.tsx:182-191`), frozen when `scrollSplit` or `disableCursorShift`.

Swap plays `hero-reveal__swap` line-split wipe (`1800ms`); `prefers-reduced-motion` swaps instantly.

### Replacing hero images

`public/` filenames (must match exactly or hero breaks):

| File | Role | Requirement |
| --- | --- | --- |
| `transparent-base.png` | Voxel base | Portrait/square, transparent optional |
| `transparent-flame.png` | Voxel reveal | **Transparent PNG cutout** (glow subject only) |
| `with-shades-cropped.png` | Photo mode — light | **Transparent PNG cutout**, identical canvas to dark variant |
| `no-shades-cropped.png` | Photo mode — dark | Same canvas/size; nudge `HeroReveal.css:131` `.hero-reveal__photo--no-shades { transform: translate(...) scale(...) }` at 900/600/480 if misaligned |

Steps: drop into `public/`, keep same dimensions per pair, restart dev server. Custom names via `App.tsx` props: `baseSrc`/`flameSrc`/`photoSrc`/`photoVariant`/`mode` (`HeroReveal.tsx` defaults). `src/assets/hero.png` is unused leftover.

### Backgrounds — Grid vs Network

| Mode | Impl | Behavior |
| --- | --- | --- |
| `grid` | `KineticGrid.tsx` — canvas | 55px cells, 260px influence warp 24px, dot 0.7/28px, ripples on click, theme-aware `--hairline` palette |
| `network` | `ParticleNetwork.tsx` — `tsparticles` | `loadSlim`, 85 dots size 2-4.2 link 160px 1.3px grab 210/push 3, colors `white` dark / `blue #2563eb` light, `fullScreen: false` over page bg |

Default `network` (`App.tsx:56-65`, `bg-mode` localStorage). Toggle via grid/stars button (`BsGrid3X3Gap`/`BsStars`) in navbar or hero dock; reuses `ThemeReveal` (`bgWiping` guard `wiping||bgWiping`); `prefers-reduced-motion` toggles instantly without wipe and stops particle `move`.

## Light & Dark Mode + Background Wipe

Shared `ThemeReveal` curtain (`ThemeReveal.tsx`): `SPLIT_MS=500` (curtain reaches center, `onComplete` flips `data-theme` or `bg-mode`), `DONE_MS=1800` (curtain opens, `onDone` clears). Inline script in `index.html:23-38` sets `data-theme` from `localStorage` → `prefers-color-scheme` → dark. Guard: `handleToggleTheme`/`handleToggleBg` return if `wiping||bgWiping`. Colors are CSS vars in `src/index.css` (`:root` dark + `:root[data-theme="light"]` overrides).

## Customizing Content (`src/data/`)

Edit TS files, site updates. Comments show disabled entries.

- **`personal.ts`** — `name`, `titles[]` (typewriter), `tagline`, `bio[]`, `location`, `email` (mailto), `resumeUrl` (`#` hides).
- **`navigation.ts`** — `{ label, href }[]`; `href` must match section `id`.
- **`social-links.ts`** — `{ name, url, icon }`; icon keys `github/linkedin/twitter/email`; replace placeholder URLs.
- **`skills.ts`** — `{ name, category }[]` (Design/Frontend/Backend/Soft Skills…).
- **`tech-stack.ts`** — `{ name, category, url }[]`; categories `Frontend|Backend|Database|DevOps|Tools|Language|AI Tools`.
- **`projects.ts`** — `{ id, title, description, technologies[], thumbnail?, githubUrl?, liveUrl?, featured, category }`; `liveUrl` `.mp4/.webm/.mov/.ogg` → video modal from `public/videos/`.
- **`experience.ts`** — `{ id, company, role, location?, startDate, endDate ("Present"), description[], technologies?, companyUrl? }` — currently **not rendered** (`App.tsx` import commented).
- **`education.ts`** — `{ id, school, level, program, year }`.
- **`certifications.ts`** — `{ id, name, issuer, date, url?, credentialId? }`.

## Images & Branding

| Asset | Location | Purpose |
| --- | --- | --- |
| `transparent-base.png` | `public/` | Voxel base |
| `transparent-flame.png` | `public/` | Voxel glow cutout |
| `with-shades-cropped.png` | `public/` | Photo — light |
| `no-shades-cropped.png` | `public/` | Photo — dark |
| `meta.png` | `public/` | OG share image (`index.html:15`) |
| `cat3.png` | `public/` | Tab favicon (`index.html:5`) |
| `favicon.svg` / `icons.svg` | `public/` | Unused alts |
| `videos/recording.mp4` | `public/videos/` | Demo video example |

Update `og:url`/`og:image` in `index.html:11-15` to your domain on deploy.

## TypeScript Quirks

- `verbatimModuleSyntax: true` → `import type` for types
- `erasableSyntaxOnly: true` → no enums/namespaces/param props
- `noUnusedLocals` + `noUnusedParameters` are errors
- Project refs: `tsconfig.app.json` (src) + `tsconfig.node.json` (vite.config)

## Deployment

```sh
npm run build   # static dist/
```

- **Vercel/Netlify** — build `npm run build`, output `dist`.
- **GitHub Pages** — push `dist` to `gh-pages`.

Then update OG metas to live domain.

## Security Notes

- `npm audit` — 0 vulnerabilities (prior `brace-expansion`/`nanoid` were dev-only transitives).
- No env vars / API keys.
- Contact is `mailto:` only.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev + HMR |
| `npm run build` | `tsc -b && vite build` (typecheck first) |
| `npm run lint` | ESLint flat |
| `npm run preview` | Preview build |

**Made and Vibe Coded with ❤️**
