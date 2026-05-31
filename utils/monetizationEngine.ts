export type Niche = 'Digital Marketing' | 'Crypto' | 'Fitness' | 'Finance' | 'Business'

export interface MonetizationReportData {
  grade: 'A' | 'B+' | 'B' | 'C'
  monthlyTakeHomeMin: number
  monthlyTakeHomeMax: number
  sponsorFlatFeeMin: number
  sponsorFlatFeeMax: number
  affiliatePayoutTerms: string
  affiliateNetwork: string
  revenueLeakageEstimate: number
  estimatedMonthlyTraffic: number
  monetizationScore: string
  niche: Niche
}

const NICHE_BENCHMARKS = {
  'Finance':           { rpmMin: 30, rpmMax: 50, affiliateNetwork: 'Impact / Private SaaS',         payoutTerms: '30% Recurring Monthly',          scoreBase: 88 },
  'Crypto':            { rpmMin: 40, rpmMax: 70, affiliateNetwork: 'Bybit / Binance Affiliate',      payoutTerms: 'Up to 40% Commission Tier',       scoreBase: 91 },
  'Digital Marketing': { rpmMin: 20, rpmMax: 35, affiliateNetwork: 'PartnerStack / ShareASale',      payoutTerms: '20% to 30% Recurring',           scoreBase: 84 },
  'Fitness':           { rpmMin: 8,  rpmMax: 15, affiliateNetwork: 'ClickBank / Amazon Associates',  payoutTerms: '10% Physical / 50% Digital',     scoreBase: 74 },
  'Business':          { rpmMin: 15, rpmMax: 30, affiliateNetwork: 'CJ Affiliate / Stripe Platforms',payoutTerms: 'Fixed $50 - $100 Per Signup',     scoreBase: 79 },
}

// Estimate traffic tier from URL signals — no paid API needed
function estimateTrafficFromUrl(url: string): number {
  const normalized = url.toLowerCase()
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')

  const domain = normalized.split('/')[0]
  const domainLength = domain.length

  // Known large domains get high baseline
  const largeDomains = ['wpbeginner', 'nerdwallet', 'investopedia', 'healthline', 'hubspot', 'semrush', 'ahrefs', 'backlinko']
  const mediumDomains = ['youtube.com', 'twitter.com', 'instagram.com', 'tiktok.com']

  if (largeDomains.some(d => domain.includes(d))) return 2_500_000
  if (mediumDomains.some(d => domain.includes(d))) return 800_000

  // Heuristic: shorter domains tend to be more established
  if (domainLength <= 8)  return 180_000
  if (domainLength <= 12) return 75_000
  if (domainLength <= 16) return 35_000
  return 18_000
}

export function detectNiche(url: string): Niche {
  const n = url.toLowerCase()
  if (n.includes('crypto') || n.includes('bitcoin') || n.includes('defi') || n.includes('web3')) return 'Crypto'
  if (n.includes('finance') || n.includes('invest') || n.includes('money') || n.includes('nerdwallet') || n.includes('investopedia')) return 'Finance'
  if (n.includes('fitness') || n.includes('health') || n.includes('workout') || n.includes('gym')) return 'Fitness'
  if (n.includes('marketing') || n.includes('seo') || n.includes('wordpress') || n.includes('hubspot') || n.includes('wpbeginner')) return 'Digital Marketing'
  return 'Business'
}

export function calculateMonetizationIntelligence(targetUrl: string): MonetizationReportData {
  const niche = detectNiche(targetUrl)
  const benchmark = NICHE_BENCHMARKS[niche]
  const traffic = estimateTrafficFromUrl(targetUrl)

  const sponsorFlatFeeMin = Math.round((traffic / 1000) * benchmark.rpmMin * 0.4)
  const sponsorFlatFeeMax = Math.round((traffic / 1000) * benchmark.rpmMax * 0.6)

  const affiliateMin = Math.round(traffic * 0.005 * 25)
  const affiliateMax = Math.round(traffic * 0.015 * 45)

  const totalMin = sponsorFlatFeeMin + affiliateMin
  const totalMax = sponsorFlatFeeMax + affiliateMax

  const revenuePerThousand = (totalMax / traffic) * 1000

  let grade: 'A' | 'B+' | 'B' | 'C' = 'C'
  let scoreMod = 0
  if (revenuePerThousand > 40) { grade = 'A';  scoreMod = 6 }
  else if (revenuePerThousand > 25) { grade = 'B+'; scoreMod = 3 }
  else if (revenuePerThousand > 15) { grade = 'B';  scoreMod = 0 }

  const monetizationScore = `${Math.min(benchmark.scoreBase + scoreMod, 99)}/100`
  const revenueLeakageEstimate = grade === 'C' ? Math.round(totalMax * 0.5) : Math.round(totalMax * 0.15)

  return {
    grade,
    monthlyTakeHomeMin: totalMin,
    monthlyTakeHomeMax: totalMax,
    sponsorFlatFeeMin,
    sponsorFlatFeeMax,
    affiliateNetwork: benchmark.affiliateNetwork,
    affiliatePayoutTerms: benchmark.payoutTerms,
    revenueLeakageEstimate,
    estimatedMonthlyTraffic: traffic,
    monetizationScore,
    niche,
  }
}