"use client"

import { motion } from "framer-motion"

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#fadeMask)"
        />
      </svg>

      {/* Subtle animated horizontal lines */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scaleX: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating subtle dots */}
      <div className="absolute inset-0">
        {[
          { left: 10, top: 20, dur: 6, del: 0 },
          { left: 25, top: 60, dur: 7, del: 1 },
          { left: 40, top: 30, dur: 5, del: 2 },
          { left: 55, top: 70, dur: 8, del: 0.5 },
          { left: 70, top: 25, dur: 6, del: 1.5 },
          { left: 85, top: 55, dur: 7, del: 2.5 },
          { left: 15, top: 80, dur: 5, del: 3 },
          { left: 60, top: 15, dur: 6, del: 1 },
        ].map((p, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.dur,
              delay: p.del,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
