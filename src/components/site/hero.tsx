import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GuillocheSpiral } from "./guilloche"
import { NightSky } from "./night-sky"
import { StarGlyph } from "./section-head"

export type HeroContent = {
  /** the line above the title, shown on phones */
  tagline: string
  /** the title in two parts; `accent` is set in italic gold */
  title: { lead: string; accent: string }
  lead: string
  /** a shorter lead for phones */
  leadShort: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

/** The opening: a serif title with a gold accent line over a night sky and an engraved rosette.
 *  Phones read it like an editorial page, set from the left. `children` sit under the buttons:
 *  a place for your own product picture. */
export function Hero({ tagline, title, lead, leadShort, primary, secondary, children }: HeroContent & { children?: React.ReactNode }) {
  return (
    <section id="top" className="relative overflow-x-clip pt-36 pb-20 max-md:pt-28 max-md:pb-14 md:pt-48 md:pb-32 [@media(max-height:520px)_and_(max-width:1023px)]:pt-24">
      {/* the sky, and one rosette at the left edge, lit on the side that faces the title */}
      <NightSky className="absolute inset-x-0 top-0 h-[1000px] [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
      <div aria-hidden="true" className="absolute top-8 -right-48 size-[360px] opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_40%)] md:hidden">
        <GuillocheSpiral id="g-hero-m" className="size-full" />
      </div>
      <div aria-hidden="true" className="absolute top-5 left-[calc(50%-1030px)] hidden size-[620px] md:block">
        <GuillocheSpiral id="g-hero-a" className="size-full [mask-image:linear-gradient(to_right,rgb(0_0_0/0.3)_48%,black_92%)]" />
      </div>

      <div className="container-x relative text-center max-md:text-left">
        <p className="eyebrow-star max-[380px]:text-[11px] max-[380px]:tracking-[0.1em] md:hidden">
          <StarGlyph /> {tagline}
        </p>
        <h1 className="display mx-auto max-w-[1000px] text-[clamp(54px,8.6vw,126px)] max-md:mt-5 max-md:text-[clamp(42px,13.4vw,56px)] max-md:leading-[0.98]">
          {title.lead} <br className="hidden max-sm:block sm:block" />
          <em className="glint">{title.accent}</em>
        </h1>
        <p className="lead mx-auto mt-7 max-w-[720px] text-balance max-md:hidden">{lead}</p>
        <p className="mt-5 max-w-[330px] text-[16px] leading-[25px] text-ink-2 md:hidden">{leadShort}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-md:mt-8 max-md:flex-col max-md:items-start max-md:gap-1.5">
          <a href={primary.href} className={cn(buttonVariants(), "shine bg-brand text-paper hover:bg-brand/85 h-12 rounded-full px-6 text-[15px] max-md:h-[52px] max-md:w-full max-md:text-[16px]")}>
            {primary.label}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
          <a href={secondary.href} className={cn(buttonVariants({ variant: "ghost" }), "h-12 rounded-full px-5 text-[15px] text-ink hover:bg-white/5 max-md:h-[52px] max-md:px-0 max-md:hover:bg-transparent")}>
            {secondary.label}
          </a>
        </div>
      </div>

      {children && <div className="container-x relative mt-16 max-md:mt-12 md:mt-20">{children}</div>}
    </section>
  )
}
