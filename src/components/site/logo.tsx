import { cn } from "@/lib/utils"

/** Wordmark: the product name in Fraunces, no symbol. */
export function Logo({ name, className }: { name: string; className?: string }) {
  return <span className={cn("font-serif text-[25px] leading-none font-[380] tracking-[-0.02em]", className)}>{name}</span>
}
