"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Single Report",
    description: "Perfect for one-time competitor research",
    price: "$49",
    period: "/unlock",
    features: [
      "1 fully unlocked report",
      "Affiliate link breakdowns",
      "Sponsor pricing estimates",
      "Outreach email templates",
      "Revenue pathway analysis",
      "Instant PDF export",
    ],
    cta: "Unlock Full Report",
    highlighted: false,
  },

  {
    name: "Pro Growth",
    description: "Built for active creators and operators",
    price: "$79",
    period: "/month",
    features: [
      "50 deep scans per month",
      "Unlimited PDF downloads",
      "Competitor watchlists",
      "Recurring affiliate detection",
      "Missed revenue alerts",
      "Priority scan speed",
      "Advanced monetization insights",
    ],
    cta: "Start Pro Plan",
    highlighted: true,
  },

  {
    name: "Elite Agency",
    description: "For agencies and research teams",
    price: "$249",
    period: "/month",
    features: [
      "Unlimited deep scans",
      "100 tracked competitors",
      "White-label PDF exports",
      "Team access & collaboration",
      "Advanced outreach intelligence",
      "Priority support",
      "Custom report branding",
      "Agency-ready exports",
    ],
    cta: "Start Agency Plan",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section
      className="relative py-16 lg:py-24 bg-secondary/25"
      id="pricing"
    >

      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >

          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-medium">
            Pricing
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-foreground leading-[1]">
            Simple pricing for
            <br />
            serious opportunity hunters.
          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
            Start with a single unlock or scale into full competitor
            intelligence with recurring scans and automated reports.
          </p>

        </motion.div>

        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">

          {plans.map((plan, i) => (

            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
              }}
              className={`relative rounded-3xl p-7 border transition-all ${
                plan.highlighted
                  ? "bg-foreground text-white border-foreground shadow-[0_12px_40px_rgba(0,0,0,0.12)] scale-[1.01]"
                  : "bg-white/92 border-border/60 shadow-sm"
              }`}
            >

              {/* BADGE */}

              {plan.highlighted && (

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-medium shadow-lg">

                  Most Popular

                </div>

              )}

              {/* TITLE */}

              <div className="mb-8">

                <h3
                  className={`text-2xl font-semibold tracking-tight mb-2 ${
                    plan.highlighted
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    plan.highlighted
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

              </div>

              {/* PRICE */}

              <div className="mb-8 flex items-end gap-1">

                <span
                  className={`text-5xl font-bold tracking-tight ${
                    plan.highlighted
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>

                <span
                  className={`mb-1 ${
                    plan.highlighted
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.period}
                </span>

              </div>

              {/* FEATURES */}

              <ul className="space-y-4 mb-8">

                {plan.features.map((feature) => (

                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >

                    <Check
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? "text-emerald-400"
                          : "text-emerald-500"
                      }`}
                    />

                    <span
                      className={`text-sm leading-relaxed ${
                        plan.highlighted
                          ? "text-white/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>

                  </li>

                ))}

              </ul>

              {/* CTA */}

              <Button
                className={`w-full h-12 rounded-full text-sm font-medium ${
                  plan.highlighted
                    ? "bg-white hover:bg-white/90 text-foreground"
                    : "bg-foreground hover:bg-foreground/90 text-white"
                }`}
              >

                {plan.cta}

                <ArrowRight className="ml-2 w-4 h-4" />

              </Button>

            </motion.div>

          ))}

        </div>

        {/* FOOTNOTE */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >

          No long-term contracts. Unlock reports instantly and scale only when needed.

        </motion.p>

      </div>

    </section>
  )
}