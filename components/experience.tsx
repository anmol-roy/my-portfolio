// @ts-nocheck
"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar } from "lucide-react"

interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    position: "Senior Frontend Developer",
    duration: "Jan 2022 - Present",
    description: [
      "Led the development of a new customer-facing web application using React and TypeScript",
      "Improved site performance by 40% through code optimization and implementing lazy loading",
      "Mentored junior developers and conducted code reviews to ensure quality standards",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    company: "Digital Solutions Ltd.",
    position: "Full Stack Developer",
    duration: "Mar 2019 - Dec 2021",
    description: [
      "Developed and maintained multiple web applications using modern JavaScript frameworks",
      "Implemented RESTful APIs and integrated third-party services",
      "Collaborated with design team to create responsive and accessible user interfaces",
    ],
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Vue.js"],
  },
  {
    id: 3,
    company: "WebCraft Studios",
    position: "Junior Web Developer",
    duration: "Jun 2017 - Feb 2019",
    description: [
      "Built responsive websites for clients across various industries",
      "Assisted in the development of e-commerce platforms using WordPress and WooCommerce",
      "Participated in daily stand-ups and sprint planning meetings",
    ],
    technologies: ["HTML/CSS", "JavaScript", "WordPress", "PHP", "MySQL"],
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* @ts-ignore */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-black-light dark:text-blue-100">Work Experience</h2>
          <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto mt-4 max-w-2xl text-black-light dark:text-blue-200">
            My professional journey and the companies I've had the pleasure to work with.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          {/* Timeline line */}
          {/* @ts-ignore */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 ml-6 w-0.5 bg-blue-200 dark:bg-blue-900 md:left-1/2 md:-ml-0.5"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />

          {/* @ts-ignore */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  experience: Experience
  index: number
}

function TimelineItem({ experience, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: false, amount: 0.5 })

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, 0])

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  }

  return (
    /* @ts-ignore */
    <motion.div ref={itemRef} className="relative mb-12 md:mb-16" variants={itemVariants} style={{ scale, opacity, x }}>
      <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
        {/* Timeline dot */}
        {/* @ts-ignore */}
        <motion.div
          className="absolute left-0 ml-4 h-8 w-8 rounded-full border-4 border-white bg-blue-500 md:left-1/2 md:-ml-4 md:mt-3"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Content */}
        <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
        {/* @ts-ignore */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-950/10"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold text-black-light dark:text-blue-100">{experience.position}</h3>
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <Calendar className="mr-1 h-4 w-4" />
                {experience.duration}
              </div>
            </div>

            <div className="mb-4 flex items-center text-lg font-medium text-blue-600 dark:text-blue-300">
              <Briefcase className="mr-2 h-5 w-5" />
              {experience.company}
            </div>

            <ul className="mb-4 space-y-2 text-black-light dark:text-blue-200">
              {experience.description.map((item, i) => (
                /* @ts-ignore */
                <motion.li
                  key={i}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                /* @ts-ignore */
                <motion.span
                  key={tech}
                  className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

