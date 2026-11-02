"use client"

import { useState } from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type CiteProps = {
  n: number
  title: string
  where: string
  /** what screen readers hear, for example "Source 1: 38 tickets tagged billing, Tue to Thu" */
  label: string
}

/** A numbered source badge. Hover or focus shows where the line came from; on a phone a tap does.
 *  The tap area is 44 px wide and one line tall, so badges on neighbouring lines don't overlap. */
export function Cite({ n, title, where, label }: CiteProps) {
  const [open, setOpen] = useState(false)
  // the trigger is the badge itself (no asChild) and the content takes only props both tooltips share (no
  // collisionPadding: Base UI's TooltipContent does not accept it), so this works with the Radix and the Base UI tooltip alike
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          type="button"
          aria-label={label}
          onClick={(e) => {
            // a tap opens and never toggles: on Android the tap focuses the badge first, which already opens it.
            // A tap elsewhere, scrolling or Esc closes it. Without preventDefault the trigger would close it again
            e.preventDefault()
            setOpen(true)
          }}
          className="num relative ml-[0.15em] inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-soft px-1 align-[0.45em] text-[10px] leading-none text-brand-ink transition-colors before:absolute before:-inset-x-3.5 before:-inset-y-1.5 before:content-[''] hover:bg-brand hover:text-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {n}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[min(240px,calc(100vw-24px))] flex-col items-start gap-0 text-[12px] leading-4 motion-reduce:animate-none">
          <span className="block font-medium">{title}</span>
          <span className="mt-0.5 block opacity-70">{where}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
