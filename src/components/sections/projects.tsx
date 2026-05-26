import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "linux-kernel-hacks",
    desc: "Một số kernel module và patch tự viết cho vui.",
    tags: ["C", "Linux Kernel", "Modules"],
    href: "https://github.com/webngoc04",
  },
  {
    title: "dotfiles",
    desc: "Dotfiles cho Arch Linux với i3wm, rice cực cute.",
    tags: ["Bash", "i3", "Neovim"],
    href: "https://github.com/webngoc04",
  },
  {
    title: "KeiChan Blog",
    desc: "Blog cá nhân viết về Linux, code, và cuộc sống.",
    tags: ["Next.js", "MDX", "Tailwind"],
    href: "https://github.com/webngoc04",
  },
  {
    title: "shiraori-bot",
    desc: "Discord bot nhỏ nhắn, code bằng Rust.",
    tags: ["Rust", "Discord API", "Serenity"],
    href: "https://github.com/webngoc04",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-3xl font-bold">
          Projects <span className="text-primary">✨</span>
        </h2>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-pink-300 to-rose-400" />
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-pink-200 text-xs text-pink-600 dark:border-pink-800 dark:text-pink-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
