"use client"

import { useMemo, useState } from "react"
import { Moon, Sparkles, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type StylePreset = "glass" | "soft" | "bold"

const PRESETS: Array<{ key: StylePreset; label: string; desc: string }> = [
  { key: "glass", label: "Glass", desc: "Blur + glow" },
  { key: "soft", label: "Soft", desc: "Clean pastel" },
  { key: "bold", label: "Bold", desc: "High contrast" },
]

export default function UiSandbox() {
  const ref = useReveal<HTMLDivElement>()
  const [preset, setPreset] = useState<StylePreset>("glass")
  const { theme, setTheme } = useTheme()

  const previewClass = useMemo(
    () =>
      cn(
        "rounded-2xl border p-6 transition-all duration-300",
        preset === "glass" && "bg-card/70 backdrop-blur-md shadow-lg shadow-pink-300/20",
        preset === "soft" && "bg-rose-50/80 dark:bg-rose-950/30",
        preset === "bold" && "bg-foreground text-background border-foreground"
      ),
    [preset]
  )

  return (
    <section id="sandbox" className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="reveal">
          <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
            UI Sandbox <span className="text-gradient">🕹️</span>
          </h2>
          <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        </div>

        <div className="glass space-y-5 rounded-2xl p-6">
          <div>
            <p className="mb-2 text-sm font-semibold">Style Switcher</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPreset(item.key)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    preset === item.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-accent"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Theme</p>
            <div className="flex gap-2">
              <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                <Sun className="mr-1 size-4" /> Light
              </Button>
              <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                <Moon className="mr-1 size-4" /> Dark
              </Button>
            </div>
          </div>

          <div className={previewClass}>
            <p className={cn("mb-2 text-sm", preset === "bold" ? "text-background/80" : "text-muted-foreground")}>Preview component</p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">My Favorite Component</p>
                <p className={cn("text-sm", preset === "bold" ? "text-background/80" : "text-muted-foreground")}>{PRESETS.find((item) => item.key === preset)?.desc}</p>
              </div>
              <Button variant={preset === "bold" ? "secondary" : "default"}>
                <Sparkles className="size-4" /> Try me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
