"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight } from "lucide-react";

import { FAQ_DATA } from "@/data/faq.data";

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden" id="faq">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#002855]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle size={14} className="text-amber-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002855] tracking-tight leading-tight font-sans">
            Everything You Need to Know{" "}
            <span className="bg-gradient-to-r from-amber-600 to-[#d4af37] bg-clip-text text-transparent">
              Before Traveling
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Quick, transparent answers about our handcrafted tour packages, verified private cabs, hotel stays, and booking process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-amber-400/80 shadow-md shadow-amber-500/5"
                    : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black transition-colors shrink-0 ${
                        isOpen
                          ? "bg-[#002855] text-amber-300"
                          : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-900"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`text-sm sm:text-base md:text-lg font-bold transition-colors ${
                        isOpen ? "text-[#002855]" : "text-slate-800 group-hover:text-[#002855]"
                      }`}
                    >
                      {item.question}
                    </span>
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed border-t border-slate-100 font-light animate-in fade-in duration-200">
                    <p className="pl-10">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Help Consultation Card */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#001733] via-[#002855] to-[#001f42] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              <Sparkles size={13} className="text-amber-400" />
              <span>Personalized Trip Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Have specific dates or custom route in mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
              Tell us your travel dates, group size, and dream destinations for a customized quote.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Plan Custom Trip</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
