// @ts-nocheck
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Send, CheckCircle, Clock, DollarSign, Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import WaveBackground from "@/components/wave-background"

export default function HireMePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    projectDetails: "",
    timeline: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add your API key or access key for Web3Forms
      const formDataWithAccessKey = {
        ...formData,
        access_key: "7055e750-ab82-4407-94a5-21f0d2902d42" // Replace with your actual access key
      }
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithAccessKey),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          projectDetails: "",
          timeline: "",
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Form submission error:", result);
        alert("Something went wrong with the form submission. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const services = [
    {
      title: "Web Development",
      description: "Custom websites built with modern technologies like React, Next.js, and more.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces designed with user experience in mind.",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Consultation",
      description: "Expert advice on your existing projects or new ideas.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Maintenance",
      description: "Ongoing support and updates for your digital products.",
      icon: <DollarSign className="h-6 w-6" />,
    },
  ]

  return (
    <div ref={pageRef} className="min-h-screen">
      <WaveBackground />
      <Header />

      <motion.div
        className="pt-24 pb-16 md:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ opacity }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8 flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2 text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold md:text-4xl text-white">Hire Me</h1>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              className="space-y-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ y }}
            >
              <div>
                <h2 className="mb-4 text-2xl font-bold text-white">Let's Work Together</h2>
                <p className="text-blue-100">
                  I'm currently available for freelance work. If you're looking for a developer to bring your ideas to
                  life, I'd love to hear from you.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">Services I Offer</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(120, 87, 255, 0.3)",
                      }}
                    >
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                        <div className="text-blue-300">{service.icon}</div>
                      </div>
                      <h4 className="mb-1 text-lg font-medium text-white">{service.title}</h4>
                      <p className="text-sm text-blue-100">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">My Process</h3>
                <ol className="space-y-4">
                  {["Discovery", "Planning", "Design", "Development", "Testing", "Launch"].map((step, index) => (
                    <motion.li
                      key={step}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {index + 1}
                      </div>
                      <span className="text-white">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-white/20 bg-white/5 p-8 shadow-lg backdrop-blur-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 0 10px rgba(120, 87, 255, 0.2)",
              }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Request a Quote</h2>

              {submitted ? (
                <motion.div
                  className="flex h-96 items-center justify-center rounded-lg bg-blue-500/10 p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/50 text-blue-300">
                      <Send className="h-8 w-8" />
                    </div>
                    <h4 className="mb-2 text-xl font-semibold text-white">Request Sent!</h4>
                    <p className="text-blue-100">
                      Thank you for your interest. I'll review your project details and get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-100">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="text-white placeholder:text-blue-300/50 border-white/20 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-100">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="text-white placeholder:text-blue-300/50 border-white/20 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-blue-100">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="text-white placeholder:text-blue-300/50 border-white/20 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-blue-100">Budget Range</Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full text-white border-white/20 bg-white/10 px-3 py-2 text-sm rounded-md backdrop-blur-sm focus:border-blue-400 focus:ring-1 focus:outline-none placeholder:text-blue-300/50"
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                        <option value="$20,000+">$20,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-blue-100">Timeline</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className="w-full text-white border-white/20 bg-white/10 px-3 py-2 text-sm rounded-md backdrop-blur-sm focus:border-blue-400 focus:ring-1 focus:outline-none placeholder:text-blue-300/50"
                    >
                      <option value="" disabled>Select timeline</option>
                      <option value="Less than 1 month">Less than 1 month</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDetails" className="text-blue-100">Project Details</Label>
                    <Textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Describe your project and requirements"
                      required
                      className="min-h-[150px] text-white placeholder:text-blue-300/50 border-white/20 bg-white/10 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-purple-500/20"
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}