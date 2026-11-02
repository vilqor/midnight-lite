"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { fill } from "@/lib/fill"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

export type HeaderContent = {
  name: string
  /** section links, shown from 768 px: "/#product" scrolls on the home page and leads home from other pages */
  nav: { label: string; href: string }[]
  /** a quiet text link left of the button, shown from 1024 px, where it fits without moving the links off centre;
   *  `newTab` opens it in a new tab */
  link?: { label: string; href: string; newTab?: boolean } | null
  /** the one button; `short` is its label on phones */
  cta: { label: string; short: string; href: string }
  /** the logo link's name for screen readers; {name} is filled in */
  backToTop: string
}

const link =
  "relative inline-flex h-9 items-center pointer-coarse:h-11 rounded-full px-4 text-[14.5px] text-ink/80 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

type Box = { x: number; w: number }
const boxOf = (el: HTMLElement | null): Box | null => (el ? { x: el.offsetLeft, w: el.offsetWidth } : null)
const idOf = (href: string) => href.split("#")[1] ?? ""

/** Open at the top of the page; once you scroll it gathers into a floating glass island.
 *  Three columns keep the links on the page's centre line whatever sits left and right.
 *  One lit pill moves under the links: to the one you point at, otherwise to the section you are reading. */
export function Header({ name, nav, link: aside, cta, backToTop }: HeaderContent) {
  const [island, setIsland] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [hoverBox, setHoverBox] = useState<Box | null>(null)
  const [active, setActive] = useState<{ id: string; box: Box | null } | null>(null)

  useEffect(() => {
    const onScroll = () => setIsland(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // scroll spy: the section crossing the middle band of the screen is the current one
  const sections = useMemo(() => nav.map((item) => idOf(item.href)).filter(Boolean), [nav])
  useEffect(() => {
    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting)
        const id = sections.find((s) => seen.get(s))
        setActive(id ? { id, box: boxOf(listRef.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`) ?? null) } : null)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [sections])

  const point = (e: React.SyntheticEvent<HTMLElement>) => setHoverBox(boxOf(e.currentTarget))
  const box = hoverBox ?? active?.box ?? null

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 flex justify-center px-3 pr-[max(12px,env(safe-area-inset-right))] pl-[max(12px,env(safe-area-inset-left))] transition-[padding] duration-500 ease-out-soft motion-reduce:transition-none", island && "pt-3")}>
      <div
        className={cn(
          "grid w-full grid-cols-[1fr_auto] items-center gap-4 transition-[max-width,height,padding,border-radius,background-color,box-shadow] duration-500 ease-out-soft motion-reduce:transition-none md:grid-cols-[1fr_auto_1fr]",
          island ? "glass h-14 max-w-[960px] rounded-full bg-surface/85 pr-2 pl-6 max-md:pl-5" : "h-[76px] max-w-[1200px] rounded-none px-3 max-md:h-16 md:px-7",
        )}
      >
        <Link href="/#top" aria-label={fill(backToTop, { name })} className="justify-self-start rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none max-md:inline-flex max-md:min-h-11 max-md:items-center pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center">
          <Logo name={name} className={cn("transition-[font-size] duration-500 motion-reduce:transition-none", island && "text-[22px]")} />
        </Link>

        {/* the links sit in their own glass pill at the top; in the island the island is the pill */}
        <nav className={cn("hidden rounded-full transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none md:flex", island ? "p-0" : "glass p-1")}>
          <ul
            ref={listRef}
            className="relative flex items-center"
            onMouseLeave={() => setHoverBox(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverBox(null)
            }}
          >
            {/* the lit pill: a faint fill, light on its top edge and a warm glow rising from below */}
            <li
              aria-hidden="true"
              className={cn("nav-lit pointer-events-none absolute top-0 left-0 h-9 rounded-full transition-[translate,width,opacity] duration-300 ease-out-soft motion-reduce:transition-none pointer-coarse:h-11", !box && "opacity-0")}
              style={{ width: box?.w ?? 0, translate: `${box?.x ?? 0}px 0` }}
            />
            {nav.map((item) => {
              const id = idOf(item.href)
              return (
                <li key={item.href} data-nav={id} onMouseEnter={point} onFocus={point}>
                  <a href={item.href} aria-current={active?.id === id ? "true" : undefined} className={cn(link, active?.id === id && "text-ink")}>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 justify-self-end">
          {aside && (
            <a
              href={aside.href}
              target={aside.newTab ? "_blank" : undefined}
              rel={aside.newTab ? "noopener" : undefined}
              className={cn(link, "whitespace-nowrap text-ink-2 max-lg:hidden")}
            >
              {aside.label}
            </a>
          )}
          <a href={cta.href} className={cn(buttonVariants(), "shine bg-brand text-paper hover:bg-brand/85 h-10 rounded-full px-5 text-[14px] max-md:h-11 max-sm:px-4 pointer-coarse:h-11")}>
            <span className="sm:hidden">{cta.short}</span>
            <span className="max-sm:hidden">{cta.label}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
