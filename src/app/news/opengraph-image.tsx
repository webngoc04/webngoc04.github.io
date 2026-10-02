import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"

export const alt = "KeiChan — Financial & Economic Intelligence"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

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

export default function Image() {
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
            <pattern id="news-root-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E2E0D8"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#news-root-grid)" />
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
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            padding: "44px 52px",
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
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  color: "#1B365D",
                  textTransform: "uppercase",
                }}
              >
                FINANCIAL INTELLIGENCE // BẢN TIN KINH TẾ
              </span>
            </div>

            <span
              style={{
                fontFamily: "PublicSans",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "#666660",
                textTransform: "uppercase",
              }}
            >
              DATA VERIFIED • GSO • SBV • REUTERS • BLOOMBERG
            </span>
          </div>

          {/* Main Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span
              style={{
                fontFamily: "PublicSans",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "#842323",
                textTransform: "uppercase",
              }}
            >
              DAILY MARKET MONITOR & MACRO DISPATCH
            </span>
            <div
              style={{
                fontFamily: "Newsreader",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "56px",
                lineHeight: "1.15",
                color: "#111111",
              }}
            >
              Bản Tin Kinh Tế & Thị Trường Tài Chính
            </div>
            <p
              style={{
                fontFamily: "PublicSans",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "1.5",
                color: "#444440",
                maxWidth: "960px",
              }}
            >
              Điểm tin vĩ mô, thị trường tiền tệ, tỷ giá, vàng, dầu mỏ và các chỉ số kinh tế Việt Nam & thế giới được thẩm tra dữ liệu độc lập.
            </p>
          </div>

          {/* Footer Metrics */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #E2E0D8",
              paddingTop: "18px",
            }}
          >
            <div style={{ display: "flex", gap: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "PublicSans", fontSize: "10px", color: "#888880", textTransform: "uppercase" }}>
                  VN-INDEX
                </span>
                <span style={{ fontFamily: "PublicSans", fontWeight: 700, fontSize: "15px", color: "#111" }}>
                  1.737,71
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "PublicSans", fontSize: "10px", color: "#888880", textTransform: "uppercase" }}>
                  TỶ GIÁ SBV
                </span>
                <span style={{ fontFamily: "PublicSans", fontWeight: 700, fontSize: "15px", color: "#111" }}>
                  25.624 VND
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "PublicSans", fontSize: "10px", color: "#888880", textTransform: "uppercase" }}>
                  VÀNG SJC
                </span>
                <span style={{ fontFamily: "PublicSans", fontWeight: 700, fontSize: "15px", color: "#111" }}>
                  144,1 Trđ/L
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "PublicSans", fontSize: "10px", color: "#888880", textTransform: "uppercase" }}>
                  DẦU BRENT
                </span>
                <span style={{ fontFamily: "PublicSans", fontWeight: 700, fontSize: "15px", color: "#111" }}>
                  $102,60/bbl
                </span>
              </div>
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
              webngoc04.github.io/news
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
