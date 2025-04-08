// @ts-nocheck
"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import ContactForm from "./contact-form"

const MotionLink = motion(Link)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.2 })

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
    <footer
      id="contact"
      ref={footerRef}
      className="border-t border-white/20 bg-white/5 py-16 backdrop-blur-md dark:border-blue-900/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 grid gap-12 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <h3 className="text-3xl font-bold text-black-light dark:text-blue-100">Anmol Roy</h3>
              <p className="text-black-light dark:text-blue-200">Full-stack Developer</p>
            </div>

            <p className="max-w-md text-black-light dark:text-blue-200">
              I'm available for freelance work. Connect with me via email or social media.
            </p>

            <div className="flex gap-4">
              <MotionLink
                href="https://github.com/anmol-roy"
                target="_blank"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shadow-md transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/20"
              >
                <Github className="h-5 w-5" />
              </MotionLink>

              <MotionLink
                href="#"
                title="no available"
                target="_blank"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shadow-md transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/20"
                >
                <Twitter className="h-5 w-5" />
              </MotionLink>

              <MotionLink
                href="https://www.linkedin.com/in/anmol-kumar-5a66292a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                target="_blank"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shadow-md transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/20"
              >
                <Linkedin className="h-5 w-5" />
              </MotionLink>

              <MotionLink
                href="royanmol112@gmail.com"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shadow-md transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-900/20"
              >
                <Mail className="h-5 w-5" />
              </MotionLink>
            </div>
          </motion.div>

          <ContactForm />
        </motion.div>

        <motion.div
          className="border-t border-white/10 pt-8 text-center dark:border-blue-900/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-black-light dark:text-blue-300">
            &copy; {new Date().getFullYear()} Anmol Roy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
