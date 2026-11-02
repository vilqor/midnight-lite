# Midnight Lite

A free, dark landing page template for AI and SaaS products, built with Next.js 16, Tailwind CSS v4 and shadcn/ui. MIT licensed.

Midnight blue with a champagne accent, Fraunces for display type, a seeded night sky and an engraved guilloche
rosette. One page: a header, a hero, product tiles, a closing call to action and a footer, laid out separately for
phones. Every word sits in one file, and AGENTS.md and DESIGN.md tell your AI editor how the page is built.

Midnight Lite is the free part of [Midnight](https://templates.vilqor.com/midnight?ref=github), a paid template with
seven more sections, working forms, analytics and a second language. See [Lite and the full version](#lite-and-the-full-version).

[Live demo](https://midnight-lite.vilqor.com) · [Full Midnight](https://templates.vilqor.com/midnight?ref=github)

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Lucide

<!-- TODO(owner): the GitHub repository does not exist yet. Replace OWNER below (clone command and Deploy button)
     with the brand account once it is created, e.g. https://github.com/vilqor/midnight-lite -->

## Quick start

```bash
git clone https://github.com/OWNER/midnight-lite.git my-site
cd my-site
npm install
npm run dev
```

Open http://localhost:3000. Then make it yours:

1. Rewrite the name and copy in `src/content/site.ts`.
2. Point the buttons at your sign-up page: `header.cta`, `hero.primary` and `final.button` in `site.ts`.
3. Remove the line about this template above the footer: set `note` in `site.ts` to `null`.
4. Pick your accent: `--brand` and `--brand-ink` at the top of `src/app/globals.css`.
5. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your address.
6. Replace `public/og.png` with a picture of your page (1200 × 630).
7. Run `npm run check`, then upload `out/`.

The footer says "Made with Midnight Lite". Keep it or set `footer.credit` in `site.ts` to `null`; the license
doesn't require it.

## What's inside

- **Header:** open at the top of the page, a glass bar once you scroll. Section links with a lit pill that follows
  the section you are reading, and one button. Phones show the wordmark and the button.
- **Hero:** a Fraunces title with a gold accent line, a lead (a shorter one on phones), two buttons, the night sky
  and a guilloche rosette. Phones set it from the left. Pass `children` to put your own product picture under the
  buttons.
- **Product tiles:** a research list that runs past the edge of its tile, a sentence with numbered sources in
  tooltips (tap on phones), and three facts shown with a schedule, a switch and language codes.
- **Closing call to action:** a large title with an accent word, one button, stars and soft light.
- **Footer:** description, link columns that fold on phones, © line, email, and the name set large and fading out.
- **404 page** in the same sky.
- **SEO:** title, description, canonical link from `NEXT_PUBLIC_SITE_URL`, `sitemap.xml`, `robots.txt` and a social image.
- **Motion** only on decoration (glints, sparks, twinkling stars), all of it off for `prefers-reduced-motion`.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOWNER%2Fmidnight-lite&project-name=midnight-lite&repository-name=midnight-lite)

<!-- TODO(owner): replace OWNER in the Deploy button URL above once the GitHub repository exists -->

No environment variables are required: on Vercel and Netlify the site's address is picked up on its own. The site is
a static export: `npm run build` writes `out/`, which runs on any static host (Netlify, Cloudflare Pages, GitHub Pages,
S3). Elsewhere set `NEXT_PUBLIC_SITE_URL` before the build. `vercel.json` and `public/_headers` add security headers.

## Use with AI agents

- `AGENTS.md`: commands, where each kind of change lives, the rules. Claude Code reads it through `CLAUDE.md`;
  Cursor, Codex and GitHub Copilot read `AGENTS.md` directly.
- `DESIGN.md`: colours and where they go, type, surfaces, what not to do.
- `npm run check`: ESLint (it fails on text typed into components), types and the build.

A prompt to start from:

```
Rebrand this template for [Product], [what it does in one line]. Rewrite the copy in src/content/site.ts,
keeping every section. Use [#hex] as the accent in src/app/globals.css. Follow AGENTS.md and DESIGN.md,
then run npm run check.
```

## Add the blocks to your own project

The sections are also a shadcn registry, `@vilqor`. In a Next.js project with shadcn/ui, add the theme first (it sets
your page colours), then any block:

```bash
npx shadcn@latest add https://midnight-lite.vilqor.com/r/midnight-theme.json
npx shadcn@latest add https://midnight-lite.vilqor.com/r/midnight-hero.json
```

Or add the namespace to `components.json` once and use short names:

```json
{ "registries": { "@vilqor": "https://midnight-lite.vilqor.com/r/{name}.json" } }
```

```bash
npx shadcn@latest add @vilqor/midnight-theme @vilqor/midnight-hero
```

| Item | What it is |
|---|---|
| `midnight-theme` | Colours, font variables and the type, surface and glint styles. Dark only |
| `midnight-night-sky` | A seeded star field with twinkling stars and rare shooting stars |
| `midnight-guilloche` | The engraved guilloche rosette |
| `midnight-header` | Header that turns into a glass bar on scroll |
| `midnight-hero` | Serif title with a gold accent line over the sky and the rosette |
| `midnight-features` | Product tiles: a research list, a sentence with sources, three facts |
| `midnight-cta` | Closing call to action with one button |
| `midnight-footer` | Footer with folding link columns and a large fading name |

Blocks install into `components/midnight/` and take their words as props; the types sit at the top of each file
(`HeroContent`, `FeaturesContent`…). They work with the Radix and the Base UI styles of shadcn/ui.

### Fonts

The theme expects Fraunces, Geist and Geist Mono under these variable names:

```tsx
import { Fraunces, Geist, Geist_Mono } from "next/font/google"

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], preload: false })
const serif = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "opsz"] })
// <html className={`dark ${sans.variable} ${mono.variable} ${serif.variable}`}>
```

With the shadcn MCP server your agent can find and add the blocks too: run `npx shadcn@latest mcp init`, then ask it
to add `midnight-hero` from `@vilqor`.

## Lite and the full version

|  | Midnight Lite | Midnight |
|---|---|---|
| Price and license | Free, MIT | $59 once; any number of sites for you and your clients |
| Sections | Hero, product tiles and a closing call to action, plus header and footer | 10 sections: also customer logos, use cases in tabs, an integrations workflow, a stats band, testimonials, pricing with a monthly and yearly switch, and an FAQ |
| Hero | Title, lead and two buttons over the night sky | Also a product window built from your text (the task, the agents, the night as a chart, the morning brief with sources) and a line of social proof |
| Product tiles | A research list, a sentence with numbered sources, three facts | Also a memory timeline and a draft with a live tone switch; on phones the tiles become a swipe row |
| Pages | Home and 404 | Home, Privacy Policy, Terms, Imprint and 404 |
| Dialogs | None | Sign-up with validation, a demo film, and a ⌘K Ask panel that searches the page's own copy |
| Forms | Buttons link to your sign-up page | Email forms to Formspree, Loops or any webhook, with a spam trap and a consent line |
| Analytics | None | Plausible, Umami, Vercel, PostHog or Google Analytics, with 12 events wired and a consent banner for Google |
| SEO | Title, description, canonical link, sitemap, robots.txt, a social image | Also structured data, a web manifest, hreflang, and a social card drawn from your copy at build time |
| Languages | English | English and German, with a guide to add your own |
| Look | Dark theme, champagne accent, night sky, one guilloche rosette, gold glint | Also four accent presets with a switcher, more guilloche ornaments with light running along them, section light and a pointer spotlight |
| Phones | Every section laid out for phones | Also swipe rows, tabs, and a menu and dialogs that stay above the keyboard |
| For AI editors | AGENTS.md, DESIGN.md, a lint rule that keeps words out of components, `npm run check` | Also a launch checklist script, screenshots at five widths, a language check, starter prompts and shadcn MCP settings |
| Source | This repository; 8 blocks in the `@vilqor` shadcn registry | The full source as a download, with free updates |
| Support | GitHub issues | Email to help@vilqor.com |

[See the full Midnight](https://templates.vilqor.com/midnight?ref=github)

## Structure

```
src/app/                 layout, page, not-found, globals.css (tokens first, effects after), sitemap, robots, icons
src/content/site.ts      every word on the page
src/components/site/     header, hero, features, final-cta, footer, section-head, night-sky, guilloche, cite, logo
src/components/ui/       button, tooltip (shadcn/ui)
src/lib/  src/hooks/     cn, fill, seeded random numbers, useMounted
registry.json            the @vilqor registry items
public/r/                the built registry (npm run registry:build)
public/og.png            the social image
```

## License

MIT, see [LICENSE](LICENSE). The fonts come under the SIL Open Font License 1.1 and the shadcn/ui components under
MIT, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The full Midnight template has its own license and is not
part of this repository.

## Links

- Live demo: https://midnight-lite.vilqor.com
- Full Midnight: https://templates.vilqor.com/midnight?ref=github
- Full Midnight demo: https://midnight.vilqor.com/?ref=github
- Questions and bugs: GitHub issues, or help@vilqor.com
