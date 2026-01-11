import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left side: Logo and Mobile toggle button */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu (visible only on mobile) */}

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            TouristSite
          </Link>
        </div>

        {/* Navigation Links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/packages" className="hover:text-blue-600">
              Packages
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:text-blue-600">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-blue-600">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* CTA Button (hidden on mobile) */}
        <Link
          href="/packages"
          className="hidden md:inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Now
        </Link>
      </nav>
    </header>
  );
}
