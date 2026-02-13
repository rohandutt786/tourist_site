"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

type NavbarProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ setIsOpen }: NavbarProps) {
  const pathname = usePathname(); // get current route

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Packages", href: "/packages" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl text-[#003566] md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#003566] select-none"
          >
            Namoh Tourism
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.href; // check if this menu is active
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`hover:text-[#002244] ${
                    isActive ? "text-[#003566] font-bold" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/packages"
          className="hidden md:inline-block px-5 py-2 bg-[#003566]  text-white rounded-lg hover:bg-[#002244] "
        >
          Book Now
        </Link>
      </nav>
    </header>
  );
}
