import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

import { Logo } from "./logo"

// at least 44 px tall wherever a finger taps it: phones, and tablets with touch
const tap = "max-md:inline-flex max-md:min-h-11 max-md:items-center pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center"

export type FooterContent = {
  name: string
  legalName: string
  /** the year in the © line, as a number such as 2026. Don't pass new Date().getFullYear(): with cacheComponents
   *  (on in new Next.js projects) `next build` stops at a date read during prerendering */
  year: number
  description: string
  email: string
  /** the line next to the green dot */
  status: string
  /** the footer navigation's name for screen readers */
  nav: string
  columns: { title: string; links: { label: string; href: string }[] }[]
  /** a small link at the end of the bottom line */
  credit?: { label: string; href: string } | null
}

/** The footer: a short description, link columns that fold on phones, and the name set large, fading into the night. */
export function Footer({ name, legalName, year, description, email, status, nav, columns, credit }: FooterContent) {
  return (
    <footer className="relative overflow-hidden">
      <div className="container-x grid gap-12 pt-16 pb-10 max-md:gap-6 max-md:pt-12 max-md:pb-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo name={name} />
          <p className="mt-4 max-w-[300px] text-[14px] leading-[22px] text-ink-2">{description}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink-2">
            <span className="size-2 rounded-full bg-positive" aria-hidden="true" />
            {status}
          </p>
        </div>
        <nav aria-label={nav} className="grid grid-cols-2 gap-8 max-md:hidden md:col-span-6 md:col-start-7 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">{col.title}</p>
              <ul className="mt-4 grid gap-2.5 pointer-coarse:mt-2 pointer-coarse:gap-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={cn("text-[14px] text-ink-2 transition-colors hover:text-ink", tap)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* phones: each column folds away; tap a heading to open it */}
        <nav aria-label={nav} className="-mx-4 grid gap-1 md:hidden">
          {columns.map((col) => (
            <details key={col.title} className="group rounded-2xl open:bg-white/[0.03]">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-4 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-[12px] tracking-[0.14em] text-ink-2 uppercase">{col.title}</span>
                <Plus className="size-4 text-ink-3 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden="true" />
              </summary>
              <ul className="px-4 pb-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="block py-3 text-[15px] text-ink-2">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>
      <div className="container-x flex flex-col gap-2 pb-6 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="num">
          © {year} {legalName}
        </p>
        <a href={`mailto:${email}`} className={cn("hover:text-ink", tap)}>
          {email}
        </a>
        {credit && (
          <a href={credit.href} className={cn("hover:text-ink sm:ml-auto", tap)}>
            {credit.label}
          </a>
        )}
      </div>
      {/* the name, set large and fading into the night */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] text-center font-serif text-[clamp(96px,24vw,360px)] leading-[0.9] font-[340] tracking-[-0.04em] text-transparent select-none [background-clip:text] [background-image:linear-gradient(to_bottom,color-mix(in_oklab,var(--brand)_32%,transparent),transparent_85%)] max-md:text-[30vw]"
      >
        {name}
      </p>
    </footer>
  )
}
