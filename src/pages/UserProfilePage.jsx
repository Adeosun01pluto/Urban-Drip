// src/pages/UserProfilePage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const UserProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 text-xl text-gray-700">
          Loading profile...
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 text-xl text-red-600">
          Error: User profile not found or not authenticated.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">Your Profile</h1>

          <div className="flex flex-col items-center mb-8">
            <img
              src={user.avatar || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'}
              alt={user.name || 'User Avatar'}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">{user.name}</h2>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold mt-2
              ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
              Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 border-gray-100">
                <span className="font-medium text-gray-700 w-32 shrink-0">Name:</span>
                <span className="text-gray-900 text-lg">{user.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 border-gray-100">
                <span className="font-medium text-gray-700 w-32 shrink-0">Email:</span>
                <span className="text-gray-900 text-lg">{user.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium text-gray-700 w-32 shrink-0">User ID:</span>
                <span className="text-gray-900 text-lg">{user.id}</span>
              </div>
            </div>
            {/* You could add an "Edit Profile" button here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;