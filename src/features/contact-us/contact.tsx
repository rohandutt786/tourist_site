"use client";
import Image from "next/image";
import content from "@/data/content.json";

import { useState } from "react";

import { contactSchema } from "./schema";
import { toast } from "sonner";

export default function ContactUsFeature() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];

  const { contact } = content;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    destination: "",
    persons: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // clear error when user types
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[e.target.name];
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
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
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
          date: "",
          destination: "",
          persons: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong ");
      }
    } catch (error) {
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

          {/* Contact Form */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-gray-800 shadow-lg h-fit md:min-h-[720px]">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {contact.form.title}
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.name ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.email ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.phone ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.phone}
                </p>
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />

                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.date ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.date}
                </p>
              </div>

              {/* Destination */}
              <div>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Destination"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.destination ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.destination ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.destination}
                </p>
              </div>

              {/* Persons */}
              <div>
                <input
                  type="number"
                  min="1"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  placeholder="Number of Persons"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.persons ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.persons ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.persons}
                </p>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className={`w-full border rounded-lg px-4 py-2 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p
                  className={`text-red-500 text-sm mt-1 min-h-[18px] transition-opacity duration-200 ${
                    errors.message ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {errors.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003566] text-white py-2 rounded-lg hover:bg-[#002244] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
