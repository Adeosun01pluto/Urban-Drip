import React from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component

// Dummy data for featured products
const featuredProductsData = [
  {
    id: 'fp001',
    name: 'Oversized Hoodie - Charcoal',
    price: 69.99,
    imageUrl: 'https://via.placeholder.com/400x400/333333/FFFFFF?text=Hoodie+Charcoal',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 'fp002',
    name: 'Distressed Denim Jeans',
    price: 89.99,
    imageUrl: 'https://via.placeholder.com/400x400/555555/FFFFFF?text=Denim+Jeans',
    rating: 4.5,
    reviews: 85,
  },
  {
    id: 'fp003',
    name: 'Graphic Tee - "Urban Flow"',
    price: 34.99,
    imageUrl: 'https://via.placeholder.com/400x400/777777/FFFFFF?text=Graphic+Tee',
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'fp004',
    name: 'High-Top Sneakers - White',
    price: 119.99,
    imageUrl: 'https://via.placeholder.com/400x400/999999/FFFFFF?text=High-Tops',
    rating: 4.7,
    reviews: 95,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Featured <span className="text-gray-600">Drips</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProductsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;