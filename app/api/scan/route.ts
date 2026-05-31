import { runIntelligenceEngine, IntelligenceReport } from "@/utils/intelligenceEngine"
import { generateReportHtml } from "@/utils/reportHtmlGenerator";

import { NextResponse } from "next/server";

import fs from "fs";

import path from "path";

import puppeteer from "puppeteer";

import chromium from "@sparticuz/chromium";


async function generatePDF(
  report: IntelligenceReport
): Promise<Buffer> {

  const templatePath = path.join(
    process.cwd(),
    "templates",
    "report.html"
  );

  const template = fs.readFileSync(
    templatePath,
    "utf8"
  );

  const html = generateReportHtml(
    report,
    template
  );

  const isVercel = process.env.VERCEL === "1";

  const browser = isVercel
    ? await puppeteer.launch({
        args: chromium.args,
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
      });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1440,
    height: 2200,
    deviceScaleFactor: 2,
  });

  await page.setContent(html, {
    waitUntil: "load",
  });

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
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const { targetUrl, email } = body;

    console.log("STEP 1 - Received:", {
      targetUrl,
      email,
    });

    if (!targetUrl) {

      return NextResponse.json(
        {
          success: false,
          error: "Missing target URL",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {

      return NextResponse.json(
        {
          success: false,
          error: "Missing email address",
        },
        {
          status: 400,
        }
      );
    }

    const reportData =
      await runIntelligenceEngine(targetUrl);

    console.log(
      "STEP 2 - Report data built:",
      reportData.grade
    );

    const revenue =
      `$${reportData.monthlyRevenueMin.toLocaleString()} - ` +
      `$${reportData.monthlyRevenueMax.toLocaleString()}/mo`;

    try {

  await generatePDF(
    reportData
  );

  console.log(
    "STEP 3 - PDF generated successfully"
  );

    } catch (pdfError: any) {

      console.error(
        "PDF FAILED:",
        pdfError?.message
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "PDF generation failed: " +
            pdfError?.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({

      success: true,

      checkoutUrl:
        process.env.LEMON_SQUEEZY_CHECKOUT_URL,

      result: {

        grade: reportData.grade,

        estimatedRevenue: revenue,

        niche: reportData.niche,

        affiliateNetwork:
          reportData.affiliateNetwork,

        affiliateTerms:
          reportData.affiliateNetwork,

        revenueLeakage:
          reportData.revenueLeakage,

        estimatedMonthlyTraffic:
          0,

        scannedUrl: targetUrl,

        emailCaptured: true,

      },

    });

  } catch (error: any) {

    console.error(
      "Audit error FULL:",
      error?.message,
      error?.stack
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error?.message ||
          "Audit failed.",
      },
      {
        status: 500,
      }
    );
  }
}