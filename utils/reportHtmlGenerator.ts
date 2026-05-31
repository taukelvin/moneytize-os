import { IntelligenceReport } from "./intelligenceEngine"

function generateRevenueStreamsHtml(streams: any[]): string {
  if (!streams?.length) return "<div class='card'><div class='card-body'>No revenue streams detected.</div></div>"
  return streams.map(s => `
    <div class="list-item">
      <div class="list-dot green"></div>
      <div>
        <div class="list-title">${s.name || "Revenue Stream"}</div>
        <div class="list-detail">${s.description || ""}</div>
        <div class="list-badge">${s.estimatedContribution || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateProductsHtml(products: any[]): string {
  if (!products?.length) return "<div class='card'><div class='card-body'>No products detected.</div></div>"
  return products.map(p => `
    <div class="list-item">
      <div class="list-dot blue"></div>
      <div>
        <div class="list-title">${p.name || "Product"}</div>
        <div class="list-detail">Type: ${p.type || "Unknown"}</div>
        <div class="list-badge">${p.pricePoint || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateLeadMagnetsHtml(magnets: any[]): string {
  if (!magnets?.length) return "<div class='card'><div class='card-body'>No lead magnets detected.</div></div>"
  return magnets.map(m => `
    <div class="list-item">
      <div class="list-dot yellow"></div>
      <div>
        <div class="list-title">${m.name || "Lead Magnet"}</div>
        <div class="list-detail">${m.type || ""} — ${m.placement || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateTechStackHtml(stack: any[]): string {
  if (!stack?.length) return "<div class='card'><div class='card-body'>No technology detected.</div></div>"
  const categories = [...new Set(stack.map(t => t.category))]
  return categories.map(cat => `
    <div class="card" style="margin-bottom:16px;">
      <div class="card-title">${cat}</div>
      <div>
        ${stack.filter(t => t.category === cat).map(t => `
          <span class="tag blue">${t.tool}</span>
        `).join("")}
      </div>
      ${stack.filter(t => t.category === cat).map(t => `
        <div style="font-size:13px;color:#64748B;margin-top:8px;">${t.tool}: ${t.purpose}</div>
      `).join("")}
    </div>
  `).join("")
}

function generateStrengthsHtml(items: any[]): string {
  if (!items?.length) return "<div class='card'><div class='card-body'>No strengths detected.</div></div>"
  return items.map(s => `
    <div class="list-item">
      <div class="list-dot green"></div>
      <div>
        <div class="list-title">${s.strength || "Strength"}</div>
        <div class="list-detail">${s.detail || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateWeaknessesHtml(items: any[]): string {
  if (!items?.length) return "<div class='card'><div class='card-body'>No weaknesses detected.</div></div>"
  return items.map(w => `
    <div class="list-item">
      <div class="list-dot red"></div>
      <div>
        <div class="list-title">${w.weakness || "Weakness"}</div>
        <div class="list-detail">${w.detail || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateOpportunitiesHtml(items: any[]): string {
  if (!items?.length) return "<div class='card'><div class='card-body'>No opportunities detected.</div></div>"
  return items.map(o => `
    <div class="list-item">
      <div class="list-dot yellow"></div>
      <div>
        <div class="list-title">${o.opportunity || "Opportunity"}</div>
        <div class="list-detail">${o.detail || ""}</div>
        <div class="list-badge">${o.estimatedValue || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateCopyTacticsHtml(items: any[]): string {
  if (!items?.length) return "<div class='card'><div class='card-body'>No tactics detected.</div></div>"
  return items.map(t => `
    <div class="list-item">
      <div class="list-dot blue"></div>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div class="list-title">${t.tactic || "Tactic"}</div>
          <span class="priority-${(t.priority || "medium").toLowerCase()}">${t.priority || "medium"}</span>
        </div>
        <div class="list-detail">${t.detail || ""}</div>
      </div>
    </div>
  `).join("")
}

function generateActionPlanHtml(weeks: any[]): string {
  if (!weeks?.length) return "<div class='card'><div class='card-body'>No action plan generated.</div></div>"
  return weeks.map(w => `
    <div class="action-week">
      <div class="action-week-header">
        <span class="week-badge">${w.week || "Week"}</span>
        <span class="week-focus">${w.focus || ""}</span>
      </div>
      ${(w.actions || []).map((action: string, i: number) => `
        <div class="action-item">
          <span class="action-number">${i + 1}.</span>
          <span>${action}</span>
        </div>
      `).join("")}
    </div>
  `).join("")
}

function deriveScores(report: IntelligenceReport) {
  const base = parseInt(report.monetizationScore) || 75
  return {
    monetization: Math.min(base + 5, 98),
    leads: Math.min(base - 5, 92),
    products: Math.min((report.detectedProducts?.length || 1) * 15, 95),
    tech: Math.min((report.technologyStack?.length || 1) * 12, 90),
    funnel: Math.min(base - 8, 88),
    affiliate: Math.min(base - 3, 94),
  }
}

export function generateReportHtml(report: IntelligenceReport, template: string): string {
  const reportId = `MOS-${Date.now().toString().slice(-8)}`
  const generatedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const scores = deriveScores(report)

  return template
    .replace(/{{REPORT_ID}}/g, reportId)
    .replace(/{{GENERATED_DATE}}/g, generatedDate)
    .replace(/{{TARGET_URL}}/g, report.targetUrl)
    .replace(/{{EXECUTIVE_SUMMARY}}/g, report.executiveSummary || "")
    .replace(/{{GRADE}}/g, report.grade || "B")
    .replace(/{{MONETIZATION_SCORE}}/g, report.monetizationScore || "75/100")
    .replace(/{{MONTHLY_MAX}}/g, (report.monthlyRevenueMax || 0).toLocaleString())
    .replace(/{{MONTHLY_MIN}}/g, (report.monthlyRevenueMin || 0).toLocaleString())
    .replace(/{{NICHE}}/g, report.niche || "Business")
    .replace(/{{REVENUE_LEAKAGE}}/g, (report.revenueLeakage || 0).toLocaleString())
    .replace(/{{BUSINESS_MODEL}}/g, report.businessModel || "")
    .replace(/{{CONVERSION_ANALYSIS}}/g, report.conversionAnalysis || "")
    .replace(/{{FUNNEL_BREAKDOWN}}/g, report.funnelBreakdown || "")
    .replace(/{{SCORE_MONETIZATION}}/g, scores.monetization.toString())
    .replace(/{{SCORE_LEADS}}/g, scores.leads.toString())
    .replace(/{{SCORE_PRODUCTS}}/g, scores.products.toString())
    .replace(/{{SCORE_TECH}}/g, scores.tech.toString())
    .replace(/{{SCORE_FUNNEL}}/g, scores.funnel.toString())
    .replace(/{{SCORE_AFFILIATE}}/g, scores.affiliate.toString())
    .replace(/{{REVENUE_STREAMS_HTML}}/g, generateRevenueStreamsHtml(report.revenueStreams))
    .replace(/{{PRODUCTS_HTML}}/g, generateProductsHtml(report.detectedProducts))
    .replace(/{{LEAD_MAGNETS_HTML}}/g, generateLeadMagnetsHtml(report.leadMagnets))
    .replace(/{{TECH_STACK_HTML}}/g, generateTechStackHtml(report.technologyStack))
    .replace(/{{STRENGTHS_HTML}}/g, generateStrengthsHtml(report.competitorStrengths))
    .replace(/{{WEAKNESSES_HTML}}/g, generateWeaknessesHtml(report.competitorWeaknesses))
    .replace(/{{OPPORTUNITIES_HTML}}/g, generateOpportunitiesHtml(report.revenueOpportunities))
    .replace(/{{COPY_TACTICS_HTML}}/g, generateCopyTacticsHtml(report.whatToCopy))
    .replace(/{{ACTION_PLAN_HTML}}/g, generateActionPlanHtml(report.actionPlan))
}