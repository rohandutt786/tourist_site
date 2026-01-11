import ContactUsFeature from "@/features/contact-us/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tourist Site",
  description: "Get in touch with us for travel queries and support.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ContactUsFeature />
    </main>
  );
}
