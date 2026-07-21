"use client"

import { useState, useEffect, useRef } from "react"

const codeLines = [
  "// Rust Kernel Module - compiled on Linux 🐧",
  "use kernel::prelude::*;",
  "",
  "module! {",
  "    type: KeiChanDriver,",
  "    name: \"keichan_driver\",",
  "    author: \"KeiChan\",",
  "    description: \"AI-powered Rust kernel driver\",",
  "    license: \"GPL\",",
  "}",
  "",
  "struct KeiChanDriver;",
  "",
  "impl KernelModule for KeiChanDriver {",
  "    fn init(_module: &'static ThisModule) -> Result<Self> {",
  "        pr_info!(\"Hello! KeiChan's kernel module initialized successfully\\n\");",
  "        Ok(Self)",
  "    }",
  "}",
]

export default function AITerminal() {
  const [promptText, setPromptText] = useState("")
  const [step, setStep] = useState(0) // 0: prompt, 1: initializing, 2: typing code, 3: completed
  const [outputLines, setOutputLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentLineText, setCurrentLineText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [outputLines, currentLineText, promptText])

  // 1. Simulate prompt typing
  useEffect(() => {
    if (step === 0) {
      const targetPrompt = "keichan-ai --ask 'Write a Linux kernel module in Rust'"
      if (promptText.length < targetPrompt.length) {
        const timer = setTimeout(() => {
          setPromptText(targetPrompt.slice(0, promptText.length + 1))
        }, 55)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setStep(1), 800)
        return () => clearTimeout(timer)
      }
    }
  }, [promptText, step])

  // 2. Simulate AI thinking / initialization logs
  useEffect(() => {
    if (step === 1) {
      const logs = [
        "[ai] Connecting to keichan.ai inference engine...",
        "[ai] Request received. Analyzing system target: Linux x86_64",
        "[ai] Initializing compiler toolchain and target kernel crates...",
        "[ai] File generated: src/keichan_driver.rs. Commencing code output:"
      ]
      
      let currentLogIdx = 0
      const logTimer = setInterval(() => {
        if (currentLogIdx < logs.length) {
          setOutputLines((prev) => [...prev, logs[currentLogIdx]])
          currentLogIdx++
        } else {
          clearInterval(logTimer)
          setStep(2)
        }
      }, 700)
      
      return () => clearInterval(logTimer)
    }
  }, [step])

  // 3. Simulate code lines typing
  useEffect(() => {
    if (step === 2) {
      if (currentLineIndex < codeLines.length) {
        const targetLine = codeLines[currentLineIndex]
        if (currentLineText.length < targetLine.length) {
          const timer = setTimeout(() => {
            setCurrentLineText(targetLine.slice(0, currentLineText.length + 1))
          }, 12)
          return () => clearTimeout(timer)
        } else {
          setOutputLines((prev) => [...prev, targetLine])
          setCurrentLineText("")
          setCurrentLineIndex((prev) => prev + 1)
        }
      } else {
        setStep(3)
      }
    }
  }, [step, currentLineIndex, currentLineText])

  // 4. Final compiler logs
  useEffect(() => {
    if (step === 3) {
      const finalLogs = [
        "",
        "[system] cargo build --target x86_64-unknown-none",
        "[system] Compiling keichan_driver v0.1.0...",
        "[system] Finished release [optimized] target(s) in 0.84s",
        "[system] insmod keichan_driver.ko",
        "[system] Success! Module loaded into kernel space. 🐧✨"
      ]
      
      let idx = 0
      const timer = setInterval(() => {
        if (idx < finalLogs.length) {
          setOutputLines((prev) => [...prev, finalLogs[idx]])
          idx++
        } else {
          clearInterval(timer)
        }
      }, 500)
      
      return () => clearInterval(timer)
    }
  }, [step])

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#07070a]/90 font-mono text-[11px] sm:text-xs text-slate-300 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#030305]">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f56]/80" />
          <span className="size-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="size-3 rounded-full bg-[#27c93f]/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-medium select-none">keichan-ai-console.rs</span>
        <div className="w-10" />
      </div>

      {/* Terminal View */}
      <div 
        ref={containerRef}
        className="p-5 space-y-2 h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <div className="flex items-center gap-2 text-pink-400 font-semibold">
          <span className="text-purple-500 font-bold">$</span>
          <span>{promptText}</span>
          {step === 0 && <span className="inline-block w-1.5 h-4 bg-pink-400 animate-pulse" />}
        </div>

        {step > 0 && (
          <div className="space-y-1.5">
            {outputLines.map((line, idx) => {
              if (line.startsWith("[system]")) {
                if (line.includes("Success!")) {
                  return <div key={idx} className="text-emerald-400 font-semibold">{line}</div>
                }
                return <div key={idx} className="text-slate-400">{line}</div>
              }
              if (line.startsWith("[ai]")) {
                return <div key={idx} className="text-cyan-400/90 font-semibold">{line}</div>
              }
              return (
                <div key={idx} className="whitespace-pre min-h-[16px] text-slate-300">
                  {line}
                </div>
              )
            })}

            {step === 2 && (
              <div className="whitespace-pre text-slate-100 min-h-[16px]">
                {currentLineText}
                <span className="inline-block w-1.5 h-4 bg-cyan-400 animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
