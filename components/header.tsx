// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

// Wrap the Button component with motion
const MotionButton = motion(Button)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 50], [0, 1])
  const blur = useTransform(scrollY, [0, 50], [0, 8])
  const pathname = usePathname()

  const isHireMePage = pathname === "/hire-me"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (isHireMePage) {
      window.location.href = `/#${id}`
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="absolute inset-0 bg-[#0a0339]/70" style={{ opacity }} />

      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="relative z-10">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-sm"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0339]">
              <img
                  src="https://anuragsinghbam.com/images/name-logo-white.svg"
                  alt="Logo"
                  className="w-10 h-10 brightness-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] 
               dark:drop-shadow-[0_0_8px_rgba(96,165,250,0.9)]"
                />
              </div>
            </div>
            <span className="ml-3 text-xl font-bold text-white">Anmol Roy</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="relative z-10 hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}

          <div className="ml-4">
            <Link href="/hire-me">
              <MotionButton
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(120, 87, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </MotionButton>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="rounded-full bg-white/10 p-2 backdrop-blur-md hover:bg-white/20 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute left-0 top-full z-20 w-full bg-[#0a0339]/90 shadow-lg backdrop-blur-md md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="rounded-lg px-4 py-3 text-left text-white hover:bg-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                  className="pt-2"
                >
                  <Link href="/hire-me" className="block w-full">
                    <MotionButton
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(120, 87, 255, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Hire Me
                    </MotionButton>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
