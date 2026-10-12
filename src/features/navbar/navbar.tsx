"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

type NavbarProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ setIsOpen }: NavbarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/packages" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#002855] border-b border-[#003875] shadow-md transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-1 rounded-lg text-white hover:bg-white/10 md:hidden cursor-pointer transition-colors"
            aria-label="Open menu"
          >
            <span className="text-2xl leading-none">☰</span>
          </button>

          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 select-none group py-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/namoh_tourism_navy.svg"
              alt="Namoh Tourism Logo"
              width={160}
              height={85}
              className="h-16 sm:h-20 md:h-[80px] w-auto object-contain group-hover:scale-105 transition-transform duration-300 flex-shrink-0 drop-shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-2xl md:text-[26px] font-black tracking-tight text-white group-hover:text-amber-100 transition-colors leading-none font-sans">
                Namoh <span className="text-[#d4af37]">Tourism</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-slate-300 mt-1">
                Explore India
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Links with Animated Underline */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative py-1.5 transition-colors duration-200 text-sm tracking-wide ${isActive
                    ? "text-[#d4af37] font-bold"
                    : "text-slate-200 hover:text-white"
                    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${isActive
                      ? "after:w-full after:bg-gradient-to-r after:from-[#d4af37] after:to-amber-300"
                      : "after:w-0 after:bg-[#d4af37] hover:after:w-full"
                    }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action Button: Book Now */}
        <div className="flex items-center">
          <Link
            href="/contact-us"
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#002855] text-xs md:text-sm font-black shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40 border border-amber-300/60 transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 whitespace-nowrap">Book Now</span>
            <ArrowRight size={14} className="relative z-10 text-[#002855] stroke-[2.5] group-hover:translate-x-0.5 transition-transform duration-200 hidden sm:inline" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
