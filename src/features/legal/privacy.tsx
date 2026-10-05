import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#002855] hover:text-amber-700 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/80 mb-3 shadow-xs">
            <ShieldCheck size={13} className="text-amber-600" />
            <span>Privacy & Data Protection</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
            Privacy Policy
          </h1>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
            At <strong className="font-semibold text-slate-800">Namoh Tourism</strong>, your privacy and trust are our highest priorities. This policy explains how we collect, use, and protect your personal information when you use our website and travel services.
          </p>
          <span className="text-xs text-slate-400 mt-4 block">Last Updated: March 2026</span>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              1. Information We Collect
            </h2>
            <p className="text-slate-600 mb-3">
              When you submit an inquiry, request a customized quotation, or confirm a tour booking, we may collect:
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-slate-600">
              <li>
                <strong>Contact Information:</strong> Full name, email address, mobile/WhatsApp number, and residential city.
              </li>
              <li>
                <strong>Travel Preferences:</strong> Preferred travel dates, destination choices (Himachal, Kashmir, Rajasthan, Uttarakhand), number of adults/children, and room preferences.
              </li>
              <li>
                <strong>Identity Records:</strong> Government-issued ID details (Aadhaar or Passport) required solely for hotel registration and local permits.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-3">
              The information we collect is strictly used to deliver seamless travel experiences, including:
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-slate-600">
              <li>Reserving hotel rooms, homestays, and houseboats on your behalf.</li>
              <li>Assigning licensed, verified drivers and private cabs for your itinerary.</li>
              <li>Sharing booking confirmations, trip vouchers, and itinerary updates via WhatsApp or email.</li>
              <li>Providing 24/7 on-tour customer support during your journey.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              3. Data Security & Confidentiality Commitment
            </h2>
            <p className="text-slate-600 mb-3">
              <strong className="text-emerald-700">We do NOT sell, rent, or trade your personal data.</strong> Your information is never sold to third-party telemarketers or external advertisers.
            </p>
            <p className="text-slate-600">
              Your details are shared strictly on a need-to-know basis with our verified travel partners (partnered hotels and allocated drivers) solely for fulfilling your scheduled trip.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              4. Cookies & Website Analytics
            </h2>
            <p className="text-slate-600 mb-3">
              Our website uses minimal, standard session cookies to ensure quick page load times, remember preferences, and analyze website traffic anonymously. No sensitive financial information is ever stored in website cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
