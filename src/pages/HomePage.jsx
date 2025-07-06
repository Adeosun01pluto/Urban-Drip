// import React from 'react';
// import Navbar from '../components/layout/Navbar';
// import HeroSection from '../components/hero/HeroSection';
// import FeaturedProducts from '../components/product/FeaturedProducts';
// import TrendingSection from '../components/product/TrendingSection';
// import Footer from '../components/layout/Footer';

// const HomePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar /> {/* This will be sticky at the top */}
//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturedProducts />
//         <TrendingSection />
//         {/* You can add more sections here like: */}
//         {/* <Testimonials /> */}
//         {/* <AboutSnippet /> */}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
// import CategoryDisplay from '../components/home/CategoryDisplay';
import ProductGridSection from '../components/home/ProductGridSection'; // Reusing for Featured/Trending
import { fetchProducts } from '../api/productsApi'; // Import API functions
import HeroSection from '../components/hero/HeroSection';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);
  const [errorTrending, setErrorTrending] = useState(null);

  useEffect(() => {
    // Fetch Featured Products (e.g., top 8 products, or specific category if defined)
    const getFeaturedProducts = async () => {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        // You might define a specific category ID for "featured" in your actual API,
        // or just fetch general products. Here, fetching top 8 from all products.
        const products = await fetchProducts({ limit: 8, offset: 0 });
        setFeaturedProducts(products);
      } catch (err) {
        setErrorFeatured('Failed to load featured products.');
        console.error(err);
      } finally {
        setLoadingFeatured(false);
      }
    };

    // Fetch Trending Products (e.g., next 8 products, or different criteria)
    const getTrendingProducts = async () => {
      setLoadingTrending(true);
      setErrorTrending(null);
      try {
        // Fetching next 8 products for "trending" example
        const products = await fetchProducts({ limit: 8, offset: 8 });
        setTrendingProducts(products);
      } catch (err) {
        setErrorTrending('Failed to load trending products.');
        console.error(err);
      } finally {
        setLoadingTrending(false);
      }
    };

    getFeaturedProducts();
    getTrendingProducts();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <main className="flex-grow">
        {/* <CategoryDisplay /> */}

        <ProductGridSection
          title="Featured Products"
          products={featuredProducts}
          loading={loadingFeatured}
          error={errorFeatured}
          linkText="Shop All"
          linkUrl="/shop"
        />

        <ProductGridSection
          title="Trending Now"
          products={trendingProducts}
          loading={loadingTrending}
          error={errorTrending}
          linkText="Discover More"
          linkUrl="/shop"
        />

        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;