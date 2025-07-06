// src/components/home/ProductGridSection.jsx
import React from 'react';
import ProductCard from '../product/ProductCard';
import { Link } from 'react-router-dom';

const ProductGridSection = ({ title, products, loading, error, linkText, linkUrl }) => {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">{title}</h2>
        {linkText && linkUrl && (
          <Link
            to={linkUrl}
            className="text-gray-600 hover:text-gray-900 font-semibold text-md sm:text-lg transition-colors duration-200"
          >
            {linkText} &rarr;
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4 mx-auto"></div>
          <p className="text-xl text-gray-600">Loading {title.toLowerCase()}...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200 text-red-700">
          <p className="text-xl mb-2">{error}</p>
          <p className="text-md">Could not load products. Please try again later.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-xl text-gray-600">No {title.toLowerCase()} found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGridSection;