"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2 } from "lucide-react"
import { Markdown } from "@/components/markdown"
import { useI18n } from "@/lib/i18n"
import type { BlogPost } from "@/lib/blog"
import { extractTOC, MinimapNavigation } from "@/components/toc"
import { toast } from "sonner"

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  const { t, locale } = useI18n()
  const router = useRouter()
  const prevLocale = useRef(locale)
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
  const formattedDate = new Date(post.date).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const primaryCategory = (post.tags[0] || "DISPATCH").toUpperCase()
  const authorName = (post.author || "KeiChan").toUpperCase()

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      }
    } catch {
      // User cancelled
    }
  }

  return (
    <div className="relative">
      {/* Floating Minimap Navigation (Centered rail on left) */}
      <MinimapNavigation items={tocItems} />

      {/* Back button & dispatch indicator */}
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4">
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-2 font-meta text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>{t("blog.backToBlog") || "RETURN TO DISPATCHES"}</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-[3px] border border-border bg-box px-2.5 py-1 font-meta text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          title="Share dispatch"
        >
          <Share2 className="size-3" />
          <span className="hidden sm:inline">SHARE</span>
        </button>
      </div>

      <article className="editorial-container" itemScope itemType="https://schema.org/BlogPosting">
        {/* ========================================================
            1. Khối thông tin thượng tầng (Meta Header)
            Public Sans 12px, UPPERCASE, Medium (500)
            Định dạng: CHỦ ĐỀ LỚN | NGÀY THÁNG NĂM | TÊN TÁC GIẢ
            ======================================================== */}
        <header className="mb-6">
          <div className="editorial-meta-header mb-3">
            <span>{primaryCategory}</span>
            <span className="mx-2 text-border font-light">|</span>
            <time dateTime={post.date} itemProp="datePublished">
              {formattedDate.toUpperCase()}
            </time>
            <span className="mx-2 text-border font-light">|</span>
            <span>BY {authorName}</span>
          </div>

          {/* ========================================================
              2. Tiêu đề chính (Headline - H1)
              Instrument Serif (Italic), 38px-44px desktop, line-height 1.1
              ======================================================== */}
          <h1 className="editorial-h1 mt-2 mb-6" itemProp="headline">
            {post.title}
          </h1>

          {/* ========================================================
              3. Hộp tóm tắt điều hành (Executive Summary Box)
              Nền #F2F1EC, bo góc 4px, padding 20px, Lora/Public Sans italic 16px
              ======================================================== */}
          {post.description && (
            <div className="executive-summary-box" role="region" aria-label="Executive Summary">
              <div className="flex items-center gap-2 mb-2 font-meta text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span className="size-1.5 rounded-full bg-foreground" />
                <span>EXECUTIVE SUMMARY // TÓM TẮT ĐIỀU HÀNH</span>
              </div>
              <p itemProp="description">{post.description}</p>
            </div>
          )}

          {/* Secondary Metadata bar (Tags & Reading time) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-2.5 font-meta text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/80">TOPICS:</span>
              {post.tags.map((tag) => (
                <span key={tag} className="specimen-badge">
                  {tag}
                </span>
              ))}
            </div>

            {post.readingTime && (
              <div className="font-meta text-[11px] uppercase tracking-wider text-muted-foreground">
                {t("blog.minRead") || "READING TIME:"} {post.readingTime} MIN
              </div>
            )}
          </div>
        </header>

        {/* ========================================================
            4, 5, 6, 7. Thân bài, Drop Cap, Dividers, Pull Quotes, Tables
            ======================================================== */}
        <section itemProp="articleBody" className="blog-content">
          <Markdown content={post.content} />
        </section>

        {/* ========================================================
            Dispatch Footer & Colophon (USTR Archival Style)
            ======================================================== */}
        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-meta text-xs text-muted-foreground">
            <div>
              <p className="font-semibold uppercase tracking-widest text-foreground">
                [ END OF OFFICIAL DISPATCH ]
              </p>
              <p className="text-[11px] mt-0.5">
                Archival Record: KeiChan Journal • Reference: {post.slug}
              </p>
            </div>

            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-border bg-box px-3.5 py-2 font-meta text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span>{t("blog.backToBlog") || "BACK TO ARCHIVE"}</span>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
