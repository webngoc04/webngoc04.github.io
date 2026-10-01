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
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <>
      {/* Desktop Fixed Left Minimap Rail (Centered Vertically) */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden xl:block fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-40 group"
        aria-label="Table of contents minimap"
      >
        <div className="relative flex items-start gap-3">
          {/* Minimap Track & Markers */}
          <div className="relative flex flex-col items-center py-3 px-2 cursor-pointer rounded-[4px] border border-border bg-card/90 backdrop-blur-md shadow-sm transition-all hover:border-foreground">
            {/* Specimen Index Icon */}
            <div className="mb-2 text-muted-foreground" title="Table of Contents">
              <span className="font-meta text-[9px] uppercase tracking-widest font-semibold">TOC</span>
            </div>

            {/* Track Line */}
            <div className="w-[3px] rounded-full h-56 relative overflow-hidden bg-box">
              <div
                className="w-full rounded-full transition-all duration-150 bg-foreground"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>

            {/* Stacked Ticks along the track */}
            <div className="absolute inset-y-10 flex flex-col justify-between items-center w-full">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className="relative group/node flex items-center justify-center cursor-pointer my-0.5"
                  >
                    {/* Visual Dash Marker */}
                    <div
                      className={`transition-all duration-200 ${
                        isActive
                          ? "w-4 h-[3px] bg-foreground rounded-[1px]"
                          : item.level === 2
                          ? "w-2.5 h-[2px] bg-muted-foreground/60 hover:bg-foreground"
                          : "w-1.5 h-[1.5px] bg-border hover:bg-muted-foreground"
                      }`}
                    />

                    {/* Tooltip on single node hover */}
                    {!isHovered && (
                      <div className="absolute left-7 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-meta text-[11px] px-2 py-1 rounded-[3px] border border-border bg-card text-foreground shadow-md z-50">
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
            className={`transition-all duration-200 ease-out origin-left transform ${
              isHovered
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-x-2 pointer-events-none"
            } w-80 max-h-[70vh] overflow-y-auto rounded-[4px] border border-border bg-card p-4 shadow-xl backdrop-blur-xl`}
          >
            <div className="mb-3 border-b border-border pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-meta text-xs font-semibold uppercase tracking-wider text-foreground">
                <AlignLeft className="size-3.5" />
                <span>INDEX OF SECTIONS</span>
              </div>
              <span className="font-meta text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-box text-muted-foreground">
                {Math.round(scrollProgress)}% READ
              </span>
            </div>

            <div className="space-y-1">
              {items.map((item) => {
                const isActive = activeId === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left flex items-start gap-1.5 py-1 px-2 rounded-[2px] transition-all ${
                      item.level === 3 ? "pl-5 text-[12px]" : "font-sans font-medium text-[13px]"
                    } ${
                      isActive
                        ? "bg-box text-foreground font-semibold border-l-2 border-foreground"
                        : "text-muted-foreground hover:bg-box/60 hover:text-foreground"
                    }`}
                  >
                    {item.level === 2 ? (
                      <span
                        className={`inline-block size-1.5 rounded-full mt-1.5 shrink-0 ${
                          isActive ? "bg-foreground" : "bg-muted-foreground"
                        }`}
                      />
                    ) : (
                      <CornerDownRight className="size-3 mt-0.5 shrink-0 opacity-60" />
                    )}
                    <span className="line-clamp-2 leading-tight">{item.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Minimap Trigger */}
      <div className="xl:hidden fixed bottom-6 left-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 rounded-[4px] border border-border bg-card px-3.5 py-2 font-meta text-xs font-medium uppercase tracking-wider text-foreground shadow-md transition-all hover:border-foreground"
        >
          <AlignLeft className="size-3.5" />
          <span>INDEX ({Math.round(scrollProgress)}%)</span>
        </button>

        {/* Mobile Modal Drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-[4px] border border-border bg-background p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <span className="font-meta text-xs font-semibold uppercase tracking-wider text-foreground">
                  INDEX OF SECTIONS
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-meta text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  [ CLOSE ]
                </button>
              </div>
              <div className="max-h-[60vh] space-y-1.5 overflow-y-auto">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      scrollToHeading(item.id)
                      setIsMobileOpen(false)
                    }}
                    className={`w-full text-left py-1.5 px-2 rounded-[2px] transition-colors ${
                      item.level === 3 ? "pl-5 text-xs text-muted-foreground" : "text-sm font-sans font-medium text-foreground"
                    } ${activeId === item.id ? "bg-box font-bold" : "hover:bg-box"}`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
