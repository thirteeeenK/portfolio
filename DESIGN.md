---
name: John Kenly Pamor — Portfolio
description: A dark, monochromatic developer portfolio with kinetic grid background and technical precision
colors:
  bg: "#0a0a0a"
  text: "#888888"
  text-h: "#fafafa"
  border: "#1a1a1a"
  code-bg: "#111111"
  accent: "#fafafa"
  accent-bg: "rgba(255, 255, 255, 0.04)"
  accent-border: "rgba(255, 255, 255, 0.1)"
  social-bg: "rgba(255, 255, 255, 0.02)"
  dot: "rgba(255, 255, 255, 0.025)"
  wipe-glow: "#00f0ff"
typography:
  sans:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "17px"
    lineHeight: "150%"
  heading:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 500
    letterSpacing: "-1.5px"
    lineHeight: "1.15"
  mono:
    fontFamily: "ui-monospace, Consolas, monospace"
rounded:
  sm: "3px"
  md: "4px"
  lg: "6px"
spacing:
  section: "5rem"
  container: "960px"
  component-gap: "1rem"
components:
  cta-btn:
    backgroundColor: "transparent"
    textColor: "{colors.text-h}"
    rounded: "{rounded.lg}"
    padding: "0.65rem 1.25rem"
  cta-btn-hover:
    backgroundColor: "{colors.accent-bg}"
    textColor: "{colors.text-h}"
    rounded: "{rounded.lg}"
    padding: "0.65rem 1.25rem"
  skill-tag:
    backgroundColor: "transparent"
    textColor: "{colors.text-h}"
    rounded: "{rounded.md}"
    padding: "0.4rem 0.9rem"
  project-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  social-link:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "0.4rem 0.8rem"
---

# Design System: John Kenly Pamor — Portfolio

## Overview

**Creative North Star: "The Quiet Monolith"**

This portfolio speaks in silence and mass. It is a dark, monolithic presence that communicates through weight and negative space rather than decoration. The system rejects chromatic variety in favor of a strict monochromatic palette — near-black backgrounds, white text, and hairline borders that carve the interface into clean geometric planes. Every element earns its place through function alone.

The design philosophy is one of technical restraint: borders over shadows, precision over flourish, system fonts over decorative type. The kinetic grid background and dramatic hero reveal animation provide the only expressive moments — a controlled explosion within an otherwise still monument. The result is a developer portfolio that feels like a well-crafted code editor: dense with information, effortless to scan, and quietly confident.

**Key Characteristics:**
- Monochromatic palette with no saturated accent colors
- Border-driven depth (no box shadows except subtle card hover)
- System font stack for authenticity and performance
- Kinetic grid canvas as ambient texture
- Hero reveal animation with curtain split and cyan wipe glow
- Responsive with mobile-first breakpoints at 480px, 600px, 768px, 900px, 1024px

## Colors

The palette is monochromatic and stark — near-black and near-white with a single cyan accent reserved exclusively for the hero wipe animation.

### Primary
- **Near-Black** (#0a0a0a): The dominant surface. Background for all sections and the body. Establishes the monolithic presence.
- **Soft Gray** (#888888): Secondary text, descriptions, and body copy. Provides legibility without competing with headings.
- **Pure White** (#fafafa): Headings, labels, and highlighted text. The highest-contrast element against the dark ground.

### Neutral
- **Hairline** (#1a1a1a): The structural boundary. Used on every border — cards, buttons, skill tags, social links, footer, navbar. This single value unifies the entire component language.
- **Code Block** (#111111): Slightly lighter than background. Used for code blocks and section variants to create subtle tonal layering without breaking the monochrome.
- **Accent Ghost** (rgba(255, 255, 255, 0.04)): Barely visible hover state background. Appears on CTA button hover, tech stack hover, and section accent variants.
- **Accent Border** (rgba(255, 255, 255, 0.1)): Subtle hover border. Used on CTA buttons, social links, and project links when active.
- **Social Ghost** (rgba(255, 255, 255, 0.02)): Near-invisible background for social link items.
- **Dot Grid** (rgba(255, 255, 255, 0.025)): Ambient texture for the kinetic grid canvas dots.

### Named Rules
**The No-Chroma Rule.** The only saturated color in the entire system is the cyan wipe glow (#00f0ff) used during the hero reveal animation. No accent color appears anywhere else — not in buttons, not in links, not in section headers. The palette is monochrome by doctrine.

## Typography

**Display/Heading Font:** system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
**Body Font:** system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
**Mono Font:** ui-monospace, Consolas, monospace

**Character:** The type system is deliberately unadorned. Using system fonts is a statement of authenticity — this is a developer who builds with the tools at hand, not decorative libraries. The weight and size hierarchy does all the work; no font pairing contrast is needed.

### Hierarchy
- **Display** (700, clamp(1.5rem, 5.5vw, 4rem), 1.1): Hero name. The largest, boldest element on the page. White, tight letter-spacing (-1.5px), left-aligned on desktop, centered on mobile.
- **Headline** (600, 1.75rem, 1.2): Section titles. White, centered, with -0.5px letter-spacing. Appears above every major section.
- **Title** (600, 1.15rem, 1.3): Card titles, subheadings. White, used in project cards and experience entries.
- **Body** (400, 0.88–0.95rem, 1.6–1.8): Descriptions, bios, paragraph text. Soft gray (#888), left-aligned in sections, centered in hero/contact.
- **Label** (600, 0.65–0.75rem, uppercase, 0.6–1px spacing): Category labels, skill categories, about detail labels. Small, uppercase, gray. Used for metadata and structure.

### Named Rules
**The System Font Rule.** No external font is loaded. The entire type stack is system-ui with platform fallbacks. This is a performance and authenticity choice — the portfolio loads instantly with zero font requests.

## Layout

The layout is a single-column centered column, max-width 960px for content sections and 1100px for the navbar and footer. Spacing follows a consistent rhythm: 5rem section padding on desktop, scaling down to 3rem on tablet and 2.5rem on mobile.

**Container model:** Each section uses a `.section__container` wrapper with max-width and auto margins. The hero section breaks this model with absolute positioning and viewport-height constraints.

**Grid:** Project cards use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))` — a single column on mobile, two columns on desktop. Tech stack items use `repeat(auto-fill, minmax(120px, 1fr))` for a denser grid.

**Responsive breakpoints:**
- 1024px: Hero text left-positioning adjusts
- 900px: Hero text centers, kinetic grid layer scales down
- 768px: Mobile nav activates, hero splits to stacked layout
- 600px: Hero text becomes relative-positioned, sections reduce padding
- 480px: Base font shrinks to 13px, all component sizes scale down

## Elevation & Depth

This system is **flat by design**. There are no box-shadows in the token vocabulary. Depth is conveyed through three mechanisms:

1. **Tonal layering:** Sections alternate between `rgba(10, 10, 10, 0.85)` and `rgba(17, 17, 17, 0.85)` — barely perceptible shifts that create rhythm without breaking the monochrome surface.

2. **Border structure:** The single `--border: #1a1a1a` value draws hairline boundaries around every interactive element (cards, buttons, tags, links). Depth is implied by the border itself, not by shadows beneath it.

3. **Transform on hover:** Project cards translate up 2px on hover — the only elevation cue in the system.

### Shadow Vocabulary
- **Card hover** (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15)`): The sole exception to the no-shadow rule. Applied only to project cards on hover, providing a subtle lift that reinforces the border-based depth system.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only shadow in the system appears on project card hover. Everything else — buttons, tags, links, nav items — uses border color and background opacity changes to communicate state.

## Shapes

The form language is angular and precise. Corner radii are minimal:
- **3px** (`--rounded-sm`): Code blocks, badge labels
- **4px** (`--rounded-md`): Skill tags, social links, project link buttons
- **6px** (`--rounded-lg`): CTA buttons, project cards

There are no rounded corners above 6px. No pill shapes, no circular elements, no decorative geometry. The only circle in the system is the hero reveal's radial mask — a functional gradient, not a decorative shape.

## Components

### CTA Button
- **Shape:** 6px radius, border-based
- **Default:** Transparent background, 1px `--border` border, white text
- **Hover:** `--accent-bg` background, `--accent-border` border
- **Focus:** 2px solid accent outline with 2px offset
- **Typography:** 0.9rem, weight 500, system font

### Skill Tag
- **Shape:** 4px radius, border-based
- **Default:** Transparent background, 1px `--border` border, white text
- **Hover:** Border shifts to `--accent-border`
- **Typography:** 0.8rem, weight 500

### Project Card
- **Shape:** 6px radius, border-based
- **Default:** `--bg` background, 1px `--border` border, padding 1.5rem (2rem for featured)
- **Hover:** Border shifts to `--accent-border`, translateY(-2px), subtle box-shadow
- **Internal structure:** Badge → Title → Description → Tech tags → Action links

### Social Link
- **Shape:** 4px radius, border-based
- **Default:** Transparent background, 1px `--border` border, gray text
- **Hover:** Border shifts to `--accent-border`, text turns white
- **Mobile:** Labels hidden below 480px, only icons visible

### Navigation
- **Style:** Fixed top, transparent at rest, `--bg` background with bottom border on scroll
- **Links:** 0.85rem, weight 500, gray, white on hover
- **Mobile:** Slide-in panel from right (260px width), full-height, `--bg` background
- **Toggle:** Three horizontal lines that transform into X when open

### Kinetic Grid (Signature Component)
Full-viewport fixed canvas with animated grid lines and dots. The background is a subtle, procedural texture that adds movement without distracting from content. Z-index: 0, pointer-events: none.

### Hero Reveal (Signature Component)
A dramatic entrance animation: two curtain halves (top/bottom) split to reveal a glowing cyan wipe line, then fade. The hero text fades in with a 0.7s delay after the curtain opens. The wipe uses a linear gradient from transparent → cyan (#00f0ff) → white → cyan → transparent with a matching glow shadow.

## Do's and Don'ts

### Do:
- **Do** use the single `--border` value for every border in the system. Consistency is the point.
- **Do** keep all typography in the system font stack. No external font loads.
- **Do** use 480px as the mobile breakpoint for scaling down component sizes.
- **Do** apply the 2px translateY hover lift only to project cards.
- **Do** use the `--accent-bg` (rgba(255,255,255,0.04)) for subtle hover backgrounds.

### Don't:
- **Don't** add box-shadows to any element except project cards on hover.
- **Don't** introduce any saturated color into buttons, links, or section headers.
- **Don't** use border-radius above 6px. The geometry is angular and precise.
- **Don't** load external fonts. The system font stack is a design decision, not a limitation.
- **Don't** use decorative shapes (pills, circles, rounded badges) anywhere in the component library.
