"use client"

import { useEffect, useState } from "react"
import { List, ChevronDown } from "lucide-react"

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
      // Remove markdown formatting
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

export function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
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
    <nav className="text-xs">
      <div className="mb-3 flex items-center gap-2 font-semibold uppercase tracking-wider text-muted-foreground">
        <List className="size-3.5 text-pink-500" />
        <span>Mục lục bài viết</span>
      </div>
      <div className="relative border-l border-neutral-200 dark:border-neutral-800 space-y-1.5 py-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block transition-colors py-1 leading-snug ${
                item.level === 3 ? "pl-6 text-[11px]" : "pl-3.5 text-xs"
              } ${
                isActive
                  ? "border-l-2 border-pink-500 -ml-px font-medium text-pink-600 dark:text-pink-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export function MobileTableOfContents({ items }: TOCProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!items.length) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-semibold text-foreground"
      >
        <div className="flex items-center gap-2">
          <List className="size-4 text-pink-500" />
          <span>Mục lục bài viết ({items.length} mục)</span>
        </div>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-3 border-t border-neutral-200/60 pt-2.5 dark:border-neutral-800/60 space-y-2 text-xs">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-0.5 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 ${
                item.level === 3 ? "pl-4 text-[11px]" : "font-medium"
              }`}
            >
              {item.text}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
