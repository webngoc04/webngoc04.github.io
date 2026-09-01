"use client"

import Link from "next/link"
import { useState, useMemo, useCallback } from "react"
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"

interface BlogListProps {
  posts: BlogPost[]
}

const POSTS_PER_PAGE = 5

export default function BlogList({ posts }: BlogListProps) {
  const { t, locale } = useI18n()

  const dateLocale = locale === "vi" ? "vi-VN" : "en-US"
  const localePosts = useMemo(() => posts.filter((post) => post.lang === locale), [posts, locale])

  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>()
    localePosts.forEach((post) => post.tags.forEach((tag) => tagCount.set(tag, (tagCount.get(tag) || 0) + 1)))
    return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
  }, [localePosts])

  const filteredPosts = useMemo(() => {
    let result = localePosts
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
      )
    }
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag))
    }
    return result
  }, [localePosts, search, selectedTag])

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
    <>
      <h1 className="text-gradient mb-2 text-center text-2xl sm:text-3xl md:text-4xl font-bold">{t("blog.title")}</h1>
      <p className="mb-8 text-center text-muted-foreground">
        {t("blog.subtitle")}
      </p>

      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50"
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

          {allTags.length > 0 && (
            <select
              value={selectedTag ?? ""}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="rounded-xl border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50 appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="">{t("blog.allTags")}</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            {t("blog.search")}
          </button>
        </div>

        {hasFilter && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{t("blog.showing")} {filteredPosts.length} {t("blog.results")}</span>
            <button
              type="button"
              onClick={handleClear}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {t("blog.clearFilter")}
            </button>
          </div>
        )}
      </div>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-muted-foreground">{t("blog.noPosts")}</p>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="glass glass-hover group block rounded-xl p-4 sm:p-6 transition-all"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <h2 className="mb-1.5 text-base sm:text-xl font-semibold group-hover:text-pink-600 dark:group-hover:text-pink-300">
                {post.title}
                <span className="text-xs text-muted-foreground ml-2">
                  {post.readingTime} phút đọc
                </span>
              </h2>
              <p className="line-clamp-2 text-muted-foreground">{post.description}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}/`)
                    alert("Copied!")
                  }}
                  className="rounded bg-primary px-2 py-1.5 text-primary-foreground hover:opacity-80 transition-opacity"
                  title="Copy link"
                >
                  Link
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="flex size-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-all hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                n === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="flex size-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-all hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </>
  )
}
