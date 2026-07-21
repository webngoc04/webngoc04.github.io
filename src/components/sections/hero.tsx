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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:pt-36"
    >
      {/* Dynamic Grid Background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating Radial Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-primary blur-[120px] opacity-60" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 rounded-full glow-secondary blur-[120px] opacity-40" />

      <div 
        ref={ref} 
        className="reveal mx-auto grid max-w-6xl w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 z-20"
      >
        {/* Left Side: Header Content */}
        <div className="flex flex-col items-start gap-6 lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-900/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            AI-Engineered Portfolio
          </div>

          <div className="space-y-3.5">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
              Hi, I&apos;m <span className="text-gradient">KeiChan</span>
            </h1>

            <div className="flex items-center gap-2 text-xl font-mono text-cyan-400 min-h-[36px]">
              <span className="text-purple-400 font-bold">&gt;_</span>
              <ScrambleText text={roles[roleIndex]} />
              <span className="inline-block h-5 w-0.5 animate-pulse bg-cyan-400" />
            </div>

            <p className="max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed">
              I code highly efficient low-level Linux systems and design beautiful, premium web interfaces. Building on Rust, C, and Next.js.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_oklch(0.68_0.16_250_/_0.3)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_oklch(0.68_0.16_250_/_0.55)]"
            >
              <span className="relative z-10">Explore Projects</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.03]"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side: Interactive AI Console */}
        <div className="w-full lg:col-span-5 flex justify-center">
          <AITerminal />
        </div>
      </div>
    </section>
  )
}
