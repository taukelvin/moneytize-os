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
      IMPORTANT:
      Replace this with your REAL Make.com webhook later
    */

    const MAKE_WEBHOOK_URL =
      "https://hook.eu2.make.com/replace-this-with-your-real-webhook"

    const response = await fetch(MAKE_WEBHOOK_URL, {
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

    if (!response.ok) {
      throw new Error("Webhook failed")
    }

    return NextResponse.json({
      success: true,
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