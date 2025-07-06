// src/pages/AdminDashboardPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { MdDashboard, MdPeople, MdShoppingCart, MdCategory } from 'react-icons/md';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Admin <span className="text-gray-600">Dashboard</span>
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Users Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <MdPeople className="text-gray-600 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Users</h2>
            <p className="text-gray-600 mb-4">View, create, update, and delete user accounts.</p>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
              Go to Users
            </button>
          </div>

          {/* Card 2: Products Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <MdShoppingCart className="text-gray-600 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Products</h2>
            <p className="text-gray-600 mb-4">Add new products, edit existing ones, or remove items.</p>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
              Go to Products
            </button>
          </div>

          {/* Card 3: Categories Management */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <MdCategory className="text-gray-600 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Categories</h2>
            <p className="text-gray-600 mb-4">Organize and categorize your products efficiently.</p>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
              Go to Categories
            </button>
          </div>

          {/* Add more admin cards as needed */}
        </div>

        {user && (
          <div className="text-center mt-12 text-gray-600">
            <p className="text-lg">Logged in as: <span className="font-semibold text-gray-800">{user.name}</span> ({user.email})</p>
            <p className="text-md">Your role: <span className="font-semibold text-gray-800 capitalize">{user.role}</span></p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;