import Image from "next/image";
import content from "@/data/content.json";

export default function HomeHero() {
  const { homeHero } = content;

  return (
    <section className="relative h-screen w-full">
      <Image
        src={homeHero.image}
        alt={homeHero.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {homeHero.title}
          </h1>

          <p className="text-lg md:text-xl mb-6">{homeHero.subtitle}</p>

          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
            {homeHero.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
