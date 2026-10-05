"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import content from "@/data/content.json";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { footer } = content;

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/packages" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/namoh_tourism_navy.svg"
                alt="Namoh Tourism Logo"
                width={120}
                height={55}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-5">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#002855] text-white shadow-sm"
                          : "text-slate-700 hover:bg-amber-50 hover:text-[#002855]"
                      }`}
                    >
                      <span>{item.title}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom CTA & Support in drawer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
          <Link
            href="/packages"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#002855] text-white font-bold text-sm shadow-md hover:bg-[#001733] border border-amber-500/30 transition-colors"
          >
            <span>Browse Tour Packages</span>
            <ArrowRight size={15} className="text-amber-400" />
          </Link>

          <a
            href={`tel:${footer.contact.phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#002855] py-1"
          >
            <Phone size={13} className="text-[#d4af37]" />
            <span>Call: {footer.contact.phone}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
