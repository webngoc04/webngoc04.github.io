// scripts/generate-checksums.mjs
// Computes immutable cryptographic SHA-256 hashes for all downloadable code blocks at build time
// Prevents dynamic client-side tampering / XSS malicious file distribution

import fs from "fs"
import path from "path"
import crypto from "crypto"

const blogDir = path.join(process.cwd(), "src/content/blog")
const outputFile = path.join(process.cwd(), "src/lib/checksums.json")

function detectFilename(code, language) {
  const sample = code.slice(0, 600)
  const lines = sample.split("\n")

  // Check first few lines for explicitly declared filename
  for (const line of lines.slice(0, 6)) {
    const trimmed = line.trim()
    const match = trimmed.match(
      /(?:#|\/\/|\/\*|<!--|;\s*)\s*(?:filename:\s*|file:\s*)?([a-zA-Z0-9_\-.]+\.(?:py|sh|ps1|c|h|cpp|rs|js|ts|tsx|json|toml|yaml|yml|md|txt|bash|sql))/i
    )
    if (match && match[1]) {
      return match[1]
    }
  }

  // Common script identification by content
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
  if (sample.includes("qemu-system-x86_64") || sample.includes("make CC=clang")) {
    return "kernel_build.sh"
  }

  const cleanLang = (language || "").toLowerCase().replace(/^language-/, "")
  const langMap = {
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

function computeSha256(str) {
  return crypto.createHash("sha256").update(str, "utf8").digest("hex")
}

function run() {
  console.log("[*] Generating Immutable Build-Time Cryptographic SHA-256 Checksums...")

  if (!fs.existsSync(blogDir)) {
    console.warn(`[!] Blog directory not found at: ${blogDir}`)
    return
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))
  const codeFenceRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g

  const hashes = {}
  let totalBlocks = 0

  for (const file of files) {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, "utf8")
    let match

    while ((match = codeFenceRegex.exec(content)) !== null) {
      const lang = match[1] || ""
      const rawCode = match[2]
      const trimmedCode = rawCode.trim()
      const lines = trimmedCode.split("\n")

      // Only index meaningful code blocks (>= 2 lines)
      if (lines.length >= 2) {
        totalBlocks++
        const filename = detectFilename(trimmedCode, lang)
        
        // Compute SHA-256 on normalized LF string
        const normalizedCode = trimmedCode.replace(/\r\n/g, "\n")
        const hash = computeSha256(normalizedCode)
        const rawHash = computeSha256(rawCode)

        const entry = {
          filename,
          lang,
          sha256: hash,
          lines: lines.length,
          sizeBytes: Buffer.byteLength(normalizedCode, "utf8"),
          sourceFile: file,
          verifiedAtBuild: true,
        }

        hashes[hash] = entry
        if (rawHash !== hash) {
          hashes[rawHash] = entry
        }
      }
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    builder: "KeiChan Automated Security Seal (Pre-Build)",
    securityPolicy: "IMMUTABLE_BUILD_SEAL_V1",
    totalFilesIndexed: files.length,
    totalCodeBlocksIndexed: totalBlocks,
    hashes,
  }

  const outDir = path.dirname(outputFile)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), "utf8")
  console.log(`[+] Successfully sealed ${Object.keys(hashes).length} SHA-256 checksums into: ${outputFile}`)
}

run()
