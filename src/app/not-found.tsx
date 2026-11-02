import { NotFoundPage } from "@/components/site/not-found-page"
import { site } from "@/content/site"

export const metadata = { title: site.ui.notFound }

// Any address that leads nowhere; the static export writes it to out/404.html.
export default function NotFound() {
  return <NotFoundPage />
}
