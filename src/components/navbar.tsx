"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import LanguageSwitcher from "@/components/language-switcher"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.skills"), href: "/#skills" },
    { label: t("nav.projects"), href: "/#projects" },
    { label: t("nav.contact"), href: "/#contact" },
    { label: t("nav.blog"), href: "/blog/" },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="text-lg font-bold text-gradient">
          KeiChan
        </a>
        <div className="hidden md:flex md:gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-pink-100/50 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-300"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 border-t px-4 pb-3 pt-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-pink-100/50 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}