import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-8">
        <span className="hover:text-black cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="text-black">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Exclusive</h1>

          <div>
            <h2 className="text-xl font-semibold mb-4">Call To Us</h2>
            <p className="text-gray-600 mb-4">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-gray-600">Phone: +88018112222</p>
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Write To US</h2>
            <p className="text-gray-600 mb-4">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-gray-600">Emails: customer@exclusive.com</p>
            <p className="text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Your Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Your Phone *</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Your Massage</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors"
            >
              Send Massage
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
