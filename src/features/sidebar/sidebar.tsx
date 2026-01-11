"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger + Logo container */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-4 md:hidden bg-white px-3 py-2 rounded-md shadow">
        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="text-blue-600 text-2xl"
        >
          ☰
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 select-none">
          TouristSite
        </Link>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold text-blue-600 select-none">
            TouristSite
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-4 font-medium text-gray-700">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" onClick={() => setIsOpen(false)}>
                Packages
              </Link>
            </li>
            <li>
              <Link href="/about-us" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
