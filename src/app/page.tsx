import { Metadata } from "next";
import HomeHero from "@/features/home/hero";
import HomeTours from "@/features/home/tours";
import Footer from "@/features/home/footer";

export const metadata: Metadata = {
  title: "Tourist Site | Explore the World",
  description: "Discover top tourist destinations and travel packages.",
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeTours />
      <Footer />
    </main>
  );
}
