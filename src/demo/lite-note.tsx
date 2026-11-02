/** The live demo's quiet line above the footer: a sentence and one link, which opens in a new tab
 *  (inside a catalog's preview frame a plain link would open the store in the frame). On phones the link takes its own
 *  44 px line; on touch tablets it stays in the sentence and padding makes it 44 px tall without moving the text. */
export function LiteNote({ text, link }: { text: string; link: { label: string; href: string } }) {
  return (
    <aside className="container-x pt-8 pb-4 text-center max-md:text-left">
      <p className="mx-auto max-w-[720px] text-[14px] leading-[22px] text-ink-2">
        {text}{" "}
        <a
          href={link.href}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap text-brand-ink underline-offset-4 hover:underline max-md:flex max-md:min-h-11 max-md:items-center md:pointer-coarse:py-[13px]"
        >
          {link.label}
        </a>
      </p>
    </aside>
  )
}
