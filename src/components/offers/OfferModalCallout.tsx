"use client";

import { Sparkles, Calendar, CheckCircle2, Zap } from "lucide-react";
import { getActiveOffer } from "@/config/offers.config";

type OfferModalCalloutProps = {
  className?: string;
};

export default function OfferModalCallout({ className = "" }: OfferModalCalloutProps) {
  const offer = getActiveOffer();

  if (!offer) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50 via-yellow-50/70 to-orange-50/50 p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Background festive glow */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 rounded-full bg-amber-400/15 blur-xl pointer-events-none" />

      <div className="flex items-start gap-3.5 relative z-10">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-md shrink-0">
          <Zap size={20} className="fill-slate-950 animate-pulse" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-black text-[#002855] text-sm md:text-base flex items-center gap-1.5">
              <span>{offer.emoji}</span>
              <span>{offer.offerTitle}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
              <CheckCircle2 size={12} />
              <span>{offer.instantDiscountBadge}</span>
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Special festive celebration discount! <strong>No coupon code required</strong> — flat 10% savings will be directly pre-applied when finalizing your personalized tour itinerary quote.
          </p>

          <div className="mt-2.5 flex items-center gap-4 text-xs font-bold text-amber-950 flex-wrap">
            <span className="flex items-center gap-1.5 bg-amber-200/80 border border-amber-300/80 px-2 py-0.5 rounded-md">
              <Calendar size={13} className="text-amber-800" />
              <span>Valid till {offer.validTillDisplay}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <Sparkles size={12} className="text-emerald-600" />
              <span>Automatic Site-wide Offer</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
