/**
 * 🌟 Centralized Offers & Festival Campaigns Configuration
 * 
 * FUTURE GUIDE:
 * Agar kl ko koi bhi naya offer chalana ho (New Year, Christmas, Summer, etc.):
 * Sirf is ek file me values change karein. Poori website me automatically offer reflect ho jayega!
 * 
 * - isActive: true/false karke offer ON ya OFF kar sakte ho.
 * - validTill: Date over hote hi offer automatically band ho jayega.
 * - NO COUPON CODE NEEDED: Offer automatically har package quote me include hota hai.
 */

export interface OfferCampaign {
  id: string;
  isActive: boolean;
  festivalName: string;
  emoji: string;
  offerTitle: string;
  tagline: string;
  discountPercent: number;
  discountText: string;
  instantDiscountBadge: string;
  validTill: string; // ISO date string e.g. "2026-11-10T23:59:59+05:30"
  validTillDisplay: string;
  bannerMessage: string;
  cardBadgeText: string;
  modalBadgeText: string;
  enquiryNote: string;
  ctaText: string;
  ctaLink: string;
}

export const ACTIVE_OFFER: OfferCampaign = {
  id: "diwali-2026",
  isActive: true,
  festivalName: "Diwali Festival",
  emoji: "🪔",
  offerTitle: "Diwali Festive Offer",
  tagline: "Flat 10% Festive Discount on All Holiday Packages",
  discountPercent: 10,
  discountText: "Flat 10% OFF",
  instantDiscountBadge: "10% Festive Discount Applied",
  validTill: "2026-11-10T23:59:59+05:30",
  validTillDisplay: "10 November, 2026",
  bannerMessage: "Diwali Festive Offer: Get Flat 10% Discount on all holiday packages till 10 Nov 2026.",
  cardBadgeText: "Diwali Special • Flat 10% OFF",
  modalBadgeText: "Diwali Festive Special: Flat 10% Discount Automatically Applied!",
  enquiryNote: "Diwali 10% Festive Discount will be automatically included in your personalized itinerary quote.",
  ctaText: "Explore Holiday Packages",
  ctaLink: "/packages",
};

/**
 * Helper to check if offer is currently active & not expired
 */
export function getActiveOffer(): OfferCampaign | null {
  if (!ACTIVE_OFFER.isActive) return null;

  try {
    const expiryDate = new Date(ACTIVE_OFFER.validTill);
    const now = new Date();
    if (now > expiryDate) {
      return null;
    }
  } catch {
    // If invalid date format, fallback to isActive flag
    return ACTIVE_OFFER;
  }

  return ACTIVE_OFFER;
}
