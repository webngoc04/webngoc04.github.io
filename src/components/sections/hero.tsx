"use client"

import { useEffect, useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import ScrambleText from "@/components/ui/scramble-text"

const roles = [
  "Linux Kernel Hacker 🐧",
  "Web Systems Engineer 🌐",
  "Open Source Contributor 💖",
  "Rust Driver Developer 🦀",
]

export default function Hero() {
  const ref = useReveal<HTMLDivElement>()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

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

          <div className="flex items-center gap-1.5 text-lg font-mono text-muted-foreground sm:text-xl min-h-[30px]">
            <ScrambleText text={roles[roleIndex]} />
            <span className="inline-block h-5 w-0.5 animate-pulse bg-primary" />
          </div>

          <p className="max-w-lg text-base text-muted-foreground/80">
            Just a developer who loves tinkering with the Linux kernel and building beautiful web systems, dreaming of working remotely worldwide.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-lg"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-7 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}

