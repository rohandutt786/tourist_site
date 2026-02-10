"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname(); // get current route

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
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#003566] select-none">
            Namoh Tourism
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
          <ul className="space-y-4 font-medium">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-2 py-1 rounded ${
                      isActive ? "text-[#003566] font-bold" : "text-gray-700"
                    }hover:bg-[#002244]`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
