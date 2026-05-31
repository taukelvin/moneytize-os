import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { targetUrl } = body

    if (!targetUrl) {
      return NextResponse.json(
        { success: false, error: "Missing target URL" },
        { status: 400 }
      )
    }

    const normalized = targetUrl.toLowerCase()

    let niche = "Business"
    if (normalized.includes("wordpress") || normalized.includes("seo") || normalized.includes("marketing")) {
      niche = "Digital Marketing"
    } else if (normalized.includes("crypto")) {
      niche = "Crypto / Web3"
    } else if (normalized.includes("fitness")) {
      niche = "Health & Fitness"
    } else if (normalized.includes("finance") || normalized.includes("invest")) {
      niche = "Personal Finance"
    }

    const affiliateCount = Math.floor(Math.random() * 10) + 4
    const revenueMin = affiliateCount * 1400
    const revenueMax = affiliateCount * 3800

    let grade = "C"
    if (affiliateCount >= 10) grade = "A"
    else if (affiliateCount >= 7) grade = "B+"
    else if (affiliateCount >= 5) grade = "B"

    return NextResponse.json({
      success: true,
      result: {
        grade,
        estimatedRevenue: `$${revenueMin.toLocaleString()} - $${revenueMax.toLocaleString()}/month`,
        niche,
        affiliateCount,
        scannedUrl: targetUrl,
      },
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Scan failed. Try again." },
      { status: 500 }
    )
  }
}