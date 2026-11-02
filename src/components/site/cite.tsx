"use client"

import { useState } from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type CiteProps = {
  n: number
  title: string
  where: string
  /** what screen readers hear, for example "Source 1: Support inbox" */
  label: string
}

/** A numbered source badge. Hover or focus shows where the line came from; on a phone a tap does,
 *  and the tap area reaches 44 px around the small badge. */
export function Cite({ n, title, where, label }: CiteProps) {
  const [open, setOpen] = useState(false)
  // the trigger is the badge itself (no asChild), so this works with the Radix and the Base UI tooltip alike
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          type="button"
          aria-label={label}
          onClick={(e) => {
            // a tap toggles; without preventDefault the trigger would close it again
            e.preventDefault()
            setOpen((o) => !o)
          }}
          className="num relative ml-[0.15em] inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-soft px-1 align-[0.45em] text-[10px] leading-none text-brand-ink transition-colors before:absolute before:-inset-3.5 before:content-[''] hover:bg-brand hover:text-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {n}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-[12px] leading-4">
          <span className="block font-medium">{title}</span>
          <span className="mt-0.5 block opacity-70">{where}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
