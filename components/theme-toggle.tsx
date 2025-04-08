"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Always set to dark mode for our wave background
    document.documentElement.classList.add("dark")
    setIsDarkMode(true)
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
    </Button>
  )
}

