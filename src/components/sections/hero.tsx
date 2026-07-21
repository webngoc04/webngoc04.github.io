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
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-primary blur-[130px] opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-secondary blur-[100px] opacity-30" style={{ animationDelay: "-3s" }} />

      <div 
        ref={ref} 
        className="reveal mx-auto max-w-3xl w-full text-center flex flex-col items-center gap-6 z-20"
      >
        {/* Styled Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-900/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          AI-Engineered Portfolio
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white">
            Hi, I&apos;m <span className="text-gradient">KeiChan</span>
          </h1>

          {/* Role Carousel with Scramble Effect */}
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-mono text-cyan-400 min-h-[36px]">
            <span className="text-purple-400 font-bold">&gt;_</span>
            <ScrambleText text={roles[roleIndex]} />
            <span className="inline-block h-6 w-0.5 animate-pulse bg-cyan-400" />
          </div>

          {/* Bio Description */}
          <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
            I code highly efficient low-level Linux systems and design beautiful, premium web interfaces. Building on Rust, C, and Next.js.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
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
    </section>
  )
}
