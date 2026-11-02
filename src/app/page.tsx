import { Features } from "@/components/site/features"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { site } from "@/content/site"
import { demoHeaderLink, demoNote, finalButton } from "@/demo"
import { LiteNote } from "@/demo/lite-note"

export const metadata = { alternates: { canonical: "/" } }

// The landing page. Each section takes its words from src/content/site.ts.
// The demo's link, note and button (src/demo) appear only when NEXT_PUBLIC_LITE_DEMO=1.
export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded-md bg-brand px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {site.ui.skip}
      </a>
      <Header name={site.name} {...site.header} link={demoHeaderLink} />
      <main id="main">
        <Hero {...site.hero} />
        <Features {...site.features} />
        <FinalCta title={site.final.title} lead={site.final.lead} note={site.final.note} button={finalButton} />
      </main>
      {demoNote && <LiteNote {...demoNote} />}
      <Footer name={site.name} legalName={site.legalName} description={site.description} email={site.email} {...site.footer} />
    </>
  )
}
