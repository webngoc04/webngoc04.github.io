"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, ShieldCheck, Calendar, Clock, User, Share2 } from "lucide-react"
import { useState } from "react"
import { Markdown } from "@/components/markdown"
import type { NewsItem } from "@/lib/news"

interface NewsPostProps {
  news: NewsItem
}

export default function NewsPost({ news }: NewsPostProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article className="space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/news/"
          className="inline-flex items-center gap-1.5 font-meta text-xs font-semibold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Về trang bản tin</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-[3px] border border-border bg-box px-2.5 py-1 font-meta text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Share2 className="size-3" />
          <span>{copied ? "Đã sao chép liên kết" : "Chia sẻ"}</span>
        </button>
      </div>

      {/* Header Area */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-[3px] bg-navy/10 border border-navy/30 px-2 py-0.5 font-meta text-xs font-semibold text-navy uppercase tracking-wider">
            {news.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-[3px] border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 font-meta text-[11px] font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            <ShieldCheck className="size-3" />
            Đã thẩm định số liệu
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border/60 py-3 font-meta text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{news.date}</span>
          </div>
          {news.time && (
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{news.time}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <User className="size-3.5" />
            <span>{news.author}</span>
          </div>
          <div className="ml-auto font-mono text-[11px]">
            {news.readingTime} phút đọc
          </div>
        </div>
      </header>

      {/* Verified Sources Disclosure Box */}
      <div className="rounded-[4px] border border-border bg-box/80 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="size-4 text-navy" />
          <h2 className="font-meta text-xs font-bold uppercase tracking-wider text-foreground">
            Danh mục nguồn trích dẫn & Cơ quan thẩm định
          </h2>
        </div>
        <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed">
          Tất cả dữ liệu trong bản tin này được tổng hợp và đối chiếu trực tiếp từ các văn bản, báo cáo thống kê chính thức của cơ quan nhà nước và hãng tin tài chính quốc tế uy tín:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {news.sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-[3px] border border-border bg-background/80 p-2.5 text-xs transition-colors hover:border-navy hover:bg-background"
            >
              <div className="pr-2">
                <div className="font-semibold text-foreground flex items-center gap-1">
                  <span>{src.name}</span>
                </div>
                {src.publisher && (
                  <div className="font-meta text-[10px] text-muted-foreground">
                    {src.publisher}
                  </div>
                )}
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Snapshot Indicators (if present) */}
      {news.indicators && news.indicators.length > 0 && (
        <div className="rounded-[4px] border border-border bg-background p-4">
          <h3 className="font-meta text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Bảng chỉ số trọng yếu tại thời điểm phát hành
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {news.indicators.map((ind, i) => (
              <div
                key={i}
                className="rounded-[3px] border border-border/80 bg-box/50 p-2.5 text-left"
              >
                <div className="font-meta text-[10px] text-muted-foreground uppercase tracking-wider">
                  {ind.label}
                </div>
                <div className="font-meta text-sm font-bold text-foreground tabular-nums mt-0.5">
                  {ind.value}
                </div>
                {ind.change && (
                  <div
                    className={`font-meta text-[10px] mt-0.5 ${
                      ind.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {ind.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="prose dark:prose-invert max-w-none pt-2">
        <Markdown content={news.content} />
      </div>

      {/* Footer Editorial Sign-off */}
      <footer className="mt-12 pt-6 border-t border-border space-y-4">
        <div className="rounded-[4px] border border-border/60 bg-box/40 p-4 text-xs font-body text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground mb-1 font-meta uppercase tracking-wider">
            Tuyên bố tính chính xác & Chuẩn mực biên tập:
          </p>
          <p>
            Bản tin này được biên tập với tiêu chuẩn kiểm chứng độc lập hai lớp. Số liệu thống kê vĩ mô được trích xuất trực tiếp từ các thông cáo phát hành của Tổng cục Thống kê (GSO), Ngân hàng Nhà nước Việt Nam (SBV), Bộ Kế hoạch và Đầu tư, Cục Thống kê Lao động Hoa Kỳ (BLS) cùng dữ liệu thị trường từ Reuters và Bloomberg. Mọi dẫn chiếu đều đính kèm liên kết tài liệu nguồn đối chứng.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/news/"
            className="inline-flex items-center gap-1.5 font-meta text-xs font-semibold text-navy hover:text-burgundy uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Trở lại danh sách bản tin kinh tế</span>
          </Link>

          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 font-meta text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
          >
            <span>Xem các bài viết kỹ thuật & nghiên cứu (Dispatches) →</span>
          </Link>
        </div>
      </footer>
    </article>
  )
}
