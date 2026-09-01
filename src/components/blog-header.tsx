"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

export default function BlogHeader() {
  return (
    <div className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-1.5 rounded-xl border bg-background/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-xl transition-all hover:text-pink-600 hover:shadow-md dark:hover:text-pink-300"
      >
        <ArrowLeft className="size-4" />
        <span className="hidden sm:inline">KeiChan</span>
      </Link>
      <LanguageSwitcher />
    </div>
  )
}