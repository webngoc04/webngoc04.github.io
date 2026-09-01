"use client"

import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggleLocale = () => {
    setLocale(locale === "en" ? "vi" : "en")
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        "text-muted-foreground hover:bg-pink-100/50 hover:text-pink-600",
        "dark:hover:bg-pink-900/20 dark:hover:text-pink-300"
      )}
      aria-label={`Switch to ${locale === "en" ? "Vietnamese" : "English"}`}
    >
      <Globe className="size-4" />
      <span>{locale === "en" ? "EN" : "VI"}</span>
    </button>
  )
}