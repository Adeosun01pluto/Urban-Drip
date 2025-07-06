// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './contexts/CartContext';

// import HomePage from './pages/HomePage';
// import ProductListPage from './pages/ProductListPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import ConfirmationPage from './pages/ConfirmationPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import ProfilePage from './pages/ProfilePage';
// import SearchPage from './pages/SearchPage'; // <--- New Import

// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/shop" element={<ProductListPage />} />
//           <Route path="/product/:id" element={<ProductDetailPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/order-confirmation" element={<ConfirmationPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/search" element={<SearchPage />} /> {/* <--- New Route */}
//           {/* Add more routes here */}
//         </Routes>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage'; // New
import SignupPage from './pages/SignupPage'; // New
import UserProfilePage from './pages/UserProfilePage'; // Placeholder for protected route
import AdminDashboardPage from './pages/AdminDashboardPage'; // Placeholder for admin route

import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // New: AuthProvider and useAuth

// A simple Protected Route component
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // Show a loading spinner or null while checking auth status
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // if (roles.length > 0 && (!user || !roles.includes(user.role))) {
  //   // Redirect to home or unauthorized page if role doesn't match
  //   return <Navigate to="/" replace />; // Or a dedicated unauthorized page
  // }

  return children;
};


const App = () => {
  return (
    <Router>
      {/* Wrap the entire application with AuthProvider */}
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } />
            {/* Admin Protected Route - only accessible to 'admin' role */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />

            {/* Catch-all for 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;