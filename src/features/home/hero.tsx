"use client";
import Image from "next/image";
import content from "@/data/content.json";

export default function HomeHero() {
  const { homeHero } = content;

  const handleScroll = () => {
    document.getElementById("packages")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full">
      {/* MOBILE IMAGE */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={homeHero.mobileImage}
          alt={homeHero.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* DESKTOP IMAGE */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={homeHero.image}
          alt={homeHero.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {homeHero.title}
          </h1>
          <p className="text-lg md:text-xl mb-6">{homeHero.subtitle}</p>
          <button
            onClick={handleScroll}
            className="px-6 py-3 bg-[#003566] rounded-lg hover:bg-[#002244] transition-colors"
          >
            {homeHero.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
