export default function AboutUsFeature() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      <p className="text-lg text-gray-700 text-center mb-12">
        We help travelers discover beautiful destinations and create
        unforgettable journeys.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to simplify travel planning by providing reliable
            information and curated destinations for travelers worldwide.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where everyone can explore the world
            confidently and effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
}
