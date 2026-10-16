/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import content from "@/data/content.json";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  MapPin,
  Car,
  ChevronLeft,
  ChevronRight,
  Coffee,
  HomeIcon,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Gift,
} from "lucide-react";
import { getActiveOffer } from "@/config/offers.config";
import OfferRibbonBadge from "@/components/offers/OfferRibbonBadge";
import OfferModalCallout from "@/components/offers/OfferModalCallout";

type ItineraryItem = {
  day: string;
  title: string;
  description: string;
};

type DurationPlan = {
  duration: string;
  days: string;
  nights: string;
  plans?: {
    Cab?: ItineraryItem[];
    Volvo?: ItineraryItem[];
    [key: string]: ItineraryItem[] | undefined;
  };
  itinerary?: ItineraryItem[];
};

type PackageType = {
  id: number;
  slug?: string;
  title: string;
  location: string;
  image: string;
  price?: string;
  description: string;
  facilities?: {
    transport?: string[];
    meal?: boolean;
    hotel?: boolean;
    tourImages?: string[];
    durationPlans?: DurationPlan[];
    itinerary?: any;
  };
};

export default function PackagesFeature() {
  const { packages } = content as { packages: PackageType[] };
  const offer = getActiveOffer();

  const [selectedPkg, setSelectedPkg] = useState<PackageType | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-white via-slate-50/40 to-white">
      {/* SECTION HEADER */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        {offer && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/25 to-amber-600/15 border border-amber-300/80 text-xs sm:text-sm font-bold text-amber-900 mb-4 shadow-sm animate-pulse">
            <span>{offer.emoji}</span>
            <span>{offer.offerTitle}</span>
            <span className="text-amber-400">•</span>
            <span className="text-amber-800 font-semibold">{offer.discountText} Valid till {offer.validTillDisplay}</span>
          </div>
        )}
        <br />
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-xs">
          <Sparkles size={13} className="text-amber-600" />
          <span>Curated Holiday Packages</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
          Our Handcrafted Tour Packages
        </h2>
        <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
          All-inclusive itineraries with private sanitized cabs, verified hotel stays, daily meals & custom day-wise plans.
        </p>
      </div>

      {/* PACKAGES GRID */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border border-slate-200/80 hover:border-amber-400/50 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col group"
          >
            {/* IMAGE */}
            <Link
              href={`/packages/${pkg.slug || pkg.id}`}
              className="relative h-64 md:h-72 overflow-hidden block"
            >
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Festive Offer Badge Top Right */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <OfferRibbonBadge size="sm" />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                {/* TITLE */}
                <h3 className="text-xl font-bold truncate text-[#002855] group-hover:text-amber-700 transition-colors">
                  <Link href={`/packages/${pkg.slug || pkg.id}`}>
                    {pkg.title}
                  </Link>
                </h3>

                {/* LOCATION */}
                <p className="flex items-center gap-1 text-xs font-medium text-slate-500 mt-1 truncate">
                  <MapPin size={13} className="text-amber-600" /> {pkg.location}
                </p>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed font-light">
                  {pkg.description}
                </p>
              </div>

              <div>
                {/* CUSTOM TOUR & DURATION STRIP */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Custom Tour
                    </span>
                    <p className="text-base font-black text-[#002855]">
                      Best Price Guaranteed
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {pkg.facilities?.durationPlans?.[0]?.duration || "Custom Days"}
                  </span>
                </div>

                {/* BUTTON FIXED AT BOTTOM */}
                <Link
                  href={`/packages/${pkg.slug || pkg.id}`}
                  className="w-full mt-4 bg-[#002855] hover:bg-[#001733] text-white font-bold text-sm rounded-xl py-3 border border-amber-500/20 hover:border-amber-400/60 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Full Details & Itinerary</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIALOG */}
      <Dialog open={!!selectedPkg} onOpenChange={() => setSelectedPkg(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl">
          {selectedPkg &&
            (() => {
              const totalImages =
                selectedPkg.facilities?.tourImages?.length || 0;

              // Extract duration plans or fallback
              const durationPlans: DurationPlan[] =
                selectedPkg.facilities?.durationPlans || [];

              const currentDurationPlan =
                durationPlans[selectedDurationIndex] || durationPlans[0];

              // Resolve day-wise itinerary list
              let daysList: ItineraryItem[] = [];

              if (currentDurationPlan) {
                if (currentDurationPlan.itinerary) {
                  daysList = currentDurationPlan.itinerary;
                } else if (currentDurationPlan.plans?.Cab) {
                  daysList = currentDurationPlan.plans.Cab;
                } else if (currentDurationPlan.plans?.Volvo) {
                  daysList = currentDurationPlan.plans.Volvo;
                } else if (currentDurationPlan.plans) {
                  const firstKey = Object.keys(currentDurationPlan.plans)[0];
                  daysList = currentDurationPlan.plans[firstKey] || [];
                }
              }

              // Fallback for legacy format if durationPlans is empty
              if (daysList.length === 0 && selectedPkg.facilities?.itinerary) {
                const legacyItin = selectedPkg.facilities.itinerary;
                const legacyList =
                  legacyItin.Cab ||
                  legacyItin.Volvo ||
                  [];

                if (Array.isArray(legacyList)) {
                  daysList = legacyList.map((item: string, idx: number) => {
                    const dayMatch = item.match(/Day\s*0?(\d+)[:\s-]*(.*)/i);
                    if (dayMatch) {
                      const dayNum = dayMatch[1];
                      const rest = dayMatch[2].trim();
                      const descMatch = rest.match(/^(.*?)\s*\((.*?)\)$/);
                      if (descMatch) {
                        return {
                          day: `Day ${dayNum}`,
                          title: descMatch[1],
                          description: descMatch[2],
                        };
                      }
                      return {
                        day: `Day ${dayNum}`,
                        title: rest,
                        description: "",
                      };
                    }
                    return {
                      day: `Day ${idx + 1}`,
                      title: item,
                      description: "",
                    };
                  });
                }
              }

              return (
                <div className="space-y-6">
                  {/* IMAGE SLIDER */}
                  {selectedPkg.facilities?.tourImages && (
                    <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden bg-gray-100">
                      <div
                        className="flex w-full h-full transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${currentImage * 100}%)`,
                        }}
                      >
                        {selectedPkg.facilities.tourImages.map((img, i) => (
                          <div
                            key={i}
                            className="relative min-w-full h-full flex items-center justify-center"
                          >
                            {/* soft blurred background */}
                            <Image
                              src={img}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 850px"
                              className="object-cover blur-2xl scale-110 opacity-40"
                            />

                            {/* main image */}
                            <Image
                              src={img}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 850px"
                              className="object-contain z-10"
                            />
                          </div>
                        ))}
                      </div>

                      {/* LEFT BUTTON */}
                      {totalImages > 1 && currentImage > 0 && (
                        <button
                          type="button"
                          onClick={() => setCurrentImage((prev) => prev - 1)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white z-20 cursor-pointer"
                        >
                          <ChevronLeft size={20} />
                        </button>
                      )}
                      {/* RIGHT BUTTON */}
                      {totalImages > 1 && currentImage < totalImages - 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentImage((prev) => prev + 1)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white z-20 cursor-pointer"
                        >
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* HEADER */}
                  <DialogHeader className="pt-2">
                    <DialogTitle className="text-2xl md:text-3xl font-extrabold text-[#002855]">
                      {selectedPkg.title}
                    </DialogTitle>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                      <MapPin size={15} className="text-amber-600" />{" "}
                      {selectedPkg.location}
                    </p>

                    {/* OVERVIEW DESCRIPTION */}
                    <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed font-light">
                      {selectedPkg.description}
                    </p>

                    {/* FACILITIES ICONS */}
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                      {selectedPkg.facilities?.meal && (
                        <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                          <Coffee size={15} />
                          <span>Meals Included</span>
                        </div>
                      )}

                      {selectedPkg.facilities?.hotel && (
                        <div className="flex items-center gap-1.5 text-[#002855] bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                          <HomeIcon size={15} />
                          <span>Hotel Stay</span>
                        </div>
                      )}

                      {selectedPkg.facilities?.transport?.length ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                          <Car size={15} />
                          <span>{selectedPkg.facilities.transport.join(" / ")}</span>
                        </div>
                      ) : null}
                    </div>
                  </DialogHeader>

                  <div className="pt-4 border-t border-gray-100">
                    {/* DURATION FILTER PILLS (DAYWISE FILTERING) */}
                    {durationPlans.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                          Select Duration:
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          {durationPlans.map((plan, idx) => {
                            const isSelected = selectedDurationIndex === idx;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedDurationIndex(idx)}
                                className={`px-5 py-2.5 rounded-2xl text-center transition-all duration-200 border flex flex-col items-center justify-center min-w-[105px] cursor-pointer ${
                                  isSelected
                                    ? "bg-[#002855] text-white border-[#002855] shadow-md ring-2 ring-[#002855]/20 scale-[1.02]"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                                }`}
                              >
                                <span className="text-sm font-bold leading-tight">
                                  {plan.days}
                                </span>
                                <span
                                  className={`text-xs leading-tight mt-0.5 ${
                                    isSelected
                                      ? "text-amber-200"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {plan.nights}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* VERTICAL CONNECTED TIMELINE */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Sparkles size={18} className="text-amber-600" />
                        <h4 className="font-bold text-lg text-[#002855]">
                          Day-wise Itinerary ({currentDurationPlan?.duration || `${daysList.length} Days`})
                        </h4>
                      </div>

                      <div className="relative pl-2 sm:pl-3 space-y-7">
                        {/* Continuous Vertical Timeline Line */}
                        <div className="absolute left-[33px] sm:left-[37px] top-4 bottom-4 w-[2px] bg-amber-300/60 z-0" />

                        {daysList.map((dayItem, index) => (
                          <div
                            key={index}
                            className="relative flex items-start gap-4 sm:gap-6 z-10"
                          >
                            {/* Day Node Badge */}
                            <div className="flex-shrink-0 bg-white border-2 border-[#002855] text-[#002855] font-extrabold rounded-full px-3 py-1 shadow-xs flex items-center justify-center min-w-[64px] sm:min-w-[70px]">
                              <span className="text-xs whitespace-nowrap">
                                {dayItem.day}
                              </span>
                            </div>

                            {/* Day Title & Description */}
                            <div className="pt-0.5 flex-1 pr-2">
                              <h5 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                                {dayItem.title}
                              </h5>
                              {dayItem.description && (
                                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                                  {dayItem.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* STANDARD PLAN IS BASED ON */}
                    <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200/90 p-5">
                      <h5 className="font-bold text-[#002855] text-sm md:text-base mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-3.5 rounded-full bg-[#d4af37]" />
                        Standard plan is based on
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Private cab for the whole trip</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Hotel stay</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Daily breakfast</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>Sightseeing as per the plan</span>
                        </div>
                      </div>
                    </div>

                    {/* FESTIVE OFFER CALLOUT */}
                    <OfferModalCallout className="mt-4" />

                    {/* PLEASE NOTE CALLOUT */}
                    <div className="mt-4 rounded-xl border-l-4 border-amber-500 bg-amber-50/70 border border-amber-200/80 p-4">
                      <p className="text-xs md:text-sm text-amber-950 leading-relaxed">
                        <strong className="font-semibold text-amber-900">
                          Please note:
                        </strong>{" "}
                        this is a standard, rough itinerary by cab. Volvo + cab, flights, hotels, route and price are customised to your requirements.
                      </p>
                    </div>

                    {/* ENQUIRE / CONTACT CTA */}
                    <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#002855] to-[#001f42] p-5 md:p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/30">
                      <div>
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                          Customized Holiday Planning
                        </span>
                        <h4 className="text-lg md:text-xl font-extrabold mt-0.5">
                          Enquire About {selectedPkg.title}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md font-light">
                          Selected Plan: {currentDurationPlan?.duration || "Custom duration"}. We customize hotel stays, routes, and cab transfers as per your choice.
                        </p>
                      </div>

                      <Link
                        href={`/contact-us?destination=${encodeURIComponent(selectedPkg.title)}&days=${encodeURIComponent(currentDurationPlan?.days || "")}${offer ? `&deal=festive10` : ""}`}
                        className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <PhoneCall size={16} />
                        <span>Contact Us to Book</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </section>
  );
}
