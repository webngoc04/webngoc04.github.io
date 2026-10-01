"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useI18n } from "@/lib/i18n"

export default function About() {
  const ref = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  return (
    <section id="about" className="relative px-4 sm:px-6 py-20 border-b border-border">
      <div ref={ref} className="reveal mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("about.title") || "About The Engineer"}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>

        {/* Card */}
        <div className="specimen-card p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3 font-meta text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-foreground">PROFILE & PHILOSOPHY</span>
            <span>KEICHAN</span>
          </div>

          <p className="font-body text-[17px] leading-[1.68] text-foreground/90 mb-6">
            {t("about.description") ||
              "A developer passionate about low-level systems programming, writing Linux kernel modules, and designing resilient, highly responsive web systems. Believing deeply in the original open-source hacker ethics, writing transparent code, and sharing knowledge."}
          </p>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {["Linux Kernel", "Systems Programming", "Rust", "C", "Next.js", "Open Source"].map((tag) => (
                <span key={tag} className="specimen-badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}