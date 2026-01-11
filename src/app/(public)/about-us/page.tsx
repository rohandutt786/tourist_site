import AboutUsFeature from "@/features/about-us/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Tourist Site",
  description: "Learn more about our mission, vision, and travel platform.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AboutUsFeature />
    </main>
  );
}
