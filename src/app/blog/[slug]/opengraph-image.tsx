import { ImageResponse } from "next/og"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

export const alt = "KeiChan Blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const title = post?.title || slug
  const description = post?.description || "KeiChan Personal Blog"
  const author = post?.author || "KeiChan"
  const date = post?.date || ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "#0d1117",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              K
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px", color: "#f472b6" }}>
              KeiChan Blog
            </span>
          </div>
          <span style={{ fontSize: "18px", color: "#9ca3af" }}>{date}</span>
        </div>

        {/* Middle title & description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "42px" : "50px",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#f8fafc",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              lineHeight: 1.4,
              color: "#94a3b8",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px", color: "#cbd5e1", fontWeight: "600" }}>
              by {author}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {post?.tags?.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  fontSize: "14px",
                  color: "#f472b6",
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
