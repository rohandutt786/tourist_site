import { PackageType, DurationPlan, ItineraryItem } from "@/services/packages.service";

interface PackageJsonLdProps {
  pkg: PackageType;
  currentPlan?: DurationPlan;
}

export default function PackageJsonLd({ pkg, currentPlan }: PackageJsonLdProps) {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://namohtourism.com"
  ).replace(/\/$/, "");

  const numericPrice = pkg.price ? pkg.price.replace(/[^\d]/g, "") : "14999";
  const daysList: ItineraryItem[] = currentPlan?.itinerary || [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${baseUrl}/packages/${pkg.slug}/#trip`,
        "name": pkg.title,
        "description": pkg.description,
        "touristType": ["Families", "Couples", "Solo Travelers", "Group Tours"],
        "provider": {
          "@type": "TravelAgency",
          "name": "Namoh Tourism",
          "url": baseUrl,
          "telephone": "+91-8580636332"
        },
        "offers": {
          "@type": "Offer",
          "price": numericPrice,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": new Date().toISOString().split("T")[0],
          "url": `${baseUrl}/packages/${pkg.slug}`
        },
        "itinerary": daysList.map((item, index) => ({
          "@type": "City",
          "name": item.title,
          "description": item.description,
          "position": index + 1
        }))
      },
      {
        "@type": "Product",
        "@id": `${baseUrl}/packages/${pkg.slug}/#product`,
        "name": pkg.title,
        "image": `${baseUrl}${pkg.image}`,
        "description": pkg.description,
        "brand": {
          "@type": "Brand",
          "name": "Namoh Tourism"
        },
        "offers": {
          "@type": "Offer",
          "price": numericPrice,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/packages/${pkg.slug}`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "520",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
