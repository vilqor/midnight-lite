import { Check, FileText, LoaderCircle, Telescope } from "lucide-react"

import { fill } from "@/lib/fill"
import { cn } from "@/lib/utils"
import { Cite } from "./cite"
import { SectionHead } from "./section-head"

type TileText = { eyebrow: string; title: string; text: string }

export type FeaturesContent = {
  label: string
  title: string
  lead: string
  research: TileText & {
    /** the list's label, the "reading" chip, and what screen readers hear on each row's icon */
    label: string
    status: string
    reading: string
    kept: string
    rows: { title: string; where: string; reading?: boolean }[]
    footer: { read: string; kept: string }
  }
  sources: TileText & {
    /** what screen readers hear on each number; {n} and {title} are filled in */
    cite: string
    /** the sentence in parts; a part with `cite` ends with that source's number */
    parts: { text: string; cite?: number }[]
    sources: { n: number; title: string; where: string }[]
  }
  schedule: { title: string; text: string; days: string[]; on: number[]; at: string }
  privacy: { title: string; text: string; setting: string }
  languages: { title: string; text: string; codes: string[]; more: string }
}

function ResearchArt({ r }: { r: FeaturesContent["research"] }) {
  return (
    <div className="w-full">
      <p className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">{r.label}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11.5px] text-brand-ink">
          <Telescope className="size-3.5" strokeWidth={1.75} /> {r.status}
        </span>
      </p>
      <ul className="grid gap-2 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        {r.rows.map((row) => (
          <li key={row.title} className="flex items-center gap-3 rounded-xl bg-paper/60 px-3.5 py-2.5">
            <FileText className="size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
            <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{row.title}</span>
            <span className="num hidden text-[11.5px] text-ink-3 sm:block">{row.where}</span>
            {row.reading ? (
              <LoaderCircle className="size-4 text-brand motion-safe:animate-spin" strokeWidth={1.75} aria-label={r.reading} />
            ) : (
              <Check className="size-4 text-positive" strokeWidth={2} aria-label={r.kept} />
            )}
          </li>
        ))}
      </ul>
      <p className="num mt-3 flex gap-3 text-[12px] text-ink-3">
        <span>{r.footer.read}</span>
        <span className="text-brand-ink">{r.footer.kept}</span>
      </p>
    </div>
  )
}

function SourcesArt({ s }: { s: FeaturesContent["sources"] }) {
  return (
    <div className="w-full">
      <p className="text-[17px] leading-8 text-ink max-md:text-[15px] max-md:leading-7">
        {s.parts.map((p, i) => {
          const src = p.cite ? s.sources[p.cite - 1] : undefined
          return (
            <span key={i}>
              {p.text}
              {src && <Cite {...src} label={fill(s.cite, { n: src.n, title: src.title })} />}
            </span>
          )
        })}
      </p>
      <ol className="mt-4 grid gap-1.5">
        {s.sources.map((src) => (
          <li key={src.n} className="flex items-baseline gap-2.5 text-[12.5px] leading-5">
            <span className="num text-brand-ink">{src.n}</span>
            <span className="min-w-0 truncate text-ink-2">{src.title}</span>
            <span className="ml-auto shrink-0 text-ink-3">{src.where}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** A fact under the tiles: the words first, then the bit of the product that proves them.
 *  Three in a row from 1024 px; below that one under another, so the product bits keep their width. */
function Fact({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <li className="flex min-w-0 flex-col gap-4 rounded-2xl bg-surface/60 p-5 max-[380px]:p-4 xl:p-6">
      <span>
        <span className="block text-[16px] font-medium">{title}</span>
        <span className="mt-1 block text-[14.5px] leading-[22px] text-ink-2">{text}</span>
      </span>
      <div aria-hidden="true" className="mt-auto flex items-center gap-1.5 max-[380px]:gap-1 lg:min-h-7">
        {children}
      </div>
    </li>
  )
}

function Facts({ schedule, privacy, languages }: Pick<FeaturesContent, "schedule" | "privacy" | "languages">) {
  return (
    <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-3 max-md:mt-3 md:gap-4 lg:grid-cols-3 lg:gap-5">
      <Fact title={schedule.title} text={schedule.text}>
        {schedule.days.map((d, i) => (
          <span
            key={i}
            className={cn(
              "num grid size-7 shrink-0 place-items-center rounded-md text-[11px] max-[380px]:size-6 lg:max-xl:size-6",
              schedule.on.includes(i) ? "bg-white/[0.08] text-ink" : "text-ink-3/60",
            )}
          >
            {d}
          </span>
        ))}
        <span className="num ml-auto text-[13px] text-ink-2">{schedule.at}</span>
      </Fact>
      <Fact title={privacy.title} text={privacy.text}>
        <span className="truncate text-[13px] text-ink-2">{privacy.setting}</span>
        {/* a switch, off */}
        <span className="ml-auto flex h-5 w-9 shrink-0 items-center rounded-full bg-white/[0.08] px-0.5">
          <span className="size-4 rounded-full bg-ink-3" />
        </span>
      </Fact>
      <Fact title={languages.title} text={languages.text}>
        {languages.codes.map((c) => (
          <span key={c} className="num rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11.5px] text-ink-2">
            {c}
          </span>
        ))}
        <span className="num ml-auto text-[12px] text-ink-3">{languages.more}</span>
      </Fact>
    </ul>
  )
}

type TileProps = TileText & {
  children: React.ReactNode
  className?: string
  /** the visual runs past the right edge and fades at the bottom, instead of sitting inside the tile */
  bleed?: boolean
}

/** A product tile: a short label, one big two-tone sentence, then the visual. */
export function Tile({ eyebrow, title, text, children, className, bleed }: TileProps) {
  return (
    <div className={cn("tile flex flex-col overflow-hidden", className)}>
      <div className="px-8 pt-8 max-md:px-6 max-md:pt-6 md:px-10 md:pt-10">
        <p className="text-[14px] font-medium text-brand-ink">{eyebrow}</p>
        <h3 className="mt-3 max-w-[560px] text-[26px] leading-[32px] font-semibold tracking-[-0.025em] text-balance max-md:text-[21px] max-md:leading-[27px] md:text-[30px] md:leading-[36px]">
          <span className="text-ink">{title}.</span> <span className="text-ink-3">{text}</span>
        </h3>
      </div>
      {bleed ? (
        <div className="relative mt-10 h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)] max-md:mt-6 max-md:h-[236px]">
          <div className="absolute top-0 left-8 w-[118%] max-md:right-6 max-md:left-6 max-md:w-auto md:left-10">{children}</div>
        </div>
      ) : (
        <div className="mt-auto px-8 pt-10 pb-8 max-md:px-6 max-md:pt-6 max-md:pb-6 md:px-10 md:pb-10">{children}</div>
      )}
    </div>
  )
}

/** The product section: two tiles built from pieces of the interface, and three facts under them.
 *  Phones stack the tiles one under another. */
export function Features({ label, title, lead, research, sources, schedule, privacy, languages }: FeaturesContent) {
  return (
    <section id="product" className="relative">
      <div className="container-x relative py-16 max-md:py-12 md:py-24">
        <SectionHead label={label} title={title} lead={lead} />
        <div className="mt-12 grid gap-5 max-md:mt-8 max-md:gap-3 md:mt-16 lg:grid-cols-12">
          <Tile {...research} className="lg:col-span-7" bleed>
            <ResearchArt r={research} />
          </Tile>
          <Tile {...sources} className="lg:col-span-5">
            <SourcesArt s={sources} />
          </Tile>
        </div>
        <Facts schedule={schedule} privacy={privacy} languages={languages} />
      </div>
    </section>
  )
}
