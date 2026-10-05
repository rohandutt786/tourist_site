import { Star, Quote, CheckCircle2 } from "lucide-react";
import content from "@/data/content.json";

export default function HomeReviews() {
  const reviews = (content as any).reviews || [];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-xs">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            <span>Guest Experiences</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
            What Our Travelers Say
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
            Real feedback from families, couples, and adventurers who trusted Namoh Tourism with their holidays.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev: any) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-xl border border-slate-200/80 hover:border-amber-400/50 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars + Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < (rev.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-200"
                        }
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-1.5">
                      {rev.rating || 5}.0
                    </span>
                  </div>
                  <Quote size={28} className="text-amber-200/60 group-hover:text-amber-400/60 transition-colors" />
                </div>

                {/* Tour Name Badge */}
                <div className="mb-3.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#002855] text-xs font-bold">
                    {rev.tour}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Bottom Author Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#002855] transition-colors">
                    {rev.name}
                  </h4>
                  <span className="text-slate-500">{rev.location} • {rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Verified Guest</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
