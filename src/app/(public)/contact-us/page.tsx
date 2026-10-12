import ContactUsFeature from "@/features/contact-us/contact";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contact Us | Namoh Tourism",
  description: "Get in touch with us for travel queries and support.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ContactUsFeature />
      </Suspense>
    </main>
  );
}
