"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Link2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedGrid } from "./animated-grid"

export function Hero() {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-20">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden transform-gpu">

        <AnimatedGrid />

        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-primary/5 rounded-full blur-[110px] transform-gpu" />

        <div className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] bg-primary/5 rounded-full blur-[100px] transform-gpu" />

      </div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-10 py-12 lg:py-20">

        <div className="flex flex-col items-center text-center">

          {/* BADGE */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6"
          >

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground shadow-sm">

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

              Live monetization intelligence scanner

            </span>

          </motion.div>

          {/* HEADING */}

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[92px] font-bold tracking-[-0.055em] leading-[0.92] mb-6"
          >

            Discover how much
            <br />
            money creators 
            <br />
            <span className="text-gradient">
            are actually making.
            </span>

          </motion.h1>

          {/* SUBTEXT */}

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed mb-10"
          >

            Paste any creator, YouTube channel, niche website,
            newsletter, or online business and reveal affiliate systems,
            sponsorship patterns, hidden funnels, and missed revenue opportunities.

          </motion.p>

          {/* SCAN BOX */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="w-full max-w-3xl mb-8"
          >

            <div className="relative rounded-[28px] border border-border/60 bg-white/92 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl p-3 md:p-4">

              <div className="flex flex-col md:flex-row gap-3">

                {/* INPUT */}

                <div className="relative flex-1">

                  <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <input
                    type="text"
                    placeholder="Paste a YouTube channel, creator page, or website URL..."
                    className="w-full h-14 md:h-16 rounded-2xl border border-border/60 bg-secondary/30 pl-14 pr-4 text-sm md:text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-foreground placeholder:text-muted-foreground"
                  />

                </div>

                {/* BUTTON */}

                <Button
                  size="lg"
                  className="h-14 md:h-16 px-8 rounded-2xl bg-foreground hover:bg-foreground/90 text-white text-sm md:text-base shadow-lg shadow-black/5"
                >

                  Run Free Scan

                  <ArrowRight className="ml-2 w-5 h-5" />

                </Button>

              </div>

              {/* MICRO TEXT */}

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 text-xs md:text-sm text-muted-foreground">

                <span>
                  YouTube channels
                </span>

                <span className="w-1 h-1 rounded-full bg-border" />

                <span>
                  Websites
                </span>

                <span className="w-1 h-1 rounded-full bg-border" />

                <span>
                  Affiliate funnels
                </span>

                <span className="w-1 h-1 rounded-full bg-border" />

                <span>
                  Sponsor detection
                </span>

              </div>

            </div>

          </motion.div>

          {/* SECONDARY CTA */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-14"
          >

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-full border-border hover:bg-secondary"
            >

              <Search className="mr-2 w-4 h-4" />

              View Demo Report

            </Button>

          </motion.div>

          {/* TRUST */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex flex-col items-center"
          >

            <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.24em] text-muted-foreground">

              <ShieldCheck className="w-4 h-4" />

              Used by creators, operators & growth researchers

            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">

              {[
                "YouTube Operators",
                "Affiliate Marketers",
                "SEO Builders",
                "Newsletter Owners",
                "Growth Agencies",
              ].map((item) => (

                <span
                  key={item}
                  className="text-sm md:text-base font-medium text-muted-foreground/70"
                >
                  {item}
                </span>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

      {/* BOTTOM FADE */}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

    </section>
  )
}