// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Wrap Button with motion
const MotionButton = motion(Button);

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (!mounted) return null;

  return (
    <motion.section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 md:py-32"
      style={{ opacity }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
        <motion.div
          className="flex flex-col items-center text-center md:items-start md:text-left"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
              <span className="block">Hi, I&apos;m</span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Anmol roy
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-6 max-w-md text-lg text-blue-100"
            variants={itemVariants}
          >
            A passionate full-stack developer specializing in creating
            beautiful, functional, and user-centered digital experiences.
          </motion.p>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <MotionButton
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => scrollToSection("projects")}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </MotionButton>

            <MotionButton
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
              onClick={() => scrollToSection("contact")}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </MotionButton>
          </motion.div>
        </motion.div>

        <motion.div className="relative" variants={itemVariants}>
          <motion.div
            className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 bg-white/10 shadow-xl backdrop-blur-md md:h-80 md:w-80"
            animate={{
              rotateY: [0, 10, 0, -10, 0],
              rotateX: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Image
              src="/profile.jpg?height=320&width=320"
              alt="Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
              priority
            />{" "}
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-purple-500/20 backdrop-blur-md"
            animate={{
              y: [0, -10, 0, 10, 0],
              x: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-blue-700/20 backdrop-blur-md"
            animate={{
              y: [0, 10, 0, -10, 0],
              x: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={itemVariants}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
