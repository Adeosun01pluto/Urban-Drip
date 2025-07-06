// src/api/productsApi.js
import axios from 'axios'; // Import Axios

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all categories from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of category objects.
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories'); // Use api.get()
    return response.data; // Axios automatically parses JSON into .data
  } catch (error) {
    console.error("Error fetching categories:", error.response ? error.response.data : error.message);
    return []; // Return empty array on error
  }
};

/**
 * Fetches products based on various filters and pagination.
 * @param {object} params - Query parameters for filtering and pagination.
 * @param {string} [params.title] - Filter by product title.
 * @param {number} [params.price_min] - Minimum price.
 * @param {number} [params.price_max] - Maximum price.
 * @param {number} [params.categoryId] - Filter by category ID.
 * @param {string} [params.categorySlug] - Filter by category slug.
 * @param {number} [params.limit=10] - Number of items to return.
 * @param {number} [params.offset=0] - Number of items to skip.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params }); // Pass params directly to Axios
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response ? error.response.data : error.message);
    return []; // Return empty array on error
  }
};

/**
 * Fetches a single product by its ID.
 * @param {string} id - The product ID.
 * @returns {Promise<object|null>} A promise that resolves to a product object or null if not found/error.
 */
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      console.warn(`Product with ID ${id} not found.`);
      return null; // Return null for 404
    }
    console.error(`Error fetching product with ID ${id}:`, error.response ? error.response.data : error.message);
    return null; // Return null on other errors
  }
};

/**
 * Fetches products related to a given product ID.
 * (Note: The API's "related" endpoint seems to return random products, not truly related ones based on category/tags.
 * We'll use it as-is for now, but be aware of its limitations for genuine "related items".)
 * @param {string} id - The product ID to find related products for.
 * @returns {Promise<Array>} A promise that resolves to an array of related product objects.
 */
export const fetchRelatedProducts = async (id) => {
  try {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching related products for ID ${id}:`, error.response ? error.response.data : error.message);
    return []; // Return empty array on error
  }
};

// You can add more API functions here for POST, PUT, DELETE if needed later, using api.post, api.put, api.delete
/*
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products/', productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response ? error.response.data : error.message);
    throw error; // Re-throw to allow calling component to handle
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
*/