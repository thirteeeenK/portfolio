# portfolio

React 19 + TypeScript 6 + Vite 8 personal portfolio site.

## Commands

```sh
npm run dev       # Vite dev server (HMR)
npm run build     # tsc -b && vite build  — typecheck all project refs first
npm run lint      # eslint . (flat config)
npm run preview   # vite preview
```

## Structure

- **`src/components/<Name>/<Name>.tsx`** — each component gets its own directory
- **`src/data/*.ts`** — all content is data-driven (personal, projects, skills, etc.)
- **`public/`** — static assets (favicon, icons, images)

## TypeScript quirks

- `verbatimModuleSyntax: true` → use `import type` for type-only imports
- `erasableSyntaxOnly: true` → no enums, no namespaces, no parameter properties
- `noUnusedLocals` + `noUnusedParameters` set — lint-level errors
- Project references: `tsconfig.app.json` (src/) + `tsconfig.node.json` (vite.config.ts)

## Framework notes

- **React Compiler** enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` in `vite.config.ts`
- **ESLint** uses flat config (`eslint.config.js`) — no `.eslintrc`
- **No test framework** — no test scripts, no test config
- **No CI workflows**
- Key deps: `framer-motion`, `react-icons`

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout (`CONTEXT.md` + `docs/adr/`). See `docs/agents/domain.md`.
