import Image from "next/image";

export default function ContactUsFeature() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Have questions about tour packages or need help planning your trip?
        We’re here to help you.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Email:</strong> support@touristsite.com
            </li>
            <li>
              <strong>Phone:</strong> +91 98765 43210
            </li>
            <li>
              <strong>Address:</strong> New Delhi, India
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
            <p className="text-gray-600">
              Monday – Saturday: 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form (Static) */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

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

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
            />

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-3">
            * This form is currently static.
          </p>
        </div>
      </div>
    </section>
  );
}
