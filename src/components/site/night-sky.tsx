"use client"

import { seeded } from "@/lib/seeded"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"

const W = 1440
const H = 900

function makeStars(count: number, seed: number) {
  const rnd = seeded(seed)
  return Array.from({ length: count }, (_, i) => ({
    x: +(rnd() * W).toFixed(1),
    y: +(rnd() * H).toFixed(1),
    r: +(0.45 + rnd() ** 3 * 1.1).toFixed(2),
    o: +(0.25 + rnd() * 0.6).toFixed(2),
    twinkle: i % 7 === 0,
    delay: +(rnd() * 4.5).toFixed(2),
  }))
}

// Four-point sparkles: the few bright stars, placed by hand around the middle of the frame.
const SPARKLES = [
  { x: 300, y: 250, s: 6, delay: 0 },
  { x: 1180, y: 150, s: 5, delay: 1.6 },
  { x: 1110, y: 600, s: 4, delay: 2.8 },
  { x: 430, y: 640, s: 5, delay: 3.6 },
]

const sparkle = (s: number) => `M0 ${-s}Q0 0 ${s} 0Q0 0 0 ${s}Q0 0 ${-s} 0Q0 0 0 ${-s}Z`

const METEORS = [
  { top: "-4%", left: "14%", delay: "0.6s" },
  { top: "4%", left: "44%", delay: "5s" },
  { top: "-6%", left: "66%", delay: "9.4s" },
]

type NightSkyProps = {
  className?: string
  count?: number
  seed?: number
  sparkles?: boolean
  meteors?: boolean
}

/** A quiet night sky: seeded stars, a few that twinkle, hand-placed sparkles and rare shooting stars.
 *  Decorative only: the browser draws it once the page is up and it fades in; at rest it is a still sky. */
export function NightSky({ className, count = 110, seed = 7, sparkles = true, meteors = true }: NightSkyProps) {
  const mounted = useMounted()
  const stars = mounted ? makeStars(count, seed) : []
  return (
    <div aria-hidden="true" className={cn("pointer-events-none overflow-hidden select-none", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g fill="var(--night-ink)" className="ornament-in">
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fillOpacity={s.o}
              className={s.twinkle ? "twinkle" : undefined}
              style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
            />
          ))}
        </g>
        {sparkles && mounted && (
          <g fill="var(--brand-on-ink)" className="ornament-in max-lg:hidden">
            {SPARKLES.map((s, i) => (
              <path key={i} d={sparkle(s.s)} transform={`translate(${s.x} ${s.y})`} className="twinkle" style={{ animationDelay: `${s.delay}s` }} />
            ))}
          </g>
        )}
      </svg>
      {meteors &&
        mounted &&
        METEORS.map((m, i) => <span key={i} className="meteor" style={{ top: m.top, left: m.left, animationDelay: m.delay }} />)}
    </div>
  )
}
