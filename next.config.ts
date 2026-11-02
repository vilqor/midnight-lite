import type { NextConfig } from "next"
import { PHASE_PRODUCTION_BUILD } from "next/constants"

// Static export: `npm run build` writes a self-contained site to /out that any static host can serve.
// The site's address, for the canonical link, the sitemap and the social image. Set NEXT_PUBLIC_SITE_URL
// (see .env.example); on Vercel and Netlify the production address is picked up on its own.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL || // Netlify
  ""

const nextConfig: NextConfig = {
  output: "export",
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  images: { unoptimized: true },
  // `npm run dev -- --hostname 0.0.0.0` and open the page from a phone on the same Wi-Fi:
  // the dev server only serves its scripts to hosts listed here (development only).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  // no floating dev badge over the page while checking it on a phone
  devIndicators: false,
}

export default function config(phase: string): NextConfig {
  // A production build without a real address would point search engines and shared links at the placeholder domain.
  // Next reads this file in several processes; the flag in the environment keeps the warning to one.
  if (phase === PHASE_PRODUCTION_BUILD && (!siteUrl || /\bexample\.(com|org|net)\b/.test(siteUrl)) && !process.env.SITE_URL_WARNED) {
    process.env.SITE_URL_WARNED = "1"
    console.warn(
      "\n\x1b[33m⚠ NEXT_PUBLIC_SITE_URL is not set to your address.\x1b[0m\n" +
        "  The canonical link, the sitemap, robots.txt and the social image will point to the placeholder domain in\n" +
        "  src/content/site.ts. Set NEXT_PUBLIC_SITE_URL (see .env.example), or deploy on Vercel or Netlify, which set\n" +
        "  it for you.\n",
    )
  }
  return nextConfig
}
