import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderTemplate } from "@/nodemailer/template.service";
import { submissionGuard } from "@/lib/submission-guard";
import { reviewSchema } from "@/features/home/review.schema";

// POST /api/review - Submit customer review with 7-day cooldown
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Bot Honeypot Check: If the hidden honeypot field is filled, silently ignore
    if (rawBody.hp_website && rawBody.hp_website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your review has been received.",
      });
    }

    // 2. Validate Fields
    const validation = reviewSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required review fields correctly.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, rating, tour, location, comment } = validation.data;

    // 3. Extract Client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown";

    // 4. Submission Guard / Duplicate Email & IP Rate Limiting Check
    const guardCheck = submissionGuard.canSubmitReview(email, clientIp);
    if (!guardCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: guardCheck.message,
        },
        { status: 429 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "business.namohtourism@gmail.com";
    const adminPass = process.env.ADMIN_EMAIL_PASS;

    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const starsDisplay = "★".repeat(rating) + "☆".repeat(5 - rating);

    // Pre-formatted JSON snippet for admin to easily paste into content.json
    const snippetObj = {
      id: Date.now(),
      name,
      location,
      tour,
      rating,
      date: formattedDate,
      comment,
    };
    const jsonSnippet = JSON.stringify(snippetObj, null, 2);

    // 5. Send Notification Email to Admin
    if (adminEmail && adminPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: adminEmail.trim(),
            pass: adminPass.trim().replace(/\s+/g, ""),
          },
        });

        const reviewHtml = renderTemplate("review", {
          name,
          email,
          rating,
          starsDisplay,
          tour,
          location,
          date: formattedDate,
          comment,
          jsonSnippet,
        });

        await transporter.sendMail({
          from: `"Namoh Tourism Review" <${adminEmail}>`,
          to: adminEmail,
          replyTo: email,
          subject: `⭐ New Guest Review (${rating}★) – ${name} (${tour})`,
          html: reviewHtml,
        });
      } catch (mailError: any) {
        console.error("⚠️ Nodemailer failed to send review email:", mailError?.message || mailError);
      }
    } else {
      console.warn("⚠️ ADMIN_EMAIL_PASS not configured in .env. Review logged successfully to console:", snippetObj);
    }

    // 6. Record successful submission in guard to prevent duplicate submission
    submissionGuard.recordReviewSubmission(email, clientIp);

    return NextResponse.json({
      success: true,
      message:
        "Thank you for sharing your experience! Your review has been submitted successfully.",
    });
  } catch (error) {
    console.error("❌ Error processing review submission:", error);
    return NextResponse.json(
      { success: false, message: "Error submitting review. Please try again." },
      { status: 500 }
    );
  }
}
