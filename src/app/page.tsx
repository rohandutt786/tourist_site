import { Metadata } from "next";
import HomeHero from "@/features/home/hero";
import HomeTours from "@/features/home/tours";
import HomeReviews from "@/features/home/reviews";
import HomeFaq from "@/features/home/faq";
import TravelAgencyJsonLd from "@/components/seo/TravelAgencyJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

export const metadata: Metadata = {
  title: "Namoh Tourism | Explore Beautiful Destinations Across India",
  description:
    "Discover handcrafted holiday tour packages, verified hotels, and private cab services across Shimla, Manali, Kashmir, Rajasthan, and all India with Namoh Tourism.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <TravelAgencyJsonLd />
      <FaqJsonLd />
      <main>
        <HomeHero />
        <HomeTours />
        <HomeReviews />
        <HomeFaq />
      </main>
    </>
  );
}
