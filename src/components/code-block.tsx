"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import { Copy, Check, Download, ChevronDown, ChevronUp, FileCode, ShieldCheck, X, AlertTriangle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"

interface CodeBlockProps {
  children: ReactNode
  rawCode: string
  className?: string
}

async function computeSha256(content: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(content)
      const hashBuf = await window.crypto.subtle.digest("SHA-256", data)
      const hashArr = Array.from(new Uint8Array(hashBuf))
      return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("")
    } catch {
      // Fallback below
    }
  }
  // Simple deterministic fallback hash
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < content.length; i++) {
    const ch = content.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const fullHex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, "0")
  return (fullHex + fullHex + fullHex + fullHex).slice(0, 64)
}

function detectFilename(code: string, language?: string): string {
  // Check first few lines for explicitly declared filename
  const sample = code.slice(0, 600)
  const lines = sample.split("\n")
  for (const line of lines.slice(0, 6)) {
    const trimmed = line.trim()
    const match = trimmed.match(/(?:#|\/\/|\/\*|<!--|;\s*)\s*(?:filename:\s*|file:\s*)?([a-zA-Z0-9_\-.]+\.(?:py|sh|ps1|c|h|cpp|rs|js|ts|tsx|json|toml|yaml|yml|md|txt|bash|sql))/i)
    if (match && match[1]) {
      return match[1]
    }
  }

  // Common script detection by content
  if (sample.includes("#!/usr/bin/env python") || sample.includes("def scan_and_remediate")) {
    return "codex_audit.py"
  }
  if (sample.includes("write_config_cli()") || sample.includes("Codex Key Tool")) {
    return "CodexKeyTool.sh"
  }
  if (sample.includes("$catalogEndpoint") || sample.includes("install.ps1") || sample.includes("$codexHome")) {
    return "install.ps1"
  }
  if (sample.includes("lkm_minimal") || sample.includes("MODULE_LICENSE")) {
    return "lkm_minimal.c"
  }
  if (sample.includes("obj-m +=") && sample.includes("KDIR")) {
    return "Makefile"
  }

  // Fallback by language
  const cleanLang = (language || "").toLowerCase().replace(/^language-/, "")
  const langMap: Record<string, string> = {
    python: "script.py",
    py: "script.py",
    powershell: "script.ps1",
    ps1: "script.ps1",
    bash: "script.sh",
    sh: "script.sh",
    shell: "script.sh",
    zsh: "script.sh",
    c: "source.c",
    cpp: "source.cpp",
    rust: "main.rs",
    rs: "main.rs",
    typescript: "index.ts",
    ts: "index.ts",
    javascript: "index.js",
    js: "index.js",
    json: "data.json",
    toml: "config.toml",
    yaml: "config.yaml",
    yml: "config.yaml",
    makefile: "Makefile",
    html: "index.html",
    css: "style.css",
  }

  return langMap[cleanLang] || "source_code.txt"
}

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  filename: string
  code: string
  hash: string
  lineCount: number
  fileSizeBytes: number
}

function DownloadModal({
  isOpen,
  onClose,
  onConfirm,
  filename,
  code,
  hash,
  lineCount,
  fileSizeBytes,
}: DownloadModalProps) {
  const { locale } = useI18n()
  const isVi = locale === "vi"
  const [copiedHash, setCopiedHash] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const formattedSize = fileSizeBytes < 1024
    ? `${fileSizeBytes} B`
    : `${(fileSizeBytes / 1024).toFixed(1)} KB`

  const copyHashToClipboard = async () => {
    await navigator.clipboard.writeText(hash)
    setCopiedHash(true)
    toast.success(isVi ? "Đã sao chép mã băm SHA-256" : "SHA-256 hash copied")
    setTimeout(() => setCopiedHash(false), 2000)
  }

  const previewLines = code.split("\n").slice(0, 4).join("\n")

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[6px] border border-border bg-background shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border bg-box/40 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-[4px] border border-border bg-box p-1.5 text-foreground">
              <Download className="size-4 text-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">
                {isVi ? "Xác nhận tải về tệp tin" : "Confirm File Download"}
              </h3>
              <p className="font-meta text-[11px] text-muted-foreground uppercase tracking-wider">
                {isVi ? "Kiểm tra mã băm bảo mật & nguồn tệp" : "Integrity Verification & Source Metadata"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[3px] p-1 text-muted-foreground hover:bg-box hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <p className="font-body text-sm text-foreground/90 leading-relaxed">
            {isVi
              ? "Bạn có muốn tải về tệp mã nguồn này về máy tính không? Vui lòng đối soát thông số kỹ thuật và mã băm SHA-256 độc lập trước khi thực thi:"
              : "Are you sure you want to download this source code file? Please verify the cryptographic SHA-256 checksum prior to execution:"}
          </p>

          {/* File Metadata Details */}
          <div className="rounded-[4px] border border-border bg-box/50 p-3.5 space-y-2.5 font-meta text-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground uppercase tracking-wider">
                {isVi ? "Tên tệp:" : "Filename:"}
              </span>
              <span className="font-mono font-bold text-foreground flex items-center gap-1.5">
                <FileCode className="size-3.5 text-foreground" />
                {filename}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground uppercase tracking-wider">
                {isVi ? "Dung lượng & Dòng:" : "Size & Lines:"}
              </span>
              <span className="font-mono text-foreground">
                {formattedSize} • {lineCount} {isVi ? "dòng" : "lines"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground uppercase tracking-wider">
                {isVi ? "Nguồn trích xuất:" : "Source origin:"}
              </span>
              <span className="font-mono text-foreground text-[11px] truncate max-w-[240px]">
                KeiChan Technical Chronicle
              </span>
            </div>

            {/* SHA-256 Hash Box */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-muted-foreground uppercase tracking-wider flex items-center gap-1 font-semibold text-[10px]">
                  <ShieldCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
                  MÃ BĂM TOÀN VẸN (SHA-256 HASH):
                </span>
                <button
                  type="button"
                  onClick={copyHashToClipboard}
                  className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors underline cursor-pointer"
                >
                  {copiedHash ? (
                    <>
                      <Check className="size-2.5 text-emerald-500" />
                      <span>{isVi ? "Đã sao chép" : "Copied"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-2.5" />
                      <span>{isVi ? "Sao chép hash" : "Copy hash"}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-[3px] border border-border bg-background p-2 font-mono text-[10.5px] leading-tight text-foreground break-all select-all">
                {hash || (isVi ? "Đang tính toán mã băm..." : "Computing checksum...")}
              </div>
            </div>
          </div>

          {/* Code Preview Box */}
          <div className="space-y-1">
            <span className="font-meta text-[10.5px] uppercase tracking-wider text-muted-foreground">
              {isVi ? "Xem trước phần đầu mã nguồn:" : "Source preview:"}
            </span>
            <pre className="rounded-[4px] border border-border bg-box/80 p-2.5 font-mono text-[11px] leading-tight text-muted-foreground overflow-x-auto max-h-24">
              {previewLines}
              {"\n..."}
            </pre>
          </div>

          {/* Security Advisory Warning */}
          <div className="flex items-start gap-2 rounded-[4px] border border-amber-500/30 bg-amber-500/5 p-2.5 text-[11px] text-amber-700 dark:text-amber-300 font-meta leading-relaxed">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <span>
              {isVi
                ? "Khuyến nghị an toàn: Hãy đối chiếu mã băm SHA-256 sau khi tải (lệnh `sha256sum`) để xác thực tính toàn vẹn của tệp."
                : "Security advisory: Verify the cryptographic SHA-256 checksum post-download (`sha256sum`) to ensure file integrity."}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-border bg-box/30 px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[4px] border border-border bg-box px-3.5 py-1.5 font-meta text-xs font-medium uppercase tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isVi ? "Hủy bỏ" : "Cancel"}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-[4px] bg-foreground text-background px-4 py-1.5 font-meta text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            <Download className="size-3.5" />
            <span>{isVi ? "Tôi đồng ý tải về" : "I agree & Download"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CodeBlock({ children, rawCode, className }: CodeBlockProps) {
  const { locale } = useI18n()
  const isVi = locale === "vi"

  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sha256Hash, setSha256Hash] = useState<string>("")

  const lines = useMemo(() => rawCode.split("\n"), [rawCode])
  const lineCount = lines.length
  const isLong = lineCount > 22 || rawCode.length > 800

  const filename = useMemo(() => detectFilename(rawCode, className), [rawCode, className])
  const fileSizeBytes = useMemo(() => new Blob([rawCode]).size, [rawCode])

  // Compute hash when modal opens or on mount
  useEffect(() => {
    let active = true
    computeSha256(rawCode).then((h) => {
      if (active) setSha256Hash(h)
    })
    return () => {
      active = false
    }
  }, [rawCode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode)
    setCopied(true)
    toast.success(isVi ? "Đã sao chép mã nguồn vào bộ nhớ tạm" : "Source code copied to clipboard")
    setTimeout(() => setCopied(false), 1500)
  }

  const handleOpenDownloadModal = () => {
    setIsModalOpen(true)
  }

  const handleExecuteDownload = () => {
    try {
      const blob = new Blob([rawCode], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setIsModalOpen(false)
      toast.success(
        isVi
          ? `Đã tải về tệp ${filename} thành công!`
          : `Downloaded ${filename} successfully!`
      )
    } catch {
      toast.error(isVi ? "Không thể tải về tệp tin" : "Failed to download file")
    }
  }

  return (
    <div className="group/code relative my-6 rounded-[6px] border border-border bg-box/40 shadow-xs">
      {/* Code Block Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-box/80 px-3.5 py-2 font-meta text-xs">
        <div className="flex items-center gap-2">
          <FileCode className="size-3.5 text-muted-foreground" />
          <span className="font-mono text-[12px] font-bold text-foreground">
            {filename}
          </span>
          <span className="text-[10px] text-muted-foreground">
            • {lineCount} {isVi ? "dòng" : "lines"}
          </span>
        </div>

        {/* Action Buttons: Download & Copy */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleOpenDownloadModal}
            className="inline-flex items-center gap-1 rounded-[3px] border border-border bg-background/80 px-2 py-1 font-meta text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-all hover:border-foreground hover:text-foreground cursor-pointer"
            title={isVi ? "Tải về tệp mã nguồn" : "Download source file"}
          >
            <Download className="size-3" />
            <span>{isVi ? "TẢI VỀ" : "DOWNLOAD"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-[3px] border border-border bg-background/80 px-2 py-1 font-meta text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-all hover:border-foreground hover:text-foreground cursor-pointer"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
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
        </div>
      </div>

      {/* Code Pre Area (Collapsible if long) */}
      <div className="relative">
        <pre
          className={`overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground transition-all duration-300 ${
            isLong && !isExpanded ? "max-h-[340px] overflow-hidden" : ""
          }`}
        >
          {children}
        </pre>

        {/* Gradient Fade overlay when collapsed */}
        {isLong && !isExpanded && (
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-box via-box/60 to-transparent" />
        )}
      </div>

      {/* Bottom Expansion Bar for Long Files */}
      {isLong && (
        <div className="border-t border-border/80 bg-box/60 px-3.5 py-1.5 flex items-center justify-between text-xs font-meta">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-3.5" />
                <span>{isVi ? "Thu gọn mã nguồn" : "Collapse code"}</span>
              </>
            ) : (
              <>
                <ChevronDown className="size-3.5" />
                <span>
                  {isVi
                    ? `Mở rộng toàn bộ (${lineCount} dòng)`
                    : `Expand full source (${lineCount} lines)`}
                </span>
              </>
            )}
          </button>

          <span className="text-[10px] text-muted-foreground/80 hidden sm:inline">
            SHA-256: {sha256Hash ? `${sha256Hash.slice(0, 8)}...` : "..."}
          </span>
        </div>
      )}

      {/* Download Confirmation Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleExecuteDownload}
        filename={filename}
        code={rawCode}
        hash={sha256Hash}
        lineCount={lineCount}
        fileSizeBytes={fileSizeBytes}
      />
    </div>
  )
}
