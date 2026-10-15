export default function TravelAgencyJsonLd() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://namohtourism.com"
  ).replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${baseUrl}/#travelagency`,
        "name": "Namoh Tourism",
        "alternateName": "Namoh Tourism India",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/namoh_tourism_navy.svg`,
          "caption": "Namoh Tourism Logo"
        },
        "image": `${baseUrl}/images/og-share.jpg`,
        "description": "Namoh Tourism is a trusted tour operator based in Shimla, Himachal Pradesh, specializing in handcrafted holiday packages, verified hotel stays, and private cab services across India.",
        "telephone": "+91-8580636332",
        "email": "namohtourism@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Prasad Bhawan, Khalini",
          "addressLocality": "Shimla",
          "addressRegion": "Himachal Pradesh",
          "postalCode": "171002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.0850,
          "longitude": 77.1700
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Credit Card, Debit Card, Net Banking",
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "AdministrativeArea", "name": "Himachal Pradesh" },
          { "@type": "AdministrativeArea", "name": "Jammu and Kashmir" },
          { "@type": "AdministrativeArea", "name": "Rajasthan" },
          { "@type": "AdministrativeArea", "name": "Uttarakhand" },
          { "@type": "AdministrativeArea", "name": "Kerala" },
          { "@type": "AdministrativeArea", "name": "Goa" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "520",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "All-India Tour & Travel Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "All-India Holiday Packages & Custom Tours"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Shimla, Manali & Himachal Tour Packages"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jammu & Kashmir Holiday Packages"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Royal Rajasthan Heritage Tours"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Uttarakhand Devbhoomi & Hill Station Packages"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Kerala Backwaters & Nature Tour Packages"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "All-India Private Cab & Taxi Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Personalized Multi-City Itinerary Planning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hotel & Resort Bookings Across India"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Namoh Tourism",
        "description": "Explore beautiful destinations across India with Namoh Tourism.",
        "publisher": {
          "@id": `${baseUrl}/#travelagency`
        },
        "inLanguage": "en"
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
