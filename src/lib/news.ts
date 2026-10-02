import fs from "fs"
import path from "path"
import matter from "gray-matter"

const newsDirectory = path.join(process.cwd(), "src/content/news")

export type NewsSource = {
  name: string
  url: string
  publisher?: string
}

export type MarketIndicator = {
  label: string
  value: string
  change?: string
  isPositive?: boolean
}

export type NewsItem = {
  slug: string
  title: string
  date: string
  time?: string
  description: string
  category: string
  sources: NewsSource[]
  indicators?: MarketIndicator[]
  tags: string[]
  content: string
  lang: string
  readingTime: number
  author: string
}

export function calculateReadingTime(content: string): number {
  if (!content) return 1
  const clean = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`.*?`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[#*_\->~`]/g, "")
    .trim()
  const words = clean.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(newsDirectory)) return []
  return fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith(".md"))
}

export function getNewsBySlug(slug: string): NewsItem | null {
  try {
    const fullPath = path.join(newsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const sources: NewsSource[] = Array.isArray(data.sources)
      ? data.sources
      : data.source
      ? [{ name: String(data.source), url: "" }]
      : []

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      time: data.time || "",
      description: data.description || "",
      category: data.category || "Vĩ mô & Thị trường",
      sources,
      indicators: data.indicators || [],
      tags: data.tags || [],
      content,
      lang: data.lang || "vi",
      author: data.author || "Ban Biên Tập Kinh Tế",
      readingTime: calculateReadingTime(content),
    }
  } catch {
    return null
  }
}

export function getAllNews(): NewsItem[] {
  const slugs = getNewsSlugs()
  const news = slugs
    .map((slug) => getNewsBySlug(slug.replace(/\.md$/, "")))
    .filter((item): item is NewsItem => item !== null)
  return news.sort((a, b) => {
    const timeA = new Date(`${a.date} ${a.time || "00:00"}`).getTime()
    const timeB = new Date(`${b.date} ${b.time || "00:00"}`).getTime()
    return timeB - timeA
  })
}

export function getNewsByCategory(category: string): NewsItem[] {
  return getAllNews().filter((item) => item.category === category)
}
