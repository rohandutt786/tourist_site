"use client";

import { getActiveOffer } from "@/config/offers.config";

type OfferRibbonBadgeProps = {
  className?: string;
  size?: "sm" | "md";
};

export default function OfferRibbonBadge({
  className = "",
  size = "md",
}: OfferRibbonBadgeProps) {
  const offer = getActiveOffer();

  if (!offer) return null;

  const isSmall = size === "sm";

  return (
    <div
      className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full font-black shadow-lg backdrop-blur-md transition-all duration-300 shrink-0 whitespace-nowrap ${
        isSmall ? "px-2 sm:px-2.5 py-1 text-[10px]" : "px-3 sm:px-3.5 py-1.5 text-xs"
      } bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border border-white/60 shadow-amber-500/25 ${className}`}
    >
      <span className="text-xs leading-none animate-bounce" style={{ animationDuration: "2s" }}>
        {offer.emoji}
      </span>
      <span className="tracking-wider uppercase font-black">
        {/* Responsive text: on small mobile screens show compact 10% OFF, on larger screens full title */}
        <span className="hidden sm:inline">{offer.cardBadgeText}</span>
        <span className="sm:hidden inline">{offer.discountText}</span>
      </span>
      <span className="bg-slate-950 text-amber-300 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
        Special
      </span>
    </div>
  );
}
