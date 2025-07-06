
// import { Link } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { useCart } from '../contexts/CartContext';
// import { IoTrashOutline } from 'react-icons/io5';

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(productId);
//     } else {
//       updateQuantity(productId, newQuantity);
//     }
//   };

//   const total = getCartTotal();
//   const shippingCost = 7.50; // Dummy shipping cost

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
//           Your <span className="text-gray-600">Drip</span> Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
//             <p className="text-2xl text-gray-600 mb-6">Your cart is currently empty.</p>
//             <Link
//               to="/shop"
//               className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {/* Cart Items List */}
//             <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-lg"> {/* Adjusted padding */}
//               {cartItems.map((item) => (
//                 <div key={item.id + (item.size || '') + (item.color || '')} // More robust key
//                      className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 last:border-b-0">
//                   <Link to={`/product/${item.id}`} className="flex-shrink-0 mb-4 sm:mb-0">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="w-24 h-24 object-cover rounded-md sm:mr-4"
//                     />
//                   </Link>
//                   <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0"> {/* Center text on mobile */}
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       <Link to={`/product/${item.id}`} className="hover:text-gray-600 transition-colors">
//                         {item.name}
//                       </Link>
//                     </h2>
//                     {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
//                     {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
//                     <p className="text-lg font-medium text-gray-700 mt-1">${item.price.toFixed(2)}</p>
//                   </div>
//                   {/* Quantity and Remove Button Group */}
//                   <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//                     <div className="flex items-center border border-gray-300 rounded-md">
//                       <button
//                         onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                         className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-l-md"
//                       >
//                         -
//                       </button>
//                       <input
//                         type="text"
//                         value={item.quantity}
//                         onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
//                         className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
//                       />
//                       <button
//                         onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                         className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-r-md"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                       title="Remove item"
//                     >
//                       <IoTrashOutline className="h-6 w-6" />
//                     </button>
//                   </div>
//                   {/* Item Total Price - Hidden on very small screens, visible on sm and up */}
//                   <div className="ml-0 sm:ml-6 text-xl font-bold text-gray-900 w-full sm:w-24 text-right mt-2 sm:mt-0">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             {/* The sticky top-28 is fine, but adjust padding for mobile */}
//             <div className="lg:col-span-1 bg-white p-4 sm:p-6 rounded-lg shadow-lg h-fit sticky lg:top-28">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
//               <div className="flex justify-between items-center text-lg text-gray-700 mb-3">
//                 <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between items-center text-lg text-gray-700 mb-6">
//                 <span>Shipping (Standard)</span>
//                 <span>${shippingCost.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between items-center text-2xl font-bold text-gray-900 border-t pt-4">
//                 <span>Estimated Total</span>
//                 <span>${(total + shippingCost).toFixed(2)}</span>
//               </div>
//               <Link
//                 to="/checkout"
//                 className="block w-full text-center bg-gray-900 text-white px-6 py-3 mt-8 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CartPage;


import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { IoTrashOutline } from 'react-icons/io5';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth(); // Get authentication status
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      // Redirect to login, passing the current path so user can be redirected back after login
      navigate('/login', { state: { from: '/cart' } }); 
      // You could also redirect to signup if that's preferred for unauthenticated users
      // navigate('/signup', { state: { from: '/cart' } });
    }
  };

  const total = getCartTotal();
  const shippingCost = 7.50; // Dummy shipping cost

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-5 sm:mb-12">
          Your <span className="text-gray-600">Drip</span> Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-2xl text-gray-600 mb-6">Your cart is currently empty.</p>
            <Link
              to="/shop"
              className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              {cartItems.map((item) => (
                <div key={item.id + (item.size || '') + (item.color || '')}
                     className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 py-2 sm:py-4 last:border-b-0">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0 mb-2 sm:mb-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-48 sm:w-32 h-32 object-cover rounded-md sm:mr-4"
                    />
                  </Link>
                  <div className="flex-grow text-sm sm:text-left mb-1 sm:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                      <Link to={`/product/${item.id}`} className="hover:text-gray-600 transition-colors">
                        {item.name}
                      </Link>
                    </h2>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    <p className="text-lg font-medium text-gray-700 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  {/* Quantity and Remove Button Group */}
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-l-md"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      title="Remove item"
                    >
                      <IoTrashOutline className="h-6 w-6" />
                    </button>
                  </div>
                  {/* Item Total Price - Hidden on very small screens, visible on sm and up */}
                  <div className="ml-0 sm:ml-6 text-xl font-bold text-gray-900 w-full sm:w-24 text-right sm:mt-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white p-4 sm:p-6 rounded-lg shadow-lg h-fit sticky lg:top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-3">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-6">
                <span>Shipping (Standard)</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-gray-900 border-t pt-4">
                <span>Estimated Total</span>
                <span>${(total + shippingCost).toFixed(2)}</span>
              </div>
              {/* Changed from <Link> to <button> to allow for conditional logic */}
              <button
                onClick={handleProceedToCheckout} // Use the new handler
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 mt-8 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;