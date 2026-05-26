"use client"

import { useReveal } from "@/hooks/use-reveal"

export default function Projects() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-1/2 size-80 rounded-full bg-rose-200/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-3xl">
        <div ref={ref} className="reveal">
          <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
            Projects <span className="text-gradient">✨</span>
          </h2>
          <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        </div>

        <div className="glass glass-hover rounded-2xl p-8 text-center">
          <div className="mb-3 text-4xl">🚧</div>
          <h3 className="mb-2 text-lg font-semibold">Đang cập nhật...</h3>
          <p className="text-sm text-muted-foreground">
            Sắp có projects ở đây nha, đợi tí~
          </p>
        </div>
      </div>
    </section>
  )
}
