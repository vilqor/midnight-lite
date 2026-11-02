import { site } from "@/content/site"

// The live demo's own layer (midnight-lite.vilqor.com): a link to the full template in the header, a line above the
// footer, and the closing button sent to the full template. It is on only when NEXT_PUBLIC_LITE_DEMO=1 at build time
// (`npm run build:demo`); a site built from this template never shows any of it. The words are in site.ts:
// `header.link`, `note` and `final.demoHref`.

export const liteDemo = process.env.NEXT_PUBLIC_LITE_DEMO === "1"

/** the header's quiet link, opening in a new tab; null outside the demo */
export const demoHeaderLink = liteDemo && site.header.link ? { ...site.header.link, newTab: true } : null

/** the line above the footer; null outside the demo */
export const demoNote = liteDemo ? site.note : null

/** the closing call to action's button: the full template in a new tab in the demo, `final.button` everywhere else */
export const finalButton = liteDemo ? { ...site.final.button, href: site.final.demoHref, newTab: true } : site.final.button
