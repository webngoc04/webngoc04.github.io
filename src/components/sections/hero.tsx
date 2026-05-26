"use client"

import { useEffect, useState } from "react"
import { useReveal } from "@/hooks/use-reveal"

const roles = [
  "Linux Kernel hacker",
  "Web developer",
  "Open source enthusiast",
  "Arch Linux user",
]

export default function Hero() {
  const ref = useReveal<HTMLDivElement>()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1))
      }, 60)
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1))
      }, 30)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-96 animate-blob rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-96 animate-blob rounded-full bg-purple-300/20 blur-3xl" style={{ animationDelay: "-3s" }} />
        <div className="absolute left-1/2 top-1/2 size-64 animate-blob rounded-full bg-rose-300/15 blur-3xl" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="absolute left-8 top-1/4 animate-float text-2xl opacity-30 sm:left-16">🩷</div>
      <div className="absolute right-8 top-1/3 animate-float text-2xl opacity-30 sm:right-16" style={{ animationDelay: "-2s" }}>🌸</div>
      <div className="absolute bottom-1/4 left-1/4 animate-float text-xl opacity-20" style={{ animationDelay: "-4s" }}>💻</div>
      <div className="absolute right-1/4 top-1/5 animate-float text-xl opacity-20" style={{ animationDelay: "-1s" }}>🐧</div>
      <div className="absolute bottom-1/3 right-1/3 animate-float text-lg opacity-20" style={{ animationDelay: "-3s" }}>✨</div>

      <div ref={ref} className="flex flex-col items-center gap-6 text-center reveal">
        <div className="animate-scale-in">
          <div className="size-28 animate-pulse-glow rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 p-[3px] shadow-xl shadow-pink-200/50 sm:size-32">
            <div className="flex size-full items-center justify-center rounded-full bg-background text-4xl sm:text-5xl">
              <span className="animate-float inline-block">🩷</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient">KeiChan</span>
          </h1>

          <div className="flex items-center justify-center gap-1.5 text-lg text-muted-foreground sm:text-xl">
            <span>{displayText}</span>
            <span className="inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </div>

          <p className="mx-auto max-w-md text-base text-muted-foreground/80">
            chỉ là dev thích vọc kernel Linux và làm web thoi
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-lg"
          >
            <span className="relative z-10">Xem projects</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-7 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Liên hệ
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <svg className="size-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
