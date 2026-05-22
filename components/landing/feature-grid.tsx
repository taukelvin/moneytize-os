"use client"

import { motion } from "framer-motion"

import {
  Search,
  Link2,
  BadgeDollarSign,
  Mail,
  Radar,
  Eye,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Hidden Affiliate Detection",
    description:
      "Scan websites, creator pages, and YouTube funnels to uncover hidden affiliate systems and recurring commission setups.",
    highlight: "42 affiliate signals found",
  },

  {
    icon: BadgeDollarSign,
    title: "Sponsor Deal Estimates",
    description:
      "Estimate what creators and niche sites likely charge brands based on audience size, niche demand, and monetization patterns.",
    highlight: "$12K+ sponsor estimates",
  },

  {
    icon: Link2,
    title: "Revenue Path Mapping",
    description:
      "Track how traffic flows from content into lead magnets, email funnels, affiliate offers, and digital products.",
    highlight: "Full traffic pathway scans",
  },

  {
    icon: Mail,
    title: "Instant Outreach Templates",
    description:
      "Generate ready-to-use sponsor outreach and partnership email templates based on detected brand relationships.",
    highlight: "Copy-and-paste ready",
  },

  {
    icon: Radar,
    title: "Missed Money Scanner",
    description:
      "Detect where creators and websites are leaking money by missing products, weak funnels, or underused traffic.",
    highlight: "Revenue leak detection",
  },

  {
    icon: Eye,
    title: "Competitor Intelligence",
    description:
      "See how top operators structure monetization across YouTube, SEO, newsletters, affiliate offers, and digital products.",
    highlight: "Live monetization breakdowns",
  },
]

export function FeatureGrid() {
  return (
    <section className="relative py-16 lg:py-24" id="solutions">

      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >

          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-medium">
            Opportunity Intelligence
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-foreground leading-[1]">
            Discover the hidden
            <br />
            money systems online.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Moneytize OS helps creators, niche builders, agencies,
            and online operators uncover how digital businesses actually
            generate revenue behind the scenes.
          </p>

        </motion.div>

        {/* GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((feature, i) => (

            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
              }}
              whileHover={{ y: -3 }}
              className="group relative bg-white/92 rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300"
            >

              {/* ICON */}

              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-all">

                <feature.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-all" />

              </div>

              {/* CONTENT */}

              <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-[15px] mb-6">
                {feature.description}
              </p>

              {/* FOOTER */}

              <div className="flex items-center justify-between pt-2">

                <span className="text-sm font-medium text-primary">
                  {feature.highlight}
                </span>

                <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}