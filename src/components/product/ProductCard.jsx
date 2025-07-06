// import React, { useState } from 'react';
// import { IoStar, IoStarHalf } from 'react-icons/io5';
// import { useCart } from '../../contexts/CartContext';
// import { MdCheckCircleOutline } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// const ProductCard = ({ product }) => {
//   const { id, name, price, imageUrl, rating, reviews, sizes, colors } = product; // Destructure sizes and colors
//   const { addToCart } = useCart();
//   const [showAddedMsg, setShowAddedMsg] = useState(false);
//   const navigate = useNavigate(); // Initialize navigate hook

//   const handleAddToCart = (e) => {
//     e.preventDefault(); // Prevent default link behavior if inside <a>
//     e.stopPropagation(); // Stop event from bubbling up to the card's link

//     // Check if the product has size or color variations
//     if ((sizes && sizes.length > 0) || (colors && colors.length > 0)) {
//       // If variations exist, redirect to the product detail page
//       navigate(`/product/${id}`);
//       // Optionally, you could show a message like "Please select options on product page"
//       // alert("Please select your size and color options on the product page.");
//     } else {
//       // If no variations, add to cart directly with default quantity 1
//       addToCart(product, 1);

//       setShowAddedMsg(true);
//       setTimeout(() => setShowAddedMsg(false), 2000); // Hide message after 2 seconds
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative">
//       <a href={`/product/${id}`} className="block"> {/* This link remains for general navigation */}
//         <img
//           src={imageUrl}
//           alt={name}
//           className="w-full h-72 object-cover object-center"
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
//           <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
//           {rating && (
//             <div className="flex items-center mt-2">
//               {[...Array(5)].map((_, i) => {
//                 const starValue = i + 1;
//                 return (
//                   <span key={i}>
//                     {rating >= starValue ? (
//                       <IoStar className="text-yellow-400 w-5 h-5" />
//                     ) : rating >= starValue - 0.5 ? (
//                       <IoStarHalf className="text-yellow-400 w-5 h-5" />
//                     ) : (
//                       <IoStar className="text-gray-300 w-5 h-5" />
//                     )}
//                   </span>
//                 );
//               })}
//               {reviews && <span className="ml-2 text-sm text-gray-500">({reviews})</span>}
//             </div>
//           )}
//         </div>
//       </a>
//       <div className="p-4 pt-0">
//         <button
//           onClick={handleAddToCart}
//           className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"
//         >
//           {((sizes && sizes.length > 0) || (colors && colors.length > 0)) ? 'View Options' : 'Add to Cart'}
//         </button>
//       </div>

//       {showAddedMsg && (
//         <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-lg animate-fade-in-down">
//           <MdCheckCircleOutline className="h-4 w-4" />
//           <span>Added!</span>
//         </div>
//       )}
//       <style jsx>{`
//         @keyframes fade-in-down {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-down {
//           animation: fade-in-down 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from 'react';
// import { IoStar, IoStarHalf } from 'react-icons/io5'; // No longer using rating/reviews from API
import { useCart } from '../../contexts/CartContext';
import { MdCheckCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Use Link for navigation within the app

const ProductCard = ({ product }) => {
  // Destructure properties as they come from the API
  // API uses 'title', 'images' array. Our dummy data used 'name', 'imageUrl'.
  // We'll map them here for consistency with existing components.
  const { id, title, price, images } = product;
  const imageUrl = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x400/CCCCCC/FFFFFF?text=No+Image'; // Fallback image

  const { addToCart } = useCart();
  const [showAddedMsg, setShowAddedMsg] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent default link behavior if inside <a>
    e.stopPropagation(); // Stop event from bubbling up to the card's Link

    // Add to cart directly. The API products don't have sizes/colors,
    // so we don't need the 'View Options' logic.
    addToCart({
      id: product.id,
      name: product.title, // Use API's title as name
      price: product.price,
      imageUrl: imageUrl, // Use first image from API
      // sizes: product.sizes, // API doesn't provide these
      // colors: product.colors, // API doesn't provide these
      // Default to no size/color if not provided by API
      size: null,
      color: null,
    }, 1); // Always add 1 quantity from card

    setShowAddedMsg(true);
    setTimeout(() => setShowAddedMsg(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative">
      <Link to={`/product/${id}`} className="block"> {/* Use Link instead of <a> */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 sm:h-72 object-cover object-center"
        />
        <div className="p-2 sm:p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3> {/* Use title */}
          <p className="text-gray-600 mt-0">${price.toFixed(2)}</p>
          {/* Removed rating and reviews as API doesn't provide them */}
          {/*
          {rating && (
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <span key={i}>
                    {rating >= starValue ? (
                      <IoStar className="text-yellow-400 w-5 h-5" />
                    ) : rating >= starValue - 0.5 ? (
                      <IoStarHalf className="text-yellow-400 w-5 h-5" />
                    ) : (
                      <IoStar className="text-gray-300 w-5 h-5" />
                    )}
                  </span>
                );
              })}
              {reviews && <span className="ml-2 text-sm text-gray-500">({reviews})</span>}
            </div>
          )}
          */}
        </div>
      </Link>
      <div className="p-2 sm:p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>

      {showAddedMsg && (
        <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 shadow-lg animate-fade-in-down">
          <MdCheckCircleOutline className="h-4 w-4" />
          <span>Added!</span>
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;