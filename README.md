# Personal Portfolio 

A dark, animated personal portfolio **Vibe Coded** and built with **React 19**, **TypeScript**, and **Vite 8**. Features a cursor-driven two-layer hero reveal animation, kinetic grid background, and fully data-driven content — every section is customized from `src/data/` without touching components.

Feel free to modify and improve.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | CSS Modules + Tailwind CSS 4 |
| Animation | framer-motion, custom RAF loops (hero reveal, typewriter) |
| Icons | react-icons |
| Compiler | React Compiler (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`) |
| Linting | ESLint 10 (flat config) |

## Quick Start

```sh
npm install       # install dependencies
npm run dev       # start the dev server (HMR) at http://localhost:5173
npm run build     # typecheck (tsc -b) + production build into dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project Structure

```
├── index.html               # HTML shell, meta tags, favicon
├── public/                  # static assets served at the root (hero images, meta.png, favicon)
├── src/
│   ├── App.tsx              # page layout: hero → sections → footer
│   ├── components/          # one folder per component (<Name>/<Name>.tsx + .css)
│   │   ├── HeroReveal/      # two-layer hero reveal animation
│   │   ├── Navbar/          # fixed top navigation
│   │   ├── About/  Skills/  Projects/  Experience/
│   │   ├── Education/  Certifications/  TechStack/  Contact/
│   │   └── ...
│   └── data/                # ★ ALL content lives here (see below)
```

---

## ✦ The Hero Section (Important — Read First)

The hero is a **two-layer image reveal**. Two PNG images are stacked and blended with a cursor-driven spotlight:

- **Base layer** — always visible. This is your main photo.
- **Flame layer** — hidden behind a radial mask that follows the cursor/`touch`; moving the mouse "reveals" it like a glow.

### Replacing the hero images

The two images are loaded from the `public/` folder by default. **Rename your images to match exactly, or the hero breaks:**

| File (in `public/`) | What it is | Requirements |
| --- | --- | --- |
| `transparent-base.png` | Your normal photo (base layer) | Portrait or square, transparent background is **not** required |
| `transparent-flame.png` | Your glowing / flame-cutout photo (reveal layer) | Must be a **transparent PNG cutout** (background removed) so only the glowing subject appears over the base |

**Step-by-step:**

1. Put your photo in `public/` and rename it to `transparent-base.png`.
2. Create a glowing version of the same photo (e.g. a flame overlay, neon outline, or duplicate layer with a bright glow) and **remove its background** so the rest is transparent.
3. Save it as `public/transparent-flame.png`.
4. Both files must be **exactly the same dimensions** so the reveal lines up.
5. Restart the dev server (`npm run dev`) — Vite serves static files from `public/` at the root, so changes there appear instantly without touching code.

### Where the filenames are defined

If you want to use different filenames (or per-page heroes), override the props on the `HeroReveal` component in `src/App.tsx`:

```tsx
<HeroReveal
  baseSrc="/my-photo.png"          // default: "/transparent-base.png"
  flameSrc="/my-glow.png"          // default: "/transparent-flame.png"
  disableCursorShift={scrollSplit} // freezes parallax after scrolling
/>
```

Defaults live in `src/components/HeroReveal/HeroReveal.tsx` (lines 39–40). The animation also supports `smoothing` (lerp factor, default `0.1`) and `disableCursorShift`.

> **Note:** `src/assets/hero.png` is an orphaned leftover from an older design and is **not** used anywhere. You can delete it.

### Hero text

The hero heading, typewriter titles, tagline, and buttons all come from data files — see below.

---

## ✦ Customizing Content (`src/data/`)

All content is data-driven. Edit these TypeScript files and the site updates automatically. Comments in each file show disabled entries — uncomment them to enable.

### `src/data/personal.ts` — name, bio, email

| Field | Description |
| --- | --- |
| `name` | Your full name (hero heading) |
| `titles` | Array of rotating typewriter titles (hero + about) |
| `tagline` | Short line under the titles in the hero |
| `bio` | Array of paragraphs for the About section |
| `location` | Shown in About / Contact |
| `email` | Drives the "Contact" mailto button |
| `resumeUrl` | Link for "View Resume". Set to `#` or remove it to hide the button |

### `src/data/navigation.ts` — navbar links

`navItems` is an array of `{ label, href }`. `href` must match a section `id` (e.g. `#about`, `#skills`, `#projects`, `#experience`, `#contact`).

### `src/data/social-links.ts` — social icons

| Field | Description |
| --- | --- |
| `name` | Tooltip text |
| `url` | Full URL — replace placeholders like `https://linkedin.com/in` and `https://twitter.com` with your real profiles |
| `icon` | Key of the icon to render (`github`, `linkedin`, `twitter`, `email`) |

### `src/data/skills.ts` — skill chips

Array of `{ name, category }`. Categories: `Design`, `Frontend`, `Backend`, `Soft Skills`, etc. Add or remove entries freely.

### `src/data/tech-stack.ts` — tech stack grid

Array of `{ name, category, url }`. Categories: `Frontend` | `Backend` | `Database` | `DevOps` | `Tools` | `Language` | `AI Tools`. Set `url` to a site link (shown when hovering/clicking the tech icon).

### `src/data/projects.ts` — project cards

| Field | Description |
| --- | --- |
| `id` | Unique string identifier |
| `title` | Card title |
| `description` | One-to-two sentence summary |
| `technologies` | Array of tech labels |
| `thumbnail` | (Optional) image path |
| `githubUrl` | (Optional) repo link — comment it out if unused |
| `liveUrl` | (Optional) live demo link — comment it out if unused |
| `featured` | `true` highlights the project |
| `category` | `Frontend` / `Full-Stack` / etc. |

### `src/data/experience.ts` — work history

Array of `{ id, company, role, location?, startDate, endDate, description[], technologies?, companyUrl? }`. `endDate` can be the string `"Present"`. Replace the placeholder example jobs with your own history (and remove `companyUrl` if you have no company site).

### `src/data/education.ts` — schools

Array of `{ id, school, level, program, year }`.

### `src/data/certifications.ts` — certifications

Array of `{ id, name, issuer, date, url?, credentialId? }`. `url` links to a verification page (e.g. CodeCred), `credentialId` shows the credential number.

---

## ✦ Images & Branding

| Asset | Location | Purpose |
| --- | --- | --- |
| `transparent-base.png` | `public/` | Hero base layer (rename your photo to this) |
| `transparent-flame.png` | `public/` | Hero reveal layer (transparent glowing cutout) |
| `meta.png` | `public/` | Social share image (Open Graph) |
| `cat3.png` | `public/` | Browser tab favicon — referenced in `index.html` line 5 |
| `icons.svg` | `public/` | Icon sprite (if used) |

The Open Graph `og:url` and `og:image` in `index.html` point to `https://johnkenlypamor.dev/` — update them to your own domain after deploying.

---

## ✦ Deployment

```sh
npm run build   # outputs a static site to dist/
```

Upload the contents of `dist/` to any static host:

- **Vercel / Netlify** — connect the repo; build command `npm run build`, output directory `dist`.
- **GitHub Pages** — push `dist/` (or use a workflow) to the `gh-pages` branch.

Then update the `og:url` / `og:image` metas in `index.html` to your live domain.

---

## ✦ Security Notes

- `npm audit` reports **0 vulnerabilities**. Earlier advisories (`brace-expansion` DoS, `nanoid` loop) were transitive **dev-toolchain-only** dependencies — never shipped to the static site — and are fixed.
- No environment variables, API keys, or credentials are used or stored in this repo.
- The Contact section is a `mailto:` link only — there is no server-side form handling.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Typecheck + production build (`tsc -b && vite build`) |
| `npm run lint` | ESLint (flat config) |
| `npm run preview` | Preview the built site locally |

**Made and Vibe Coded with ❤️ for the community**
