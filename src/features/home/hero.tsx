import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative h-[80vh] w-full">
      <Image
        src="/images/hero.jpg"
        alt="Travel the world"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore Beautiful Destinations
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover, travel, and create unforgettable memories
          </p>

          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
            Explore Tours
          </button>
        </div>
      </div>
    </section>
  );
}
