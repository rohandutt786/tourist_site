import Image from "next/image";
import content from "@/data/content.json";

export default function AboutUsFeature() {
  const { about } = content;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {about.subtitle}
        </p>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-16">
        <Image src={about.image} alt="About us" fill className="object-cover" />
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src={about.mission.image}
              alt={about.mission.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">
              {about.mission.title}
            </h2>
            <p className="text-gray-600">{about.mission.text}</p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative h-52 w-full">
            <Image
              src={about.vision.image}
              alt={about.vision.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">
              {about.vision.title}
            </h2>
            <p className="text-gray-600">{about.vision.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
