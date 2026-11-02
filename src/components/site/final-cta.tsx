import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NightSky } from "./night-sky"

export type FinalCtaContent = {
  /** the title in two parts; `accent` is set in italic gold */
  title: { lead: string; accent: string }
  lead: string
  /** the button: point it at your sign-up page; `newTab` opens it in a new tab */
  button: { label: string; href: string; newTab?: boolean }
  /** a small line under the button */
  note?: string
}

/** The closing call to action: a large serif title with an accent word, one button, stars and soft light. */
export function FinalCta({ title, lead, button, note }: FinalCtaContent) {
  return (
    <section id="start" className="relative overflow-hidden">
      <NightSky className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_60%,transparent)]" count={90} seed={41} />
      <div aria-hidden="true" className="glow-center absolute inset-0" />
      <div className="container-x relative pt-16 pb-28 text-center max-md:pt-12 max-md:pb-20 md:pt-24 md:pb-36">
        <h2 className="display mx-auto max-w-[900px] text-[clamp(48px,7vw,104px)] max-md:text-[clamp(42px,13vw,56px)]">
          {title.lead} <em className="glint">{title.accent}</em>
        </h2>
        <p className="lead mx-auto mt-6 max-w-[520px]">{lead}</p>
        <a
          href={button.href}
          target={button.newTab ? "_blank" : undefined}
          rel={button.newTab ? "noopener" : undefined}
          className={cn(buttonVariants(), "shine bg-brand text-paper hover:bg-brand/85 mt-10 h-12 rounded-full px-7 text-[15px] max-md:h-[52px] max-md:w-full max-md:text-[16px]")}
        >
          {button.label}
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </a>
        {note && <p className="num mt-4 text-[12px] text-ink-3">{note}</p>}
      </div>
    </section>
  )
}
