import { ImageResponse } from "next/og"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

export const alt = "KeiChan Dispatch"
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
  const description = post?.description || "KeiChan Editorial Dispatch"
  const author = (post?.author || "KeiChan").toUpperCase()
  const date = post?.date || ""
  const primaryTag = (post?.tags?.[0] || "DISPATCH").toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          backgroundColor: "#FAF9F5",
          color: "#111111",
          fontFamily: "serif",
          border: "16px solid #F2F1EC",
        }}
      >
        {/* Top Meta Header: USTR / FED / WSJ style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E2E0D8",
            paddingBottom: "20px",
            fontFamily: "sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "2px",
            color: "#555555",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#002855", fontWeight: 700 }}>KEICHAN DISPATCH</span>
            <span>|</span>
            <span>{primaryTag}</span>
          </div>
          <span>{date}</span>
        </div>

        {/* Center Title & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? "44px" : "54px",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.15,
              color: "#111111",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              lineHeight: 1.5,
              color: "#555555",
              fontFamily: "sans-serif",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E2E0D8",
            paddingTop: "24px",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", color: "#555555", letterSpacing: "1px" }}>
              DISPATCH AUTHOR:
            </span>
            <span style={{ fontSize: "15px", color: "#111111", fontWeight: 700 }}>
              {author}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {post?.tags?.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "5px 12px",
                  borderRadius: "3px",
                  backgroundColor: "#F2F1EC",
                  border: "1px solid #E2E0D8",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111111",
                  letterSpacing: "0.5px",
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
