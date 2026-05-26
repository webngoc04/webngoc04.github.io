"use client"

import { useEffect, useState } from "react"
import { useReveal } from "@/hooks/use-reveal"

const roles = [
  "Linux Kernel hacker",
  "Web developer",
  "Open source enthusiast",
  "Remote-ready builder",
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
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1))
      }, 35)
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 120)
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
      </div>

      <div ref={ref} className="relative z-20 flex max-w-2xl flex-col items-start gap-6 text-left reveal">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">KeiChan</span>
          </h1>

          <div className="flex items-center gap-1.5 text-lg text-muted-foreground sm:text-xl">
            <span>{displayText}</span>
            <span className="inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </div>

          <p className="max-w-lg text-base text-muted-foreground/80">
            chỉ là dev thích vọc kernel Linux và làm web thoi, nhưng vẫn mơ về remote toàn cầu.
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
    </section>
  )
}
