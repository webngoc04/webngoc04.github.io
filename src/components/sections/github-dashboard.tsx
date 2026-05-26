"use client"

import { useQuery } from "@tanstack/react-query"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { useReveal } from "@/hooks/use-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Repo = {
  stargazers_count: number
  language: string | null
  fork: boolean
}

type Event = {
  type: string
}

type DashboardData = {
  stars: number
  commits: number
  repos: number
  languages: Array<{ name: string; value: number }>
}

const COLORS = ["#f43f5e", "#fb7185", "#f472b6", "#e879f9", "#fda4af"]

async function fetchGitHubDashboard(): Promise<DashboardData> {
  const username = "webngoc04"
  const [reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`),
  ])

  if (!reposRes.ok || !eventsRes.ok) {
    throw new Error("Không tải được dữ liệu GitHub")
  }

  const repos = (await reposRes.json()) as Repo[]
  const events = (await eventsRes.json()) as Event[]

  const ownRepos = repos.filter((repo) => !repo.fork)
  const stars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const commits = events.filter((event) => event.type === "PushEvent").length

  const languageMap = new Map<string, number>()
  for (const repo of ownRepos) {
    if (!repo.language) continue
    languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1)
  }

  const languages = Array.from(languageMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return {
    stars,
    commits,
    repos: ownRepos.length,
    languages,
  }
}

export default function GitHubDashboard() {
  const ref = useReveal<HTMLDivElement>()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-dashboard"],
    queryFn: fetchGitHubDashboard,
  })

  return (
    <section id="dashboard" className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/2 size-80 rounded-full bg-pink-200/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div ref={ref} className="reveal">
          <h2 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
            GitHub Dashboard <span className="text-gradient">📊</span>
          </h2>
          <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        </div>

        {isError ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
            GitHub API đang bận, thử reload lại sau nha.
          </div>
        ) : isLoading || !data ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            <MetricCard title="Public Repos" value={data.repos} />
            <MetricCard title="Total Stars" value={data.stars} />
            <MetricCard title="Recent Push Events" value={data.commits} />

            <Card className="glass md:col-span-2">
              <CardHeader>
                <CardTitle>Top Languages</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.languages}>
                    <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                    <YAxis stroke="currentColor" fontSize={12} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#f43f5e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Language Share</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.languages} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                      {data.languages.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5">
          <Skeleton className="mb-3 h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
      <div className="glass rounded-2xl p-5 md:col-span-2">
        <Skeleton className="mb-4 h-4 w-28" />
        <Skeleton className="h-52 w-full" />
      </div>
      <div className="glass rounded-2xl p-5">
        <Skeleton className="mb-4 h-4 w-28" />
        <Skeleton className="h-52 w-full" />
      </div>
    </div>
  )
}
