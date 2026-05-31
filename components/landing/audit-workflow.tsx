"use client"  
  
import { useState } from "react"  
import { motion } from "framer-motion"  
import {  
  Search,  
  Link2,  
  BadgeDollarSign,  
  Mail,  
  Lock,  
  ArrowRight,  
  Loader2,  
  CheckCircle2,  
} from "lucide-react"  
  
const scanSteps = [  
  {  
    step: "01",  
    title: "Paste a Creator or Website Link",  
    description: "Drop in a YouTube channel, niche website, newsletter, or creator landing page.",  
    icon: Search,  
    status: "complete",  
  },  
  {  
    step: "02",  
    title: "Moneytize OS Scans the Revenue Signals",  
    description: "We detect affiliate links, sponsors, monetization funnels, and hidden money pathways.",  
    icon: Link2,  
    status: "active",  
  },  
  {  
    step: "03",  
    title: "Estimated Earnings Are Calculated",  
    description: "The system benchmarks likely affiliate income, sponsor rates, and monetization quality.",  
    icon: BadgeDollarSign,  
    status: "pending",  
  },  
  {  
    step: "04",  
    title: "Unlock the Full Intelligence Report",  
    description: "Reveal the hidden monetization systems, outreach templates, and revenue opportunities.",  
    icon: Mail,  
    status: "pending",  
  },  
]  
  
type ScanResult = {  
  grade: string  
  estimatedRevenue: string  
  niche: string  
  affiliateCount: number  
  scannedUrl: string  
  emailSent: boolean  
}  
  
export function AuditWorkflow() {  
  
  const [url, setUrl] = useState("")  
  const [email, setEmail] = useState("")  
  const [loading, setLoading] = useState(false)  
  const [result, setResult] = useState<ScanResult | null>(null)  
  const [error, setError] = useState("")  
  
  async function handleScan() {  
  
    if (!url.trim()) { setError("Please enter a URL to scan."); return }  
    if (!email.trim()) { setError("Please enter your email to receive the report."); return }  
  
    setError("")  
    setLoading(true)  
  
    try {  
      const res = await fetch("/api/scan", {  
        method: "POST",  
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({ targetUrl: url.trim(), email: email.trim() }),  
      })  
  
      const data = await res.json()  
  
      if (data.success) {

  window.location.href =
    `${data.checkoutUrl}` +
    `?checkout[email]=${encodeURIComponent(email.trim())}` +
    `&checkout[custom][target_url]=${encodeURIComponent(url.trim())}` +
    `&checkout[custom][user_email]=${encodeURIComponent(email.trim())}`

  return
} 

else {  
        setError(data.error || "Something went wrong. Please try again.")  
      }  
  
    } catch {  
      setError("Connection failed. Please try again.")  
    } finally {  
      setLoading(false)  
    }  
  }  
  
  return (  
    <section className="relative py-16 lg:py-24 overflow-hidden">  
  
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">  
  
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">  
  
          {/* LEFT */}  
          <motion.div  
            initial={{ opacity: 0, x: -24 }}  
            whileInView={{ opacity: 1, x: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 0.5 }}  
          >  
            <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-medium">  
              Scan Workflow  
            </p>  
  
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-foreground leading-[1]">  
              Scan how online  
              <br />  
              businesses make money.  
            </h2>  
  
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">  
              Moneytize OS reveals affiliate systems, sponsorship patterns,  
              hidden monetization funnels, and missed revenue opportunities  
              across creators, websites, and digital businesses.  
            </p>  
  
            <div className="space-y-4">  
              {scanSteps.map((item, i) => (  
                <motion.div  
                  key={item.step}  
                  initial={{ opacity: 0, x: -18 }}  
                  whileInView={{ opacity: 1, x: 0 }}  
                  viewport={{ once: true }}  
                  transition={{ duration: 0.45, delay: i * 0.08 }}  
                  className={`flex items-start gap-4 p-5 rounded-2xl transition-all border ${  
                    item.status === "active"  
                      ? "bg-white border-primary/20 shadow-[0_4px_20px_rgba(79,70,229,0.08)]"  
                      : item.status === "complete"  
                      ? "bg-secondary/40 border-border/50"  
                      : "bg-background border-border/40 opacity-75"  
                  }`}  
                >  
                  <span className={`text-sm font-mono mt-0.5 ${item.status === "active" ? "text-primary" : "text-muted-foreground"}`}>  
                    {item.step}  
                  </span>  
                  <div className="flex-1">  
                    <h4 className="font-semibold text-foreground mb-2 tracking-tight">{item.title}</h4>  
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>  
                  </div>  
                  <item.icon className={`w-5 h-5 mt-1 ${item.status === "active" ? "text-primary" : item.status === "complete" ? "text-emerald-500" : "text-muted-foreground/50"}`} />  
                </motion.div>  
              ))}  
            </div>  
          </motion.div>  
  
          {/* RIGHT */}  
          <motion.div  
            initial={{ opacity: 0, x: 24 }}  
            whileInView={{ opacity: 1, x: 0 }}  
            viewport={{ once: true }}  
            transition={{ duration: 0.5, delay: 0.1 }}  
            className="relative"  
          >  
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/92 shadow-sm">  
  
              {/* TOP BAR */}  
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 bg-secondary/30">  
                <div>  
                  <h3 className="font-semibold text-foreground">Financial Intelligence Preview</h3>  
                  <p className="text-sm text-muted-foreground">  
                    {loading ? "Scanning now..." : result ? "Scan complete" : "Enter URL to begin scan"}  
                  </p>  
                </div>  
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${  
                  result  
                    ? "bg-emerald-500/10 text-emerald-600"  
                    : loading  
                    ? "bg-primary/10 text-primary"  
                    : "bg-secondary text-muted-foreground"  
                }`}>  
                  {result ? "Complete" : loading ? "Scanning" : "Ready"}  
                </span>  
              </div>  
  
              <div className="p-6">  
  
                {!result ? (  
                  <>  
                    {/* FORM */}  
                    <div className="space-y-3 mb-6">  
  
                      <div>  
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">  
                          Website or Creator URL  
                        </label>  
                        <input  
                          type="url"  
                          placeholder="https://example.com"  
                          value={url}  
                          onChange={(e) => setUrl(e.target.value)}  
                          disabled={loading}  
                          className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"  
                        />  
                      </div>  
  
                      <div>  
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">  
                          Email — your report will be sent here  
                        </label>  
                        <input  
                          type="email"  
                          placeholder="you@example.com"  
                          value={email}  
                          onChange={(e) => setEmail(e.target.value)}  
                          disabled={loading}  
                          className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"  
                        />  
                      </div>  
  
                      {error && (  
                        <p className="text-xs text-red-500">{error}</p>  
                      )}  
  
                      <button  
                        onClick={handleScan}  
                        disabled={loading}  
                        className="w-full rounded-full bg-foreground hover:bg-foreground/90 text-white font-medium py-3.5 flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/5 disabled:opacity-60"  
                      >  
                        {loading ? (  
                          <>  
                            <Loader2 className="w-4 h-4 animate-spin" />  
                            Scanning...  
                          </>  
                        ) : (  
                          <>  
                            Run Free Scan  
                            <ArrowRight className="w-4 h-4" />  
                          </>  
                        )}  
                      </button>  
  
                    </div>  
  
                    {/* BLURRED PREVIEW */}  
                    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-white">  
                      <div className="p-6 filter blur-md opacity-30 select-none pointer-events-none space-y-4">  
                        {[  
                          { label: "Recurring Affiliate Programs", value: "12 Detected" },  
                          { label: "Likely Sponsor Deals", value: "$4K - $9K" },  
                          { label: "Revenue Funnel Depth", value: "Advanced" },  
                          { label: "Missed Monetization", value: "$3.2K/mo" },  
                        ].map((item) => (  
                          <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-secondary/40">  
                            <div className="flex items-center gap-3">  
                              <div className="w-2 h-2 rounded-full bg-primary" />  
                              <span className="text-sm text-foreground">{item.label}</span>  
                            </div>  
                            <span className="text-sm font-semibold text-foreground">{item.value}</span>  
                          </div>  
                        ))}  
                      </div>  
                      <div className="absolute inset-0 flex items-center justify-center p-5">  
                        <div className="max-w-md rounded-3xl bg-white/96 backdrop-blur-md border border-border shadow-xl p-7 text-center">  
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">  
                            <Lock className="w-5 h-5 text-primary" />  
                          </div>  
                          <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">  
                            Run a Free Scan First  
                          </h3>  
                          <p className="text-sm text-muted-foreground leading-relaxed">  
                            Enter a URL above to generate your monetization intelligence report.  
                          </p>  
                        </div>  
                      </div>  
                    </div>  
                  </>  
                ) : (  
                  /* RESULTS */  
                  <motion.div  
                    initial={{ opacity: 0, y: 12 }}  
                    animate={{ opacity: 1, y: 0 }}  
                    transition={{ duration: 0.4 }}  
                    className="space-y-4"  
                  >  
                    <div className="grid grid-cols-2 gap-4">  
                      <div className="rounded-2xl bg-secondary/40 border border-border/50 p-5">  
                        <p className="text-sm text-muted-foreground mb-2">Monetization Grade</p>  
                        <p className="text-3xl font-bold text-foreground">Grade {result.grade}</p>  
                      </div>  
                      <div className="rounded-2xl bg-secondary/40 border border-border/50 p-5">  
                        <p className="text-sm text-muted-foreground mb-2">Est. Monthly Revenue</p>  
                        <p className="text-xl font-bold text-emerald-500">{result.estimatedRevenue}</p>  
                      </div>  
                    </div>  
  
                    {[  
                      { label: "Niche Detected", value: result.niche },  
                      { label: "Affiliate Programs Found", value: `${result.affiliateCount} programs` },  
                      { label: "Scanned URL", value: result.scannedUrl },  
                    ].map((item) => (  
                      <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border/50">  
                        <div className="flex items-center gap-3">  
                          <div className="w-2 h-2 rounded-full bg-primary" />  
                          <span className="text-sm text-foreground">{item.label}</span>  
                        </div>  
                        <span className="text-sm font-semibold text-foreground truncate max-w-[140px]">{item.value}</span>  
                      </div>  
                    ))}  
  
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">  
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />  
                      <p className="text-sm text-emerald-700 font-medium">  
                        Full PDF report sent to your email  
                      </p>  
                    </div>  
  
                    <button  
                      onClick={() => { setResult(null); setUrl(""); setEmail("") }}  
                      className="w-full rounded-full border border-border text-foreground font-medium py-3 text-sm hover:bg-secondary/40 transition-all"  
                    >  
                      Scan another URL  
                    </button>  
                  </motion.div>  
                )}  
              </div>  
            </div>  
          </motion.div>  
  
        </div>  
      </div>  
    </section>  
  )  
}