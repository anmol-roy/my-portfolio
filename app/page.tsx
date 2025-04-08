import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Footer from "@/components/footer"
import ClientOnlyBackground from "@/components/ui/client-only-background"

import { Metadata } from "next"
export default function Home() {
  return (
    <main className="min-h-screen">
      <ClientOnlyBackground />
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </main>
  )
}
