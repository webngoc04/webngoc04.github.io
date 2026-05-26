"use client"

import { useReveal } from "@/hooks/use-reveal"

export default function About() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 size-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl" />
      </div>
      <div
        ref={ref}
        className="reveal mx-auto max-w-2xl"
      >
        <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
          Về <span className="text-gradient">tôi</span>
        </h2>
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
          <p className="leading-relaxed text-muted-foreground">
            Một đứa thích mày mò với kernel Linux, viết vài dòng code cho vui,
            và thinh thoảng làm web để gió thổi qua. Không phải pro, chỉ là
            một dev nhỏ bé với đam mê to lớn. Code dạo, học hỏi, và chia sẻ
            những thứ mình biết.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Linux", "Kernel", "Web Dev", "Open Source", "Rust", "C"].map((tag, i) => (
              <span
                key={tag}
                className="reveal rounded-full bg-gradient-to-r from-pink-100 to-rose-100 px-3.5 py-1.5 text-xs font-medium text-pink-700 shadow-sm transition-all hover:shadow-md dark:from-pink-900/30 dark:to-rose-900/30 dark:text-pink-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
