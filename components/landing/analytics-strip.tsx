"use client"

import { motion, useAnimationFrame } from "framer-motion"
import { useState } from "react"

const metrics = [
  { label: "Creator Reports Generated", value: "18.4K", suffix: "+" },
  { label: "Affiliate Links Detected", value: "247K", suffix: "" },
  { label: "Sponsor Mentions Tracked", value: "94K", suffix: "" },
  { label: "Hidden Revenue Signals", value: "1.8M", suffix: "" },
  { label: "Average Scan Time", value: "12", suffix: "s" },
  { label: "Creator Niches Indexed", value: "380", suffix: "+" },
  { label: "Detected Money Paths", value: "42K", suffix: "" },
  { label: "Missed Revenue Opportunities", value: "$28M", suffix: "+" },
]

export function AnalyticsStrip() {
  const [position, setPosition] = useState(0)

  useAnimationFrame(() => {
    setPosition((prev) => {
      const next = prev - 0.018
      return next <= -50 ? 0 : next
    })
  })

  const doubledMetrics = [...metrics, ...metrics]

  return (
    <section className="relative py-7 overflow-hidden border-y border-border/60 bg-secondary/40 backdrop-blur-sm">

      {/* EDGE FADES */}

      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* CONTENT */}

      <div
        className="flex items-center transform-gpu"
        style={{
          transform: `translateX(${position}%)`,
          willChange: "transform",
        }}
      >

        {doubledMetrics.map((metric, i) => (

          <div
            key={`${metric.label}-${i}`}
            className="flex items-center gap-7 px-7 shrink-0"
          >

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >

              <span className="text-xl md:text-2xl font-bold text-foreground whitespace-nowrap tracking-tight">
                {metric.value}
                {metric.suffix}
              </span>

              <span className="text-[11px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap mt-1">
                {metric.label}
              </span>

            </motion.div>

            <div className="w-px h-8 bg-border/70" />

          </div>

        ))}

      </div>

    </section>
  )
}