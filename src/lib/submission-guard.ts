/**
 * Submission Guard & Anti-Spam Rate Limiter
 * Provides in-memory deduplication and spam protection without requiring a database.
 * Uses globalThis so state persists across hot-reloads in Next.js development.
 */

interface SubmissionRecord {
  timestamp: number;
  count: number;
}

class SubmissionGuard {
  // Reviews: Map of normalized email -> timestamp of review submission
  private reviewEmails: Map<string, number>;
  // Reviews: IP rate limit
  private reviewIps: Map<string, SubmissionRecord>;

  // Contact Us: Map of normalized email -> SubmissionRecord
  private contactEmails: Map<string, SubmissionRecord>;
  // Contact Us: IP rate limit
  private contactIps: Map<string, SubmissionRecord>;

  constructor() {
    this.reviewEmails = new Map();
    this.reviewIps = new Map();
    this.contactEmails = new Map();
    this.contactIps = new Map();
  }

  private normalizeEmail(email: string): string {
    return (email || "").trim().toLowerCase();
  }

  // --- REVIEW CHECKS ---

  /**
   * Check if this email or IP can submit a review.
   * Rule: Exactly 1 review per email address.
   */
  public canSubmitReview(
    email: string,
    ip: string = "unknown"
  ): { allowed: boolean; message?: string } {
    const cleanEmail = this.normalizeEmail(email);

    if (!cleanEmail) {
      return { allowed: false, message: "Valid email is required." };
    }

    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    // Check if email submitted a review within the last 7 days
    const lastReviewTime = this.reviewEmails.get(cleanEmail);
    if (lastReviewTime && now - lastReviewTime < sevenDaysMs) {
      const remainingDays = Math.ceil(
        (sevenDaysMs - (now - lastReviewTime)) / (24 * 60 * 60 * 1000)
      );
      return {
        allowed: false,
        message: `You have already submitted a review recently. Please wait ${remainingDays} day${
          remainingDays > 1 ? "s" : ""
        } before submitting another review. Thank you for your feedback!`,
      };
    }
    const oneHour = 60 * 60 * 1000;
    const ipRecord = this.reviewIps.get(ip);

    if (ipRecord) {
      if (now - ipRecord.timestamp < oneHour) {
        if (ipRecord.count >= 5) {
          return {
            allowed: false,
            message:
              "Too many review submissions from this network. Please try again later.",
          };
        }
      } else {
        // Reset after 1 hour
        this.reviewIps.set(ip, { timestamp: now, count: 0 });
      }
    }

    return { allowed: true };
  }

  /**
   * Record that a review was successfully submitted by this email & IP.
   */
  public recordReviewSubmission(email: string, ip: string = "unknown"): void {
    const cleanEmail = this.normalizeEmail(email);
    const now = Date.now();
    this.reviewEmails.set(cleanEmail, now);

    const ipRecord = this.reviewIps.get(ip);
    if (ipRecord && now - ipRecord.timestamp < 60 * 60 * 1000) {
      ipRecord.count += 1;
    } else {
      this.reviewIps.set(ip, { timestamp: now, count: 1 });
    }
  }

  // --- CONTACT INQUIRY CHECKS ---

  /**
   * Check if this email or IP can submit a contact inquiry.
   * Rules:
   * 1. 15-minute cooldown between submissions for the exact same email.
   * 2. Max 3 submissions per email per 24 hours.
   * 3. Max 10 submissions per IP per hour.
   */
  public canSubmitContact(
    email: string,
    ip: string = "unknown"
  ): { allowed: boolean; message?: string } {
    const cleanEmail = this.normalizeEmail(email);

    if (!cleanEmail) {
      return { allowed: false, message: "Valid email is required." };
    }

    const now = Date.now();
    const cooldownMs = 15 * 60 * 1000; // 15 minutes cooldown
    const dayMs = 24 * 60 * 60 * 1000;

    const emailRecord = this.contactEmails.get(cleanEmail);
    if (emailRecord) {
      // Cooldown check
      if (now - emailRecord.timestamp < cooldownMs) {
        const remainingMinutes = Math.ceil(
          (cooldownMs - (now - emailRecord.timestamp)) / (60 * 1000)
        );
        return {
          allowed: false,
          message: `You have already sent an inquiry recently. Please wait ${remainingMinutes} minute${
            remainingMinutes > 1 ? "s" : ""
          } before submitting again, or our team will get in touch with you shortly.`,
        };
      }

      // 24 hour cap check
      if (now - emailRecord.timestamp < dayMs && emailRecord.count >= 3) {
        return {
          allowed: false,
          message:
            "Daily inquiry limit reached for this email. Our travel experts have already received your request and will contact you soon.",
        };
      }
    }

    // IP rate limit: max 10 contact requests per IP per hour
    const ipRecord = this.contactIps.get(ip);
    if (ipRecord) {
      if (now - ipRecord.timestamp < 60 * 60 * 1000) {
        if (ipRecord.count >= 10) {
          return {
            allowed: false,
            message:
              "Too many requests received from this network. Please try again later or call us directly.",
          };
        }
      } else {
        this.contactIps.set(ip, { timestamp: now, count: 0 });
      }
    }

    return { allowed: true };
  }

  /**
   * Record that a contact inquiry was successfully sent.
   */
  public recordContactSubmission(email: string, ip: string = "unknown"): void {
    const cleanEmail = this.normalizeEmail(email);
    const now = Date.now();

    const emailRecord = this.contactEmails.get(cleanEmail);
    if (emailRecord && now - emailRecord.timestamp < 24 * 60 * 60 * 1000) {
      emailRecord.timestamp = now;
      emailRecord.count += 1;
    } else {
      this.contactEmails.set(cleanEmail, { timestamp: now, count: 1 });
    }

    const ipRecord = this.contactIps.get(ip);
    if (ipRecord && now - ipRecord.timestamp < 60 * 60 * 1000) {
      ipRecord.count += 1;
    } else {
      this.contactIps.set(ip, { timestamp: now, count: 1 });
    }
  }
}

export const submissionGuard = new SubmissionGuard();

const globalGuards = globalThis as unknown as {
  __submissionGuard?: SubmissionGuard;
};
globalGuards.__submissionGuard = submissionGuard;
