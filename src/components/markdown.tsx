"use client"

import { useState, type ReactElement } from "react"
import { Check, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
