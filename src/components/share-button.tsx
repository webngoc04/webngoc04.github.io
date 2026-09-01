"use client"

import React from "react"
import { Mail } from "lucide-react"

export interface ShareButtonProps {
  title: string
  url?: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    const copyUrl = url || `${window.location.origin}/blog/${slugify(title)}/`
    try {
      await navigator.clipboard.writeText(copyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert("Failed to copy")
    }
  }

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "-")

  return (
    <div className="flex items-center gap-2">
      {copied ? (
        <span className="text-xs text-green-500">Copied!</span>
      ) : (
        <button
          onClick={handleCopy}
          className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-80 transition-opacity"
          title="Copy link"
        >
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </button>
      )}
    </div>
  )
}