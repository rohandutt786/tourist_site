"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Star, Users } from "lucide-react";
import content from "@/data/content.json";

export default function HomeHero() {
  const { homeHero } = content;

  const handleScroll = () => {
    document.getElementById("packages")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden">
      {/* MOBILE IMAGE with slow subtle zoom */}
      <div className="absolute inset-0 md:hidden scale-105 transition-transform duration-[12000ms] ease-out">
        <Image
          src={homeHero.mobileImage}
          alt={homeHero.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* DESKTOP IMAGE with slow subtle zoom */}
      <div className="absolute inset-0 hidden md:block scale-105 transition-transform duration-[12000ms] ease-out">
        <Image
          src={homeHero.image}
          alt={homeHero.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* CINEMATIC LUXURY GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001733] via-black/45 to-black/30" />

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pt-12 pb-24">
        {/* Floating Trust Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-xl animate-float">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-white/90">Namoh Tourism</span>
          <span className="text-amber-400 font-bold">✦ Verified Holiday Specialist across India</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-5 leading-[1.1] font-sans drop-shadow-md">
          Explore Beautiful <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
            Destinations
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          {homeHero.subtitle} — Handcrafted itineraries for Himachal, Kashmir, Rajasthan & Uttarakhand.
        </p>

        {/* Single CTA */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleScroll}
            className="group px-9 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3cb65] to-[#b8860b] text-[#001733] font-extrabold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/45 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>{homeHero.buttonText}</span>
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* PROOF METRICS BAR (DESKTOP/TABLET) */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-amber-300">5,000+</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Delighted Travelers</span>
          </div>

          <div className="flex flex-col items-center border-x border-white/15">
            <span className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-1">
              4.9 <Star size={14} className="fill-amber-300 text-amber-300 inline" />
            </span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Guest Satisfaction</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-amber-300">100%</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Customised Trips</span>
          </div>
        </div>
      </div>

      {/* MOUSE SCROLL DOWN INDICATOR */}
      <div
        onClick={handleScroll}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 cursor-pointer hidden md:flex flex-col items-center text-slate-300 hover:text-amber-300 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold mb-1 opacity-70">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-300/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
