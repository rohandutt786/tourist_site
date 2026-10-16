"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import content from "@/data/content.json";
import OfferRibbonBadge from "@/components/offers/OfferRibbonBadge";

export default function HomeTours() {
  const tours = content.tours;

  const tourSlugMap: Record<number, string> = {
    1: "shimla-manali-tour",
    2: "jammu-kashmir-adventure",
    3: "rajasthan-heritage-tour",
    4: "uttarakhand-nature-trip",
    5: "kerala-backwaters-munnar-tour",
  };

  return (
    <section id="packages" className="scroll-mt-28 max-w-[1600px] mx-auto px-6 py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* SECTION HEADER */}
      <div className="text-center mb-14 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-xs">
          <Sparkles size={13} className="text-amber-600" />
          <span>Handcrafted Indian Circuits</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
          Popular Tourist Destinations
        </h2>
        <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
          From snow-capped Himalayan peaks to royal heritage palaces — explore our most loved holiday circuits.
        </p>
      </div>

      {/* MARQUEE CAROUSEL */}
      <div className="relative">
        {/* Subtle edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />

        <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-2">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/packages/${tourSlugMap[tour.id] || ""}`}
              scroll={true}
              className="mx-4 sm:mx-6 w-[310px] sm:w-[350px] block group select-none py-3"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-amber-400/50 transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden flex flex-col h-[490px] sm:h-[510px]">
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Destination Tag (Full Name, No Truncation) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#002855] text-xs font-extrabold shadow-md">
                      <MapPin size={13} className="text-amber-600 shrink-0" />
                      <span>{tour.title}</span>
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="text-2xl font-bold tracking-tight drop-shadow-md">
                      {tour.title}
                    </h3>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-2 h-10">
                    {tour.description}
                  </p>

                  {/* Festive Offer Badge inside card */}
                  <div className="mb-3">
                    <OfferRibbonBadge size="sm" />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002855] group-hover:text-amber-700 transition-colors">
                    <span className="uppercase tracking-wider">Explore Packages</span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
