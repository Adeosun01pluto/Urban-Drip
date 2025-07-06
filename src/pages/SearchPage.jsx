// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // To get URL query params
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import ProductCard from '../components/product/ProductCard';
// import useSearch from '../hooks/useSearch'; // Import the custom hook

// const SearchPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get('query') || ''; // Get the search query from URL

//   const { searchTerm, setSearchTerm, searchResults } = useSearch();

//   useEffect(() => {
//     // Set the search term from the URL query when the component mounts or query changes
//     setSearchTerm(query);
//   }, [query, setSearchTerm]); // Include setSearchTerm in dependency array

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8">
//           Search Results for "<span className="text-gray-600">{query}</span>"
//         </h1>

//         {searchResults.length === 0 && query.trim() !== '' ? (
//           <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//             <p className="text-2xl text-gray-600 mb-4">No products found matching your search.</p>
//             <p className="text-lg text-gray-500">Try adjusting your search terms or filters.</p>
//           </div>
//         ) : searchResults.length === 0 && query.trim() === '' ? (
//           <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//             <p className="text-2xl text-gray-600 mb-4">Enter a search term to find products.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {searchResults.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default SearchPage;

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../api/productsApi'; // Import API functions

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || ''; // Get the search query from URL

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized function to fetch search results
  const getSearchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!query.trim()) {
        setSearchResults([]); // No query, no results
        setLoading(false);
        return;
      }
      const fetchedData = await fetchProducts({ title: query.trim(), limit: 50 }); // Fetch up to 50 results
      setSearchResults(fetchedData);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    getSearchResults();
  }, [getSearchResults]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8">
          Search Results for "<span className="text-gray-600">{query}</span>"
        </h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 mx-auto"></div>
            <p className="text-xl text-gray-600">Searching for products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-lg border border-red-200 text-red-700">
            <p className="text-2xl mb-4">{error}</p>
            <p className="text-lg">Please check your internet connection or try again later.</p>
          </div>
        ) : searchResults.length === 0 && query.trim() !== '' ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-2xl text-gray-600 mb-4">No products found matching your search.</p>
            <p className="text-lg text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : searchResults.length === 0 && query.trim() === '' ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-2xl text-gray-600 mb-4">Enter a search term to find products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;