import { Fraunces, Geist, Geist_Mono } from "next/font/google"

import { siteMetadata } from "@/lib/metadata"
import "./globals.css"

export const metadata = siteMetadata()
export { viewport } from "@/lib/metadata"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
// the mono face sets small labels and numbers, so it is not fetched ahead of the display face
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], preload: false })
// Variable Fraunces: SOFT rounds the corners at display sizes, opsz tunes the cut to the size.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
