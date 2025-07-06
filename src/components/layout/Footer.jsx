import React from 'react';
import { IoLogoInstagram, IoLogoTwitter, IoLogoFacebook, IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-3xl font-bold text-white tracking-wider mb-4">
            Urban<span className="text-gray-500">Drip</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Your destination for the freshest unisex streetwear. We blend urban aesthetics with premium comfort.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <IoLogoInstagram className="h-7 w-7" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <IoLogoTwitter className="h-7 w-7" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <IoLogoFacebook className="h-7 w-7" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <IoLogoYoutube className="h-7 w-7" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2"><a href="/shop" className="text-gray-400 hover:text-white transition-colors duration-300">Shop All</a></li>
            <li className="mb-2"><a href="/new-arrivals" className="text-gray-400 hover:text-white transition-colors duration-300">New Arrivals</a></li>
            <li className="mb-2"><a href="/featured" className="text-gray-400 hover:text-white transition-colors duration-300">Featured</a></li>
            <li className="mb-2"><a href="/sale" className="text-gray-400 hover:text-white transition-colors duration-300">Sale</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
          <ul>
            <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
            <li className="mb-2"><a href="/faqs" className="text-gray-400 hover:text-white transition-colors duration-300">FAQs</a></li>
            <li className="mb-2"><a href="/shipping-returns" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping & Returns</a></li>
            <li className="mb-2"><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
          <p className="text-sm mb-4">
            Get exclusive updates and offers delivered straight to your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-gray-800 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-gray-700 text-white px-5 py-2 rounded-r-md hover:bg-gray-600 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} UrbanDrip. All rights reserved. Powered by CodeByPluto.</p>
      </div>
    </footer>
  );
};

export default Footer;