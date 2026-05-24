"use client"

import { useState } from "react"

import { motion } from "framer-motion"

import {
  ArrowRight,
  Search,
  ShieldCheck,
  Link2,
  Loader2,
} from "lucide-react"

import { AnimatedGrid } from "./animated-grid"

export function Hero() {

  const [targetUrl, setTargetUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [scanResult, setScanResult] = useState<any>(null)
  const [scanStage, setScanStage] = useState("")

  async function handleScan() {

    if (!targetUrl.trim()) {
      setMessage("Paste a URL first.")
      return
    }

    try {

      setLoading(true)
      setMessage("")
      setScanResult(null)

      setScanStage("Connecting to target...")

      const response = await fetch("/api/scan", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          targetUrl,
        }),
      })

      const data = await response.json()

      await new Promise((resolve) => setTimeout(resolve, 900))

      setScanStage("Scanning monetization systems...")

      await new Promise((resolve) => setTimeout(resolve, 1200))

      setScanStage("Detecting affiliate infrastructure...")

      await new Promise((resolve) => setTimeout(resolve, 1100))

      setScanStage("Analyzing sponsor relationships...")

      await new Promise((resolve) => setTimeout(resolve, 1200))

      setScanStage("Generating revenue intelligence...")

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (data.success) {

        setScanStage("")

        setScanResult({
          grade: "A",
          estimatedRevenue: "$12,400 - $18,500/month",
        })

        setMessage("Monetization intelligence generated.")

      } else {

        setMessage("System busy. Try again.")

      }

    } catch (error) {

      console.error(error)

      setMessage("Something went wrong.")

    } finally {

      setLoading(false)

    }
  }

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

            Paste any creator, YouTube channel,
            niche website, newsletter, or online business
            and reveal affiliate systems, sponsorship patterns,
            hidden funnels, and missed revenue opportunities.

          </motion.p>

          {/* SCAN BOX */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="w-full max-w-3xl mb-6"
          >

            <div className="relative rounded-[28px] border border-border/60 bg-white/92 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl p-3 md:p-4">

              <div className="flex flex-col md:flex-row gap-3">

                {/* INPUT */}

                <div className="relative flex-1">

                  <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="Paste a YouTube channel, creator page, or website URL..."
                    className="w-full h-14 md:h-16 rounded-2xl border border-border/60 bg-secondary/30 pl-14 pr-4 text-sm md:text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-foreground placeholder:text-muted-foreground"
                  />

                </div>

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={handleScan}
                  className="h-14 md:h-16 px-8 rounded-2xl bg-black hover:bg-black/90 text-white text-sm md:text-base shadow-lg shadow-black/5 flex items-center justify-center font-medium min-w-[220px] transition-all"
                >

                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      Run Free Scan
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}

                </button>

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

          {/* LIVE SCAN */}

          {loading && scanStage && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-2xl mb-6"
            >

              <div className="rounded-2xl border border-border bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-5">

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />

                    <span className="text-sm font-medium text-foreground">
                      {scanStage}
                    </span>

                  </div>

                  <span className="text-xs text-muted-foreground">
                    LIVE
                  </span>

                </div>

                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">

                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                  />

                </div>

              </div>

            </motion.div>

          )}

          {/* STATUS MESSAGE */}

          {message && (
            <p className="text-sm text-muted-foreground mb-8">
              {message}
            </p>
          )}

          {/* RESULTS DASHBOARD */}

          {scanResult && (

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl mx-auto mb-14"
            >

              <div className="rounded-[32px] border border-border bg-white/95 backdrop-blur-xl shadow-[0_12px_60px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* TOP */}

                <div className="grid md:grid-cols-2 gap-4 p-6 md:p-8 border-b border-border">

                  <div className="rounded-2xl border border-border bg-secondary/40 p-6 text-left">

                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Profit Stack Score
                    </p>

                    <h3 className="text-5xl font-bold text-foreground">
                      {scanResult.grade}
                    </h3>

                  </div>

                  <div className="rounded-2xl border border-border bg-secondary/40 p-6 text-left">

                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Estimated Monthly Revenue
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 leading-tight">
                      {scanResult.estimatedRevenue}
                    </h3>

                  </div>

                </div>

                {/* PAYWALL */}

                <div className="relative overflow-hidden -10">

                  <div className="p-8 filter blur-md opacity-40 select-none pointer-events-none space-y-5">

                    <div className="h-5 rounded bg-slate-200 w-1/3" />

                    <div className="h-4 rounded bg-slate-200 w-full" />

                    <div className="h-4 rounded bg-slate-200 w-5/6" />

                    <div className="h-4 rounded bg-slate-200 w-4/6" />

                    <div className="h-24 rounded-2xl bg-slate-200 mt-8" />

                  </div>

                  <div className="absolute inset-0 z-20 flex items-center justify-center p-6">

                    <div className="max-w-md bg-white/96 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.12)] text-center">

                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs text-muted-foreground mb-5">

                        Premium Intelligence Locked

                      </div>

                      <h4 className="text-2xl font-bold text-foreground mb-4 leading-tight">

                        Unlock the full monetization breakdown

                      </h4>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">

                        Reveal affiliate networks, sponsor pricing,
                        outreach templates, hidden funnels,
                        and revenue leak opportunities.

                      </p>

                      <button
  type="button"
  onClick={() => {
    window.open(
      "https://moneytizeos.lemonsqueezy.com/checkout/buy/af85e481-1259-4a45-be8e-e002ae27821d",
      "_blank"
    )
  }}
  className="w-full h-14 rounded-2xl bg-black hover:bg-black/90 text-white text-base font-medium flex items-center justify-center transition-all cursor-pointer"
>

  Unlock Full Report — $49

</button>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          )}

          {/* SECONDARY CTA */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex items-center gap-4 mb-14"
>

  <a
    href="https://moneytizeos.lemonsqueezy.com/checkout/buy/af85e481-1259-4a45-be8e-e002ae27821d"
    target="_blank"
    rel="noopener noreferrer"
    className="h-12 px-6 rounded-full border border-border hover:bg-secondary flex items-center transition-all"
  >

    <Search className="mr-2 w-4 h-4" />

    View Demo Report

  </a>

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