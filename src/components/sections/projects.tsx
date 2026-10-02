"use client"

import { useQuery } from "@tanstack/react-query"
import { useReveal } from "@/hooks/use-reveal"
import { Star, GitFork, ArrowUpRight, FolderGit2 } from "lucide-react"
import { useI18n } from "@/lib/i18n"

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

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "Xmirg-Mod-JIT",
    description: "Modified XMRig version with Custom Rust JIT Integration and low-level optimizations.",
    html_url: "https://github.com/webngoc04/Xmirg-Mod-JIT",
    stargazers_count: 0,
    forks_count: 0,
    language: "C",
    fork: false,
  },
  {
    id: 2,
    name: "webngoc04.github.io",
    description: "Personal developer portfolio, dispatches and financial intelligence system built with Next.js.",
    html_url: "https://github.com/webngoc04/webngoc04.github.io",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    fork: false,
  },
  {
    id: 3,
    name: "Keichan",
    description: "Core personal developer dotfiles, development environment and scripts repository.",
    html_url: "https://github.com/webngoc04/Keichan",
    stargazers_count: 0,
    forks_count: 0,
    language: "Shell",
    fork: false,
  },
  {
    id: 4,
    name: "Moebook_docs",
    description: "Technical documentation, architecture guides and knowledge repository.",
    html_url: "https://github.com/webngoc04/Moebook_docs",
    stargazers_count: 0,
    forks_count: 0,
    language: "Markdown",
    fork: false,
  },
]

export default function Projects() {
  const ref = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  const { data: repos, isLoading, isError } = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    select: (data) =>
      data
        .filter((repo) => !repo.fork && repo.name.toLowerCase() !== "webngoc04")
        .slice(0, 6),
  })

  const displayRepos = isError || !repos ? fallbackRepos : repos

  return (
    <section id="projects" className="relative px-4 sm:px-6 py-20 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <div ref={ref} className="reveal text-center mb-10">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("projects.title") || "Selected Repositories"}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="specimen-card p-6 h-[180px] flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 w-1/3 rounded-[2px] bg-box" />
                  <div className="h-4 w-4/5 rounded-[2px] bg-box" />
                </div>
                <div className="h-3 w-1/4 rounded-[2px] bg-box" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {displayRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="specimen-card group p-6 flex flex-col justify-between min-h-[190px] transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-3 font-meta text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="size-4 text-foreground" />
                      <span className="font-semibold text-foreground tracking-tight">
                        {repo.name}
                      </span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <p className="font-body text-[14px] leading-relaxed text-muted-foreground line-clamp-2">
                    {repo.description || t("projects.noDescription") || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/80 font-meta text-xs text-muted-foreground mt-4">
                  {repo.language ? (
                    <span className="specimen-badge text-[10px]">
                      {repo.language}
                    </span>
                  ) : <span />}

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Star className="size-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="size-3" />
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