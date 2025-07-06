import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          About <span className="text-gray-600">UrbanDrip</span>
        </h1>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              UrbanDrip was born from a passion for authentic streetwear and a desire to bring
              high-quality, trend-setting apparel to the urban fashion scene. We believe that
              clothing is more than just fabric; it's a statement, an expression of identity,
              and a form of art.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Founded in 2023, our journey began in the vibrant streets of Lagos, Nigeria,
              inspired by the dynamic culture and undeniable 'drip' that flows through the city.
              Since then, we've grown, but our commitment to curated collections, unique designs,
              and exceptional customer experience remains at our core.
            </p>
          </section>

          <hr className="border-gray-200" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower individuals to express their unique style through a diverse range of
                contemporary streetwear. We strive to offer comfort, quality, and designs that
                resonate with the modern urban spirit.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/400x300/F3F4F6/9CA3AF?text=Our+Mission"
                alt="Our Mission"
                className="rounded-lg shadow-md"
              />
            </div>
          </section>

          <hr className="border-gray-200" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:order-2"> {/* order-2 to swap image on desktop */}
              <img
                src="https://via.placeholder.com/400x300/F3F4F6/9CA3AF?text=Our+Values"
                alt="Our Values"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                <li><span className="font-semibold">Authenticity:</span> Staying true to urban culture.</li>
                <li><span className="font-semibold">Quality:</span> Delivering durable and comfortable apparel.</li>
                <li><span className="font-semibold">Innovation:</span> Constantly exploring new styles and trends.</li>
                <li><span className="font-semibold">Community:</span> Building connections with our customers and creators.</li>
                <li><span className="font-semibold">Sustainability:</span> Mindful practices for a better future (evolving).</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join the Drip</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Be a part of the UrbanDrip movement. Explore our collections, share your style,
              and stay connected with us on social media.
            </p>
            <a
              href="/shop"
              className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Shop Our Collections
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;