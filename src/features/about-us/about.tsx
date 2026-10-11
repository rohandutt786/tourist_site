/* eslint-disable react-hooks/refs */
"use client";
import Image from "next/image";
import content from "@/data/content.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutUsFeature() {
  const { about } = content;
  const { team, gallery } = about; // Add gallery

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#002855]">
          {about.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {about.subtitle}
        </p>
      </div>

      {/* Main Image */}
      {/* <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-16">
        <Image src={about.image} alt="About us" fill className="object-cover" />
      </div> */}

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src={about.mission.image}
              alt={about.mission.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3 text-[#002855]">
              {about.mission.title}
            </h2>
            <p className="text-gray-600">{about.mission.text}</p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src={about.vision.image}
              alt={about.vision.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3 text-[#002855]">
              {about.vision.title}
            </h2>
            <p className="text-gray-600">{about.vision.text}</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-6 text-[#002855]">Our Team</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Meet the people who make our mission possible
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-8 mb-20">
        {team.map((member, index) => (
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
            <p className="text-[#d4af37] font-semibold text-xs tracking-wider uppercase text-center">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      {/* Gallery Section */}
      {/* Gallery Slider Section */}
      {gallery && gallery.length > 0 && (
        <div className="mb-20 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-[#002855]">Gallery</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A glimpse of our journeys and adventures
            </p>
          </div>

          {/* Lucide Custom Arrows */}
          {/* Lucide Custom Arrows */}
          <button
            ref={prevRef}
            className="absolute left-0  top-[70%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#002855]" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-[70%] -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-[#002855]" />
          </button>

          <Swiper
            modules={[Navigation, Scrollbar, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              prevEl: prevRef.current,
              // eslint-disable-next-line react-hooks/refs
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
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="gallery_swiper"
          >
            {gallery.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
