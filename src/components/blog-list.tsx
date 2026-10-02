"use client"

import Link from "next/link"
import { useState, useMemo, useCallback } from "react"
import { Search, ChevronLeft, ChevronRight, X, LayoutGrid, List, ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"

interface BlogListProps {
  posts: BlogPost[]
}

const POSTS_PER_PAGE = 6

export default function BlogList({ posts }: BlogListProps) {
  const { t, locale } = useI18n()

  const dateLocale = locale === "vi" ? "vi-VN" : "en-US"
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [page, setPage] = useState(1)

  // Filter posts strictly matching the current locale ("vi" -> Vietnamese posts only, "en" -> English posts only)
  const localizedPosts = useMemo(() => {
    return posts.filter((post) => post.lang === locale)
  }, [posts, locale])

  // Reset pagination and active tag filter when locale changes
  const [prevLocale, setPrevLocale] = useState(locale)
  if (prevLocale !== locale) {
    setPrevLocale(locale)
    setPage(1)
    setSelectedTag(null)
  }

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>()
    localizedPosts.forEach((post) => post.tags.forEach((tag) => tagCount.set(tag, (tagCount.get(tag) || 0) + 1)))
    return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
  }, [localizedPosts])

  const filteredPosts = useMemo(() => {
    let result = localizedPosts
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag))
    }
    return result
  }, [localizedPosts, search, selectedTag])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleSearch = useCallback(() => {
    setPage(1)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }, [handleSearch])

  const handleClear = useCallback(() => {
    setSearch("")
    setSelectedTag(null)
    setPage(1)
  }, [])

  const hasFilter = search.trim() || selectedTag

  return (
    <div className="w-full">
      {/* ========================================================
          FONTSHARE STYLE HEADER & SPECIMEN INTRO
          ======================================================== */}
      <header className="mb-10 border-b border-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="specimen-badge">
            {locale === "vi" ? "BÁO CÁO & CHUYÊN LUẬN" : "DISPATCHES & REPORTS"}
          </span>
          <span className="font-meta text-[11px] uppercase tracking-widest text-muted-foreground">
            {filteredPosts.length} {locale === "vi" ? "BÀI VIẾT" : "ARTICLES"}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.2] mb-3">
          {locale === "vi" ? "Kho Lưu Trữ Báo Cáo & Chuyên Luận" : "The Reports & Dispatches"}
        </h1>

        <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {locale === "vi"
            ? "Tuyển tập các bài phân tích sâu về kiến trúc hệ thống, nhân Linux kernel, văn hóa mã nguồn mở và tư duy kỹ thuật."
            : "Analytical essays and technical reports exploring systems architecture, Linux kernel internals, and software engineering philosophy."}
        </p>
      </header>

      {/* ========================================================
          FONTSHARE FILTER & CONTROL BAR
          ======================================================== */}
      <div className="mb-8 space-y-4">
        {/* Search input + View Switcher */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder") || "Search dispatches, keywords, or topics..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-[4px] border border-border bg-box/40 py-2.5 pl-9 pr-9 font-sans text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-foreground"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-[4px] border border-border bg-box/40 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-[2px] transition-colors ${
                  viewMode === "grid"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid Specimen View"
                aria-label="Grid View"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-[2px] transition-colors ${
                  viewMode === "list"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="List Specimen View"
                aria-label="List View"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tag Filters (Specimen Category Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => {
              setSelectedTag(null)
              setPage(1)
            }}
            className={`rounded-[3px] px-2.5 py-1 font-meta text-[11px] font-semibold uppercase tracking-wider transition-all border ${
              selectedTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-box/60 text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            ALL ({localizedPosts.length})
          </button>
          {allTags.map((tag) => {
            const count = localizedPosts.filter((p) => p.tags.includes(tag)).length
            const isSelected = selectedTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedTag(isSelected ? null : tag)
                  setPage(1)
                }}
                className={`rounded-[3px] px-2.5 py-1 font-meta text-[11px] font-medium uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-box/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {tag} ({count})
              </button>
            )
          })}
        </div>

        {hasFilter && (
          <div className="flex items-center gap-2 font-meta text-xs text-muted-foreground pt-1">
            <span>
              {t("blog.showing") || "Showing"} {filteredPosts.length} {t("blog.results") || "dispatches"}
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={handleClear}
              className="underline underline-offset-2 hover:text-foreground cursor-pointer"
            >
              {t("blog.clearFilter") || "Reset Filters"}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          POST SPECIMEN CARDS (GRID OR LIST)
          ======================================================== */}
      {paginatedPosts.length === 0 ? (
        <div className="rounded-[4px] border border-dashed border-border p-12 text-center">
          <p className="font-serif italic text-xl text-muted-foreground mb-2">No matching dispatches found.</p>
          <button
            type="button"
            onClick={handleClear}
            className="font-meta text-xs uppercase tracking-wider underline hover:text-foreground"
          >
            Clear search filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {paginatedPosts.map((post) => {
            const primaryCategory = (post.tags[0] || "DISPATCH").toUpperCase()
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="specimen-card group flex flex-col justify-between p-6 hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3 border-b border-border pb-2.5 font-meta text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold uppercase tracking-wider text-foreground">
                        {primaryCategory}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <time dateTime={post.date} className="text-[11px]">
                        {new Date(post.date).toLocaleDateString(dateLocale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <span className="text-[11px] font-mono">{post.readingTime}M</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Headline (Newsreader Serif Bold) */}
                  <h2 className="font-serif text-[21px] sm:text-[23px] font-bold leading-[1.3] text-foreground group-hover:text-navy transition-colors mb-2.5">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-body text-[14.5px] leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                    {post.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-border/80 flex items-center justify-between font-meta text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="specimen-badge text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-foreground group-hover:translate-x-0.5 transition-transform">
                    READ <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* List View */
        <div className="divide-y divide-border border-y border-border">
          {paginatedPosts.map((post) => {
            const primaryCategory = (post.tags[0] || "DISPATCH").toUpperCase()
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-5 px-3 transition-colors hover:bg-box/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-meta text-[11px] text-muted-foreground mb-1.5">
                    <span className="font-semibold uppercase tracking-wider text-foreground">
                      {primaryCategory}
                    </span>
                    <span>•</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-navy transition-colors mb-1.5">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-4 font-meta text-xs text-muted-foreground">
                  {post.readingTime && (
                    <span className="font-mono">{post.readingTime} MIN</span>
                  )}
                  <span className="inline-flex items-center gap-0.5 font-semibold uppercase tracking-wider text-foreground group-hover:translate-x-1 transition-transform">
                    READ →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ========================================================
          PAGINATION CONTROLS
          ======================================================== */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2 pt-6 border-t border-border font-meta text-xs">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="flex size-8 items-center justify-center rounded-[3px] border border-border bg-box text-muted-foreground transition-all hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous Page"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`flex size-8 items-center justify-center rounded-[3px] border text-xs font-semibold transition-all ${
                n === currentPage
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-box text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="flex size-8 items-center justify-center rounded-[3px] border border-border bg-box text-muted-foreground transition-all hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next Page"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
