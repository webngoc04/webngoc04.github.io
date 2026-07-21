"use client"

import { useQuery } from "@tanstack/react-query"
import { useReveal } from "@/hooks/use-reveal"
import { Folder, Star, GitFork, ExternalLink } from "lucide-react"

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
}

const fetchRepos = async (): Promise<Repo[]> => {
  const res = await fetch("https://api.github.com/users/webngoc04/repos?sort=updated&per_page=15")
  if (!res.ok) {
    throw new Error("Failed to fetch repositories")
  }
  return res.json()
}

// Fallback static list in case of API rate limits or network issues
const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "Xmirg-Mod-JIT",
    description: "Modified XMRig version with Custom Rust JIT Integration.",
    html_url: "https://github.com/webngoc04/Xmirg-Mod-JIT",
    stargazers_count: 0,
    forks_count: 0,
    language: "C",
    fork: false,
  },
  {
    id: 2,
    name: "webngoc04.github.io",
    description: "My personal developer portfolio built with Next.js, React 19, and Tailwind CSS.",
    html_url: "https://github.com/webngoc04/webngoc04.github.io",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    fork: false,
  },
  {
    id: 3,
    name: "souretmath",
    description: "A mathematical source code project built with simple HTML/JS.",
    html_url: "https://github.com/webngoc04/souretmath",
    stargazers_count: 0,
    forks_count: 0,
    language: "HTML",
    fork: false,
  },
  {
    id: 4,
    name: "phambaolamnhotuigui",
    description: "A low-level C++ practice and optimization repository.",
    html_url: "https://github.com/webngoc04/phambaolamnhotuigui",
    stargazers_count: 0,
    forks_count: 0,
    language: "C++",
    fork: false,
  },
]

export default function Projects() {
  const ref = useReveal<HTMLDivElement>()

  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    select: (data) =>
      data
        .filter((repo) => !repo.fork && repo.name.toLowerCase() !== "webngoc04")
        .slice(0, 6), // Show top 6 original projects
  })

  // Determine what list to render
  const displayRepos = isError || !repos ? fallbackRepos : repos

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-1/2 size-80 rounded-full bg-rose-200/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="reveal text-center">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl text-white">
            Projects <span className="text-gradient">✨</span>
          </h2>
          <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
        </div>

        {isLoading ? (
          // Skeleton Loading
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 h-[170px] flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-5 w-2/5 rounded bg-white/10" />
                  <div className="h-4 w-4/5 rounded bg-white/10" />
                  <div className="h-4 w-3/5 rounded bg-white/10" />
                </div>
                <div className="h-4 w-1/5 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          // Projects Grid
          <div className="grid gap-6 sm:grid-cols-2">
            {displayRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass glass-hover gradient-border rounded-2xl p-6 flex flex-col justify-between h-[180px] text-left hover:scale-[1.01] transition-transform duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Folder className="size-4.5 text-cyan-400" />
                      <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {repo.description || "No description provided for this repository."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5 text-xs text-slate-400">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-400">
                      <span className="size-2 rounded-full bg-cyan-400" />
                      {repo.language}
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="size-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
