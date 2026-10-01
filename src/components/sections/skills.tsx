"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useI18n } from "@/lib/i18n"
import { Terminal, Cpu, Globe, Wrench } from "lucide-react"

export default function Skills() {
  const titleRef = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  const skillCategories = [
    {
      title: t("skills.categories.languages") || "Languages",
      icon: Terminal,
      code: "01",
      skills: ["C", "Rust", "TypeScript", "Python", "Bash", "x86 ASM"],
    },
    {
      title: t("skills.categories.linuxKernel") || "Linux & Kernel",
      icon: Cpu,
      code: "02",
      skills: ["Kernel Modules", "System Programming", "eBPF", "Arch Linux", "Gentoo", "Socket I/O"],
    },
    {
      title: t("skills.categories.webDev") || "Web Architecture",
      icon: Globe,
      code: "03",
      skills: ["React 19", "Next.js", "Tailwind CSS", "Node.js", "REST / JSON", "Edge Runtimes"],
    },
    {
      title: t("skills.categories.toolsDevOps") || "Tools & Toolchain",
      icon: Wrench,
      code: "04",
      skills: ["Git", "Docker", "GitHub Actions", "GDB", "Nginx", "Neovim"],
    },
  ]

  return (
    <section id="skills" className="relative px-4 sm:px-6 py-20 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <div ref={titleRef} className="reveal text-center mb-10">
          <span className="specimen-badge mb-2">SECTION // 02</span>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("skills.title") || "Technical Capabilities"}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.title}
                className="specimen-card p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4 font-meta text-xs">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Icon className="size-4 text-muted-foreground" />
                    <span>{cat.title}</span>
                  </div>
                  <span className="font-mono text-muted-foreground text-[10px]">
                    CAT.{cat.code}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-[3px] border border-border bg-box px-2.5 py-1 font-meta text-[11px] font-medium text-foreground transition-colors hover:border-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}