import Image from "next/image";

const packages = [
  {
    id: 1,
    title: "Manali Adventure",
    location: "Himachal Pradesh, India",
    price: "₹18,999",
    image: "/images/manali.jpg",
    description:
      "Experience snow-capped mountains, adventure sports, and scenic views.",
  },
  {
    id: 2,
    title: "Goa Beach Holiday",
    location: "Goa, India",
    price: "₹22,499",
    image: "/images/goa.jpg",
    description:
      "Relax on golden beaches, enjoy nightlife, and explore Portuguese culture.",
  },
  {
    id: 3,
    title: "Jaipur Heritage Tour",
    location: "Rajasthan, India",
    price: "₹15,999",
    image: "/images/jaipur.jpg",
    description:
      "Discover royal palaces, forts, and the vibrant culture of Rajasthan.",
  },
];

export default function PackagesFeature() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Tour Packages</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative h-52 w-full">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{pkg.title}</h3>

              <p className="text-sm text-gray-500 mb-2">{pkg.location}</p>

              <p className="text-gray-600 mb-4">{pkg.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  {pkg.price}
                </span>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
