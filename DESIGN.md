# Midnight Lite design guide

How the page looks and why, for people and AI editors. Read it before adding or changing anything visible.
Reuse what is listed here before inventing something new. AGENTS.md has the working rules; this file has the look.

## The idea in one paragraph

A night sky in midnight blue with one warm accent (champagne). Display type in Fraunces, interface in Geist, numbers
in Geist Mono. The ornament is engraved, like banknote guilloche, and stays quiet in the background. Every section
shows a real piece of the product (a list, a control, a sentence with sources), never a symbolic picture. Restraint
is the style: one accent per block, soft light instead of drawn lines, nothing that shouts.

## Colour

Tokens live at the top of `src/app/globals.css`. Use the Tailwind names (`bg-paper`, `text-ink-2`, `bg-brand-soft`…).

| Token | Use it for |
|---|---|
| `paper` `#0b1020` | the page background |
| `surface` | raised areas: the header island, fact cards, chips |
| `surface-2` | what shadcn/ui's `secondary`, `muted` and `accent` map to |
| `ink` | headings, primary text |
| `ink-2` | body text, secondary labels |
| `ink-3` | metadata and hints: small mono labels and numbers, source names. The dimmest text (6.4:1 on `paper`); keep it to 11 px and up |
| `night-ink` | the stars |
| `brand` | the accent: one primary button, one highlighted word, one key icon per block |
| `brand-ink` | the accent as small text (eyebrows, links) |
| `brand-soft` | a quiet accent fill behind a chip or an icon |
| `brand-glint` | the light that runs over gold (glint, sparks) |
| `positive` | done / success only (checks), never decoration |

To change the accent, set `--brand` and `--brand-ink`. Anything mixed from `--brand` follows it, so never hard-code
the champagne hex in a component.

**One accent per block.** In a section the accent appears once: the main button, or the italic word in the title,
or one highlighted figure. Not a lit edge plus a glow plus a gold button plus gold numbers.

## Type

| Class | Font | Use |
|---|---|---|
| `display` | Fraunces 340, SOFT 60 | the hero and the closing title; the accent line in `<em className="glint">` |
| `h2` | Fraunces 350, SOFT 50 | section titles |
| `lead` | Geist 17/19, `ink-2` | the sentence under a title |
| `eyebrow-star` | Geist Mono 12, tracked, `brand-ink`, with `<StarGlyph />` | the label above a section title |
| `num` | Geist Mono, tabular | times, prices, counts |

Small labels inside the product pieces are set in place: Geist Mono 11, tracked, uppercase, `ink-3` (see the
"Sources" label in `features.tsx`). A tile's title is the two-tone sentence in `Tile`.

Titles are sentence case and short. Inputs are at least 16 px on phones (Safari zooms smaller ones).

## Layout

- Width: `container-x` (max 1200 px, 24 px gutter on phones, 20 px under 380 px, 40 px from md).
- Section rhythm: `py-16 max-md:py-12 md:py-24`; heading to content `mt-12 md:mt-16`.
- Phone spacing steps: 8 · 12 · 16 · 24 · 32 · 48 px. Card padding 24 on phones, gap between cards 12.
- Headings: `<SectionHead label title lead />`, centred.

## Surfaces

| Class | What it is |
|---|---|
| `tile` | the big product tile: matte, a crisp inner edge, a short soft shadow |
| `bg-surface/60` with `rounded-2xl` | a small card, such as the three facts under the tiles |
| `glass` | the header island: blurred, with a faint top light |

Cards don't nest: an inner row is a flat fill (`bg-paper/60` or `bg-white/[0.04]`), not another card.

## Components to reuse

| Component | File | For |
|---|---|---|
| `SectionHead`, `StarGlyph` | `section-head.tsx` | every section heading, and the page's mark |
| `Tile` | `features.tsx` | a product tile: short label, one two-tone sentence, then a visual |
| `Cite` | `cite.tsx` | a numbered source badge with a tooltip (tap on phones) |
| `NightSky` | `night-sky.tsx` | a seeded star field |
| `GuillocheSpiral` | `guilloche.tsx` | the engraved rosette; `id` must be unique on the page |
| `Logo` | `logo.tsx` | the wordmark |

## Ornaments

- Background only, low contrast, placed asymmetrically (one rosette at the side, not a mirrored pair).
- They may be lit (a spark running along a line, a slow glint) but never rotate quickly or pulse.
- The browser draws them after the page loads and fades them in; don't move them into the HTML.
- Never the subject of a section: no glowing hub, sphere, sun, moon or halo in the middle.

## Phones (below 768 px)

- Designed on their own; scope changes with `max-md:`, `max-sm:` or `md:hidden` and leave the desktop alone.
- The hero is set from the left; tiles stack one under another; footer columns fold.
- Touch targets at least 44 px, nothing that only works on hover. Tablets with touch get the same through
  `pointer-coarse:`, so an iPad gets the height and a mouse keeps the desktop spacing.
- Check 320, 390 and 768 px.

## Motion

- Decoration only, defined in the "Magic layer" of `globals.css`, and all of it stops for `prefers-reduced-motion`.
  So do the header's transitions, the footer's plus and the tooltip's zoom (`motion-reduce:`).
- Allowed: slow glints, sparks along guilloche lines, twinkling stars, fades, and one slow sheen across the accent
  buttons (`shine`, once every 5.5 s).
- Not allowed: light beams running around borders, spinning ornaments, bouncing, pulsing or blinking buttons, any
  faster or brighter loop on a button.

## Do and don't

| Do | Don't |
|---|---|
| Show the product: a list, a real control, a sentence with sources | Symbolic art: constellations, spheres, glowing hubs, illustrated moons |
| One accent per block | Stacked accents: lit edge + glow + gold button + gold numbers |
| Soft light and fills to separate areas | Straight divider lines between sections or inside cards |
| Plain, specific copy in sentence case | Hype words, exclamation marks, "AI-powered" filler |
| Real UI fragments for feature bullets | Icon-in-a-circle plus a sentence |
| Dark theme only | A light theme or a theme toggle |
| The wordmark alone | A logo symbol next to the wordmark |
