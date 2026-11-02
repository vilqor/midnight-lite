/** One quiet line above the footer: a sentence and one link. */
export function LiteNote({ text, link }: { text: string; link: { label: string; href: string } }) {
  return (
    <aside className="container-x pt-8 pb-4 text-center max-md:text-left">
      <p className="mx-auto max-w-[720px] text-[14px] leading-[22px] text-ink-2">
        {text}{" "}
        <a href={link.href} className="whitespace-nowrap text-brand-ink underline-offset-4 hover:underline max-md:flex max-md:min-h-11 max-md:items-center">
          {link.label}
        </a>
      </p>
    </aside>
  )
}
