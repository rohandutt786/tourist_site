import PackagesFeature from "@/features/packages/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages | Tourist Site",
  description: "Explore our best tourist packages with prices and details.",
};

export default function PackagesPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <PackagesFeature />
    </main>
  );
}
