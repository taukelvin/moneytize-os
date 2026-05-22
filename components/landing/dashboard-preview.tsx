"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

import {
  DollarSign,
  Eye,
  Link2,
  TrendingUp,
  ArrowUpRight,
  Lock,
} from "lucide-react"

const revenueData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 3900 },
  { name: "Mar", value: 5200 },
  { name: "Apr", value: 6800 },
  { name: "May", value: 9400 },
  { name: "Jun", value: 12800 },
]

const sponsorData = [
  { name: "YT", value: 82 },
  { name: "SEO", value: 67 },
  { name: "X", value: 54 },
  { name: "Email", value: 91 },
  { name: "Blog", value: 48 },
]

const stats = [
  {
    label: "Profit Stack Score",
    value: "Grade A",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    label: "Est. Monthly Take-Home",
    value: "$12.4K - $18.5K",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    label: "Affiliate Signals",
    value: "42 Found",
    icon: Link2,
    color: "text-sky-500",
  },
  {
    label: "Sponsor Mentions",
    value: "18 Active",
    icon: Eye,
    color: "text-orange-500",
  },
]

export function DashboardPreview() {
  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      id="platform"
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >

          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-medium">
            Live Opportunity Scanner
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-foreground leading-[1]">
            See how creators
            <br />
            actually make money.
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Moneytize OS scans websites, creators, affiliate systems,
            sponsorship patterns, and monetization pathways to uncover
            hidden online revenue opportunities.
          </p>

        </motion.div>

        {/* MAIN CARD */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          <div className="relative glass-card rounded-2xl overflow-hidden border border-border/60">

            {/* TOP BAR */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-white/40 backdrop-blur-sm">

              <div className="flex items-center gap-3">

                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <span className="text-xs md:text-sm text-muted-foreground font-mono">
                  scan.moneytize-os.ai
                </span>

              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">
                  Live Scan
                </span>
              </div>

            </div>

            {/* CONTENT */}

            <div className="p-5 lg:p-7 bg-gradient-to-b from-white/40 to-transparent">

              {/* STATS */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white/90 rounded-xl p-4 border border-border/60 shadow-sm"
                  >

                    <div className="flex items-center justify-between mb-3">

                      <stat.icon className={`w-5 h-5 ${stat.color}`} />

                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                        <ArrowUpRight className="w-3 h-3" />
                        Live
                      </span>

                    </div>

                    <p className="text-xl lg:text-2xl font-bold text-foreground leading-none">
                      {stat.value}
                    </p>

                    <p className="text-xs text-muted-foreground mt-2">
                      {stat.label}
                    </p>

                  </motion.div>
                ))}

              </div>

              {/* CHARTS */}

              <div className="grid lg:grid-cols-3 gap-5">

                {/* REVENUE */}

                <div className="lg:col-span-2 bg-white/90 rounded-xl p-5 border border-border/60 shadow-sm">

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <h3 className="font-semibold text-foreground">
                        Estimated Revenue Growth
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Detected monetization acceleration
                      </p>
                    </div>

                    <span className="text-sm font-medium text-emerald-500">
                      +182%
                    </span>

                  </div>

                  <div className="h-56">

                    <ResponsiveContainer width="100%" height="100%">

                      <AreaChart data={revenueData}>

                        <defs>
                          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.22} />
                            <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#737373", fontSize: 11 }}
                        />

                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#737373", fontSize: 11 }}
                          tickFormatter={(value) => `$${value / 1000}k`}
                        />

                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#4F46E5"
                          strokeWidth={2.5}
                          fill="url(#growthGradient)"
                        />

                      </AreaChart>

                    </ResponsiveContainer>

                  </div>

                </div>

                {/* SPONSOR GRAPH */}

                <div className="bg-white/90 rounded-xl p-5 border border-border/60 shadow-sm">

                  <div className="mb-5">
                    <h3 className="font-semibold text-foreground">
                      Monetization Signals
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Detected platform intensity
                    </p>
                  </div>

                  <div className="h-56">

                    <ResponsiveContainer width="100%" height="100%">

                      <BarChart data={sponsorData}>

                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#737373", fontSize: 11 }}
                        />

                        <YAxis hide />

                        <Bar
                          dataKey="value"
                          fill="#4F46E5"
                          radius={[5, 5, 0, 0]}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>

              </div>

              {/* BLURRED PAYWALL */}

              <div className="relative mt-6 rounded-2xl overflow-hidden border border-border/60 bg-white/80">

                {/* BLURRED CONTENT */}

                <div className="p-6 filter blur-md opacity-30 select-none pointer-events-none space-y-4">

                  <div className="h-5 bg-slate-200 rounded w-1/3" />

                  <div className="h-4 bg-slate-200 rounded w-full" />

                  <div className="h-4 bg-slate-200 rounded w-5/6" />

                  <div className="h-4 bg-slate-200 rounded w-4/5" />

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="h-28 bg-slate-200 rounded-xl" />

                    <div className="h-28 bg-slate-200 rounded-xl" />

                  </div>

                </div>

                {/* OVERLAY */}

                <div className="absolute inset-0 flex items-center justify-center p-5">

                  <div className="max-w-lg bg-white/95 backdrop-blur-md rounded-2xl border border-border shadow-xl p-7 text-center">

                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Unlock the Full Financial Intelligence Report
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      Reveal the exact affiliate systems, hidden sponsor deals,
                      outreach templates, and revenue gaps behind this business.
                    </p>

                    <button className="w-full rounded-xl bg-foreground hover:bg-foreground/90 text-white font-medium py-3.5 transition shadow-lg shadow-black/5">
                      Unlock Full Report for $49
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}