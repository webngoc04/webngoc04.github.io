import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"
import { getAllNews, getNewsBySlug } from "@/lib/news"

export const alt = "KeiChan Financial Intelligence Dispatch"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function generateStaticParams() {
  const news = getAllNews()
  return news.map((item) => ({ slug: item.slug }))
}

// Load fonts from local assets
const newsreaderBoldItalic = fs.readFileSync(
  path.join(process.cwd(), "src/assets/fonts/Newsreader-BoldItalic.ttf")
)
const publicSansBold = fs.readFileSync(
  path.join(process.cwd(), "src/assets/fonts/PublicSans-Bold.ttf")
)
const publicSansMedium = fs.readFileSync(
  path.join(process.cwd(), "src/assets/fonts/PublicSans-Medium.ttf")
)

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getNewsBySlug(slug)

  const title = item?.title || slug
  const description = item?.description || "Bản tin kinh tế tài chính đã được thẩm tra số liệu."
  const date = item?.date || "OCTOBER 2024"
  const category = (item?.category || "KINH TẾ").toUpperCase()

  const fontSize = title.length > 70 ? "38px" : title.length > 40 ? "46px" : "54px"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#FAF9F5",
          padding: "36px",
          color: "#111111",
        }}
      >
        {/* Background Grid */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            opacity: 0.5,
          }}
        >
          <defs>
            <pattern id="news-slug-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E2E0D8"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#news-slug-grid)" />
        </svg>

        {/* Frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #D5D2C7",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "44px 50px",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #E2E0D8",
              paddingBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#1B365D",
                }}
              />
              <span
                style={{
                  fontFamily: "PublicSans",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#1B365D",
                  textTransform: "uppercase",
                }}
              >
                FINANCIAL INTELLIGENCE // {category}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "PublicSans",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#666660",
                }}
              >
                {date}
              </span>
              <span
                style={{
                  fontFamily: "PublicSans",
                  fontWeight: 700,
                  fontSize: "11px",
                  color: "#1B365D",
                  backgroundColor: "#EEF2F6",
                  padding: "2px 8px",
                  borderRadius: "2px",
                }}
              >
                VERIFIED
              </span>
            </div>
          </div>

          {/* Main Title Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                fontFamily: "Newsreader",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: fontSize,
                lineHeight: "1.2",
                color: "#111111",
              }}
            >
              {title}
            </div>

            <p
              style={{
                fontFamily: "PublicSans",
                fontWeight: 500,
                fontSize: "17px",
                lineHeight: "1.5",
                color: "#4A4A45",
                maxWidth: "980px",
              }}
            >
              {description.slice(0, 190)}
              {description.length > 190 ? "..." : ""}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #E2E0D8",
              paddingTop: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  fontFamily: "PublicSans",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "#842323",
                  textTransform: "uppercase",
                }}
              >
                NGUỒN THAM CHIẾU: GSO • SBV • REUTERS • BLOOMBERG
              </span>
            </div>

            <span
              style={{
                fontFamily: "PublicSans",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "#1B365D",
                textTransform: "uppercase",
              }}
            >
              KeiChan • webngoc04.github.io
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreaderBoldItalic,
          style: "italic",
          weight: 700,
        },
        {
          name: "PublicSans",
          data: publicSansBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "PublicSans",
          data: publicSansMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  )
}
