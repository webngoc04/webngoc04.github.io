"use client"

import { useState, type ReactElement } from "react"
import { Check, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  APCspScoreChart,
  CognitiveAtrophyDiagram,
  RepoStarComparisonChart,
  AIBenchmarksChart,
  GoldenRatioAppDiagram,
  EightStepWorkflowDiagram,
} from "@/components/blog-charts"
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
      className="absolute top-2.5 right-2.5 rounded-[3px] border border-border bg-box/80 px-2 py-1 font-meta text-[11px] uppercase tracking-wider text-muted-foreground opacity-70 transition-all hover:opacity-100 hover:border-foreground hover:text-foreground"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <Check className="size-3" />
          <span>COPIED</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          <Copy className="size-3" />
          <span>COPY</span>
        </span>
      )}
    </button>
  )
}

export function Markdown({ content }: { content: string }) {
  let hasRenderedLead = false

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const text = getNodeText(children)
          const id = slugify(text)
          return (
            <div className="pt-2">
              <h2
                id={id}
                className="scroll-m-20 font-sans text-[24px] sm:text-[26px] font-bold leading-[1.3] text-foreground tracking-tight border-t border-border pt-6 mt-10 mb-4 first:mt-0 first:border-t-0 first:pt-0"
                {...props}
              >
                {children}
              </h2>
            </div>
          )
        },
        h3: ({ children, ...props }) => {
          const text = getNodeText(children)
          const id = slugify(text)
          return (
            <h3
              id={id}
              className="scroll-m-20 font-sans text-[20px] font-semibold leading-[1.3] text-foreground tracking-tight mt-8 mb-3"
              {...props}
            >
              {children}
            </h3>
          )
        },
        p: ({ children, ...props }) => {
          const isLead = !hasRenderedLead
          if (isLead) {
            hasRenderedLead = true
          }
          return (
            <p
              className={`font-body text-[17px] sm:text-[18px] leading-[1.68] text-foreground/95 mb-6 text-left ${
                isLead ? "drop-cap-lead" : ""
              }`}
              {...props}
            >
              {children}
            </p>
          )
        },
        blockquote: ({ children, ...props }) => {
          return (
            <blockquote
              className="my-8 border-y border-border py-4 font-serif text-[21px] sm:text-[22px] italic leading-[1.45] text-foreground text-left"
              {...props}
            >
              {children}
            </blockquote>
          )
        },
        table: ({ children, ...props }) => {
          return (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse border-y border-border text-left" {...props}>
                {children}
              </table>
            </div>
          )
        },
        th: ({ children, ...props }) => {
          const text = getNodeText(children)
          const isNumeric = /^[\d\s.,%#$€¥+-]+$/.test(text.trim())
          return (
            <th
              className={`border-b border-border py-3 px-3 font-sans font-bold text-sm text-foreground ${
                isNumeric ? "text-right font-meta tabular-nums" : "text-left"
              }`}
              {...props}
            >
              {children}
            </th>
          )
        },
        td: ({ children, ...props }) => {
          const text = getNodeText(children)
          const isNumeric = /^[\d\s.,%#$€¥+-]+$/.test(text.trim())
          return (
            <td
              className={`border-b border-border/60 py-3 px-3 text-sm text-foreground/90 font-body ${
                isNumeric ? "text-right font-meta tabular-nums" : "text-left"
              }`}
              {...props}
            >
              {children}
            </td>
          )
        },
        hr: () => <hr className="my-10 border-0 border-t border-border" />,
        img: ({ src, alt }) => {
          const srcStr = typeof src === "string" ? src : ""
          if (srcStr.includes("ap_csp_score_distribution")) {
            return (
              <figure className="my-6">
                <APCspScoreChart />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          if (srcStr.includes("cognitive_atrophy_loop")) {
            return (
              <figure className="my-6">
                <CognitiveAtrophyDiagram />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          if (srcStr.includes("repo_star_comparison") || srcStr.includes("github_star_comparison")) {
            return (
              <figure className="my-6">
                <RepoStarComparisonChart />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          if (srcStr.includes("ai_benchmarks_comparison")) {
            return (
              <figure className="my-6">
                <AIBenchmarksChart />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          if (srcStr.includes("golden_ratio_app") || srcStr.includes("golden_ratio")) {
            return (
              <figure className="my-6">
                <GoldenRatioAppDiagram />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          if (srcStr.includes("ai_workflow_8_steps") || srcStr.includes("8_steps")) {
            return (
              <figure className="my-6">
                <EightStepWorkflowDiagram />
                {alt && <figcaption className="blog-caption">{alt}</figcaption>}
              </figure>
            )
          }
          return (
            <figure className="my-6">
              <img src={srcStr} alt={alt || ""} className="rounded-[4px] border border-border my-2 max-w-full" />
              {alt && <figcaption className="blog-caption">{alt}</figcaption>}
            </figure>
          )
        },
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy hover:text-burgundy underline underline-offset-4 font-medium transition-colors"
            {...props}
          >
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
            <div className="group/code relative my-6">
              <pre
                className="overflow-x-auto rounded-[4px] border border-border bg-box p-4 font-mono text-[13.5px] leading-relaxed text-foreground"
                {...props}
              >
                {children}
              </pre>
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
