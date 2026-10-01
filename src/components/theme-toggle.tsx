"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("size-8 rounded-[4px] border border-border bg-box", className)} />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex size-8 items-center justify-center rounded-[4px] border border-border bg-box text-muted-foreground transition-all hover:border-foreground hover:text-foreground",
        className
      )}
      aria-label={isDark ? "Switch to light ivory paper theme" : "Switch to dark theme"}
      title={isDark ? "Light Ivory Mode" : "Dark Charcoal Mode"}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  )
}
