"use client";
import Image from "next/image";
import content from "@/data/content.json";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { contactSchema } from "./schema";
import { toast } from "sonner";
import { Sparkles, Gift } from "lucide-react";
import { getActiveOffer } from "@/config/offers.config";

export default function ContactUsFeature() {
  const searchParams = useSearchParams();
  const offer = getActiveOffer();
  const queryDeal = searchParams.get("deal") || "";
  const queryDestination =
    searchParams.get("destination") || searchParams.get("package") || "";
  const queryDays = searchParams.get("days")
    ? (searchParams.get("days")?.replace(/\D/g, "") || "")
    : "";

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];

  const { contact } = content;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departureCity: "",
    destination: queryDestination,
    date: "",
    days: queryDays,
    persons: "",
    budget: "",
    message: "",
    hp_website: "",
  });

  useEffect(() => {
    if (queryDestination || queryDays || queryDeal) {
      setFormData((prev) => ({
        ...prev,
        destination: queryDestination || prev.destination,
        days: queryDays || prev.days,
        message:
          prev.message ||
          (queryDeal && offer
            ? `Interested in booking with Diwali 10% Instant Festive Discount.`
            : ""),
      }));
    }
  }, [queryDestination, queryDays, queryDeal, offer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Strict input filtering for phone: only digits and leading '+'
    if (name === "phone") {
      let cleaned = value.replace(/[^\d+]/g, "");
      if (cleaned.includes("+")) {
        cleaned = (cleaned.startsWith("+") ? "+" : "") + cleaned.replace(/\+/g, "");
      }
      if (cleaned.length > 15) return;
      setFormData((prev) => ({ ...prev, phone: cleaned }));
      if (errors.phone) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.phone;
          return updated;
        });
      }
      return;
    }

    // Strict input filtering for numeric counter fields (days, persons)
    if (name === "days" || name === "persons") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 3) return;
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
      return;
    }

    // Email input filtering: disallow spaces
    if (name === "email") {
      const cleaned = value.replace(/\s/g, "");
      setFormData((prev) => ({ ...prev, email: cleaned }));
      if (errors.email) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.email;
          return updated;
        });
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        // Keep the first error for each field so "Please enter..." is prioritized
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      setErrors(fieldErrors);
      toast.error("Please fill all required fields correctly.");
      return;
    }

    // clear errors if valid
    setErrors({});

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message Sent Successfully ");
        setFormData({
          name: "",
          email: "",
          phone: "",
          departureCity: "",
          destination: "",
          date: "",
          days: "",
          persons: "",
          budget: "",
          message: "",
          hp_website: "",
        });
        try {
          localStorage.setItem("namoh_last_contact_submitted", String(Date.now()));
        } catch {
          // ignore storage error
        }
      } else {
        toast.error(data.message || "Something went wrong ");
      }
    } catch {
      toast.error("Server error ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <Image
        src={contact.backgroundImage}
        alt="Contact background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {contact.title}
        </h1>

        <p className="text-center text-gray-200 mb-14 max-w-2xl mx-auto">
          {contact.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

            <ul className="space-y-4 text-gray-200">
              <li>
                <strong>Email:</strong> {contact.info.email}
              </li>
              <li>
                <strong>Phone:</strong> {contact.info.phone}
              </li>
              <li>
                <strong>Address:</strong> {contact.info.address}
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
              <p className="text-gray-200">{contact.info.hours}</p>
            </div>
          </div>

          {/* Contact Form with original transparent backdrop blur */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-gray-800 shadow-lg h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {contact.form.title}
            </h2>

            {/* Festive Offer Callout Banner */}
            {offer && (
              <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-amber-600/25 border border-amber-300/60 backdrop-blur-md text-white shadow-sm flex items-start gap-3">
                <span className="text-2xl animate-pulse shrink-0">{offer.emoji}</span>
                <div className="text-xs sm:text-sm">
                  <div className="flex items-center gap-2 flex-wrap font-bold text-amber-300">
                    <span>{offer.offerTitle}</span>
                    <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                      {offer.instantDiscountBadge}
                    </span>
                  </div>
                  <p className="text-slate-100 text-xs mt-1 leading-relaxed">
                    {offer.enquiryNote}
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-2.5" onSubmit={handleSubmit}>
              {/* Bot Honeypot */}
              <input
                type="text"
                name="hp_website"
                value={formData.hp_website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden opacity-0 pointer-events-none absolute"
                style={{ display: "none" }}
              />

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.name ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.name}
                  </p>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (e.g. name@gmail.com)"
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.email ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.email}
                  </p>
                </div>
              </div>

              {/* Row 2: Phone & Departure City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone (e.g. +91 9876543210)"
                    maxLength={15}
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.phone ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.phone}
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleChange}
                    placeholder="Departure City (e.g. Delhi)"
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.departureCity ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.departureCity ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.departureCity}
                  </p>
                </div>
              </div>

              {/* Row 3: Destination & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Destination (e.g. Kashmir)"
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.destination ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.destination ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.destination}
                  </p>
                </div>

                <div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.date ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.date}
                  </p>
                </div>
              </div>

              {/* Row 4: Days, Persons & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    placeholder="Days (e.g. 5)"
                    maxLength={3}
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.days ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.days ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.days}
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    placeholder="Persons (e.g. 2)"
                    maxLength={3}
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.persons ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.persons ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.persons}
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Budget (e.g. ₹25,000)"
                    maxLength={30}
                    className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                      errors.budget ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                      errors.budget ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.budget}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message (Optional)"
                  rows={3}
                  className={`w-full bg-white border rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002855] ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-300 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.message ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#002855] text-white py-3 rounded-xl font-bold hover:bg-[#001733] border border-amber-500/30 hover:border-amber-400/80 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
