/** Fills {name} placeholders: fill("Source {n}: {title}", { n: 1, title: "FAQ" }). */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m))
