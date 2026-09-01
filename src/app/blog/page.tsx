import { getAllPosts } from "@/lib/blog"
import BlogList from "@/components/blog-list"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-4xl px-4 pt-24 sm:pt-32 pb-12 sm:pb-16">
      <BlogList posts={posts} />
    </main>
  )
}