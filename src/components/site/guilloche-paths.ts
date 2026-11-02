// The curves behind the guilloche rosette. Plain functions, no React.

// The airy spiral: one curve r(θ) = 110 + 55·sin 7θ·cos 3θ, turned `lines` times through one petal,
// circled by a two-strand rope r(θ) = 170 + 4·sin 28θ. Each curve is drawn once and reused.
export const polar = (r: (t: number) => number, steps = 540) => {
  let d = ""
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const v = r(t)
    d += `${i ? "L" : "M"}${(v * Math.cos(t)).toFixed(1)} ${(v * Math.sin(t)).toFixed(1)}`
  }
  return d + "Z"
}
export const SPIRAL = polar((t) => 110 + 55 * Math.sin(7 * t) * Math.cos(3 * t))
export const ROPE = polar((t) => 170 + 4 * Math.sin(28 * t), 720)
