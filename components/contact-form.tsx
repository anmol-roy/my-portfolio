"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef as React.RefObject<Element>, { once: false, amount: 0.3 })

  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields")
      return
    }
    
    setIsSubmitting(true)
    setError(null)

    // Form data to be sent
    const formSubmitData = new FormData()
    formSubmitData.append("access_key", "7055e750-ab82-4407-94a5-21f0d2902d42")
    formSubmitData.append("name", formData.name)
    formSubmitData.append("email", formData.email)
    formSubmitData.append("subject", formData.subject)
    formSubmitData.append("message", formData.message)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formSubmitData
      });

      const result = await response.json()
      console.log("Web3Forms Response:", result)

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError(result.message || "Failed to send message. Please try again later.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={formRef}
      className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-950/10"
    >
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          rotateY: 2,
          z: 20,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">Get In Touch</h3>

        {submitted ? (
          <div className="flex h-64 items-center justify-center rounded-lg bg-blue-500/10 p-6 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                  <Send className="h-8 w-8" />
                </div>
                <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">Message Sent!</h4>
                <p className="text-black dark:text-blue-200">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black dark:text-blue-200">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-white text-black dark:bg-blue-950 dark:text-white border border-gray-300 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black dark:text-blue-200">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="bg-white text-black dark:bg-blue-950 dark:text-white border border-gray-300 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-black dark:text-blue-200">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="bg-white text-black dark:bg-blue-950 dark:text-white border border-gray-300 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-black dark:text-blue-200">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
                className="min-h-[120px] bg-white text-black dark:bg-blue-950 dark:text-white border border-gray-300 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Direct button without motion wrapper */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}