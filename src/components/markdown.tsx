"use client"

import { useState, type ReactElement } from "react"
import { Check, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { APCspScoreChart, CognitiveAtrophyDiagram, RepoStarComparisonChart } from "@/components/blog-charts"
import { slugify } from "@/components/toc"

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: React.ReactNode } }
    return getNodeText(element.props.children)
  }
  return ""
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-pink-100/50 hover:text-pink-600 group-hover/code:opacity-100 dark:hover:bg-pink-900/20 dark:hover:text-pink-300"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
    </button>
  )
}

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const text = getNodeText(children)
          const id = slugify(text)
          return (
            <h2 id={id} className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mt-8 mb-4" {...props}>
              {children}
            </h2>
          )
        },
        h3: ({ children, ...props }) => {
          const text = getNodeText(children)
          const id = slugify(text)
          return (
            <h3 id={id} className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3" {...props}>
              {children}
            </h3>
          )
        },
        img: ({ src, alt }) => {
          const srcStr = typeof src === "string" ? src : ""
          if (srcStr.includes("ap_csp_score_distribution")) {
            return <APCspScoreChart />
          }
          if (srcStr.includes("cognitive_atrophy_loop")) {
            return <CognitiveAtrophyDiagram />
          }
          if (srcStr.includes("repo_star_comparison") || srcStr.includes("github_star_comparison")) {
            return <RepoStarComparisonChart />
          }
          return <img src={srcStr} alt={alt || ""} className="rounded-xl border my-4 max-w-full" />
        },
        a: ({ children, href, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        ),
        pre: ({ children, ...props }) => {
          const code = (() => {
            try {
              const child = children as ReactElement<{ children?: string }>
              return String(child.props.children ?? "")
            } catch {
              return ""
            }
          })()

          return (
            <div className="group/code relative">
              <pre {...props}>{children}</pre>
              <CopyButton code={code} />
            </div>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
