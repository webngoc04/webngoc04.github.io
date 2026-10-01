"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  const navItems = [
    { label: t("nav.home") || "INDEX", href: "/" },
    { label: t("nav.about") || "ABOUT", href: "/#about" },
    { label: t("nav.skills") || "CAPABILITIES", href: "/#skills" },
    { label: t("nav.projects") || "PROJECTS", href: "/#projects" },
    { label: t("nav.blog") || "DISPATCHES", href: "/blog/" },
    { label: t("nav.contact") || "CONTACT", href: "/#contact" },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-navy"
          >
            KeiChan
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[3px] px-3 py-1.5 font-meta text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:bg-box hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Controls: Theme & Language */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="flex size-8 items-center justify-center rounded-[4px] border border-border bg-box text-foreground hover:bg-box/80"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "overflow-hidden border-b border-border bg-background transition-all duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-b-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[3px] px-3 py-2 font-meta text-xs font-medium uppercase tracking-wider text-muted-foreground hover:bg-box hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}