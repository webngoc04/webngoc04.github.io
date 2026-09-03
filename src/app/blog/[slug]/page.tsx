import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import BlogPost from "@/components/blog-post"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const ogImageUrl = `https://webngoc04.github.io/blog/${slug}/opengraph-image`

  return {
    title: `${post.title} | KeiChan`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://webngoc04.github.io/blog/${slug}/`,
      siteName: "KeiChan",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
    other: {
      "article:published_time": post.date,
      "article:tag": post.tags.join(","),
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 sm:pt-32 pb-12 sm:pb-16">
      <BlogPost post={post} />
    </main>
  )
}
