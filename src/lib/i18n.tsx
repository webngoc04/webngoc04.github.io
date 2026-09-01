"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import en from "@/messages/en.json"
import vi from "@/messages/vi.json"

export type Locale = "en" | "vi"

const messages: Record<Locale, typeof en> = { en, vi }

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getNestedValue(obj: Record<string, unknown>, key: string): string | undefined {
  const keys = key.split(".")
  let value: unknown = obj
  for (const k of keys) {
    if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return undefined
    }
  }
  return typeof value === "string" ? value : undefined
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const saved = localStorage.getItem("locale")
  if (saved === "en" || saved === "vi") return saved
  return "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
  }, [])

  const t = useCallback((key: string): string => {
    const value = getNestedValue(messages[locale], key)
    return value ?? key
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}