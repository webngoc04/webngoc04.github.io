import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import GitHubDashboard from "@/components/sections/github-dashboard"
import UiSandbox from "@/components/sections/ui-sandbox"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <GitHubDashboard />
        <UiSandbox />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
