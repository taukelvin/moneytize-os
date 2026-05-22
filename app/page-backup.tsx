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
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <AnalyticsStrip />
      <FeatureGrid />
      <InfrastructureViz />
      <AuditWorkflow />
      <Pricing />
      <EnterpriseCTA />
      <Footer />
    </main>
  )
}
