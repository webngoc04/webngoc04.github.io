"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Markdown } from "@/components/markdown"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t, locale } = useI18n()

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
          </div>
          <h1 className="text-gradient text-2xl sm:text-3xl font-bold leading-tight" itemProp="headline">{post.title}</h1>
          {post.description && (
            <p className="mt-3 text-lg text-muted-foreground" itemProp="description">{post.description}</p>
          )}
        </header>

        <section itemProp="articleBody" className="blog-content">
          <Markdown content={post.content} />
        </section>
      </article>
    </>
  )
}