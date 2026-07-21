"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, User, Bot } from "lucide-react"

interface Message {
  sender: "user" | "bot"
  text: string
}

const suggestions = [
  "What are your skills?",
  "How can I contact you?",
  "Tell me about your projects",
  "Are you open to remote work?",
]

const qaDatabase: Record<string, string> = {
  "what are your skills?": "I specialize in Linux Kernel system programming (using C and Rust) and modern Web development (React, Next.js, and TypeScript). I'm also proficient with Docker, Git, Python, and shell scripting.",
  "how can I contact you?": "You can reach me via email at dangnguyenngoc04@gmail.com, find my profile on GitHub (webngoc04), or add me on Discord (keichan04). My GPG key is available in the contact section below!",
  "tell me about your projects": "I'm currently working on Xmirg-Mod-JIT (integrating Rust JIT with XMRig). I also write custom Linux kernel modules and build aesthetic websites like this portfolio.",
  "are you open to remote work?": "Yes! I am remote-ready and looking for global opportunities in systems programming, kernel driver development, or frontend systems engineering.",
  "tell me about yourself": "I'm a developer passionate about bridging high-level web interfaces and low-level kernel space. I love Arch Linux, custom-configuring environments, and writing kernel modules for fun.",
  "who are you?": "I'm KeiChan (webngoc04), a software engineer focusing on Linux system programming and TypeScript web systems.",
}

export default function AIChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! I'm KeiChan's portfolio assistant. Ask me anything about her skills, projects, or contact details!",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }])
    setInput("")
    setIsTyping(true)

    // Find response
    const cleanText = text.trim().toLowerCase().replace(/[?.]/g, "")
    let responseText = "I'm sorry, I don't know the answer to that. Try asking about my skills, projects, contact details, or remote availability!"

    for (const key in qaDatabase) {
      if (cleanText.includes(key) || key.includes(cleanText)) {
        responseText = qaDatabase[key]
        break
      }
    }

    // Simulate thinking delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { sender: "bot", text: responseText }])
    }, 800)
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#07070a]/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden flex flex-col h-[400px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#030305] shrink-0">
        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 font-mono">
            <Sparkles className="size-3.5 text-cyan-400" /> keichan-ai-assistant
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${msg.sender === "user" ? "bg-pink-600/20 text-pink-400" : "bg-cyan-600/20 text-cyan-400"}`}>
              {msg.sender === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
            </div>
            <div
              className={`rounded-2xl px-4 py-2.5 text-xs max-w-[80%] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-pink-600 text-white rounded-tr-none"
                  : "bg-white/5 text-slate-200 rounded-tl-none border border-white/5"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg shrink-0 bg-cyan-600/20 text-cyan-400">
              <Bot className="size-3.5" />
            </div>
            <div className="bg-white/5 border border-white/5 text-slate-300 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex gap-1 items-center">
              <span className="size-1.5 rounded-full bg-cyan-400/70 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-1.5 rounded-full bg-cyan-400/70 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-cyan-400/70 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-[#030305]/40 shrink-0">
        {suggestions.map((sug) => (
          <button
            key={sug}
            onClick={() => handleSend(sug)}
            className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-950/20 hover:text-cyan-400 text-slate-400 transition-all"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend(input)
        }}
        className="p-3 border-t border-white/5 bg-[#030305] flex gap-2 items-center shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:hover:bg-cyan-600 transition-colors"
        >
          <Send className="size-3.5" />
        </button>
      </form>
    </div>
  )
}
