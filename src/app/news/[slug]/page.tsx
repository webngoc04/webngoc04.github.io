import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllNews, getNewsBySlug } from "@/lib/news"
import NewsPost from "@/components/news-post"

export async function generateStaticParams() {
  const news = getAllNews()
  return news.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsBySlug(slug)
  if (!item) return {}

  const ogImageUrl = `https://webngoc04.github.io/news/${slug}/opengraph-image`

  return {
    title: `${item.title} | KeiChan Financial Intelligence`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      url: `https://webngoc04.github.io/news/${slug}/`,
      siteName: "KeiChan Financial Intelligence",
      type: "article",
      publishedTime: item.date,
      tags: item.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [ogImageUrl],
    },
    other: {
      "article:published_time": item.date,
      "article:tag": item.tags.join(","),
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const news = getNewsBySlug(slug)

  if (!news) notFound()

  return (
    <main className="mx-auto max-w-[760px] px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <NewsPost news={news} />
    </main>
  )
}
