"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  ShieldCheck,
  Car,
  Coffee,
  Sparkles,
  ArrowRight,
  Phone,
  Check,
  X,
  Clock,
  ChevronRight,
  HelpCircle,
  Compass,
} from "lucide-react";
import { PackageType, DurationPlan, ItineraryItem, getAllPackages } from "@/services/packages.service";
import { getActiveOffer } from "@/config/offers.config";
import PackageJsonLd from "@/components/seo/PackageJsonLd";

interface PackageDetailProps {
  pkg: PackageType;
}

export default function PackageDetailFeature({ pkg }: PackageDetailProps) {
  const offer = getActiveOffer();
  const allPackages = getAllPackages();
  const otherPackages = allPackages.filter((p) => p.id !== pkg.id).slice(0, 3);

  const durationPlans: DurationPlan[] = pkg.facilities?.durationPlans || [];
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const currentPlan = durationPlans[selectedPlanIndex] || durationPlans[0] || {
    duration: "5 days / 4 nights",
    days: "5 days",
    nights: "4 nights",
    itinerary: [],
  };

  const images = pkg.facilities?.tourImages?.length
    ? pkg.facilities.tourImages
    : [pkg.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const daysList: ItineraryItem[] = currentPlan.itinerary || [];

  const whatsappMessage = encodeURIComponent(
    `Hello Namoh Tourism, I am interested in booking the "${pkg.title}" (${currentPlan.duration}) package. Please share details and best quotation.`
  );

  return (
    <>
      <PackageJsonLd pkg={pkg} currentPlan={currentPlan} />

      <main className="min-h-screen bg-slate-50/60 pb-28 md:pb-20 font-sans">
        {/* TOP BREADCRUMB */}
        <div className="bg-white/80 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/" className="hover:text-[#002855] transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <Link
                href="/packages"
                className="hover:text-[#002855] transition-colors"
              >
                Tour Packages
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-[#002855] font-bold truncate max-w-[240px] sm:max-w-none">
                {pkg.title}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          {/* HEADER TITLE & BADGES */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black tracking-wide uppercase border border-amber-300/80">
                <Sparkles size={13} className="text-amber-600" />
                <span>100% Customizable Private Tour</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <MapPin size={12} className="text-amber-600" />
                <span>{pkg.location}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span>4.9 / 5.0 (520+ Reviews)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#002855] tracking-tight leading-tight">
              {pkg.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-light max-w-3xl leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* FESTIVE OFFER NOTICE (IF ACTIVE) */}
          {offer && (
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-400/20 to-amber-500/15 border-2 border-amber-400/70 shadow-xs flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-pulse">🪔</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wide">
                    {offer.offerTitle} • {offer.discountText} Instant Savings
                  </h4>
                  <p className="text-xs text-amber-900/80 font-normal">
                    Flat 10% festive discount automatically applied on this package booking till {offer.validTillDisplay}.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs shrink-0 shadow-sm">
                <ShieldCheck size={13} />
                <span>Auto-Discounted</span>
              </span>
            </div>
          )}

          {/* MAIN GRID: LEFT CONTENT + RIGHT STICKY SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (8 COLS) */}
            <div className="lg:col-span-8 space-y-8">
              {/* PHOTO GALLERY */}
              <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/80 shadow-md overflow-hidden">
                {/* Main Hero Image */}
                <div className="relative h-64 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src={images[activeImageIndex] || pkg.image}
                    alt={`${pkg.title} photo ${activeImageIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                    className="object-cover transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold">
                      <span>📸 {activeImageIndex + 1} of {images.length} Photos</span>
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-amber-500 scale-105 shadow-md"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK HIGHLIGHTS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                    <Car size={18} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Private Cab
                    </h5>
                    <p className="text-xs sm:text-sm font-black text-[#002855] mt-0.5">
                      Dedicated Vehicle
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                    <Coffee size={18} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Meal Plan
                    </h5>
                    <p className="text-xs sm:text-sm font-black text-[#002855] mt-0.5">
                      Breakfast & Dinner
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Duration
                    </h5>
                    <p className="text-xs sm:text-sm font-black text-[#002855] mt-0.5">
                      {currentPlan.duration}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Tolls & Taxes
                    </h5>
                    <p className="text-xs sm:text-sm font-black text-[#002855] mt-0.5">
                      100% Included
                    </p>
                  </div>
                </div>
              </div>

              {/* DURATION SELECTOR TABS (IF MULTIPLE PLANS EXIST) */}
              {durationPlans.length > 1 && (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-amber-600" />
                    <h3 className="text-base sm:text-lg font-black text-[#002855]">
                      Select Duration Plan
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-light mb-4">
                    Choose your preferred tour duration to view the corresponding day-wise plan and itinerary:
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {durationPlans.map((plan, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPlanIndex(idx)}
                        className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          selectedPlanIndex === idx
                            ? "bg-[#002855] text-white shadow-md shadow-[#002855]/20 scale-102"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <span>{plan.duration}</span>
                        {selectedPlanIndex === idx && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DAY-WISE ITINERARY TIMELINE */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                      <Compass size={14} className="text-amber-600" />
                      <span>Day-Wise Travel Blueprint</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#002855]">
                      Detailed Tour Itinerary ({currentPlan.duration})
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {daysList.length} Days Planned
                  </span>
                </div>

                {daysList.length > 0 ? (
                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-slate-200 before:to-slate-200">
                    {daysList.map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Golden Node on Timeline */}
                        <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-[10px] sm:text-xs flex items-center justify-center shadow-md border-2 border-white">
                          {idx + 1}
                        </div>

                        {/* Itinerary Card */}
                        <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 hover:border-amber-400/50 hover:shadow-md transition-all duration-300">
                          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                              {item.day || `Day ${idx + 1}`}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200/60">
                              <Coffee size={11} className="text-amber-600" />
                              <span>Meals Included</span>
                            </span>
                          </div>

                          <h4 className="text-base sm:text-lg font-black text-[#002855] group-hover:text-amber-800 transition-colors">
                            {item.title}
                          </h4>

                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Itinerary details are being personalized. Contact our specialist for day-wise plan.
                  </p>
                )}
              </div>

              {/* INCLUSIONS & EXCLUSIONS TABLE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* INCLUSIONS */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[#002855]">
                        What is Included
                      </h4>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        Zero hidden surprises or extra charges
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated private commercial cab with experienced mountain driver.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Handpicked 3★/4★ hotel stays on double/triple sharing basis.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Daily fresh breakfast & dinner buffet as per itinerary.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>All state permits, toll taxes, parking fees, and fuel charges.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Driver food, lodging allowances, and night charges included.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>24/7 dedicated on-trip trip coordinator assistance on call.</span>
                    </li>
                  </ul>
                </div>

                {/* EXCLUSIONS */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-200/80 shadow-xs">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-rose-100">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                      <X size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[#002855]">
                        What is Excluded
                      </h4>
                      <p className="text-[11px] text-rose-600 font-semibold">
                        Transparent personal expense details
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>Airfare or train tickets to your arrival/pickup city.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>Personal shopping, laundry, heater charges, and room service.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>Monument, museum, or wildlife park entry tickets & camera fees.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>Optional adventure activities (river rafting, paragliding, skiing).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>Travel insurance or medical emergency costs.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* FLEET & VEHICLE OPTIONS */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Car size={18} className="text-amber-600" />
                  <h4 className="text-base sm:text-lg font-black text-[#002855]">
                    Available Private Vehicle Choices
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-light mb-4">
                  All our commercial cabs are driven by certified mountain chauffeurs with clean interiors:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-xs font-bold text-amber-700 uppercase">Sedan</span>
                    <h5 className="font-black text-[#002855] text-sm mt-0.5">Dzire / Etios</h5>
                    <p className="text-[11px] text-slate-500 mt-1">Ideal for 2–3 Guests</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-xs font-bold text-amber-700 uppercase">SUV</span>
                    <h5 className="font-black text-[#002855] text-sm mt-0.5">Ertiga</h5>
                    <p className="text-[11px] text-slate-500 mt-1">Ideal for 4–5 Guests</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-xs font-bold text-amber-700 uppercase">Luxury SUV</span>
                    <h5 className="font-black text-[#002855] text-sm mt-0.5">Innova Crysta</h5>
                    <p className="text-[11px] text-slate-500 mt-1">Ideal for 5–6 Guests</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-xs font-bold text-amber-700 uppercase">Mini Bus</span>
                    <h5 className="font-black text-[#002855] text-sm mt-0.5">Tempo Traveller</h5>
                    <p className="text-[11px] text-slate-500 mt-1">For 9–14 Guests Group</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY BOOKING CARD (4 COLS) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-5">
              <div className="bg-gradient-to-b from-[#001733] via-[#002855] to-[#001b3d] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-amber-400/80 relative overflow-hidden">
                {/* Shimmer light */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest font-extrabold text-amber-300">
                      Pricing & Quotation
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                      Best Price Guaranteed
                    </span>
                  </div>

                  <div className="mb-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Customized Quote
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      Tailor-Made for your exact dates & group size
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-300 font-light mb-5">
                    *Instant pricing customized to your preferred hotel category (Standard, 3★, 4★) & private vehicle choice.
                  </p>

                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 mb-6 text-xs text-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Selected Plan:</span>
                      <span className="font-bold text-amber-300">{currentPlan.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Advance Token:</span>
                      <span className="font-bold text-emerald-300">₹0 To Inquire</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="space-y-3">
                    <Link
                      href={`/contact-us?package=${encodeURIComponent(pkg.title)}&days=${encodeURIComponent(currentPlan.days || "5")}`}
                      className="group w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                    >
                      <span>Customize & Book Package</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`https://wa.me/918580636332?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </Link>

                    <Link
                      href="tel:+918580636332"
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Phone size={13} className="text-amber-300" />
                      <span>Direct Call: +91 85806 36332</span>
                    </Link>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 text-center">
                    <p className="text-[11px] text-slate-300 font-light flex items-center justify-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span>Official Himachal Gov-Recognized Agency</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* AGENCY SUMMARY BOX */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs text-xs text-slate-600 space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#002855] text-sm">
                  <HelpCircle size={16} className="text-amber-600" />
                  <span>Why Book With Namoh?</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>100% tailor-made routes without group bus delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>Direct local driver coordination with zero middlemen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>Secure advance token with instant official confirmation receipt.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* OTHER PACKAGES CAROUSEL / GRID */}
          {otherPackages.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                    Explore More Holidays
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002855] mt-1">
                    Other Popular Indian Circuits
                  </h3>
                </div>
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>View All Packages</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherPackages.map((item) => (
                  <Link
                    key={item.id}
                    href={`/packages/${item.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[#002855] shadow-xs">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-black text-[#002855] text-base group-hover:text-amber-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-light mt-1.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                            Custom Tour
                          </span>
                          <p className="text-xs font-black text-[#002855]">
                            Best Price Guaranteed
                          </p>
                        </div>
                        <span className="text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MOBILE STICKY BOTTOM BAR */}
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 sm:p-4 z-40 md:hidden flex items-center justify-between gap-3 shadow-[0_-8px_25px_rgba(0,0,0,0.12)]">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700 block">
              Customized Tour
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-[#002855]">
                Get Free Quote
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`https://wa.me/918580636332?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm active:scale-95 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </Link>

            <Link
              href={`/contact-us?package=${encodeURIComponent(pkg.title)}&days=${encodeURIComponent(currentPlan.days || "5")}`}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>Book Quote</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
