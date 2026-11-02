import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import { GuillocheSpiral } from "./guilloche"
import { Header } from "./header"
import { NightSky } from "./night-sky"
import { StarGlyph } from "./section-head"

/** The page for links that lead nowhere: the hero's sky and rosette, and a way home. */
export function NotFoundPage() {
  const n = site.notFound
  return (
    <>
      <Header name={site.name} {...site.header} />
      <main id="main" className="relative grid min-h-dvh place-items-center overflow-hidden">
        <NightSky className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" count={80} seed={23} />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[640px] -translate-1/2 opacity-70 max-md:size-[420px]">
          <GuillocheSpiral id="g-404" className="size-full [mask-image:radial-gradient(closest-side,black_60%,transparent)]" />
        </div>
        <div className="container-x relative py-32 text-center max-md:py-28">
          <p className="eyebrow-star">
            <StarGlyph /> {n.label}
          </p>
          <h1 className="display mx-auto mt-6 max-w-[900px] text-[clamp(44px,7vw,96px)] max-md:text-[clamp(40px,12.8vw,52px)]">
            {n.title.lead} <br />
            <em className="glint">{n.title.accent}</em>
          </h1>
          <p className="lead mx-auto mt-6 max-w-[500px] max-md:text-[16px] max-md:leading-[26px]">{n.lead}</p>
          <Link href="/" className={cn(buttonVariants(), "mt-10 h-12 rounded-full px-6 text-[15px] max-md:mt-8 max-md:h-[52px] max-md:w-full max-md:text-[16px]")}>
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            {n.home}
          </Link>
        </div>
      </main>
    </>
  )
}
