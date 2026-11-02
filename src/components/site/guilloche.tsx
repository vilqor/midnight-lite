"use client"

import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { ROPE, SPIRAL } from "./guilloche-paths"

// The rosette is drawn by the browser once the page is up (its curves would otherwise make the HTML
// several times heavier) and fades in. The <svg> itself is in the page from the start, so nothing moves.

/** Engraved spiral rosette with its rope, in one quiet colour. Instead of turning, it is lit:
 *  sparks travel along the rope and along two spiral lines. `id` must be unique on the page. */
export function GuillocheSpiral({ id, className, lines = 10 }: { id: string; className?: string; lines?: number }) {
  const mounted = useMounted()
  const turn = (k: number) => `rotate(${((k * 360) / 7 / lines).toFixed(3)})`
  return (
    <svg viewBox="-180 -180 360 360" fill="none" aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      {mounted && (
        <g className="ornament-in">
          <defs>
            <path id={`${id}-s`} d={SPIRAL} />
            <path id={`${id}-r`} d={ROPE} />
          </defs>
          <g stroke="var(--ink)" strokeOpacity="0.07" strokeWidth="0.8">
            {Array.from({ length: lines }, (_, k) => (
              <use key={k} href={`#${id}-s`} transform={turn(k)} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <g stroke="var(--ink)" strokeOpacity="0.13" strokeWidth="0.9">
            <use href={`#${id}-r`} vectorEffect="non-scaling-stroke" />
            <use href={`#${id}-r`} transform={`rotate(${(360 / 28 / 2).toFixed(3)})`} vectorEffect="non-scaling-stroke" />
          </g>
          {/* the sparks: short dashes that run the length of a line */}
          <g stroke="var(--night-ink)" strokeWidth="0.55" strokeLinecap="round">
            <path d={ROPE} pathLength={100} className="glint-run" />
            <path d={SPIRAL} pathLength={100} transform={turn(2)} className="glint-run glint-run-slow" style={{ animationDelay: "-9s" }} />
            <path d={SPIRAL} pathLength={100} transform={turn(7)} className="glint-run glint-run-slow" style={{ animationDelay: "-22s" }} />
          </g>
        </g>
      )}
    </svg>
  )
}
