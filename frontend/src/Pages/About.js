import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-8">
        <span className="hover:text-black cursor-pointer">Home</span> / About
      </div>

      {/* Our Story Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-6">Our Story</h1>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          Launched in 2015, Exclusive is South Asia's premier online shopping
          marketplace with an active presence in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sellers and 300 brands and serves 3 million customers across
          the region.
          <br />
          <br />
          Exclusive has more than 1 Million products to offer, growing at a very
          fast pace. Exclusive offers a diverse assortment in categories ranging
          from consumer.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <h3 className="text-3xl font-bold mb-2">10.5k</h3>
          <p className="text-gray-600">Sellers active our site</p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <h3 className="text-3xl font-bold mb-2">33k</h3>
          <p className="text-gray-600">Monthly Product Sale</p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <h3 className="text-3xl font-bold mb-2">45.5k</h3>
          <p className="text-gray-600">Customer active in our site</p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <h3 className="text-3xl font-bold mb-2">25k</h3>
          <p className="text-gray-600">Annual gross sale in our site</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-200 h-64 w-64 mx-auto rounded-full mb-4"></div>
            <h3 className="text-xl font-semibold">Tom Cruise</h3>
            <p className="text-gray-600">Founder & Chairman</p>
            <div className="flex justify-center mt-2">
              <span className="text-gray-400">in</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 h-64 w-64 mx-auto rounded-full mb-4"></div>
            <h3 className="text-xl font-semibold">Emma Watson</h3>
            <p className="text-gray-600">Managing Director</p>
            <div className="flex justify-center mt-2">
              <span className="text-gray-400">in</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 h-64 w-64 mx-auto rounded-full mb-4"></div>
            <h3 className="text-xl font-semibold">Will Smith</h3>
            <p className="text-gray-600">Product Designer</p>
            <div className="flex justify-center mt-2">
              <span className="text-gray-400">in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="bg-gray-200 h-12 w-12 mx-auto mb-4 rounded-full"></div>
          <h3 className="text-lg font-semibold mb-2">FREE AND FAST DELIVERY</h3>
          <p className="text-gray-600">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="bg-gray-200 h-12 w-12 mx-auto mb-4 rounded-full"></div>
          <h3 className="text-lg font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
          <p className="text-gray-600">Friendly 24/7 customer support</p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="bg-gray-200 h-12 w-12 mx-auto mb-4 rounded-full"></div>
          <h3 className="text-lg font-semibold mb-2">MONEY BACK GUARANTEE</h3>
          <p className="text-gray-600">We return money within 30 days</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
