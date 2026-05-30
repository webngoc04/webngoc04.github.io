import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 rounded-xl border bg-background/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-xl transition-all hover:text-pink-600 hover:shadow-md dark:hover:text-pink-300"
      >
        <ArrowLeft className="size-4" />
        <span className="hidden sm:inline">KeiChan</span>
      </Link>
      {children}
    </>
  )
}
