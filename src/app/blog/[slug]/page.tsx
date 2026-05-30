import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Markdown } from "@/components/markdown"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
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
    <main className="mx-auto max-w-3xl px-4 pt-32 pb-16">
      <Link
        href="/blog/"
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-pink-600 dark:hover:text-pink-300"
      >
        <ArrowLeft className="size-4" />
        Quay lại Blog
      </Link>

      <article>
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("vi-VN", {
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
          <h1 className="text-gradient text-3xl font-bold leading-tight">{post.title}</h1>
          {post.description && (
            <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
          )}
        </header>

        <div className="blog-content">
          <Markdown content={post.content} />
        </div>
      </article>
    </main>
  )
}
