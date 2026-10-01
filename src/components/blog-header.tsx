"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"

export default function BlogHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
        <Link
          href="/"
          className="group flex items-center gap-2 font-serif text-lg font-bold italic text-foreground transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span>KeiChan</span>
          <span className="hidden sm:inline-block font-meta text-[10px] font-medium uppercase tracking-widest text-muted-foreground border-l border-border pl-2 ml-1">
            DISPATCHES
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}