"use client"

import { useEffect, useState } from "react"
import { AlignLeft, CornerDownRight } from "lucide-react"

export interface TOCItem {
  id: string
  text: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function extractTOC(content: string): TOCItem[] {
  if (!content) return []
  const lines = content.split("\n")
  const items: TOCItem[] = []

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      let rawText = match[2].trim()
      rawText = rawText
        .replace(/[*_~`]/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/<[^>]*>/g, "")
      const id = slugify(rawText)
      if (id) {
        items.push({ id, text: rawText, level })
      }
    }
  }

  return items
}

interface TOCProps {
  items: TOCItem[]
}

export function MinimapNavigation({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!items.length) return

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0.1,
      }
    )

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [items])

  if (!items.length) return null

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <>
      {/* Desktop Fixed Left Minimap Rail (Centered Vertically) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden lg:block fixed left-3 xl:left-6 top-1/2 -translate-y-1/2 z-40 group"
      >
        <div className="relative flex items-start gap-3">
          {/* Minimap Track & Markers */}
          <div className="relative flex flex-col items-center py-2 px-1.5 cursor-pointer rounded-full bg-neutral-900/10 dark:bg-neutral-100/5 backdrop-blur-md border border-neutral-200/20 dark:border-neutral-800/40 p-2 shadow-lg hover:border-pink-500/40 transition-all">
            {/* Track Line */}
            <div className="w-1 bg-neutral-200 dark:bg-neutral-800 rounded-full h-64 relative overflow-hidden">
              <div
                className="w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-pink-500 rounded-full transition-all duration-150"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Nodes along the track */}
            <div className="absolute inset-y-3 flex flex-col justify-between items-center w-full">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className="relative group/node flex items-center justify-center cursor-pointer my-0.5"
                  >
                    <div
                      className={`transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-4 h-1.5 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.9)] scale-110"
                          : item.level === 2
                          ? "w-2.5 h-1 bg-neutral-400 dark:bg-neutral-600 hover:bg-pink-400 hover:w-3"
                          : "w-1.5 h-1 bg-neutral-300 dark:bg-neutral-700 hover:bg-pink-400"
                      }`}
                    />

                    {/* Tooltip on single node hover */}
                    {!isHovered && (
                      <div className="absolute left-7 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-neutral-900/90 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-[11px] px-2 py-1 rounded shadow-lg z-50">
                        {item.text}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tree View Popup on Minimap Hover */}
          <div
            className={`transition-all duration-300 ease-out origin-left transform ${
              isHovered
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
            } w-72 max-h-[70vh] overflow-y-auto rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/95`}
          >
            <div className="mb-3 border-b border-neutral-200/60 pb-2.5 dark:border-neutral-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                <AlignLeft className="size-4" />
                <span>Tree View Minimap</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                {Math.round(scrollProgress)}%
              </span>
            </div>

            <div className="space-y-1 text-xs">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`flex items-start gap-1.5 py-1 px-2 rounded-lg cursor-pointer transition-all ${
                      item.level === 3 ? "pl-5 text-[11px]" : "font-medium text-xs"
                    } ${
                      isActive
                        ? "bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-foreground"
                    }`}
                  >
                    {item.level === 2 ? (
                      <span className={`inline-block size-1.5 rounded-full mt-1.5 shrink-0 ${isActive ? "bg-pink-500" : "bg-neutral-400 dark:bg-neutral-600"}`} />
                    ) : (
                      <CornerDownRight className={`size-3 mt-0.5 shrink-0 ${isActive ? "text-pink-500" : "text-neutral-400"}`} />
                    )}
                    <span className="line-clamp-2 leading-tight">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Minimap Trigger */}
      <div className="lg:hidden fixed bottom-6 left-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 rounded-full bg-pink-600 text-white px-3.5 py-2 text-xs font-semibold shadow-lg hover:bg-pink-700 transition-all"
        >
          <AlignLeft className="size-4" />
          <span>Mục lục ({Math.round(scrollProgress)}%)</span>
        </button>

        {isMobileOpen && (
          <div className="fixed inset-x-4 bottom-20 z-50 max-h-[60vh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-2 flex items-center justify-between border-b pb-2 text-xs font-bold text-pink-600 dark:text-pink-400">
              <span>Tree View Minimap</span>
              <button onClick={() => setIsMobileOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-1 text-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    scrollToHeading(item.id)
                    setIsMobileOpen(false)
                  }}
                  className={`flex items-start gap-1.5 py-1 px-2 rounded-md ${
                    item.level === 3 ? "pl-5 text-[11px]" : "font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-pink-500/10 text-pink-500 font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.level === 3 && <CornerDownRight className="size-3 mt-0.5 shrink-0" />}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
