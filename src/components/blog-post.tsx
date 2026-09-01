"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/share-button"
import { Markdown } from "@/components/markdown"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t, locale } = useI18n()
  const router = useRouter()
  const prevLocale = useRef(locale)

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
    <>
      <Link
        href="/blog/"
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-pink-600 dark:hover:text-pink-300"
      >
        <ArrowLeft className="size-4" />
        {t("blog.backToBlog")}
      </Link>

      <article itemScope itemType="https://schema.org/BlogPosting">
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
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-4">
                {post.readingTime} phút đọc
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <ShareButton title={post.title} />
            </div>
          <h1 className="text-gradient text-2xl sm:text-3xl font-bold leading-tight" itemProp="headline">{post.title}</h1>
          {post.description && (
            <p className="mt-3 text-lg text-muted-foreground" itemProp="description">{post.description}</p>
          )}
          {post.readingTime && (
            <p className="mt-3 text-sm text-muted-foreground">
              {t("blog.minRead")} {post.readingTime}
            </p>
          )}
        </header>

        <section itemProp="articleBody" className="blog-content">
          <Markdown content={post.content} />
        </section>
      </article>
    </>
  )
}
