import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";
import content from "@/data/content.json";

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-gradient-to-b from-[#001f3f] via-[#001730] to-[#000f21] text-slate-300 pt-16 pb-10 border-t border-amber-500/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 relative z-10">
        {/* Company Info */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="inline-block group select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/namoh_tourism_navy.svg"
              alt="Namoh Tourism Logo"
              width={200}
              height={100}
              className="h-24 sm:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm">
            {footer.description} Specialising in bespoke, custom tour packages for Himachal, Kashmir, Rajasthan & Uttarakhand.
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-amber-300/90 font-medium">
            <ShieldCheck size={16} className="text-[#d4af37]" />
            <span>Govt. Registered & Verified Tour Operator</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="font-bold text-white text-base mb-4 tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-500 inline-block" />
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {footer.quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="text-slate-300 hover:text-amber-300 hover:translate-x-1.5 transition-all duration-200 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-4">
          <h4 className="font-bold text-white text-base mb-4 tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#d4af37] to-amber-500 inline-block" />
            Contact & Support
          </h4>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#d4af37] flex-shrink-0" />
              <a
                href={`mailto:${footer.contact.email}`}
                className="hover:text-amber-300 transition-colors"
              >
                {footer.contact.email}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#d4af37] flex-shrink-0" />
              <a
                href={`tel:${footer.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-amber-300 transition-colors font-medium text-white"
              >
                {footer.contact.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#d4af37] flex-shrink-0" />
              <span className="text-slate-400">Mon – Sat: 9:00 AM – 7:00 PM</span>
            </li>

            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-[#d4af37] flex-shrink-0" />
              <span className="text-slate-400">New Delhi & Pan-India Operations</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span>© {new Date().getFullYear()} {footer.companyName}. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <Link href="/terms-and-conditions" className="hover:text-amber-300 transition-colors">
            Terms & Conditions
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons with Gold Hover */}
        <div className="flex items-center space-x-4">
          <span className="text-slate-500 text-xs mr-1 hidden sm:inline">Follow us:</span>
          <a
            href={footer.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-200"
          >
            <FaInstagram size={15} />
          </a>

          <a
            href={footer.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-200"
          >
            <FaFacebook size={15} />
          </a>

          <a
            href={footer.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-200"
          >
            <FaYoutube size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
