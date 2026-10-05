import Link from "next/link";
import { Compass, ShieldCheck, UserCheck, Headphones, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Compass,
      title: "100% Customised Plans",
      description: "Every trip is planned around your pace, preferences, and budget with day-wise itinerary flexibility.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Premium Stays",
      description: "Handpicked 3-star & 4-star hotels with excellent hospitality, central locations, and complimentary meals.",
    },
    {
      icon: UserCheck,
      title: "Experienced Local Drivers",
      description: "Dedicated private sanitized cabs with polite, mountain-trained drivers who double as local guides.",
    },
    {
      icon: Headphones,
      title: "24/7 On-Tour Support",
      description: "Your personal trip coordinator is always a call or WhatsApp message away for instant assistance.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-xs">
            <Award size={13} className="text-amber-600" />
            <span>The Namoh Advantage</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
            Why Travel With Namoh Tourism?
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
            We don’t believe in one-size-fits-all tours. We craft memorable, stress-free journeys backed by personalized local care.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 shadow-xs hover:shadow-xl border border-slate-200/70 hover:border-amber-400/50 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200/60 text-[#002855] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#002855] group-hover:text-amber-400 transition-all duration-300 shadow-xs">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#002855] transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <CheckCircle2 size={14} className="text-amber-500" />
                  <span>Guaranteed Quality</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#001f3f] via-[#002855] to-[#001733] text-white p-8 sm:p-12 shadow-xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle glow circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="text-amber-400 text-xs uppercase tracking-widest font-bold block mb-2">
              ✦ Ready to Plan Your Dream Getaway?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get a Free Customised Itinerary & Quote
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Tell us your travel dates, group size, and preferred destination — our holiday planner will curate the ideal package within 2 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3cb65] to-[#b8860b] text-[#001733] font-bold text-sm shadow-lg hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Contact Travel Expert</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/packages"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm transition-all duration-300 text-center"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
