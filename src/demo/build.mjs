// The live demo's build: `npm run build:demo`. The same static site with the demo layer on (NEXT_PUBLIC_LITE_DEMO=1),
// and framing allowed for the catalogs that preview the demo in a frame. The template's own public/_headers lets
// only the site itself frame its pages, which is right for a site built from it; this changes the built copy only.
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import { createRequire } from "node:module"

const frames = [
  "https://21st.dev",
  "https://*.21st.dev",
  "https://tailkits.com",
  "https://www.tailkits.com",
  "https://vercel.com",
  "https://*.vercel.com",
].join(" ")

const env = {
  ...process.env,
  NEXT_PUBLIC_LITE_DEMO: "1",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://midnight-lite.vilqor.com",
}
const next = createRequire(import.meta.url).resolve("next/dist/bin/next")
const build = spawnSync(process.execPath, [next, "build"], { stdio: "inherit", env })
if (build.status !== 0) process.exit(build.status ?? 1)

// X-Frame-Options cannot name other sites; frame-ancestors can, and browsers prefer it
const file = "out/_headers"
const headers = fs
  .readFileSync(file, "utf8")
  .replace(/^# \(The live demo's build.*\n/m, "")
  .replace("the page may be framed only by the site itself.", "this demo build may be framed by the catalogs listed below.")
  .replace(/^[ \t]*X-Frame-Options:.*\n/m, "")
  .replace("frame-ancestors 'self'", `frame-ancestors 'self' ${frames}`)
if (!headers.includes(frames) || headers.includes("X-Frame-Options")) {
  console.error(`could not allow framing in ${file}`)
  process.exit(1)
}
fs.writeFileSync(file, headers)
console.log(`demo build: ${env.NEXT_PUBLIC_SITE_URL}, framed by ${frames}`)
