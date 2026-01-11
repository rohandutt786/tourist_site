import Image from "next/image";
import content from "@/data/content.json";

export default function PackagesFeature() {
  const { packages } = content;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Tour Packages
      </h2>

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
              <h3 className="text-xl font-semibold mb-1">
                {pkg.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {pkg.location}
              </p>

              <p className="text-gray-600 mb-4">
                {pkg.description}
              </p>

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
