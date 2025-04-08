// @ts-nocheck
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SerpentineWaveBackground() {
  const [phaseShift, setPhaseShift] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    // Mark as hydrated on first render
    setIsHydrated(true);
    
    // Start animation interval after hydration
    const interval = setInterval(() => {
      setPhaseShift(prev => prev + 0.05);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Generate static paths for initial render with TypeScript type annotations
  const generateStaticPath = (baseY: number, amplitude: number, frequency: number, phase: number): string => {
    let path = `M-200,${baseY} `;
    for (let x = -200; x <= 3080; x += 20) {
      const y = baseY + amplitude * Math.sin(frequency * x + phase);
      path += `L${x},${y} `;
    }
    return path;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050329]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050329] to-[#0B0636] opacity-90" />

      <motion.div
        className="absolute left-0 right-0 top-[65%] h-[35%] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          className="absolute h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 2880 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 500 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.003;
            const phase = i * 0.2;
            
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`blue-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#blueGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: i * 0.03 }
                }}
              >
                {isHydrated && (
                  <>
                    <animateMotion
                      dur={`${10 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path="M0,0 Q40,5 80,0 T160,0"
                    />
                    <animate
                      attributeName="d"
                      dur="0.1s"
                      repeatCount="indefinite"
                      values={staticPath}
                    />
                  </>
                )}
              </motion.path>
            );
          })}

          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 550 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.0015;
            const phase = i * 0.2 + Math.PI;
            
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`purple-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#purpleGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.5 + i * 0.03 }
                }}
              >
                {isHydrated && (
                  <>
                    <animateMotion
                      dur={`${12 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path="M0,0 Q40,5 80,0 T160,0"
                    />
                    <animate
                      attributeName="d"
                      dur={`${8 + i * 0.3}s`}
                      repeatCount="indefinite"
                      values={staticPath}
                    />
                  </>
                )}
              </motion.path>
            );
          })}

          {Array.from({ length: 15 }).map((_, i) => {
            const baseY = 600 + i * 4;
            const amplitude = 40 - i * 0.5;
            const frequency = 0.00125;
            const phase = i * 0.15 + Math.PI * 0.5;
            
            const staticPath = generateStaticPath(baseY, amplitude, frequency, phase);

            return (
              <motion.path
                key={`lower-wave-${i}`}
                d={staticPath}
                fill="none"
                stroke={`url(#lowerGradient${i})`}
                strokeWidth="0.7"
                strokeOpacity={0.85 - i * 0.02}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.7 + i * 0.03 }
                }}
              >
                {isHydrated && (
                  <>
                    <animateMotion
                      dur={`${14 + i * 0.4}s`}
                      repeatCount="indefinite"
                      path="M0,0 Q60,6 120,0 T240,0"
                    />
                    <animate
                      attributeName="d"
                      dur={`${9 + i * 0.35}s`}
                      repeatCount="indefinite"
                      values={staticPath}
                    />
                  </>
                )}
              </motion.path>
            );
          })}

          <defs>
            {Array.from({ length: 15 }).map((_, i) => {
              const blueColor = `rgb(${40 + i * 2}, ${10 + i * 0.5}, ${220 - i * 2})`;
              const purpleColor = `rgb(${170 - i * 1}, ${30 + i * 0.8}, ${210 - i * 1})`;

              return (
                <linearGradient
                  key={`blueGradient${i}`}
                  id={`blueGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={blueColor} />
                  <stop offset="100%" stopColor={purpleColor} />
                </linearGradient>
              );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
              const purpleColor = `rgb(${140 + i * 1.5}, ${40 + i * 0.8}, ${200 - i * 1})`;
              const cyanColor = `rgb(${20 + i * 1}, ${150 + i * 1.5}, ${210 - i * 0.5})`;

              return (
                <linearGradient
                  key={`purpleGradient${i}`}
                  id={`purpleGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={purpleColor} />
                  <stop offset="100%" stopColor={cyanColor} />
                </linearGradient>
              );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
              const tealColor = `rgb(${20 + i * 1}, ${140 + i * 1.5}, ${180 - i * 1})`;
              const deepBlueColor = `rgb(${10 + i * 0.5}, ${50 + i * 1}, ${160 - i * 0.8})`;

              return (
                <linearGradient
                  key={`lowerGradient${i}`}
                  id={`lowerGradient${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={tealColor} />
                  <stop offset="100%" stopColor={deepBlueColor} />
                </linearGradient>
              );
            })}
          </defs>
        </svg>
      </motion.div>

      <div className="absolute inset-0">
        {isHydrated && Array.from({ length: 50 }).map((_, i) => {
          // Using deterministic values for the initial render
          const size = ((i % 3) + 1) * 0.5 + 0.5;
          const left = `${(i * 2) % 100}%`;
          const top = `${65 + (i * 0.7) % 35}%`;
          const delay = i % 5;
          const duration = 10 + (i % 10);

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-100"
              style={{
                width: size,
                height: size,
                left,
                top,
                opacity: 0.1 + (i % 4) * 0.1,
              }}
              animate={{
                x: [0, ((i % 6) - 3) * 10, 0],
                y: [0, -((i % 4) + 1) * 10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                x: {
                  duration: duration * 0.7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                y: {
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: duration * 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: delay * 0.5,
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}