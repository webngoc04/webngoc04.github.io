"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Markdown } from "@/components/markdown"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"
import { extractTOC, MinimapNavigation } from "@/components/toc"

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t, locale } = useI18n()
  const router = useRouter()
  const prevLocale = useRef(locale)
  const [isReadMode, setIsReadMode] = useState<boolean>(false)
  const tocItems = extractTOC(post.content)

  useEffect(() => {
    if (prevLocale.current === locale) return
    prevLocale.current = locale

    let targetSlug: string
    if (locale === "en" && !post.slug.endsWith("-en")) {
      targetSlug = `${post.slug}-en`
    } else if (locale === "vi" && post.slug.endsWith("-en")) {
      targetSlug = post.slug.replace(/-en$/, "")
    } else {
      return
    }

    fetch(`/blog/${targetSlug}/`, { method: "HEAD" }).then((res) => {
      if (res.ok) router.push(`/blog/${targetSlug}/`)
    })
  }, [locale, post.slug, router])

  const dateLocale = locale === "vi" ? "vi-VN" : "en-US"

  return (
    <div className={isReadMode ? "read-mode-active p-4 sm:p-8 rounded-3xl transition-all shadow-xl border border-[#E2E0D8]" : "transition-all"}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/blog/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-pink-600 dark:hover:text-pink-300"
        >
          <ArrowLeft className="size-4" />
          {t("blog.backToBlog")}
        </Link>

        {/* Read Mode Toggle Button */}
        <button
          type="button"
          onClick={() => setIsReadMode(!isReadMode)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isReadMode
              ? "bg-[#BC4749] text-white border-[#BC4749] shadow-md"
              : "bg-muted/60 text-muted-foreground border-border/80 hover:bg-pink-600 hover:text-white hover:border-pink-600"
          }`}
        >
          <BookOpen className="size-3.5" />
          <span>{isReadMode ? "Đang mở Chế độ đọc (Warm Paper)" : "Chế độ đọc (Warm Paper)"}</span>
        </button>
      </div>

      {/* Floating Minimap Navigation (Left edge rail + Tree View hover drawer) */}
      <MinimapNavigation
        items={tocItems}
        isReadMode={isReadMode}
        onToggleReadMode={() => setIsReadMode(!isReadMode)}
      />

      <article className="mx-auto max-w-3xl" itemScope itemType="https://schema.org/BlogPosting">
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date} itemProp="datePublished">
              {new Date(post.date).toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={isReadMode ? "bg-[#F0EFEA] text-[#656D76] text-xs border border-[#E2E0D8]" : "text-xs"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <h1
              className={isReadMode ? "text-2xl sm:text-3xl font-bold leading-tight text-[#2D2D2A]" : "text-gradient text-2xl sm:text-3xl font-bold leading-tight"}
              itemProp="headline"
            >
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {post.author ? `by ${post.author}` : ""}
            </p>
            {post.description && (
              <p className="text-lg text-muted-foreground" itemProp="description">{post.description}</p>
            )}
            {post.readingTime && (
              <p className="text-sm text-muted-foreground">
                {t("blog.minRead")} {post.readingTime}
              </p>
            )}
          </div>
        </header>

        <section itemProp="articleBody" className="blog-content">
          <Markdown content={post.content} />
        </section>
      </article>
    </div>
  )
}
