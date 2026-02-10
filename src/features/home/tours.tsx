"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import content from "@/data/content.json";

export default function HomeTours() {
  const tours = content.tours; // get the tours array from JSON

  return (
    <section id="packages" className="max-w-[1600px] mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#003566]">
        Popular Tourist Spots
      </h2>

      <Marquee gradient={false} speed={50}>
        {tours.map((tour) => (
          <Link
            key={tour.id}
            href="/packages"
            className="mx-6 min-w-[350px] max-w-[400px] block"
          >
            <div className="bg-white rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-4 hover:shadow-2xl">
              <div className="relative h-80 w-full">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-[#003566]">
                  {tour.title}
                </h3>
                <p className="text-gray-700 text-base">{tour.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
