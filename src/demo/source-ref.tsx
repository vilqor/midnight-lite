// The live demo's links to the full template carry ?ref=lite. This tells the store where the visitor came from: the
// demo's own ?ref=…, or else the site that linked here, kept for the visit (?ref=lite-registry.directory,
// ?ref=lite-github.com). It is an inline script that only the demo build renders, so a site built from this template
// ships none of it. Links are tagged once the page has loaded and again on press, after React has hydrated them.
const script = String.raw`(() => {
  const STORE = "//templates.vilqor.com/", KEY = "lite-source";
  const clean = (v) => (v || "").toLowerCase().replace(/^www\./, "").replace(/[^a-z0-9._-]/g, "").slice(0, 35);
  let site = "";
  try {
    const host = new URL(document.referrer).hostname;
    if (host !== location.hostname && !/(^|\.)vilqor\.com$/.test(host)) site = clean(host);
  } catch (e) {}
  let from = clean(new URLSearchParams(location.search).get("ref")) || site;
  try {
    if (from) sessionStorage.setItem(KEY, from);
    else from = sessionStorage.getItem(KEY) || "";
  } catch (e) {}
  if (!from) return;
  const tag = (a) => {
    if (!a || !a.href || !a.href.includes(STORE)) return;
    const url = new URL(a.href);
    url.searchParams.set("ref", "lite-" + from);
    a.href = url.href;
  };
  const near = (e) => tag(e.target instanceof Element ? e.target.closest("a") : null);
  addEventListener("load", () => document.querySelectorAll('a[href*="' + STORE + '"]').forEach(tag));
  addEventListener("pointerdown", near, true);
  addEventListener("click", near, true);
})()`

export function SourceRef() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
