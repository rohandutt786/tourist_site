import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#003566] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Namoh Tourism
          </h3>
          <p>Your trusted travel partner for unforgettable journeys.</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/packages"> Packages</Link>
            </li>
            <li>
              <Link href="/about-us"> About Us</Link>
            </li>
            <li>
              <Link href="/contact-us"> Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p>Email: support@namohTourism.com</p>
          <p>Phone: +91 85806 36332</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="text-center mt-6">
        <h4 className="text-white text-lg mb-3">Follow Us</h4>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Namoh Tourism. All rights reserved.
      </div>
    </footer>
  );
}
