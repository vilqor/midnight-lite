import { cn } from "@/lib/utils"

/** A small four-point star, the page's section mark. */
export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="-6 -6 12 12" className={cn("size-2.5", className)} aria-hidden="true">
      <path d="M0 -6Q0 0 6 0Q0 0 0 6Q0 0 -6 0Q0 0 0 -6Z" fill="currentColor" />
    </svg>
  )
}

type SectionHeadProps = {
  label: string
  title: string
  lead?: string
  className?: string
}

/** Section header, centred: a star and a label, the title in Fraunces, an optional lead. */
export function SectionHead({ label, title, lead, className }: SectionHeadProps) {
  return (
    <div className={cn("mx-auto max-w-[760px] text-center", className)}>
      <p className="eyebrow-star">
        <StarGlyph />
        {label}
      </p>
      <h2 className="h2 mt-5">{title}</h2>
      {lead && <p className="lead mx-auto mt-5 max-w-[600px]">{lead}</p>}
    </div>
  )
}
