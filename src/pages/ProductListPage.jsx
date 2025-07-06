// import React, { useState } from 'react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import ProductCard from '../components/product/ProductCard';
// import { allProductsData } from '../data/allProductsData'; // Use the centralized data
// import { IoFilter, IoClose } from 'react-icons/io5'; // For mobile filter toggle

// const ProductListPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedGender, setSelectedGender] = useState('all');
//   const [sortOrder, setSortOrder] = useState('default');
//   const [isFilterOpen, setIsFilterOpen] = useState(false); // State for mobile filter menu

//   // ** IMPORTANT: DO NOT import useSearch here. ProductListPage will handle its own search/filter **
//   // This page filters its own products. The Navbar's search leads to SearchPage.
//   // We'll add a local search input directly to this page.
//   const [localSearchTerm, setLocalSearchTerm] = useState('');


//   const categories = [
//     { name: 'All', value: 'all' },
//     { name: 'Hoodies', value: 'hoodies' },
//     { name: 'T-Shirts', value: 't-shirts' },
//     { name: 'Jeans', value: 'jeans' },
//     { name: 'Footwear', value: 'footwear' },
//     { name: 'Pants', value: 'pants' },
//     { name: 'Jackets', value: 'jackets' },
//     { name: 'Accessories', value: 'accessories' },
//     { name: 'Shorts', value: 'shorts' },
//     // Add more categories as needed
//   ];

//   const genders = [
//     { name: 'All', value: 'all' },
//     { name: 'Unisex', value: 'unisex' },
//     { name: 'Male', value: 'male' },
//     { name: 'Female', value: 'female' },
//   ];

//   const sortOptions = [
//     { name: 'Default', value: 'default' },
//     { name: 'Price: Low to High', value: 'price-asc' },
//     { name: 'Price: High to Low', value: 'price-desc' },
//     { name: 'Rating: High to Low', value: 'rating-desc' },
//   ];

//   const filteredProducts = allProductsData.filter(product => {
//     // 1. Apply Local Search Filter
//     const lowerCaseSearchTerm = localSearchTerm.toLowerCase();
//     const matchesSearch =
//       product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
//       product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
//       (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
//       (product.gender && product.gender.toLowerCase().includes(lowerCaseSearchTerm)) ||
//       (product.colors && product.colors.some(color => color.toLowerCase().includes(lowerCaseSearchTerm)));

//     if (!matchesSearch) return false; // If it doesn't match search, exclude it early

//     // 2. Apply Category Filter
//     if (selectedCategory !== 'all' && product.category !== selectedCategory) {
//       return false;
//     }

//     // 3. Apply Gender Filter
//     if (selectedGender !== 'all' && product.gender !== selectedGender) {
//       return false;
//     }

//     return true;
//   }).sort((a, b) => {
//     // Apply Sorting
//     if (sortOrder === 'price-asc') {
//       return a.price - b.price;
//     } else if (sortOrder === 'price-desc') {
//       return b.price - a.price;
//     } else if (sortOrder === 'rating-desc') {
//       return (b.rating || 0) - (a.rating || 0); // Handle products without ratings
//     }
//     return 0; // Default or no sorting
//   });

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
//           Our <span className="text-gray-600">Collection</span>
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Mobile Filter Toggle Button */}
//           <div className="lg:hidden mb-4">
//             <button
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold hover:bg-gray-700 transition duration-300"
//             >
//               {isFilterOpen ? <IoClose className="h-6 w-6" /> : <IoFilter className="h-6 w-6" />}
//               <span>{isFilterOpen ? 'Close Filters' : 'Filter & Sort'}</span>
//             </button>
//           </div>

//           {/* Filters Sidebar */}
//           <aside
//             className={`
//               lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-lg
//               transition-all duration-300 ease-in-out
//               ${isFilterOpen ? 'block max-h-screen' : 'hidden lg:block max-h-0 lg:max-h-full'}
//               overflow-hidden lg:overflow-visible
//             `}
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Filters</h2>

//             {/* Local Search Input on Shop Page */}
//             <div className="mb-6">
//               <label htmlFor="local-search" className="block text-sm font-medium text-gray-700 mb-2">Search Products on this page</label>
//               <input
//                 type="text"
//                 id="local-search"
//                 placeholder="e.g., hoodie, jeans, black"
//                 value={localSearchTerm}
//                 onChange={(e) => setLocalSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
//               />
//             </div>


//             {/* Category Filter */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <label key={category.value} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="category"
//                       value={category.value}
//                       checked={selectedCategory === category.value}
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                       className="form-radio h-4 w-4 text-gray-900"
//                     />
//                     <span className="text-gray-700">{category.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Gender Filter */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Gender</h3>
//               <div className="space-y-2">
//                 {genders.map((gender) => (
//                   <label key={gender.value} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value={gender.value}
//                       checked={selectedGender === gender.value}
//                       onChange={(e) => setSelectedGender(e.target.value)}
//                       className="form-radio h-4 w-4 text-gray-900"
//                     />
//                     <span className="text-gray-700">{gender.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Sort By */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
//               <select
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
//               >
//                 {sortOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </aside>

//           {/* Product Grid */}
//           <section className="lg:w-3/4 w-full">
//             {filteredProducts.length === 0 && localSearchTerm.trim() !== '' ? (
//               <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//                 <p className="text-2xl text-gray-600 mb-4">No products found matching your search and filters.</p>
//                 <p className="text-lg text-gray-500">Try adjusting your search terms or filter selections.</p>
//               </div>
//             ) : filteredProducts.length === 0 ? (
//                 <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//                   <p className="text-2xl text-gray-600 mb-4">No products available in this selection.</p>
//                   <p className="text-lg text-gray-500">Try broadening your filter selections.</p>
//                 </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import ProductCard from '../components/product/ProductCard';
// import { fetchCategories, fetchProducts } from '../api/productsApi'; // Import API functions
// import { IoFilter, IoClose } from 'react-icons/io5';

// const PRODUCTS_PER_PAGE = 20; // Define how many products to fetch per page

// const ProductListPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortOrder, setSortOrder] = useState('default');
//   const [localSearchTerm, setLocalSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true); // To check if there are more products to load

//   // Gender filter is not directly supported by the API as a product attribute.
//   // We'll remove it for now to avoid confusion or need for client-side filtering after fetch.
//   // If gender mapping is crucial, it would need custom logic or an enhanced API.
//   // const [selectedGender, setSelectedGender] = useState('all');

//   const sortOptions = [
//     { name: 'Default', value: 'default' },
//     { name: 'Price: Low to High', value: 'price-asc' },
//     { name: 'Price: High to Low', value: 'price-desc' },
//     // API doesn't support sorting by rating directly
//     // { name: 'Rating: High to Low', value: 'rating-desc' },
//   ];

//   // Fetch categories on component mount
//   useEffect(() => {
//     const getCategories = async () => {
//       const data = await fetchCategories();
//       // console.log(data)
//       setCategories([{ id: 'all', name: 'All', slug: 'all' }, ...data]); // Add 'All' option
//     };
//     getCategories();
//   }, []);

//   // Memoized function to fetch products
//   const getProducts = useCallback(async (currentOffset = 0, append = false) => {
//     setLoading(true);
//     setError(null);
//     try {
//       let params = {
//         limit: PRODUCTS_PER_PAGE,
//         offset: currentOffset,
//       };

//       // Apply category filter
//       if (selectedCategory !== 'all') {
//         const category = categories.find(cat => cat.id === selectedCategory || cat.slug === selectedCategory);
//         if (category && category.id !== 'all') { // Ensure it's not our custom 'all' category object
//           params.categoryId = category.id;
//         }
//       }

//       // Apply title search
//       if (localSearchTerm.trim()) {
//         params.title = localSearchTerm.trim();
//       }

//       const fetchedData = await fetchProducts(params);

//       // Sort client-side if API doesn't support (only price for now)
//       let sortedData = [...fetchedData];
//       if (sortOrder === 'price-asc') {
//         sortedData.sort((a, b) => a.price - b.price);
//       } else if (sortOrder === 'price-desc') {
//         sortedData.sort((a, b) => b.price - a.price);
//       }
//       // Note: No sorting by rating as API doesn't provide it

//       if (append) {
//         setProducts(prevProducts => [...prevProducts, ...sortedData]);
//       } else {
//         setProducts(sortedData);
//       }

//       setHasMore(fetchedData.length === PRODUCTS_PER_PAGE); // Check if we received full limit, implies more data
//     } catch (err) {
//       setError('Failed to fetch products. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCategory, localSearchTerm, sortOrder, categories]); // Add categories to dependencies

//   // Effect to re-fetch products when filters/sort/search change (resets pagination)
//   useEffect(() => {
//     if (categories.length > 0) { // Ensure categories are loaded before fetching products
//       setOffset(0); // Reset offset on filter/sort/search change
//       getProducts(0, false); // Fetch from start, don't append
//     }
//   }, [selectedCategory, localSearchTerm, sortOrder, categories, getProducts]); // Include getProducts

//   const handleLoadMore = () => {
//     const newOffset = offset + PRODUCTS_PER_PAGE;
//     setOffset(newOffset);
//     getProducts(newOffset, true); // Fetch and append
//   };


//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
//           Our <span className="text-gray-600">Collection</span>
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Mobile Filter Toggle Button */}
//           <div className="lg:hidden mb-4">
//             <button
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold hover:bg-gray-700 transition duration-300"
//             >
//               {isFilterOpen ? <IoClose className="h-6 w-6" /> : <IoFilter className="h-6 w-6" />}
//               <span>{isFilterOpen ? 'Close Filters' : 'Filter & Sort'}</span>
//             </button>
//           </div>

//           {/* Filters Sidebar */}
//           <aside
//             className={`
//               lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-lg
//               transition-all duration-300 ease-in-out
//               ${isFilterOpen ? 'block max-h-screen' : 'hidden lg:block max-h-0 lg:max-h-full'}
//               overflow-hidden lg:overflow-visible
//             `}
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Filters</h2>

//             {/* Local Search Input on Shop Page */}
//             <div className="mb-6">
//               <label htmlFor="local-search" className="block text-sm font-medium text-gray-700 mb-2">Search Products on this page</label>
//               <input
//                 type="text"
//                 id="local-search"
//                 placeholder="e.g., hoodie, jeans, black"
//                 value={localSearchTerm}
//                 onChange={(e) => setLocalSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
//               />
//             </div>


//             {/* Category Filter */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <label key={category.id} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="category"
//                       value={category.id} // Use category ID for filtering
//                       checked={selectedCategory === category.id}
//                       onChange={(e) => {
//                         setSelectedCategory(e.target.value);
//                         if (isFilterOpen) setIsFilterOpen(false); // Close filter on selection for mobile
//                       }}
//                       className="form-radio h-4 w-4 text-gray-900"
//                     />
//                     <span className="text-gray-700">{category.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Gender Filter - Removed as API doesn't support */}
//             {/*
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Gender</h3>
//               <div className="space-y-2">
//                 {genders.map((gender) => (
//                   <label key={gender.value} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value={gender.value}
//                       checked={selectedGender === gender.value}
//                       onChange={(e) => setSelectedGender(e.target.value)}
//                       className="form-radio h-4 w-4 text-gray-900"
//                     />
//                     <span className="text-gray-700">{gender.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             */}

//             {/* Sort By */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
//               <select
//                 value={sortOrder}
//                 onChange={(e) => {
//                   setSortOrder(e.target.value);
//                   if (isFilterOpen) setIsFilterOpen(false); // Close filter on selection for mobile
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
//               >
//                 {sortOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </aside>

//           {/* Product Grid */}
//           <section className="lg:w-3/4 w-full">
//             {loading && products.length === 0 ? (
//               <div className="text-center py-20">
//                 <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 mx-auto"></div>
//                 <p className="text-xl text-gray-600">Loading products...</p>
//               </div>
//             ) : error ? (
//               <div className="text-center py-20 bg-red-50 rounded-lg border border-red-200 text-red-700">
//                 <p className="text-2xl mb-4">{error}</p>
//                 <p className="text-lg">Please check your internet connection or try again later.</p>
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//                 <p className="text-2xl text-gray-600 mb-4">No products found matching your criteria.</p>
//                 <p className="text-lg text-gray-500">Try adjusting your search terms or filter selections.</p>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                   {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//                 {hasMore && (
//                   <div className="text-center mt-12">
//                     <button
//                       onClick={handleLoadMore}
//                       disabled={loading}
//                       className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? 'Loading More...' : 'Load More Products'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import { fetchCategories, fetchProducts } from '../api/productsApi'; // Import API functions
import { IoFilter, IoClose } from 'react-icons/io5';

const PRODUCTS_PER_PAGE = 20; // Define how many products to fetch per page

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true); // To check if there are more products to load

  const sortOptions = [
    { name: 'Default', value: 'default' },
    { name: 'Price: Low to High', value: 'price-asc' },
    { name: 'Price: High to Low', value: 'price-desc' },
  ];

  // Fetch categories on component mount - This is correctly done once.
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      // console.log(data)
      setCategories([{ id: 'all', name: 'All', slug: 'all' }, ...data]); // Add 'All' option
    };
    getCategories();
  }, []); // Empty dependency array means this runs only once

  // Memoized function to fetch products based on current filters and pagination state
  // This useCallback ensures the function itself doesn't change unless its dependencies change.
  const getProducts = useCallback(async (currentOffset, append) => { // Removed default values here
    setLoading(true);
    setError(null);
    try {
      let params = {
        limit: PRODUCTS_PER_PAGE,
        offset: currentOffset,
      };

      // Apply category filter
      if (selectedCategory !== 'all') {
        const category = categories.find(cat => cat.id === selectedCategory); // Use ID for finding
        if (category && category.id !== 'all') {
          params.categoryId = category.id;
        }
      }

      // Apply title search
      if (localSearchTerm.trim()) {
        params.title = localSearchTerm.trim();
      }

      const fetchedData = await fetchProducts(params);

      // Client-side sorting for price
      let sortedData = [...fetchedData];
      if (sortOrder === 'price-asc') {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'price-desc') {
        sortedData.sort((a, b) => b.price - a.price);
      }

      if (append) {
        setProducts(prevProducts => [...prevProducts, ...sortedData]);
      } else {
        setProducts(sortedData);
      }

      setHasMore(fetchedData.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, localSearchTerm, sortOrder, categories]); // Dependencies for getProducts memoization

  // Effect to trigger product fetching whenever filter/sort/search changes
  // This is the primary effect that responds to UI interactions.
  useEffect(() => {
    // Only fetch if categories have been loaded, as getProducts depends on `categories`
    if (categories.length > 0) {
      // Reset offset and fetch from the beginning when filters/sort/search terms change
      setOffset(0); // This will cause `getProducts(0, false)` to be called correctly
      getProducts(0, false);
    }
  }, [selectedCategory, localSearchTerm, sortOrder, categories, getProducts]); // Dependencies for this useEffect

  const handleLoadMore = () => {
    const newOffset = offset + PRODUCTS_PER_PAGE;
    setOffset(newOffset);
    getProducts(newOffset, true); // Fetch and append
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Our <span className="text-gray-600">Collection</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold hover:bg-gray-700 transition duration-300"
            >
              {isFilterOpen ? <IoClose className="h-6 w-6" /> : <IoFilter className="h-6 w-6" />}
              <span>{isFilterOpen ? 'Close Filters' : 'Filter & Sort'}</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`
              lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-lg
              transition-all duration-300 ease-in-out
              ${isFilterOpen ? 'block max-h-screen' : 'hidden lg:block max-h-0 lg:max-h-full'}
              overflow-hidden lg:overflow-visible
            `}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Filters</h2>

            {/* Local Search Input on Shop Page */}
            <div className="mb-6">
              <label htmlFor="local-search" className="block text-sm font-medium text-gray-700 mb-2">Search Products on this page</label>
              <input
                type="text"
                id="local-search"
                placeholder="e.g., hoodie, jeans, black"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === String(category.id)} // Ensure comparison is type-safe (category.id might be number)
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        if (isFilterOpen) setIsFilterOpen(false); // Close filter on selection for mobile
                      }}
                      className="form-radio h-4 w-4 text-gray-900"
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  if (isFilterOpen) setIsFilterOpen(false); // Close filter on selection for mobile
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="lg:w-3/4 w-full">
            {loading && products.length === 0 ? ( // Only show full loading spinner if no products are loaded yet
              <div className="text-center py-20">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 mx-auto"></div>
                <p className="text-xl text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-lg border border-red-200 text-red-700">
                <p className="text-2xl mb-4">{error}</p>
                <p className="text-lg">Please check your internet connection or try again later.</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
                <p className="text-2xl text-gray-600 mb-4">No products found matching your criteria.</p>
                <p className="text-lg text-gray-500">Try adjusting your search terms or filter selections.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading} // Disable if currently loading more
                      className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Loading More...' : 'Load More Products'}
                    </button>
                  </div>
                )}
              </>
            )}
            {/* Small loading indicator when loading more (after initial load) */}
            {loading && products.length > 0 && (
              <div className="text-center py-4">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mx-auto"></div>
                <p className="text-md text-gray-500 mt-2">Fetching more...</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListPage;