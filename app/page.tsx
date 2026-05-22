import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { AnalyticsStrip } from "@/components/landing/analytics-strip"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { InfrastructureViz } from "@/components/landing/infrastructure-viz"
import { AuditWorkflow } from "@/components/landing/audit-workflow"
import { Pricing } from "@/components/landing/pricing"
import { EnterpriseCTA } from "@/components/landing/enterprise-cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background antialiased">

      {/* GLOBAL BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/[0.035] blur-[140px] rounded-full transform-gpu" />

        <div className="absolute top-[1200px] right-[-200px] w-[700px] h-[700px] bg-primary/[0.03] blur-[140px] rounded-full transform-gpu" />

        <div className="absolute bottom-[-200px] left-[-150px] w-[700px] h-[700px] bg-primary/[0.025] blur-[140px] rounded-full transform-gpu" />

      </div>

      {/* PAGE */}

      <div className="relative z-10">

        <div className="transform-gpu">
          <Navbar />
        </div>

        {/* HERO */}

        <section className="relative">

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

          <div className="transform-gpu">
            <Hero />
          </div>

        </section>

        {/* DASHBOARD */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent pointer-events-none z-10" />

          <div className="transform-gpu">
            <DashboardPreview />
          </div>

        </section>

        {/* ANALYTICS */}

        <div className="relative z-20">
          <AnalyticsStrip />
        </div>

        {/* FEATURES */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent pointer-events-none z-10" />

          <FeatureGrid />

        </section>

        {/* INFRASTRUCTURE */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/60 to-transparent pointer-events-none z-10" />

          <div className="transform-gpu">
            <InfrastructureViz />
          </div>

        </section>

        {/* AUDIT */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/60 to-transparent pointer-events-none z-10" />

          <div className="transform-gpu">
            <AuditWorkflow />
          </div>

        </section>

        {/* PRICING */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent pointer-events-none z-10" />

          <Pricing />

        </section>

        {/* CTA */}

        <section className="relative">

          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent pointer-events-none z-10" />

          <EnterpriseCTA />

        </section>

        <Footer />

      </div>

    </main>
  )
}