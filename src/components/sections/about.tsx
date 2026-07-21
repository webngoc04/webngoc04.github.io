"use client"

import { useReveal } from "@/hooks/use-reveal"

export default function About() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 size-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl" />
      </div>
      <div
        ref={ref}
        className="reveal mx-auto max-w-2xl"
      >
        <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
          <p className="leading-relaxed text-muted-foreground">
            A developer who loves tinkering with the Linux kernel, writing system modules for fun,
            and designing elegant web interfaces. Not a pro, just a small developer with a big passion.
            Learning new technologies, building things from scratch, and sharing everything along the way.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Linux", "Kernel", "Web Dev", "Open Source", "Rust", "C"].map((tag, i) => (
              <span
                key={tag}
                className="reveal rounded-full bg-gradient-to-r from-cyan-950/20 to-indigo-950/20 border border-cyan-500/20 px-3.5 py-1.5 text-xs font-medium text-cyan-400 shadow-sm transition-all hover:shadow-md hover:border-cyan-400/50 hover:bg-cyan-950/30"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
