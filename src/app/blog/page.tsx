import { getAllPosts } from "@/lib/blog"
import BlogList from "@/components/blog-list"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <BlogList posts={posts} />
    </main>
  )
}