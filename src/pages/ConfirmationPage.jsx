import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

const ConfirmationPage = () => {
  // In a real app, you might receive an order ID from the backend to display here
  const orderId = 'URBNDRP-123456789'; // Dummy order ID

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-xl">
          <IoCheckmarkCircleSharp className="text-green-500 mx-auto mb-6 h-24 w-24" />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Order <span className="text-green-600">Confirmed!</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Thank you for your purchase from UrbanDrip.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Your order ID is: <span className="font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-md">{orderId}</span>
          </p>
          <p className="text-md text-gray-600 mb-10">
            You will receive an email confirmation with tracking details shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/shop"
              className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;