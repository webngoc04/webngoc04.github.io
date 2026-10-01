"use client"

import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  const toggleLocale = () => {
    setLocale(locale === "en" ? "vi" : "en")
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-[4px] border border-border bg-box px-2.5 text-xs font-meta font-medium tracking-wider text-muted-foreground transition-all hover:border-foreground hover:text-foreground",
        className
      )}
      aria-label={`Switch to ${locale === "en" ? "Vietnamese" : "English"}`}
    >
      <Globe className="size-3.5" />
      <span>{locale === "en" ? "EN" : "VI"}</span>
    </button>
  )
}