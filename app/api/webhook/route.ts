import { supabaseAdmin } from "@/utils/supabase";
import { NextResponse } from "next/server"
import crypto from "crypto"
import fs from "fs"
import path from "path"
import puppeteer from "puppeteer"
import chromium from "@sparticuz/chromium"
import { Resend } from "resend"
import { runIntelligenceEngine, IntelligenceReport } from "@/utils/intelligenceEngine"
import { generateReportHtml } from "@/utils/reportHtmlGenerator"

const resend = new Resend(process.env.RESEND_API_KEY)

async function generatePDF(report: IntelligenceReport): Promise<Buffer> {

  const templatePath = path.join(process.cwd(), "templates", "report.html")

  const template = fs.readFileSync(templatePath, "utf8")

const html = generateReportHtml(
  report,
  template
)

  const isVercel = process.env.VERCEL === "1"

  const browser = isVercel
    ? await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    : await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1440,
    height: 2200,
    deviceScaleFactor: 2,
  })

  await page.setContent(html, {
    waitUntil: "load",
  })

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  })

  await browser.close()

  return Buffer.from(pdfBuffer)
}

export async function POST(request: Request) {

  try {

    const rawBody = await request.text()

    const secret =
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ""

    const signature =
      request.headers.get("x-signature") || ""

    const computed = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")

    if (signature !== computed) {

      console.error("Invalid webhook signature")

      return NextResponse.json(
        {
          error: "Invalid signature",
        },
        {
          status: 401,
        }
      )
    }

    const payload = JSON.parse(rawBody)

    const eventName =
      payload?.meta?.event_name

    console.log(
      "Webhook event:",
      eventName
    )

    if (eventName !== "order_created") {

      return NextResponse.json(
        {
          received: true,
        },
        {
          status: 200,
        }
      )
    }

    const customData =
      payload?.meta?.custom_data

    const customerEmail =
      customData?.user_email ||
      payload?.data?.attributes?.user_email

    const targetUrl =
      customData?.target_url

console.log(
  "CUSTOM DATA:",
  JSON.stringify(customData, null, 2)
)

console.log(
  "META:",
  JSON.stringify(payload?.meta, null, 2)
)

    console.log(
  "FULL WEBHOOK PAYLOAD:",
  JSON.stringify(payload, null, 2)
)

    console.log(
      "Fulfillment data:",
      {
        customerEmail,
        targetUrl,
      }
    )

    if (!customerEmail || !targetUrl) {

      console.error(
        "Missing fulfillment metadata:",
        {
          customerEmail,
          targetUrl,
        }
      )

      return NextResponse.json(
        {
          error: "Missing metadata",
        },
        {
          status: 400,
        }
      )
    }

    const reportData = await runIntelligenceEngine(targetUrl)

    const pdfBuffer =
  await generatePDF(reportData)

    const sendResult =
      await resend.emails.send({

        from:
          "noreply@reports.moneytizeos.com",

        to:
          customerEmail,

        subject:
          "Your Moneytize OS Monetization Audit Report",

        html: `
          <div style="font-family:Inter,Arial,sans-serif;background:#020617;color:#F8FAFC;padding:40px;max-width:600px;margin:auto;border-radius:16px;">

            <h1 style="font-size:28px;font-weight:800;margin-bottom:8px;">
              Moneytize OS
            </h1>

            <p style="color:#94A3B8;margin-bottom:32px;">
              Your monetization intelligence report is ready.
            </p>

            <div style="background:#071028;border:1px solid #142041;border-radius:16px;padding:24px;margin-bottom:24px;">

              <p style="color:#94A3B8;font-size:13px;margin-bottom:4px;">
                Scanned URL
              </p>

              <p style="font-weight:600;margin-bottom:20px;">
                ${targetUrl}
              </p>

              <p style="color:#94A3B8;font-size:13px;margin-bottom:4px;">
                Monetization Grade
              </p>

              <p style="font-size:32px;font-weight:800;color:#22C55E;margin-bottom:20px;">
                ${reportData.grade}
              </p>

              <p style="color:#94A3B8;font-size:13px;margin-bottom:4px;">
                Estimated Monthly Take-Home
              </p>

              <p style="font-size:24px;font-weight:700;color:#22C55E;">
                $${reportData.monthlyRevenueMin.toLocaleString()} - $${reportData.monthlyRevenueMax.toLocaleString()}/mo
              </p>

            </div>

            <p style="color:#64748B;font-size:13px;">
              Your full PDF intelligence report is attached.
            </p>

          </div>
        `,

        attachments: [
          {
            filename:
              `Moneytize-OS-Report-${Date.now()}.pdf`,
            content:
              pdfBuffer,
          },
        ],
      })

    console.log(
  "Fulfillment complete:",
  sendResult
)
console.log("DATABASE LOGGING STARTED")

try {

  const { data: payment } = await supabaseAdmin
    .from("payments")
    .insert({
      lemon_order_id: payload?.data?.id?.toString(),
      amount: 4900,
      status: "completed",
    })
    .select()
    .single()

  const { data: scan } = await supabaseAdmin
    .from("scans")
    .insert({
      target_url: targetUrl,
      status: "completed",
      is_paid: true,
      payment_id: payload?.data?.id?.toString(),
      completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  await supabaseAdmin
    .from("reports")
    .insert({
      scan_id: scan?.id,
      target_url: targetUrl,
      niche: reportData.niche,
      grade: reportData.grade,
      monetization_score: reportData.monetizationScore,
      monthly_revenue_min: reportData.monthlyRevenueMin,
      monthly_revenue_max: reportData.monthlyRevenueMax,
      executive_summary:
        `Grade ${reportData.grade} report for ${targetUrl}`,
      full_analysis: reportData,
    })

  await supabaseAdmin
    .from("email_deliveries")
    .insert({
      email: customerEmail,
      status: "delivered",
      resend_id: (sendResult as any)?.data?.id,
    })

  console.log(
    "DATABASE: All records logged successfully"
  )

} catch (dbError: any) {

  console.error(
    "DATABASE LOG FAILED:",
    dbError?.message
  )

}

return NextResponse.json(
  {
    received: true,
    fulfilled: true,
  },
  {
    status: 200,
  }
)

  } catch (error: any) {

    console.error(
      "Webhook error:",
      error?.message,
      error?.stack
    )

    return NextResponse.json(
      {
        error:
          "Webhook processing failed",
      },
      {
        status: 500,
      }
    )
  }
}