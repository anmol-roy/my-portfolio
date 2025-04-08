// @ts-nocheck
"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Habit tracker App",
    description: "A collaborative task management application with real-time updates and analysics .",
    image: "/screensort2.png?height=400&width=600",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Finance Dashboard",
    description: "An interactive dashboard for tracking personal finances with data visualization and insights.",
    image: "/screensortfirst.png?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS" ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "A social networking platform with features like posts, comments, likes, and user profiles.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "GraphQL", "Apollo", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-black-light dark:text-blue-100">My Projects</h2>
          <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto mt-4 max-w-2xl text-black-light dark:text-blue-200">
            Here are some of my recent projects. Each project is a unique piece of development.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
          style={{ opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:border-blue-900/30 dark:bg-blue-950/10"
              variants={itemVariants}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                transform: hoveredId === project.id ? "translateY(-10px) rotateX(5deg)" : "translateY(0) rotateX(0)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-black-light dark:text-blue-100">{project.title}</h3>
                <p className="mb-4 text-black-light dark:text-blue-200">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      z: 20,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      z: 20,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

