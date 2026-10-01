"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useReveal } from "@/hooks/use-reveal"
import ScrambleText from "@/components/ui/scramble-text"
import { useI18n } from "@/lib/i18n"
import { ArrowUpRight, ArrowDown } from "lucide-react"

export default function Hero() {
  const ref = useReveal<HTMLDivElement>()
  const [roleIndex, setRoleIndex] = useState(0)
  const { t } = useI18n()

  const roles = (t("hero.roles") as unknown as string[]) || [
    "Linux Kernel Hacker",
    "Systems Engineer",
    "Open Source Contributor",
    "Rust Driver Developer",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [roles.length])

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:pt-36 border-b border-border"
    >
      {/* Fontshare Architectural Grid Background */}
      <div className="pointer-events-none absolute inset-0 fontshare-grid-bg" />

      <div
        ref={ref}
        className="reveal relative z-10 mx-auto max-w-3xl w-full text-center flex flex-col items-center gap-6"
      >
        {/* Specimen Tag */}
        <div className="specimen-badge">
          <span className="size-1.5 rounded-full bg-foreground" />
          <span>SPECIMEN // KEICHAN ARCHIVE</span>
        </div>

        {/* Heading in Instrument Serif */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold italic tracking-tight text-foreground leading-[1.08]">
            {t("hero.greeting") || "Hi, I'm"}{" "}
            <span className="underline decoration-border decoration-2 underline-offset-8">
              KeiChan
            </span>
          </h1>

          {/* Role Scramble in Monospace */}
          <div className="flex items-center justify-center gap-2 font-mono text-base sm:text-lg text-foreground/80 min-h-[32px]">
            <span className="text-muted-foreground">&gt;_</span>
            <ScrambleText text={roles[roleIndex] || "Systems Programmer"} />
            <span className="inline-block h-5 w-0.5 animate-pulse bg-foreground" />
          </div>

          {/* Bio in Lora */}
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("hero.bio") || "Just a small developer passionate about Linux kernel internals, systems programming, and high-performance software."}
          </p>
        </div>

        {/* Action Buttons in Fontshare style */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-[4px] border border-foreground bg-foreground px-6 py-2.5 font-meta text-xs font-semibold uppercase tracking-wider text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            <span>{t("hero.exploreProjects") || "VIEW PROJECTS"}</span>
            <ArrowDown className="size-3.5" />
          </a>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 rounded-[4px] border border-border bg-box px-6 py-2.5 font-meta text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-foreground"
          >
            <span>{t("hero.viewBlog") || "READ DISPATCHES"}</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* Technical Specimen Matrix */}
        <div className="pt-6 border-t border-border/80 flex flex-wrap justify-center gap-2">
          {["C", "RUST", "LINUX KERNEL", "NEXT.JS", "SYSTEM PROGRAMMING"].map((item) => (
            <span key={item} className="specimen-badge text-[10px]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}