import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { IoPersonOutline, IoLocationOutline, IoBagHandleOutline } from 'react-icons/io5'; // Icons for profile sections

const ProfilePage = () => {
  // Dummy user data (in a real app, this would come from an authenticated user context/API)
  const [user, _] = useState({
    name: 'John Drip',
    email: 'john.drip@example.com',
    memberSince: 'January 2023',
    shippingAddress: {
      address: '456 Drip Street',
      city: 'Lagos',
      state: 'Lagos',
      zipCode: '100001',
      country: 'Nigeria',
    },
    // Placeholder for order history
    orders: [
      { id: 'ORD-20230101', date: '2023-01-01', total: 125.99, status: 'Delivered', items: 2 },
      { id: 'ORD-20230315', date: '2023-03-15', total: 89.99, status: 'Processing', items: 1 },
    ],
  });

  const [activeTab, setActiveTab] = useState('profile'); // State to manage active tab

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Your <span className="text-gray-600">Profile</span>
        </h1>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* Profile Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-3 px-6 text-lg font-medium ${activeTab === 'profile' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('profile')}
            >
              <IoPersonOutline className="inline-block mr-2 text-xl" /> My Details
            </button>
            <button
              className={`py-3 px-6 text-lg font-medium ${activeTab === 'orders' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('orders')}
            >
              <IoBagHandleOutline className="inline-block mr-2 text-xl" /> My Orders
            </button>
            <button
              className={`py-3 px-6 text-lg font-medium ${activeTab === 'address' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('address')}
            >
              <IoLocationOutline className="inline-block mr-2 text-xl" /> Addresses
            </button>
            {/* Add more tabs as needed (e.g., Payment Methods, Wishlist) */}
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="text-gray-900 text-lg font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email Address</p>
                  <p className="text-gray-900 text-lg font-medium">{user.email}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="text-gray-900 text-lg font-medium">{user.memberSince}</p>
              </div>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300">
                Edit Profile
              </button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Orders</h2>
              {user.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="py-3 px-4 border-b">Order ID</th>
                        <th className="py-3 px-4 border-b">Date</th>
                        <th className="py-3 px-4 border-b">Total</th>
                        <th className="py-3 px-4 border-b">Status</th>
                        <th className="py-3 px-4 border-b">Items</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b text-gray-800 font-mono">{order.id}</td>
                          <td className="py-3 px-4 border-b text-gray-700">{order.date}</td>
                          <td className="py-3 px-4 border-b text-gray-700">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4 border-b">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                              ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                 order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                 'bg-gray-100 text-gray-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b text-gray-700">{order.items}</td>
                          <td className="py-3 px-4 border-b">
                            <button className="text-blue-600 hover:underline text-sm">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              )}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-900 text-lg font-medium">{user.name}</p>
                <p className="text-gray-700">{user.shippingAddress.address}</p>
                <p className="text-gray-700">{user.shippingAddress.city}, {user.shippingAddress.state} {user.shippingAddress.zipCode}</p>
                <p className="text-gray-700">{user.shippingAddress.country}</p>
                <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300">
                  Edit Address
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;