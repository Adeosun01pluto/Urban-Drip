// src/api/authApi.js
import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Create an Axios instance for authentication-related requests
const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
authApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and unauthorized errors
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 Unauthorized AND it's not the refresh token endpoint itself
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          const { access_token, refresh_token } = response.data;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return authApi(originalRequest); // Use the authApi instance for retry
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // Optionally, dispatch a logout action here if using Redux/context
          // window.location.href = '/login'; // Redirect to login page
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


/**
 * Registers a new user.
 * @param {object} userData - User registration data (name, email, password, avatar).
 * @returns {Promise<object>} A promise that resolves to the new user object.
 */
export const registerUser = async (userData) => {
  try {
    const response = await authApi.post('/users/', userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response ? error.response.data : error.message);
    throw error; // Re-throw to allow component to handle
  }
};

/**
 * Checks if an email is available.
 * @param {string} email - The email to check.
 * @returns {Promise<boolean>} A promise that resolves to true if available, false otherwise.
 */
export const checkEmailAvailability = async (email) => {
  try {
    const response = await authApi.post('/users/is-available', { email });
    return response.data.isAvailable;
  } catch (error) {
    console.error("Error checking email availability:", error.response ? error.response.data : error.message);
    // Assume not available on error to prevent issues
    return false;
  }
};

/**
 * Logs in a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<object>} A promise that resolves to an object with access_token and refresh_token.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await authApi.post('/auth/login', { email, password });
    return response.data; // Contains access_token and refresh_token
  } catch (error) {
    console.error("Error logging in:", error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Fetches the authenticated user's profile. Requires a valid access token.
 * @returns {Promise<object>} A promise that resolves to the user's profile object.
 */
export const getProfile = async () => {
  try {
    const response = await authApi.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// You can add more user-related endpoints here if needed (e.g., getUserById, updateUser)
export const getUserById = async (id) => {
  try {
    const response = await authApi.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export default authApi; // Export the instance for direct use if needed