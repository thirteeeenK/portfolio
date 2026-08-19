# Hero Image Toggle — Design

**Date:** 2026-08-19

## Purpose

Let the visitor switch the hero avatar between the current voxel image (cursor
spotlight effect) and a static real-photo cutout via a new navbar toggle button.
The switch plays the existing line-split wipe animation localized to the hero
image area.

## Decisions (from brainstorming)

- **Trigger model:** Manual toggle button in the navbar, beside the sun/moon
  theme toggle. Choice persists in localStorage.
- **Real photo:** Cutout with transparent background. File renamed from
  `public/kenly no bg.png` to `public/kenly-no-bg.png`.
- **Transition:** The curtain-split + glowing wipe line animation, but scoped to
  the hero image (`position: absolute` inside `.hero-reveal`), not full-screen.
- **Photo treatment:** None — fully static. No spotlight mask, no flame layer,
  no cursor parallax.
- **Button style:** Icon button, no text. `FiUser` in voxel mode (switch to
  photo), `FiGrid` in photo mode (switch to voxel).

## State model

`App.tsx` owns:

- `heroImage: "voxel" | "photo"` — initialized from
  `localStorage.getItem("hero-image")`, default `"voxel"`.
- `heroSwapping: boolean` — true while the wipe plays; guards double-clicks
  (mirrors the existing `wiping` state for theme).

Toggle flow (matches `ThemeReveal` timing):

1. Click → set `heroSwapping = true`.
2. At 500 ms (`HERO_SPLIT_MS`) → flip `heroImage` and persist.
3. At 1800 ms (`HERO_DONE_MS`) → set `heroSwapping = false`.

`prefers-reduced-motion` → swap instantly, skip animation. Timers cleaned up on
unmount.

## Components

### HeroReveal

New props:

- `mode?: "voxel" | "photo"` (default `"voxel"`)
- `photoSrc?: string` (default `/kenly-no-bg.png`)
- `swapping?: boolean` (default `false`)

Behavior:

- **voxel mode:** unchanged — base layer + flame layer with radial mask driven by
  the cursor RAF loop.
- **photo mode:** render only a single static photo layer (same
  `.hero-reveal__layer` sizing); no flame element; RAF loop short-circuits and
  clears transforms.
- Preloads `photoSrc` alongside base/flame so swaps are instant.
- `modeRef` mirrors `mode` so the RAF loop reads the current mode without
  restarting the effect.
- The RAF effect no longer captures `baseRef`/`flameRef` at setup — it reads
  them from refs inside `tick` and guards for `null` (flame is absent in photo
  mode). Setup guard becomes `if (!section) return;`.
- When `swapping` is true, renders the localized overlay:
  `.hero-reveal__swap` with two curtain halves (animated in → pause → out) and a
  glowing wipe line, reusing the `theme-reveal-*` keyframes renamed to
  `hero-swap-*`. The gradient uses CSS vars directly (`--bg`, `--code-bg`).

### Navbar

New props:

- `heroMode?: "voxel" | "photo"`
- `onToggleHeroImage?: () => void`

New UI: a `.navbar__actions` flex group (positioned absolute right on desktop,
static on mobile) containing the image-toggle button then the theme button.
Both share a `.navbar__action` class replacing `.navbar__theme`.

## Data flow

```
Navbar (click) → App.handleToggleHeroImage → timers
      │                                          │ swap at 500ms
      │                                          ▼
      │                                    setHeroImage + persist
      │                                          │
      └─ heroSwapping ───────────────► HeroReveal.swapping (overlay)
                      heroImage ──────► HeroReveal.mode (layer render)
```

## Edge cases

- Rapid double-click during the wipe: ignored.
- Theme toggle during a hero swap: independent, coexist fine.
- `prefers-reduced-motion`: instant swap.
- localStorage unavailable: falls back to defaults, errors ignored.
- Mobile (≤768px): both buttons sit left of the hamburger in the actions group.

## Out of scope

- Changing the initial page-load full-screen reveal.
- Any styling/frame for the real photo.
- Persisting the choice per-theme (choice is global).
