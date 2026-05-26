import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Languages",
    skills: ["C", "Rust", "TypeScript", "Python", "Bash"],
  },
  {
    title: "Linux & Kernel",
    skills: ["Kernel Modules", "System Programming", "Arch Linux", "Gentoo", "Networking"],
  },
  {
    title: "Web Dev",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "GitHub Actions", "Nginx", "Neovim"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="bg-muted/30 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-3xl font-bold">
          Skills <span className="text-primary">💻</span>
        </h2>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-3 font-semibold text-foreground">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-pink-100/50 text-pink-700 hover:bg-pink-200/50 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
