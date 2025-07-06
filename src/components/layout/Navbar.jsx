// // import React, { useState } from 'react';
// // import { IoSearchOutline, IoPersonOutline, IoCartOutline, IoMenu, IoClose } from 'react-icons/io5';
// // import { useCart } from '../../contexts/CartContext';
// // import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

// // const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false); // State for mobile menu
// //   const [searchInputValue, setSearchInputValue] = useState(''); // State for search input
// //   const { getTotalItems } = useCart();
// //   const navigate = useNavigate(); // Initialize useNavigate

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault(); // Prevent page reload
// //     if (searchInputValue.trim()) {
// //       navigate(`/search?query=${encodeURIComponent(searchInputValue.trim())}`);
// //       setSearchInputValue(''); // Clear input after search
// //       setIsOpen(false); // Close mobile menu if open
// //     }
// //   };

// //   return (
// //     <nav className="bg-white shadow-lg sticky top-0 z-50">
// //       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// //         {/* Logo */}
// //         <Link to="/" className="text-3xl font-bold text-gray-900 tracking-wider">
// //           Urban<span className="text-gray-600">Drip</span>
// //         </Link>

// //         {/* Desktop Navigation */}
// //         <div className="hidden md:flex items-center space-x-8">
// //           <NavLink to="/shop">Shop</NavLink>
// //           <NavLink to="/new-arrivals">New Arrivals</NavLink>
// //           <NavLink to="/featured">Featured</NavLink>
// //           <NavLink to="/about">About Us</NavLink>
// //           <NavLink to="/contact">Contact</NavLink>
// //         </div>

// //         {/* Search Input (Desktop) */}
// //         <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={searchInputValue}
// //             onChange={(e) => setSearchInputValue(e.target.value)}
// //             className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 w-56"
// //           />
// //           <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
// //             <IoSearchOutline className="h-6 w-6" />
// //           </button>
// //         </form>

// //         {/* Icons */}
// //         <div className="flex items-center space-x-6">
// //           <Link to="/profile" className="text-gray-700 hover:text-gray-900 focus:outline-none">
// //             <IoPersonOutline className="h-6 w-6" />
// //           </Link>
// //           <Link to="/cart" className="text-gray-700 hover:text-gray-900 focus:outline-none relative">
// //             <IoCartOutline className="h-6 w-6" />
// //             {getTotalItems() > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// //                 {getTotalItems()}
// //               </span>
// //             )}
// //           </Link>

// //           {/* Mobile Menu Button */}
// //           <button
// //             className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
// //             onClick={() => setIsOpen(!isOpen)}
// //           >
// //             {isOpen ? <IoClose className="h-7 w-7" /> : <IoMenu className="h-7 w-7" />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Navigation and Search */}
// //       <div
// //         className={`md:hidden bg-white w-full overflow-hidden transition-all duration-300 ease-in-out ${
// //           isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
// //         }`}
// //       >
// //         <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3 border-b border-gray-100">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={searchInputValue}
// //             onChange={(e) => setSearchInputValue(e.target.value)}
// //             className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
// //           />
// //           <button type="submit" className="-ml-8 text-gray-500 hover:text-gray-900">
// //             <IoSearchOutline className="h-6 w-6" />
// //           </button>
// //         </form>
// //         <div className="flex flex-col items-center py-4 space-y-4">
// //           <NavLink to="/shop" mobile>Shop</NavLink>
// //           <NavLink to="/new-arrivals" mobile>New Arrivals</NavLink>
// //           <NavLink to="/featured" mobile>Featured</NavLink>
// //           <NavLink to="/about" mobile>About Us</NavLink>
// //           <NavLink to="/contact" mobile>Contact</NavLink>
// //           <NavLink to="/profile" mobile>Profile</NavLink>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // // Helper component for navigation links
// // const NavLink = ({ to, children, mobile = false }) => (
// //   <Link
// //     to={to}
// //     className={`
// //       font-medium text-gray-700 hover:text-gray-900 transition duration-200
// //       ${mobile ? 'block text-lg py-2' : 'px-2'}
// //     `}
// //   >
// //     {children}
// //   </Link>
// // );

// // export default Navbar;

import React, { useState } from 'react';
import { IoSearchOutline, IoPersonOutline, IoCartOutline, IoMenu, IoClose, IoLogInOutline, IoPersonAddOutline, IoLogOutOutline, IoSpeedometerOutline } from 'react-icons/io5';
import { useCart } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [searchInputValue, setSearchInputValue] = useState(''); // State for search input
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state and logout function

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInputValue.trim())}`);
      setSearchInputValue('');
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    setIsOpen(false); // Close mobile menu
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-gray-900 tracking-wider">
          Urban<span className="text-gray-600">Drip</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/new-arrivals">New Arrivals</NavLink>
          <NavLink to="/featured">Featured</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {/* Conditional Admin Dashboard Link */}
          {isAuthenticated && user?.role === 'admin' && (
            <NavLink to="/admin-dashboard">
              <IoSpeedometerOutline className="inline-block mr-1 h-5 w-5 align-text-bottom" /> Admin
            </NavLink>
          )}
        </div>

        {/* Search Input (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 w-56"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </form>

        {/* Icons (Person/Auth, Cart) */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            // Authenticated User Menu
            <div className="relative group hidden md:block">
              <button className="text-gray-700 hover:text-gray-900 focus:outline-none flex items-center">
                <IoPersonOutline className="h-6 w-6" />
                <span className="ml-1 text-sm font-medium">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 invisible z-10">
                <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  <IoPersonOutline className="mr-2" /> Profile
                </Link>
                {/* Add other user-specific links here if needed */}
                <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <IoLogOutOutline className="mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            // Not Authenticated
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="text-gray-700 hover:text-gray-900 font-medium">
                Signup
              </Link>
            </div>
          )}

          <Link to="/cart" className="text-gray-700 hover:text-gray-900 focus:outline-none relative">
            <IoCartOutline className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose className="h-7 w-7" /> : <IoMenu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation and Search */}
      <div
        className={`md:hidden bg-white w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button type="submit" className="-ml-8 text-gray-500 hover:text-gray-900">
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </form>
        <div className="flex flex-col items-center py-4 space-y-4">
          <NavLink to="/shop" mobile onClick={() => setIsOpen(false)}>Shop</NavLink>
          <NavLink to="/new-arrivals" mobile onClick={() => setIsOpen(false)}>New Arrivals</NavLink>
          <NavLink to="/featured" mobile onClick={() => setIsOpen(false)}>Featured</NavLink>
          <NavLink to="/about" mobile onClick={() => setIsOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" mobile onClick={() => setIsOpen(false)}>Contact</NavLink>

          {/* Mobile Auth Links */}
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" mobile onClick={() => setIsOpen(false)}>
                <IoPersonOutline className="inline-block mr-2" /> Profile
              </NavLink>
              {isAuthenticated && user?.role === 'admin' && (
                <NavLink to="/admin-dashboard" mobile onClick={() => setIsOpen(false)}>
                  <IoSpeedometerOutline className="inline-block mr-2" /> Admin Dashboard
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-center flex items-center justify-center space-x-3 text-lg font-medium text-red-600 hover:text-red-800 py-2"
              >
                <IoLogOutOutline />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" mobile onClick={() => setIsOpen(false)}>
                <IoLogInOutline className="inline-block mr-2" /> Login
              </NavLink>
              <NavLink to="/signup" mobile onClick={() => setIsOpen(false)}>
                <IoPersonAddOutline className="inline-block mr-2" /> Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Helper component for navigation links
const NavLink = ({ to, children, mobile = false, onClick = () => {} }) => (
  <Link
    to={to}
    onClick={onClick} // Pass onClick prop
    className={`
      font-medium text-gray-700 hover:text-gray-900 transition duration-200
      ${mobile ? 'block text-lg py-2 flex items-center' : 'px-2'}
    `}
  >
    {children}
  </Link>
);

export default Navbar;