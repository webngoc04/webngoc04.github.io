export default function About() {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-3xl font-bold">
          Về tôi <span className="text-primary">🌸</span>
        </h2>
        <div className="mx-auto mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <p className="leading-relaxed text-muted-foreground">
            Một đứa thích mày mò với kernel Linux, viết vài dòng code cho vui,
            và thinh thoảng làm web để gió thổi qua. Không phải pro, chỉ là
            một dev nhỏ bé với đam mê to lớn. Code dạo, học hỏi, và chia sẻ
            những thứ mình biết.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
              Linux
            </span>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              Kernel
            </span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              Web Dev
            </span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              Open Source
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
