export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-4 pt-16"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="size-32 animate-pulse rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 p-1 shadow-lg shadow-pink-200/50">
            <div className="flex size-full items-center justify-center rounded-full bg-background text-4xl">
              🩷
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              KeiChan
            </span>
          </h1>
          <p className="mt-3 max-w-md text-lg text-muted-foreground">
            chỉ là dev thích vọc kernel Linux và làm web thoi
          </p>
        </div>
        <div className="flex gap-3">
          <a href="#projects">
            <button className="cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">
              Xem projects
            </button>
          </a>
          <a href="#contact">
            <button className="cursor-pointer rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground">
              Liên hệ
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
