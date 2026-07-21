"use client"

import { useReveal } from "@/hooks/use-reveal"

const skillCategories = [
  {
    title: "Languages",
    icon: "💻",
    skills: ["C", "Rust", "TypeScript", "Python", "Bash"],
  },
  {
    title: "Linux & Kernel",
    icon: "🐧",
    skills: ["Kernel Modules", "System Programming", "Arch Linux", "Gentoo", "Networking"],
  },
  {
    title: "Web Dev",
    icon: "🌐",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Tools & DevOps",
    icon: "🔧",
    skills: ["Git", "Docker", "GitHub Actions", "Nginx", "Neovim"],
  },
]

export default function Skills() {
  const titleRef = useReveal<HTMLDivElement>()

  return (
    <section id="skills" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-0 size-80 rounded-full bg-purple-200/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-3xl">
        <div ref={titleRef} className="reveal">
          <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
            Skills <span className="text-gradient">💻</span>
          </h2>
          <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  cat,
  index,
}: {
  cat: { title: string; icon: string; skills: string[] }
  index: number
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="reveal glass glass-hover gradient-border rounded-2xl p-5"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{cat.icon}</span>
        <h3 className="font-semibold text-foreground">{cat.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <span
            key={skill}
            className="rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 text-xs font-medium text-cyan-400 shadow-sm transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:shadow-md"
            style={{ transitionDelay: `${index * 100 + i * 50}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
