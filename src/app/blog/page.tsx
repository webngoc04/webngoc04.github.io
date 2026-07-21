import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-4xl px-4 pt-32 pb-16">
      <h1 className="text-gradient mb-2 text-center text-4xl font-bold">Blog</h1>
      <p className="mb-12 text-center text-muted-foreground">
        Random things I write when I'm free
      </p>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="glass glass-hover group block rounded-xl p-6 transition-all"
            >
              <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
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
              <h2 className="mb-1.5 text-xl font-semibold group-hover:text-pink-600 dark:group-hover:text-pink-300">
                {post.title}
              </h2>
              <p className="line-clamp-2 text-muted-foreground">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
