import type { Metadata } from "next"
import {
  Instrument_Serif,
  Instrument_Sans,
  Lora,
  Public_Sans,
  JetBrains_Mono,
} from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
})

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://webngoc04.github.io"),
  title: "KeiChan — Editorial & Systems Engineering",
  description: "Dispatches on low-level systems programming, Linux kernel internals, and modern software craft.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖋️</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fontVariables = `${instrumentSerif.variable} ${instrumentSans.variable} ${lora.variable} ${publicSans.variable} ${jetbrainsMono.variable}`

  return (
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-body transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
