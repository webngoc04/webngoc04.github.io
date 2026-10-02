import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"

export const alt = "KeiChan — Dispatches & Systems Engineering"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

// Load fonts from local assets for 100% deterministic build
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
        {/* Background Architectural Grid Pattern (Fontshare aesthetic) */}
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
            <pattern id="root-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E2E0D8"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#root-grid)" />
        </svg>

        {/* Inner Editorial Frame with Hairline Border */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#FAF9F5",
            border: "1px solid #E2E0D8",
            padding: "48px 52px",
          }}
        >
          {/* Architectural Corner Crosshairs (+) */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "-8px",
              fontSize: "14px",
              color: "#8A1515",
              fontFamily: "Public Sans",
              fontWeight: 700,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              fontSize: "14px",
              color: "#8A1515",
              fontFamily: "Public Sans",
              fontWeight: 700,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "-8px",
              fontSize: "14px",
              color: "#8A1515",
              fontFamily: "Public Sans",
              fontWeight: 700,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              right: "-8px",
              fontSize: "14px",
              color: "#8A1515",
              fontFamily: "Public Sans",
              fontWeight: 700,
            }}
          >
            +
          </div>

          {/* Top Masthead Bar: USTR / FED / WSJ Identity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #E2E0D8",
              paddingBottom: "18px",
              fontFamily: "Public Sans",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.8px",
              color: "#555555",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#002855",
                  display: "flex",
                }}
              />
              <span style={{ color: "#002855", fontWeight: 700 }}>
                KEICHAN // ARCHIVAL RECORD
              </span>
              <span style={{ color: "#E2E0D8" }}>|</span>
              <span style={{ color: "#8A1515" }}>SYSTEMS ENGINEERING</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ color: "#555555", fontWeight: 500 }}>
                EST. 2026
              </span>
              <span style={{ color: "#E2E0D8" }}>|</span>
              <span style={{ color: "#111111", letterSpacing: "2px" }}>
                VOL. 2026
              </span>
            </div>
          </div>

          {/* Center: Main Headline (Newsreader Bold Italic) & Subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              margin: "auto 0",
            }}
          >
            <div
              style={{
                fontFamily: "Newsreader",
                fontSize: "56px",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.12,
                color: "#111111",
                letterSpacing: "-0.5px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              KeiChan — Dispatches & Systems Engineering
            </div>

            <div
              style={{
                fontFamily: "Public Sans",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#555555",
                display: "flex",
                maxWidth: "960px",
              }}
            >
              Independent chronicles exploring low-level systems programming, Linux kernel internals, software security architecture, and modern craft.
            </div>
          </div>

          {/* Bottom Colophon Bar: Specimen tags & Site Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #E2E0D8",
              paddingTop: "20px",
              fontFamily: "Public Sans",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "#555555",
                  letterSpacing: "1.2px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                PUBLICATION DOMAIN:
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#111111",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                webngoc04.github.io
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {["LINUX KERNEL", "SYSTEMS ARCHITECTURE", "ZERO TRUST", "C / RUST"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "4px 12px",
                    borderRadius: "3px",
                    backgroundColor: "#F2F1EC",
                    border: "1px solid #E2E0D8",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#111111",
                    letterSpacing: "0.8px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
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
          name: "Public Sans",
          data: publicSansBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Public Sans",
          data: publicSansMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  )
}
