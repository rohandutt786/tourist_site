import { Metadata } from "next";
import HomeHero from "@/features/home/hero";
import HomeTours from "@/features/home/tours";
import HomeReviews from "@/features/home/reviews";

export const metadata: Metadata = {
  title: "Namoh Tourism | Explore Beautiful Destinations",
  description: "Discover top tourist destinations and travel packages with Namoh Tourism.",
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeTours />
      <HomeReviews />
    </main>
  );
}
