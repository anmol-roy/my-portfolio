// @ts-nocheck
"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code, Database, Layout, Server, Smartphone, Terminal, Figma } from "lucide-react"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
}

const skills: Skill[] = [
  { name: "HTML/CSS", level: 90, icon: <Layout className="h-6 w-6" /> },
  { name: "JavaScript", level: 80, icon: <Code className="h-6 w-6" /> },
  { name: "React", level: 70, icon: <Code className="h-6 w-6" /> },
  { name: "Node.js", level: 60, icon: <Server className="h-6 w-6" /> },
  { name: "UI/UX Design", level: 70, icon: <Figma className="h-6 w-6" /> },
  { name: "Databases", level: 60, icon: <Database className="h-6 w-6" /> },
  { name: "Mobile Dev", level: 60, icon: <Smartphone className="h-6 w-6" /> },
  { name: "DevOps", level: 50, icon: <Terminal className="h-6 w-6" /> },
]

export default function Skills() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 bg-blue-50/50 dark:bg-black-light/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-black-light dark:text-blue-100">My Skills</h2>
          <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto mt-4 max-w-2xl text-black-light dark:text-blue-200">
            Here are my technical skills and proficiency levels in various technologies and tools.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
          style={{ opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-950/10"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                z: 10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <div className="text-blue-600 dark:text-blue-400">{skill.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-black-light dark:text-blue-100">{skill.name}</h3>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.div>
              </div>
              <div className="mt-2 text-right text-sm font-medium text-black-light dark:text-blue-200">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

