"use client"

import { useEffect } from "react"
import { Mail, Copy, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { useReveal } from "@/hooks/use-reveal"

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()

  useEffect(() => {
    const key = "welcome-shown"
    if (!sessionStorage.getItem(key)) {
      toast("Welcome to my portfolio! Have a great day! ✨")
      sessionStorage.setItem(key, "1")
    }
  }, [])

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied successfully!`)
    } catch {
      toast.error("Failed to copy, please try again.")
    }
  }

  return (
    <section id="contact" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 size-72 -translate-x-1/2 rounded-full bg-pink-200/15 blur-3xl" />
      </div>
      <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
          Contact <span className="text-gradient">💌</span>
        </h2>
        <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
        <p className="mb-8 text-muted-foreground">Want to chat? Find me at the places below~</p>

        <div className="mb-5 flex justify-center gap-4">
          <a
            href="https://github.com/webngoc04"
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover flex size-12 items-center justify-center rounded-full"
            aria-label="GitHub"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:dangnguyenngoc04@gmail.com"
            className="glass glass-hover flex size-12 items-center justify-center rounded-full"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
        </div>

        <div className="mx-auto mb-8 grid max-w-md gap-2 text-left">
          <button
            type="button"
            onClick={() => copyText("dangnguyenngoc04@gmail.com", "Email")}
            className="glass glass-hover flex items-center justify-between rounded-xl px-4 py-3 text-sm"
          >
            <span className="inline-flex items-center gap-2"><Mail className="size-4" /> Copy email</span>
            <Copy className="size-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => copyText("keichan04", "Discord ID")}
            className="glass glass-hover flex items-center justify-between rounded-xl px-4 py-3 text-sm"
          >
            <span className="inline-flex items-center gap-2"><MessageCircle className="size-4" /> Copy Discord ID</span>
            <Copy className="size-4 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="glass glass-hover inline-block rounded-2xl p-4 text-left sm:p-5">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              🔐 GPG Fingerprint
            </p>
            <code className="block break-all text-xs text-muted-foreground sm:text-sm">
              012F C938 02BA C1FE 39D0 DC2D E016 3CBB 19B5 FFC1
            </code>
            <p className="mt-1 text-xs text-muted-foreground/60">dangnguyenngoc04@gmail.com</p>
            <a
              href="/keichan.asc"
              download
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-3 py-1.5 text-xs font-medium text-cyan-400 transition-all hover:bg-cyan-950/30 hover:border-cyan-400/50"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download GPG Key
            </a>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1.5">
          Made with <span className="inline-block animate-pulse">🩷</span> by KeiChan
        </p>
      </footer>
    </section>
  )
}
