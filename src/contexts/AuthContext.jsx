// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, getProfile, registerUser as apiRegisterUser } from '../api/authApi'; // Renamed apiRegisterUser to avoid conflict

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user profile data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading for profile check

  // Function to load user from token
  const loadUser = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const profile = await getProfile();
        setUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Token might be expired or invalid, clear and log out
        logout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser(); // Attempt to load user on component mount
  }, [loadUser]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      await loadUser(); // Fetch profile after successful login
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setLoading(false); // Stop loading on error
      throw error; // Re-throw to inform the calling component (e.g., LoginPage)
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await apiRegisterUser(userData);
      // After registration, you might want to automatically log them in
      // This API doesn't return tokens on register, so we'll just return the user
      // and let the user manually log in or call login() immediately.
      // For simplicity, let's just create the user, then they can log in.
      setLoading(false);
      return newUser;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setLoading(false);
      throw error;
    }
  };


  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false); // Ensure loading is false after logout
    // Optionally, redirect to login page here using navigate if using react-router-dom v6
  }, []);

  // Provide these values to any component that consumes the context
  const value = {
    user,
    isAuthenticated,
    loading, // For initial check
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin', // Convenience for admin checks
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};