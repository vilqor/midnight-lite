import { cn } from "@/lib/utils"

/** A small four-point star, the page's section mark. */
export function StarGlyph({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-6 -6 12 12" className={cn("size-2.5", className)} style={style} aria-hidden="true">
      <path d="M0 -6Q0 0 6 0Q0 0 0 6Q0 0 -6 0Q0 0 0 -6Z" fill="currentColor" />
    </svg>
  )
}

type SectionHeadProps = {
  label: string
  title: string
  lead?: string
  /** split: from lg up the title sits on the left and the lead on the right, level with its last line
   *  (with no lead the title runs the full width); centred below lg */
  align?: "center" | "left" | "split"
  className?: string
}

/** Section header: a star and a label, the title in Fraunces, an optional lead. */
export function SectionHead({ label, title, lead, align = "center", className }: SectionHeadProps) {
  const center = align === "center"
  if (align === "split") {
    return (
      <div className={cn("mx-auto max-w-[760px] text-center lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:text-left", className)}>
        <div className={lead ? "lg:col-span-7" : "lg:col-span-12"}>
          <p className="eyebrow-star">
            <StarGlyph />
            {label}
          </p>
          <h2 className="h2 mt-5">{title}</h2>
        </div>
        {lead && <p className="lead mx-auto mt-5 max-w-[600px] lg:col-span-5 lg:col-start-8 lg:mx-0 lg:mt-0 lg:max-w-none">{lead}</p>}
      </div>
    )
  }
  return (
    <div className={cn(center ? "mx-auto max-w-[760px] text-center" : "max-w-[560px]", className)}>
      <p className="eyebrow-star">
        <StarGlyph />
        {label}
      </p>
      <h2 className="h2 mt-5">{title}</h2>
      {lead && <p className={cn("lead mt-5 max-w-[600px]", center && "mx-auto")}>{lead}</p>}
    </div>
  )
}
