import React from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component

// Dummy data for trending products
const trendingProductsData = [
  {
    id: 'tp001',
    name: 'Utility Cargo Pants - Black',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/400x400/222222/FFFFFF?text=Cargo+Pants',
    rating: 4.6,
    reviews: 150,
  },
  {
    id: 'tp002',
    name: 'Retro Windbreaker Jacket',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/400x400/444444/FFFFFF?text=Windbreaker',
    rating: 4.4,
    reviews: 70,
  },
  {
    id: 'tp003',
    name: 'Bucket Hat - Reversible',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/400x400/666666/FFFFFF?text=Bucket+Hat',
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 'tp004',
    name: 'Streetwear Socks - 3 Pack',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/400x400/888888/FFFFFF?text=Socks+Pack',
    rating: 4.5,
    reviews: 60,
  },
];

const TrendingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Currently <span className="text-gray-600">Trending</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProductsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
            Explore All Trends
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;