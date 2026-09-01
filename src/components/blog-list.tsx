"use client"

import Link from "next/link"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"

interface BlogListProps {
  posts: BlogPost[]
}

function getPostsPerPage(): number {
  if (typeof window === "undefined") return 5
  const w = window.innerWidth
  if (w < 640) return 3
  if (w < 1024) return 5
  return 7
}

export default function BlogList({ posts }: BlogListProps) {
  const { t, locale } = useI18n()

  const dateLocale = locale === "vi" ? "vi-VN" : "en-US"
  const localePosts = useMemo(() => posts.filter((post) => post.lang === locale), [posts, locale])

  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(getPostsPerPage)

  useEffect(() => {
    const onResize = () => setPostsPerPage(getPostsPerPage())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    localePosts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [localePosts])

  const filteredPosts = useMemo(() => {
    let result = localePosts
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
  }, [localePosts, search, selectedTag])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))
  const currentPage = Math.min(page, totalPages)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleTagSelect = useCallback((tag: string | null) => {
    setSelectedTag(tag)
    setPage(1)
  }, [])

  return (
    <>
      <h1 className="text-gradient mb-2 text-center text-2xl sm:text-3xl md:text-4xl font-bold">{t("blog.title")}</h1>
      <p className="mb-8 text-center text-muted-foreground">
        {t("blog.subtitle")}
      </p>

      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("blog.searchPlaceholder")}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-xl border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleTagSelect(null)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("blog.allTags")}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelect(selectedTag === tag ? null : tag)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {paginatedPosts.length === 0 ? (
        <p className="text-center text-muted-foreground">{t("blog.noPosts")}</p>
      ) : (
        <div className="grid gap-6">
          {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="glass glass-hover group block rounded-xl p-4 sm:p-6 transition-all"
            >
              <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
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
              </h2>
              <p className="line-clamp-2 text-muted-foreground">{post.description}</p>
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
