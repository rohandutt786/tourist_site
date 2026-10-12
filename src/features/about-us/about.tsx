/* eslint-disable react-hooks/refs */
"use client";

import Image from "next/image";
import content from "@/data/content.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Car,
  Hotel,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function AboutUsFeature() {
  const { about } = content;
  const { team, gallery, story, mission, vision } = about as any;

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Govt. Registered & Verified",
      desc: "Licensed tour operator with 100% adherence to legal travel standards across India.",
    },
    {
      icon: Car,
      title: "Private Sanitized Fleet",
      desc: "Experienced mountain-trained chauffeurs and modern, well-maintained vehicles.",
    },
    {
      icon: Hotel,
      title: "Handpicked Stays & Resorts",
      desc: "Clean, family-friendly hotels with scenic views and authentic local hospitality.",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated On-Trip Support",
      desc: "Direct phone and WhatsApp assistance on standby 24/7 throughout your vacation.",
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc]">
      {/* 1. Clean Light Header */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#002855]">
          {about.title}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {about.subtitle}
        </p>
      </section>

      {/* 2. Our Story ("Who We Are" Section) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
          {/* Left: Image with location badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-100">
              <Image
                src={about.image || "/images/our-team.jpg"}
                alt="Namoh Tourism Team"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating Location Tag */}
            <div className="absolute -bottom-4 -right-2 sm:right-4 bg-white/95 backdrop-blur-md border border-slate-200 py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-50 text-[#d4af37]">
                <MapPin size={20} className="text-[#002855]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Headquartered In</p>
                <p className="text-xs sm:text-sm font-extrabold text-[#002855]">Shimla, Himachal Pradesh</p>
              </div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#b8860b] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Who We Are</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002855] leading-snug">
              {story?.title || "Crafting Dream Vacations with Authentic Care"}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {story?.text}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {story?.subtext}
            </p>

            {/* Quote Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-transparent border-l-4 border-[#d4af37] space-y-1 mt-2">
              <p className="italic text-slate-800 font-medium text-xs sm:text-sm">
                &ldquo;{story?.quote || "Travel isn't just about reaching a destination; it's about feeling welcomed with genuine warmth and returning home with memories for a lifetime."}&rdquo;
              </p>
              <p className="text-[11px] font-bold text-[#002855] uppercase tracking-wider pt-1">
                — Namoh Tourism Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission & Our Vision (Bada & Detailed) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#002855]">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            The core principles and forward-looking vision that drive every holiday package we craft.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative h-60 sm:h-64 w-full bg-slate-100">
              <Image
                src={mission?.image || "/images/our-mission.jpg"}
                alt={mission?.title || "Our Mission"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-[#002855]">
                    {mission?.title || "Our Mission"}
                  </h3>
                  {mission?.tagline && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-[#b8860b] border border-amber-200">
                      Commitment
                    </span>
                  )}
                </div>
                {mission?.tagline && (
                  <p className="text-sm font-semibold text-[#b8860b] mb-3">
                    {mission.tagline}
                  </p>
                )}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {mission?.text}
                </p>
              </div>

              {mission?.points && mission.points.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {mission.points.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="text-[#d4af37] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-gray-700 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative h-60 sm:h-64 w-full bg-slate-100">
              <Image
                src={vision?.image || "/images/our-vision.jpg"}
                alt={vision?.title || "Our Vision"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-[#002855]">
                    {vision?.title || "Our Vision"}
                  </h3>
                  {vision?.tagline && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#002855] border border-blue-200">
                      Future
                    </span>
                  )}
                </div>
                {vision?.tagline && (
                  <p className="text-sm font-semibold text-[#b8860b] mb-3">
                    {vision.tagline}
                  </p>
                )}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {vision?.text}
                </p>
              </div>

              {vision?.points && vision.points.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {vision.points.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="text-[#d4af37] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-gray-700 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Travelers Trust Us (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#b8860b] uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Why Travelers Trust Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#002855] tracking-tight mb-3">
            Our Core Pillars of Service
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every holiday booked through Namoh Tourism is backed by our strict commitment to quality and transparency.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#002855] to-[#001733] text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={22} className="text-[#d4af37]" />
                  </div>
                  <h3 className="text-base font-bold text-[#002855] mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#002855]">
            Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Meet the dedicated people who make your travel journeys seamless and unforgettable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-8">
          {team.map((member: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-6 border border-slate-100 group hover:-translate-y-1"
            >
              <div className="relative w-48 h-56 mb-4 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-amber-500/20 bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.role}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-center text-[#002855]">
                {member.name}
              </h3>
              <p className="text-[#b8860b] font-semibold text-xs tracking-wider uppercase text-center">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#002855]">
              Gallery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              A glimpse into the cherished travels and scenic destinations experienced by our guests.
            </p>
          </div>

          <div className="relative">
            <button
              ref={prevRef}
              aria-label="Previous Slide"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white/95 p-2.5 rounded-full shadow-md hover:bg-[#002855] hover:text-white transition-colors flex items-center justify-center border border-slate-200 text-[#002855] cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              ref={nextRef}
              aria-label="Next Slide"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white/95 p-2.5 rounded-full shadow-md hover:bg-[#002855] hover:text-white transition-colors flex items-center justify-center border border-slate-200 text-[#002855] cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <Swiper
              modules={[Navigation, Scrollbar, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (
                  typeof swiper.params.navigation !== "boolean" &&
                  swiper.params.navigation
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="rounded-2xl py-2"
            >
              {gallery.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md group">
                    <Image
                      src={item.image}
                      alt={`Gallery moment ${index + 1}`}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}
