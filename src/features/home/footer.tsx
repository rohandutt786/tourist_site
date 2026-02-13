import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import content from "@/data/content.json";

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-[#003566] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            {footer.companyName}
          </h3>
          <p>{footer.description}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {footer.quickLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>

          <p>
            Email:{" "}
            <a
              href={`mailto:${footer.contact.email}`}
              className="hover:text-white"
            >
              {footer.contact.email}
            </a>
          </p>

          <p>
            Phone:{" "}
            <a
              href={`tel:${footer.contact.phone.replace(/\s+/g, "")}`}
              className="hover:text-white"
            >
              {footer.contact.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="text-center mt-6">
        <h4 className="text-white text-lg mb-3">Follow Us</h4>
        <div className="flex justify-center space-x-6">
          <a
            href={footer.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href={footer.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href={footer.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} {footer.companyName}. All rights reserved.
      </div>
    </footer>
  );
}
