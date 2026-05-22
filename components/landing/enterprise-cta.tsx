"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EnterpriseCTA() {
  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      id="enterprise"
    >

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden transform-gpu">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/5 rounded-full blur-[110px]" />

      </div>

      <div className="relative max-w-[1380px] mx-auto px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-border/60 bg-white/92 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 lg:p-16"
        >

          {/* TOP LABEL */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-center mb-6"
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/60 text-xs uppercase tracking-[0.22em] text-muted-foreground">

              <ShieldCheck className="w-3.5 h-3.5" />

              Live Financial Intelligence

            </div>

          </motion.div>

          {/* TITLE */}

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1] text-foreground mb-6"
          >

            Discover how creators
            <br />
            and online businesses
            <br />
            <span className="text-gradient">
              actually make money.
            </span>

          </motion.h2>

          {/* SUBTEXT */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
          >

            Scan creators, websites, YouTube channels, and online brands
            to reveal affiliate systems, sponsorship patterns, hidden
            monetization funnels, and missed revenue opportunities.

          </motion.p>

          {/* CTA */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >

            <Button
              size="lg"
              className="bg-foreground text-white hover:bg-foreground/90 h-14 px-8 text-base rounded-full shadow-lg shadow-black/5"
            >

              Run Free Scan

              <ArrowRight className="ml-2 w-5 h-5" />

            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base rounded-full border-border hover:bg-secondary"
            >

              <Search className="mr-2 w-4 h-4" />

              View Demo Report

            </Button>

          </motion.div>

          {/* BOTTOM TRUST */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >

            {[
              "Affiliate Intelligence",
              "Sponsor Detection",
              "Revenue Mapping",
              "PDF Report Exports",
            ].map((item) => (

              <span
                key={item}
                className="px-4 py-2 rounded-full bg-secondary/60 border border-border/50 text-sm text-muted-foreground"
              >
                {item}
              </span>

            ))}

          </motion.div>

        </motion.div>

      </div>

    </section>
  )
}