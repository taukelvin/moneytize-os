import { NextResponse } from "next/server"

export async function POST(request: Request) {

  try {

    const body = await request.json()

    const { targetUrl } = body

    if (!targetUrl) {

      return NextResponse.json(
        {
          success: false,
          error: "Missing target URL",
        },
        { status: 400 }
      )

    }

    /*
      SEND TO PIPEDREAM
    */

    const WEBHOOK_URL =
      "https://eolgwors03epqt3.m.pipedream.net"

    await fetch(WEBHOOK_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        targetUrl,
        source: "moneytize-os",
        timestamp: new Date().toISOString(),
      }),

    })

    /*
      FAKE MVP ANALYSIS ENGINE
      (temporary until real AI engine exists)
    */

    const fakeResult = {
      grade: "A",
      estimatedRevenue: "$12,400 - $18,500/month",
      niche: "Digital Marketing / WordPress",
      affiliateStrength: "High",
      sponsorshipPotential: "Very High",
      hiddenOpportunity:
        "Large affiliate monetization footprint detected with underused email capture strategy.",
    }

    return NextResponse.json({
      success: true,
      result: fakeResult,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: "System busy. Try again.",
      },
      { status: 500 }
    )

  }

}