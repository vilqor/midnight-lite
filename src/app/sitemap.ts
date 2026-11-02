import type { MetadataRoute } from "next"

import { site } from "@/content/site"

export const dynamic = "force-static"

// One page. Add an entry for each page you add.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }]
}
