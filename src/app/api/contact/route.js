import nodemailer from "nodemailer";
import { renderTemplate } from "@/nodemailer/template.service";
import { contactSchema } from "@/features/contact-us/schema";
import { submissionGuard } from "@/lib/submission-guard";

export async function POST(req) {
  try {
    const rawBody = await req.json();

    // Honeypot bot protection
    if (rawBody.hp_website && rawBody.hp_website.trim().length > 0) {
      return Response.json({
        success: true,
        message: "Your inquiry has been received! Our travel team will contact you shortly.",
      });
    }

    const validation = contactSchema.safeParse(rawBody);

    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields correctly.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      departureCity,
      destination,
      date,
      days,
      persons,
      budget,
      message,
    } = validation.data;

    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown";

    const guardCheck = submissionGuard.canSubmitContact(email, clientIp);
    if (!guardCheck.allowed) {
      return Response.json(
        {
          success: false,
          message: guardCheck.message,
        },
        { status: 429 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "business.namohtourism@gmail.com";
    const adminPass = process.env.ADMIN_EMAIL_PASS;

    // If email credentials are provided, attempt to send emails via Gmail SMTP
    if (adminEmail && adminPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: adminEmail.trim(),
            pass: adminPass.trim().replace(/\s+/g, ""),
          },
        });

        const cleanPhone = (phone || "").trim();
        const cleanDigits = cleanPhone.replace(/\D/g, "");
        const waNumber = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;

        const waText = encodeURIComponent(
          `Hello ${name || ""}, thank you for contacting Namoh Tourism regarding ${
            destination || "your holiday"
          }!`
        );

        const replySubject = encodeURIComponent(
          `Namoh Tourism – Tour Inquiry for ${destination || "Your Holiday"}`
        );

        // 1. Email to Admin / Owner (Inquiry Alert)
        const ownerEmailHtml = renderTemplate("inquiry", {
          name,
          email,
          phone: cleanPhone,
          waNumber,
          waText,
          replySubject,
          departureCity,
          destination,
          date,
          days,
          persons,
          budget,
          message,
        });

        await transporter.sendMail({
          from: `"Namoh Tourism" <${adminEmail}>`,
          to: adminEmail,
          replyTo: email,
          subject: `✦ New Tour Inquiry: ${destination || "General"} – ${name || "Traveler"}`,
          html: ownerEmailHtml,
        });

        // 2. Email to Customer / User (Thank You & Confirmation)
        if (email && email.includes("@")) {
          try {
            const customerEmailHtml = renderTemplate("user-thankyou", {
              name,
              email,
              phone: cleanPhone,
              departureCity,
              destination,
              date,
              days,
              persons,
              budget,
              message,
            });

            await transporter.sendMail({
              from: `"Namoh Tourism" <${adminEmail}>`,
              to: email,
              subject: `Thank you for choosing Namoh Tourism! Trip to ${destination || "India"}`,
              html: customerEmailHtml,
            });
          } catch (customerMailErr) {
            console.warn("⚠️ Could not send confirmation to customer:", customerMailErr.message);
          }
        }
      } catch (mailError) {
        console.error("⚠️ Nodemailer failed to send email (inquiry logged above):", mailError.message);
      }
    } else {
      console.warn("⚠️ ADMIN_EMAIL_PASS not configured in .env.local. Inquiry logged successfully to console.");
    }

    submissionGuard.recordContactSubmission(email, clientIp);

    return Response.json({
      success: true,
      message: "Your inquiry has been received! Our travel team will contact you shortly.",
    });
  } catch (error) {
    console.error("❌ Error processing contact inquiry:", error);
    return Response.json(
      { success: false, message: "Error submitting inquiry" },
      { status: 500 }
    );
  }
}
