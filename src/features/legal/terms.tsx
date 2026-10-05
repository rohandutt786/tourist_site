import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
            <FileText size={13} className="text-amber-600" />
            <span>Legal Documentation</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002855] tracking-tight font-sans">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed font-light">
            Please read these terms carefully before booking your tour package with <strong className="font-semibold text-slate-800">Namoh Tourism</strong>. By confirming a booking, you agree to comply with the policies outlined below.
          </p>
          <span className="text-xs text-slate-400 mt-4 block">Last Updated: March 2026</span>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              1. Booking & Payment Policy
            </h2>
            <ul className="space-y-3 list-disc pl-5 text-slate-600">
              <li>
                <strong>Advance Deposit:</strong> A minimum advance deposit of 30% to 50% of the total tour package cost is required to confirm hotel reservations and private cab allocation.
              </li>
              <li>
                <strong>Balance Payment:</strong> The remaining balance must be cleared as per the agreed schedule — either 7 days prior to travel or on the first day of arrival at the designated starting point.
              </li>
              <li>
                <strong>Booking Voucher:</strong> Formal hotel vouchers and driver contact details will be shared 24 to 48 hours prior to your journey date.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              2. Customised Itinerary & Vehicle Guidelines
            </h2>
            <ul className="space-y-3 list-disc pl-5 text-slate-600">
              <li>
                <strong>Point-to-Point Service:</strong> Dedicated private cabs are provided for the sightseeing itinerary mentioned in your package. Vehicles are not on a 24-hour disposal basis for off-itinerary travel.
              </li>
              <li>
                <strong>Local Union Cab Restrictions:</strong> In select mountainous destinations (such as Rohtang Pass, Solang Valley in Himachal, or Aru/Betaab Valley in Kashmir), local union vehicles or pony rides may be required as per government regulations and are chargeable directly unless explicitly included.
              </li>
              <li>
                <strong>AC in Hilly Terrains:</strong> In compliance with safety standards on steep mountain roads, cab air-conditioning may be turned off while ascending hilly terrain.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              3. Weather Conditions & Force Majeure
            </h2>
            <p className="text-slate-600 mb-3">
              Namoh Tourism shall not be held liable for any delay, itinerary modification, or cancellation caused by acts of God, unexpected heavy snowfall, landslides, highway blockages, strikes, or government restrictions.
            </p>
            <p className="text-slate-600">
              In such unforeseen events, our team will make all best efforts to arrange alternative routes or accommodations. Any additional lodging or transport costs incurred due to natural delays will be borne by the traveler.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002855] mb-4 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-600 inline-block" />
              4. Identification & Guest Conduct
            </h2>
            <ul className="space-y-3 list-disc pl-5 text-slate-600">
              <li>
                All travelers must carry valid government photo identification (Aadhaar Card, Passport, or Voter ID). PAN card is not accepted by hotels as address proof.
              </li>
              <li>
                Travelers are responsible for their personal belongings, jewelry, and luggage during the trip.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
