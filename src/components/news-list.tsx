"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ExternalLink, Calendar, Clock, ArrowRight, ShieldCheck, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import type { NewsItem } from "@/lib/news"

interface NewsListProps {
  news: NewsItem[]
}

const MARKET_TICKERS = [
  { label: "GDP VN Q3", value: "+7,43%", change: "Vượt dự báo", isPositive: true },
  { label: "Tỷ giá SBV", value: "24.094", change: "+13 đ", isPositive: false },
  { label: "Vàng SJC", value: "84,0 tr/l", change: "Neo đỉnh", isPositive: true },
  { label: "Spot Gold", value: "$2.661", change: "+1,15%", isPositive: true },
  { label: "Dầu Brent", value: "$74,80", change: "+1,60%", isPositive: false },
  { label: "FDI 9T", value: "$17,3B", change: "+8,9%", isPositive: true },
  { label: "Xuất siêu", value: "+$20,8B", change: "Thặng dư cao", isPositive: true },
]

export default function NewsList({ news }: NewsListProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = useMemo(() => {
    const cats = new Set(news.map((item) => item.category).filter(Boolean))
    return ["all", ...Array.from(cats)]
  }, [news])

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [news, search, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-navy/30 bg-navy/5 px-2 py-0.5 font-meta text-[11px] font-semibold text-navy uppercase tracking-wider">
            <ShieldCheck className="size-3" />
            Xác minh nguồn gốc độc lập
          </span>
          <span className="font-meta text-[11px] text-muted-foreground uppercase tracking-widest">
            Bản tin Kinh tế & Thị trường Tài chính
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Bản Tin Kinh Tế & Thị Trường
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground font-body max-w-3xl leading-relaxed">
          Tổng hợp và phân tích dữ liệu kinh tế vĩ mô, chính sách tiền tệ, biến động tỷ giá và thị trường hàng hóa trong ngày. Tất cả số liệu được đối chiếu trực tiếp từ các cơ quan thống kê chính thức (GSO, SBV) và định chế tài chính quốc tế uy tín (Reuters, Bloomberg, World Bank).
        </p>
      </div>

      {/* Real-time Financial Tickers Bar */}
      <div className="rounded-[4px] border border-border bg-box/60 p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-border/60">
          <DollarSign className="size-4 text-navy" />
          <span className="font-meta text-xs font-semibold uppercase tracking-wider text-foreground">
            Chỉ số thị trường trọng yếu (Snapshot 02/10)
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {MARKET_TICKERS.map((ticker, idx) => (
            <div
              key={idx}
              className="rounded-[3px] border border-border/60 bg-background/80 p-2 text-left"
            >
              <div className="font-meta text-[10px] text-muted-foreground uppercase tracking-wider">
                {ticker.label}
              </div>
              <div className="font-meta text-sm font-bold text-foreground tabular-nums mt-0.5">
                {ticker.value}
              </div>
              <div
                className={`flex items-center gap-1 font-meta text-[10px] mt-0.5 ${
                  ticker.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {ticker.isPositive ? (
                  <TrendingUp className="size-2.5" />
                ) : (
                  <TrendingDown className="size-2.5" />
                )}
                <span>{ticker.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-[3px] px-3 py-1 font-meta text-xs font-medium uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? "bg-foreground text-background font-semibold"
                  : "bg-box border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "Tất cả tin" : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo chủ đề, từ khóa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[3px] border border-border bg-box pl-9 pr-3 py-1.5 font-meta text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      {/* News Articles Feed */}
      <div className="space-y-6">
        {filteredNews.length === 0 ? (
          <div className="rounded-[4px] border border-border bg-box/40 p-8 text-center">
            <p className="font-meta text-sm text-muted-foreground">
              Không tìm thấy tin tức phù hợp với điều kiện tìm kiếm.
            </p>
          </div>
        ) : (
          filteredNews.map((item) => (
            <article
              key={item.slug}
              className="group rounded-[4px] border border-border bg-background p-5 sm:p-6 transition-all hover:border-foreground/40 hover:shadow-sm"
            >
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded-[3px] bg-box px-2 py-0.5 font-meta text-[11px] font-semibold uppercase tracking-wider text-navy border border-border">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 font-meta text-muted-foreground text-[11px]">
                    <Calendar className="size-3" />
                    <span>{item.date}</span>
                    {item.time && (
                      <>
                        <span className="text-border">•</span>
                        <Clock className="size-3" />
                        <span>{item.time}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="font-meta text-[11px] text-muted-foreground">
                  {item.readingTime} phút đọc
                </div>
              </div>

              {/* Title & Link */}
              <h2 className="mt-4 font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-navy">
                <Link href={`/news/${item.slug}/`}>{item.title}</Link>
              </h2>

              {/* Summary Description */}
              <p className="mt-2.5 font-body text-sm sm:text-base text-foreground/80 leading-relaxed">
                {item.description}
              </p>

              {/* Key Indicators Snippet (if available) */}
              {item.indicators && item.indicators.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.indicators.slice(0, 4).map((ind, i) => (
                    <div
                      key={i}
                      className="rounded-[3px] border border-border/80 bg-box/70 px-2.5 py-1 text-xs font-meta"
                    >
                      <span className="text-muted-foreground mr-1.5">{ind.label}:</span>
                      <span className="font-semibold text-foreground tabular-nums">
                        {ind.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Footer: Verified Sources & Action */}
              <div className="mt-5 pt-3.5 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-meta text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    Nguồn tham chiếu:
                  </span>
                  {item.sources.map((src, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-[2px] bg-box px-1.5 py-0.5 font-meta text-[10px] text-foreground/80 border border-border/60"
                    >
                      {src.name}
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy hover:underline"
                          title={`Xem tài liệu gốc tại ${src.name}`}
                        >
                          <ExternalLink className="size-2.5 inline" />
                        </a>
                      )}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/news/${item.slug}/`}
                  className="inline-flex items-center gap-1.5 font-meta text-xs font-semibold text-navy hover:text-burgundy uppercase tracking-wider transition-colors self-end sm:self-auto"
                >
                  <span>Xem báo cáo đầy đủ</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
