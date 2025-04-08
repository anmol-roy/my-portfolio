// @ts-nocheck
"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], ["-5deg", "5deg"])

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
    <section id="about" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h2>
            <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* @ts-ignore */}
          <motion.div
            className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-950/10"
            style={{
              y: y,
              opacity: opacity,
              scale: scale,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{
              rotateY: 5,
              z: 20,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <h3 className="mb-6 text-2xl font-semibold text-black-light dark:text-blue-100">
              Who I Am
            </h3>
            <p className="mb-4 text-black-light dark:text-blue-200">
              I'm a passionate full-stack developer with over a years of experience building web applications. I
              specialize in creating beautiful, functional, and user-centered digital experiences.
            </p>
            <p className="text-black-light dark:text-blue-200">
              My approach to design and development is to create products that not only look good but also solve real
              problems for users. I believe in clean code, thoughtful UX, and continuous learning.
            </p>
          </motion.div>

          {/* @ts-ignore */}
          <motion.div
            className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-950/10"
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]),
              opacity: opacity,
              scale: scale,
              rotate: rotate,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{
              rotateY: -5,
              z: 20,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <h3 className="mb-6 text-2xl font-semibold text-black-light dark:text-blue-100">
              Personal Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                {/* @ts-ignore */}
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10"
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <span className="text-sm text-black-light dark:text-blue-300">Birthday</span>
                  <p className="dark:text-blue-100">june 18, 2006</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                {/* @ts-ignore */}
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10"
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <span className="text-sm text-black-light dark:text-blue-300">Location</span>
                  <p className="dark:text-blue-100">Naya Raipur, CG</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                {/* @ts-ignore */}
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10"
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <span className="text-sm text-black-light dark:text-blue-300">Employment</span>
                  <p className="dark:text-blue-100">Available for work</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                {/* @ts-ignore */}
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10"
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <span className="text-sm text-black-light dark:text-blue-300">Degree</span>
                  <p className="dark:text-blue-100">B.Tech. Computer Science</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
