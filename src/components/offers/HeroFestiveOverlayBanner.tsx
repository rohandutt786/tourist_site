"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Clock, ShieldCheck } from "lucide-react";
import { getActiveOffer } from "@/config/offers.config";
import { useCountdown } from "@/hooks/useCountdown";

function RealisticDiya() {
  return (
    <div className="relative flex flex-col items-center select-none shrink-0">
      {/* Outer ambient glow */}
      <div className="absolute -top-2 w-12 h-12 rounded-full bg-amber-400/30 blur-md pointer-events-none" />

      {/* Flickering Flame */}
      <div className="relative w-4 sm:w-5 h-6 sm:h-7 animate-flame">
        <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 rounded-[50%_50%_20%_20%_/_70%_70%_30%_30%]" />
        <div className="absolute inset-x-0.5 bottom-0.5 top-1 bg-gradient-to-t from-amber-300 to-white rounded-[50%_50%_20%_20%_/_70%_70%_30%_30%]" />
      </div>

      {/* Terracotta Diya Clay Pot */}
      <svg
        viewBox="0 0 100 40"
        className="w-12 sm:w-14 -mt-1.5 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12 C 20 38, 80 38, 95 12 C 85 22, 15 22, 5 12 Z"
          fill="url(#heroDiyaGrad)"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <ellipse cx="50" cy="12" rx="45" ry="8" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
        <ellipse cx="50" cy="12" rx="36" ry="5" fill="#f59e0b" />
        <defs>
          <linearGradient id="heroDiyaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9a3412" />
            <stop offset="50%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HeroFestiveOverlayBanner() {
  const [closed, setClosed] = useState(false);

  const offer = getActiveOffer();
  const timeLeft = useCountdown(offer?.validTill || "");

  if (!offer || closed || timeLeft.isExpired) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setClosed(true);
  };

  const padZero = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="absolute top-4 sm:top-6 inset-x-3 sm:inset-x-6 md:inset-x-8 z-40 max-w-5xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Floating Glassmorphic Festive Ad Card Overlapping the Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-[#001633]/97 backdrop-blur-2xl border-2 border-amber-400/90 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(212,175,55,0.3)] text-white p-3.5 sm:p-5">

        {/* Subtle festive shimmer light */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3.5s_infinite] bg-gradient-to-r from-transparent via-amber-400/10 to-transparent pointer-events-none" />

        {/* Top-Right Close Button */}
        <button
          onClick={handleClose}
          title="Close ad and continue to normal site view"
          aria-label="Close ad"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 inline-flex items-center gap-1 bg-black/60 hover:bg-black/85 border border-white/20 hover:border-amber-400 text-slate-300 hover:text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer shadow-md group active:scale-95 z-20"
        >
          <span>Close Ad</span>
          <X size={12} className="group-hover:rotate-90 transition-transform duration-200" />
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">

          {/* Left: Diya + Offer Content */}
          <div className="flex items-center gap-3 sm:gap-4 text-center md:text-left justify-center md:justify-start flex-1 min-w-0 pr-16 md:pr-0">
            <RealisticDiya />

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 via-yellow-400/30 to-amber-500/25 border border-amber-300/70 text-[10px] sm:text-[11px] font-black text-amber-300 mb-1 uppercase tracking-wider shadow-xs">
                <span className="animate-pulse">🪔</span>
                <span>{offer.offerTitle}</span>
                <span className="text-white/40">•</span>
                <span className="text-white font-extrabold">{offer.discountText} Instant Discount</span>
              </div>

              <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                Celebrate Diwali with 10% Festive Savings on All Holiday Packages!
              </h3>

              <p className="text-[11px] sm:text-xs text-slate-200 font-normal mt-0.5 flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 flex-wrap">
                <span>Flat 10% Off on <strong className="text-white font-bold">all our holiday packages</strong> and <strong className="text-amber-300 font-bold underline decoration-amber-400/60 underline-offset-2">any custom trip of your choice</strong>!</span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span className="text-emerald-300 font-semibold inline-flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Auto-Applied on Booking</span>
                </span>
              </p>
            </div>
          </div>

          {/* Right: Live Countdown + Action Button */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto flex-wrap sm:flex-nowrap">
            {/* Live Countdown Box */}
            <div className="bg-black/50 border border-amber-400/30 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 text-center shadow-inner">
              <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                <Clock size={10} className="text-amber-400 animate-pulse" />
                <span>Ends In:</span>
              </div>

              <div className="flex items-center justify-center gap-1 font-mono font-black text-[11px] sm:text-xs text-white">
                <span className="bg-white/10 px-1 rounded text-amber-300">{padZero(timeLeft.days)}d</span>
                <span className="text-amber-400/70">:</span>
                <span className="bg-white/10 px-1 rounded text-amber-300">{padZero(timeLeft.hours)}h</span>
                <span className="text-amber-400/70">:</span>
                <span className="bg-white/10 px-1 rounded text-amber-300">{padZero(timeLeft.minutes)}m</span>
                <span className="text-amber-400/70">:</span>
                <span className="bg-amber-500 text-slate-950 px-1 rounded font-black animate-pulse">
                  {padZero(timeLeft.seconds)}s
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37] via-[#f3cb65] to-[#b8860b] text-[#001733] font-black text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>Explore Packages</span>
              <ArrowRight size={14} />
            </Link>

            {/* Right Diya on large screens */}
            <div className="hidden lg:block pl-1">
              <RealisticDiya />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
