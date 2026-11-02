<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

(The block above is written by Next.js itself when `next dev` runs; the rest of this file is the template's guide.)

# Midnight Lite landing template

A dark one-page landing for an AI or SaaS product: Next.js 16 (App Router, static export), Tailwind CSS v4,
shadcn/ui on Radix, Lucide icons, Fraunces and Geist. This file is what an assistant needs to change it safely.
Before any visible change, also read DESIGN.md: the colours, type, surfaces, components to reuse, and what not to do.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: the static site in `out/`
- `npm run build:demo`: the live demo's build (the demo layer on, framing allowed for catalogs); not for your site
- `npm run preview`: serves the built `out/` at http://localhost:3000
- `npm run lint`: ESLint
- `npm run typecheck`: types only
- `npm run check`: lint, types and build; must pass before you finish
- `npm run registry:build`: rebuilds the shadcn registry in `public/r/` from `registry.json`

## Where things live

| To change | Go to |
|---|---|
| Every word, link and number on the page | `src/content/site.ts` |
| Colours, type scale, effects | `src/app/globals.css`: tokens at the top, the "Magic layer" after them, phones at the end |
| Sections | `src/components/site/*.tsx`, put together in `src/app/page.tsx` |
| shadcn/ui primitives | `src/components/ui` (`button`, `tooltip`) |
| Title, description, canonical link | `src/lib/metadata.ts` (reads `site.ts`) |
| The 404 page | `src/app/not-found.tsx` and `src/components/site/not-found-page.tsx` |
| Social image | `public/og.png` (1200 × 630), a picture you replace |
| Site address | `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |
| The shadcn registry | `registry.json` (source) and `public/r/*.json` (built, committed) |
| The live demo's extras (header link, note, closing button) | `src/demo/`, off unless `NEXT_PUBLIC_LITE_DEMO=1`; the words are `header.link`, `note` and `final.demoHref` in `site.ts` |

## Rules

1. No words in components. Every visible string and aria-label lives in `src/content/site.ts`. Sections take their
   words as props, typed next to the component (`HeroContent`, `FeaturesContent`…); `page.tsx` passes each one its
   part of `site`. Fill `{placeholders}` with `fill()` from `src/lib/fill.ts`. ESLint fails on text typed into JSX.
2. Dark theme only. One accent per block: the accent colour (`--brand`, champagne) appears once in a section;
   everything else stays in the neutral ink colours.
3. Phones are designed on their own. Changes below 768 px go behind `max-md:`, `max-sm:` or `md:hidden` and must
   not move the desktop layout. Touch targets at least 44 px on phones and on touch screens (`pointer-coarse:`),
   nothing that only works on hover. Check 320, 390, 768, 1024 and 1440 px.
4. Ornaments (the guilloche rosette, the star field) stay in the background and stay quiet. Sections show real
   pieces of the product (UI fragments, lists, controls), not symbolic illustrations, glows or beams.
5. Copy is plain and specific: no hype words, sentence case in titles.
6. The site is a static export: no API routes, server actions or middleware.
7. Components in `src/components/site` are also registry items: they import only `@/components/ui/*`, `@/lib/*`,
   `@/hooks/*` and each other (`./x`), never `@/content`. The 404 page (`not-found-page.tsx`) is the one exception
   there and is not in the registry. `src/demo/` is the live demo's layer, also outside the registry.
8. Motion stops for `prefers-reduced-motion`: animations go in the "Magic layer" of `globals.css` under
   `prefers-reduced-motion: no-preference`, and a transition that moves or resizes something gets
   `motion-reduce:transition-none`.

## Add a section

1. Put its words in `site.ts`.
2. Create `src/components/site/<name>.tsx` with a `<Name>Content` type for its props. Use `<SectionHead>` for the
   heading and `container-x` for the width.
3. Add it to `src/app/page.tsx`. Give its `<section>` an `id` if the header should link to it, and add it to
   `header.nav` in `site.ts` as `"/#<id>"` (the header then lights it while it is on screen).

## Add a shadcn/ui component

The shadcn MCP server is set up for Claude Code (`.mcp.json`), Cursor (`.cursor/mcp.json`) and VS Code
(`.vscode/mcp.json`): use it to find and add components, or run `npx shadcn@4 add <name>`. They land in
`src/components/ui`; restyle them with the tokens in DESIGN.md and pass any words they show from `site.ts`.

## The registry (`@vilqor`)

`registry.json` lists the blocks other projects can install with `npx shadcn add`. Each item names its files, its
npm `dependencies` and its `registryDependencies` (bare names such as `button` are shadcn's own; ours are full
URLs such as `https://midnight-lite.vilqor.com/r/midnight-theme.json`). Files install to `@components/midnight/`,
`@lib/` and `@hooks/` through `target`.

In the theme's `cssVars`, the standard shadcn tokens (`background`, `primary`, `ring`…) are plain colours: shadcn
copies a `var(...)`, `color-mix(...)` or non-colour value into the project's `@theme inline` as a variable that points
to itself. Mixed and non-colour values (`brand-soft`, `tile-bg`, `card-shadow`…) live in the theme's `css` under
`@layer base`, next to the base rules (scrolling, selection, cursor, font smoothing).

To add an item:

1. Make the component self-contained as in rule 7: words as props, imports only from `@/components/ui`, `@/lib`,
   `@/hooks` and its own folder.
2. Add an entry to `items` in `registry.json`: `name` (starts with `midnight-`), `type` (`registry:block` for a
   section, `registry:component` for a piece), `title`, `description`, `files` with `target`, `dependencies`,
   `registryDependencies` (include the theme), `categories` and the two-line `docs` the other blocks use.
3. If the block uses a new CSS class from `globals.css`, add it to the `css` of `midnight-theme` too: utilities as
   `@utility <name>`, media queries as plain top-level blocks (the CLI copies nested ones again on every install).
   The same goes for new colour tokens (`cssVars`).
4. Run `npm run registry:build` and commit `public/r/`. Run `npx shadcn@latest registry validate ./registry.json`.
5. Check it installs. The items point at each other through `https://midnight-lite.vilqor.com`, so before that
   address serves the new files, test from a local copy with the address swapped for a local one:

   ```bash
   mkdir -p /tmp/vilqor-r/r
   for f in public/r/*.json; do sed 's#https://midnight-lite.vilqor.com#http://localhost:4000#g' "$f" > "/tmp/vilqor-r/r/${f##*/}"; done
   npx -y serve@14 /tmp/vilqor-r -l 4000
   ```

   Then, in a fresh `npx create-next-app@latest` + `npx shadcn@latest init` project (Radix or Base UI style):
   `npx shadcn@latest add http://localhost:4000/r/midnight-theme.json http://localhost:4000/r/<item>.json`, then
   `npx tsc --noEmit` and `npx next build`.

## Before you finish

- `npm run check` passes (ESLint fails on text typed into JSX: move it to `site.ts`).
- Look at the page at 1440 and 390 px at least, and 320 for anything on phones.
- If you touched a file listed in `registry.json`, run `npm run registry:build`.
