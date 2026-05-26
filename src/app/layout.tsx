import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
})

export const metadata: Metadata = {
  title: "KeiChan",
  description: "chỉ là dev thích vọc kernel Linux và làm web thoi",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩷</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${nunito.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
