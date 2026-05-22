"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const nodes = [
  { id: "api", label: "API Gateway", x: 10, y: 50 },
  { id: "auth", label: "Auth Layer", x: 25, y: 25 },
  { id: "meter", label: "Usage Metering", x: 25, y: 75 },
  { id: "ai", label: "AI Engine", x: 50, y: 50 },
  { id: "billing", label: "Billing Core", x: 75, y: 25 },
  { id: "analytics", label: "Analytics", x: 75, y: 75 },
  { id: "revenue", label: "Revenue Stream", x: 90, y: 50 },
]

const connections = [
  { from: "api", to: "auth" },
  { from: "api", to: "meter" },
  { from: "auth", to: "ai" },
  { from: "meter", to: "ai" },
  { from: "ai", to: "billing" },
  { from: "ai", to: "analytics" },
  { from: "billing", to: "revenue" },
  { from: "analytics", to: "revenue" },
]

export function InfrastructureViz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const getNodePosition = (node: typeof nodes[0]) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height,
  })

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">Infrastructure</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Monetization infrastructure<br />
            <span className="text-muted-foreground">that scales with you</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            End-to-end revenue infrastructure from API gateway to payout. 
            Built on the same stack powering the world&apos;s largest AI platforms.
          </p>
        </motion.div>

        {/* Visualization Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div 
            ref={containerRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-white rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {dimensions.width > 0 && connections.map((conn, i) => {
                const fromNode = nodes.find(n => n.id === conn.from)
                const toNode = nodes.find(n => n.id === conn.to)
                if (!fromNode || !toNode) return null
                const from = getNodePosition(fromNode)
                const to = getNodePosition(toNode)
                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  />
                )
              })}
            </svg>

            {/* Animated Data Pulses */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {dimensions.width > 0 && connections.map((conn, i) => {
                const fromNode = nodes.find(n => n.id === conn.from)
                const toNode = nodes.find(n => n.id === conn.to)
                if (!fromNode || !toNode) return null
                const from = getNodePosition(fromNode)
                const to = getNodePosition(toNode)
                return (
                  <motion.circle
                    key={`pulse-${conn.from}-${conn.to}`}
                    r="3"
                    fill="#4F46E5"
                    initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                    animate={{
                      cx: [from.x, to.x],
                      cy: [from.y, to.y],
                      opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                )
              })}
            </svg>

            {/* Nodes */}
            {dimensions.width > 0 && nodes.map((node, i) => {
              const pos = getNodePosition(node)
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pos.x, top: pos.y }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    {/* Node */}
                    <div className="relative bg-white rounded-xl p-3 md:p-4 border border-border shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary mb-2 mx-auto" />
                      <p className="text-xs md:text-sm font-medium text-foreground text-center whitespace-nowrap">
                        {node.label}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Stats Below */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { value: "50M+", label: "Events/second" },
              { value: "<25ms", label: "P99 Latency" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "142", label: "Edge Locations" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
