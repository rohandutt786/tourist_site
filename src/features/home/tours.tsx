import Image from "next/image";

const tours = [
  {
    id: 1,
    title: "Manali",
    price: "₹18,999",
    image: "/images/manali.jpg",
  },
  {
    id: 2,
    title: "Goa",
    price: "₹22,499",
    image: "/images/goa.jpg",
  },
  {
    id: 3,
    title: "Jaipur",
    price: "₹15,999",
    image: "/images/jaipur.jpg",
  },
];

export default function HomeTours() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Popular Tourist Spots
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative h-52">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>

              <p className="text-blue-600 font-bold">{tour.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
