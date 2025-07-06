// src/hooks/useSearch.js
import { useState, useEffect } from 'react';
import { allProductsData } from '../data/allProductsData'; // Import your dummy data

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // No search term, no results
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = allProductsData.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm)) || // Assuming products might have descriptions
      (product.gender && product.gender.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.colors && product.colors.some(color => color.toLowerCase().includes(lowerCaseSearchTerm)))
      // Add more fields to search through if needed (e.g., brand, tags)
    );
    setSearchResults(filtered);
  }, [searchTerm]); // Re-run effect when searchTerm changes

  return { searchTerm, setSearchTerm, searchResults };
};

export default useSearch;