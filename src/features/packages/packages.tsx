"use client";

import { useState } from "react";
import Image from "next/image";
import content from "@/data/content.json";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Bus,
  Car,
  ChevronLeft,
  ChevronRight,
  Coffee,
  HomeIcon,
} from "lucide-react";

type PackageType = {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  description: string;
  facilities?: {
    transport?: string[];
    meal?: boolean;
    hotel?: boolean;
    tourImages?: string[];
    itinerary?: {
      Cab?: string[];
      Volvo?: string[];
    };
  };
};

export default function PackagesFeature() {
  const { packages } = content as { packages: PackageType[] };

  const [selectedPkg, setSelectedPkg] = useState<PackageType | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-14">
        Our Tour Packages
      </h2>

      {/* PACKAGES GRID */}

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative h-56">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-blue-600">
                {pkg.price}
              </Badge>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-1">
              {/* TITLE */}
              <h3 className="text-xl font-semibold truncate">{pkg.title}</h3>

              {/* LOCATION */}
              <p className="flex items-center gap-1 text-sm text-gray-500 mt-1 truncate">
                <MapPin size={14} /> {pkg.location}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {pkg.description}
              </p>

              {/* BUTTON FIXED AT BOTTOM */}
              <Button
                className="w-full mt-auto"
                onClick={() => {
                  setSelectedPkg(pkg);
                  setCurrentImage(0);
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* DIALOG */}
      <Dialog open={!!selectedPkg} onOpenChange={() => setSelectedPkg(null)}>
        <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-2xl">
          {selectedPkg && (
            <>
              {/* IMAGE SLIDER */}
              {selectedPkg.facilities?.tourImages && (
                <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden bg-gray-100">
                  <div
                    className="flex w-full h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
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
                          sizes="(max-width: 768px) 100vw, 700px"
                          className="object-cover blur-2xl scale-110 opacity-40"
                        />

                        {/* main image */}
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 700px"
                          className="object-contain z-10"
                        />
                      </div>
                    ))}
                  </div>

                  {/* LEFT BUTTON */}
                  <button
                    onClick={() =>
                      setCurrentImage((prev) => {
                        const total =
                          selectedPkg.facilities!.tourImages!.length;
                        return prev === 0 ? total - 1 : prev - 1;
                      })
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
                  >
                    <ChevronLeft />
                  </button>

                  {/* RIGHT BUTTON */}
                  <button
                    onClick={() =>
                      setCurrentImage((prev) => {
                        const total =
                          selectedPkg.facilities!.tourImages!.length;
                        return prev === total - 1 ? 0 : prev + 1;
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}

              {/* HEADER */}
              <DialogHeader className="mt-5">
                <DialogTitle className="text-3xl">
                  {selectedPkg.title}
                </DialogTitle>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} /> {selectedPkg.location}
                </p>

                {/* FACILITIES ICONS */}
                <div className="flex items-center gap-6 mt-3">
                  {selectedPkg.facilities?.meal && (
                    <div className="flex items-center gap-2 text-orange-500">
                      <Coffee size={18} />
                      <span className="text-sm font-medium">Meal</span>
                    </div>
                  )}
                  {selectedPkg.facilities?.hotel && (
                    <div className="flex items-center gap-2 text-purple-600">
                      <HomeIcon size={18} />
                      <span className="text-sm font-medium">Hotel</span>
                    </div>
                  )}
                </div>
              </DialogHeader>

              {/* TRANSPORT SELECT */}
              {/* TRANSPORT SELECT WITH CITY-WISE ITINERARY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {selectedPkg.facilities?.transport?.map((mode) => {
                  const transportMode = mode as "Cab" | "Volvo";

                  const itinerary = selectedPkg.facilities?.itinerary;

                  // 🔹 CASE 1: FLAT (Manali, J&K)
                  if (Array.isArray(itinerary?.[transportMode])) {
                    return (
                      <div key={mode} className="border rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          {mode === "Cab" ? (
                            <Car className="text-blue-600" />
                          ) : (
                            <Bus className="text-green-600" />
                          )}
                          <div>
                            <p className="font-semibold">By {mode}</p>
                            <p className="text-xs text-gray-500">
                              {mode === "Cab"
                                ? "Private Travel"
                                : "AC Luxury Bus"}
                            </p>
                          </div>
                        </div>

                        <ul className="space-y-2 text-sm">
                          {itinerary?.[transportMode]?.map(
                            (day: string, i: number) => (
                              <li
                                key={i}
                                className={`${
                                  mode === "Cab" ? "bg-blue-50" : "bg-green-50"
                                } rounded-lg px-3 py-2`}
                              >
                                {day}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  }

                  // 🔹 CASE 2: CITY-WISE (Rajasthan, Uttarakhand)
                  return (
                    <div key={mode}>
                      {Object.entries(itinerary || {}).map(
                        ([city, plans]: [string, any]) =>
                          plans?.[mode] && (
                            <div
                              key={city}
                              className="border rounded-xl p-4 mb-4"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                {mode === "Cab" ? (
                                  <Car className="text-blue-600" />
                                ) : (
                                  <Bus className="text-green-600" />
                                )}
                                <div>
                                  <p className="font-semibold">
                                    {city} by {mode}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {mode === "Cab"
                                      ? "Private Travel"
                                      : "AC Luxury Bus"}
                                  </p>
                                </div>
                              </div>

                              <ul className="space-y-2 text-sm">
                                {plans[mode].map((day: string, i: number) => (
                                  <li
                                    key={i}
                                    className={`${
                                      mode === "Cab"
                                        ? "bg-blue-50"
                                        : "bg-green-50"
                                    } rounded-lg px-3 py-2`}
                                  >
                                    {day}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
