// Every word on the page lives here: rename the product, rewrite the copy, point the buttons at your pages.
// Components never hold words of their own; app/page.tsx hands each section its part of this file.

export const site = {
  name: "Midnight",
  legalName: "Midnight Labs, Inc.",
  // your address: set NEXT_PUBLIC_SITE_URL (see .env.example), or change the fallback here
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://midnight-lite.example.com",
  email: "hello@midnight.example.com",
  tagline: "AI agents for the night shift",
  description:
    "Midnight's AI agents research, write and check your work overnight. Every morning there is a brief, with a source for every line.",

  header: {
    // section links, shown from 768 px; "/#id" scrolls on the home page and leads home from the 404
    nav: [
      { label: "Product", href: "/#product" },
      { label: "Get started", href: "/#start" },
    ],
    // the one button in the header; point it at your sign-up page
    cta: { label: "Get the full version", short: "Full version", href: "https://templates.vilqor.com/midnight?ref=lite" },
    backToTop: "{name}, back to top",
  },

  hero: {
    // phones show the tagline above the title
    tagline: "AI agents for the night shift",
    title: { lead: "Your work,", accent: "done by morning." },
    lead: "Describe a task before you log off. Midnight's agents research, draft and double-check it overnight, then leave a brief with sources by 7:00.",
    // phones show this shorter lead under the title
    leadShort: "Hand off a task before you log off. Wake up to a brief, with a source for every line.",
    primary: { label: "Start free", href: "#start" },
    secondary: { label: "See how it works", href: "#product" },
  },

  features: {
    label: "Product",
    title: "What it does while you sleep.",
    lead: "Research and sources, each one checked before it reaches your morning.",
    research: {
      eyebrow: "Research",
      title: "Research while you sleep",
      text: "Scout keeps only what answers your question.",
      label: "Sources",
      status: "Scout is reading",
      reading: "reading",
      kept: "kept",
      rows: [
        { title: "Billing error on invoice 4471", where: "tickets/8812" },
        { title: "How refunds are calculated", where: "help/refunds" },
        { title: "Invoice template v3 notes", where: "docs/changelog" },
        { title: "Q3 pricing update", where: "drive/finance", reading: true },
      ],
      footer: { read: "212 read", kept: "14 kept" },
    },
    sources: {
      eyebrow: "Sources",
      title: "Every line has a source",
      text: "Click a number to see where it came from.",
      // read by screen readers on each number; {n} and {title} are filled in
      cite: "Source {n}: {title}",
      parts: [
        { text: "Billing errors are up 3× since Tuesday", cite: 1 },
        { text: ", all from the v3 invoice template", cite: 2 },
        { text: ". Refunds now take two days longer", cite: 3 },
        { text: "." },
      ],
      sources: [
        { n: 1, title: "38 tickets tagged billing, Tue to Thu", where: "Support inbox" },
        { n: 2, title: "Invoice template v3 · release notes", where: "Help center" },
        { n: 3, title: "Refund queue · median 4.1 days", where: "Finance sheet" },
      ],
    },
    // three facts, each shown with the piece of the product that proves it
    schedule: {
      title: "Runs on your schedule",
      text: "Nightly, weekly, or the moment a file lands.",
      days: ["M", "T", "W", "T", "F", "S", "S"],
      on: [0, 1, 2, 3, 4],
      at: "23:00",
    },
    privacy: {
      title: "Private by default",
      text: "Your data never trains a model. Ever.",
      setting: "Train models on my data",
    },
    languages: {
      title: "Speaks 40 languages",
      text: "Briefs arrive in the language you read.",
      codes: ["EN", "DE", "ES", "FR", "JA", "KK"],
      more: "+34",
    },
  },

  final: {
    title: { lead: "Hand it off", accent: "tonight." },
    lead: "Start free. Your first brief arrives tomorrow at 7:00.",
    // your sign-up page
    button: { label: "Start free", href: "#" },
    note: "Free plan · No card required",
  },

  // one quiet line above the footer; delete it (or set it to null) to remove it
  note: {
    text: "This page is Midnight Lite, a free template under the MIT license. The full Midnight has seven more sections, working forms, analytics and a second language.",
    link: { label: "Full template · $59", href: "https://templates.vilqor.com/midnight?ref=lite" },
  } as { text: string; link: { label: string; href: string } } | null,

  footer: {
    status: "All agents awake",
    nav: "Footer",
    // "#" marks pages the template doesn't include; point them at yours
    columns: [
      {
        title: "Product",
        links: [
          { label: "Research", href: "/#product" },
          { label: "Sources", href: "/#product" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "mailto:hello@midnight.example.com" },
        ],
      },
    ],
    // a small credit in the bottom line; the MIT license doesn't require it, set it to null to remove it
    credit: { label: "Made with Midnight Lite", href: "https://midnight-lite.vilqor.com" } as { label: string; href: string } | null,
  },

  // the page shown for a link that leads nowhere
  notFound: {
    label: "404",
    title: { lead: "This page is", accent: "still asleep." },
    lead: "It may have moved, or it never existed. Head back to the start.",
    home: "Back to the start",
  },

  ui: {
    skip: "Skip to content",
    notFound: "Page not found",
  },
}

export type Site = typeof site
