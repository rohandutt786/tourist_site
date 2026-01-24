import Image from "next/image";
import content from "@/data/content.json";

export default function ContactUsFeature() {
  const { contact } = content;

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
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-gray-800 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {contact.form.title}
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="date"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="Destination"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="number"
                min="1"
                placeholder="Number of Persons"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border rounded-lg px-4 py-2"
              />

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
