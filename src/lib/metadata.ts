import type { Metadata, Viewport } from "next"

import { site } from "@/content/site"

/** Title, description, canonical address and the social image, from src/content/site.ts. */
export function siteMetadata(): Metadata {
  const title = `${site.name} · ${site.tagline}`
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: site.description,
    openGraph: {
      title,
      description: site.description,
      url: "/",
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.png"] },
  }
}

export const viewport: Viewport = {
  themeColor: "#0b1020",
  // lets fixed bars sit above the iPhone home indicator (env(safe-area-inset-bottom))
  viewportFit: "cover",
}
