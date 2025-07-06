// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { useCart } from '../contexts/CartContext'; // Import useCart hook
// import { IoStar, IoStarOutline } from 'react-icons/io5'; // For ratings
// import { MdCheckCircleOutline } from 'react-icons/md'; // For success message

// // Dummy product data (should come from an API in a real app)
// // This is a simplified version; in reality, you'd fetch based on ID
// const allProductsForDetail = [
//   {
//     id: 'p001',
//     name: 'Oversized Hoodie - Charcoal',
//     price: 69.99,
//     imageUrl: 'https://via.placeholder.com/600x600/333333/FFFFFF?text=Hoodie+Charcoal',
//     images: [
//       'https://via.placeholder.com/600x600/333333/FFFFFF?text=Hoodie+Charcoal+Front',
//       'https://via.placeholder.com/600x600/555555/DDDDDD?text=Hoodie+Charcoal+Back',
//       'https://via.placeholder.com/600x600/777777/BBBBBB?text=Hoodie+Detail+Fabric',
//     ],
//     description: 'Embrace urban comfort with our oversized charcoal hoodie. Crafted from premium fleece, it offers a relaxed fit and ultimate warmth. Perfect for layering or making a statement on its own.',
//     details: [
//       'Material: 80% Cotton, 20% Polyester Fleece',
//       'Fit: Oversized',
//       'Features: Ribbed cuffs and hem, Kangaroo pocket, Adjustable drawstring hood',
//       'Care: Machine wash cold, tumble dry low',
//     ],
//     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
//     colors: ['Charcoal', 'Black', 'Olive'],
//     rating: 4.8,
//     reviews: 120,
//   },
//   {
//     id: 'p002',
//     name: 'Distressed Denim Jeans',
//     price: 89.99,
//     imageUrl: 'https://via.placeholder.com/600x600/555555/FFFFFF?text=Denim+Jeans',
//     images: [
//       'https://via.placeholder.com/600x600/555555/FFFFFF?text=Denim+Jeans+Front',
//       'https://via.placeholder.com/600x600/777777/AAAAAA?text=Denim+Jeans+Detail',
//     ],
//     description: 'Elevate your street style with our Distressed Denim Jeans. Designed for a modern, slim-tapered fit with strategic distressing for an authentic worn-in look. Durable and stylish.',
//     details: [
//       'Material: 100% Cotton Denim',
//       'Fit: Slim Tapered',
//       'Features: Button fly, 5-pocket styling, Ripped details',
//       'Care: Machine wash cold, inside out',
//     ],
//     sizes: ['28', '30', '32', '34', '36', '38'],
//     colors: ['Light Wash', 'Mid Wash', 'Dark Wash'],
//     rating: 4.5,
//     reviews: 85,
//   },
//   // Add other products here as needed for testing
//   {
//     id: 'p003',
//     name: 'Graphic Tee - "Urban Flow"',
//     price: 34.99,
//     imageUrl: 'https://via.placeholder.com/600x600/777777/FFFFFF?text=Graphic+Tee',
//     images: [
//       'https://via.placeholder.com/600x600/777777/FFFFFF?text=Graphic+Tee',
//       'https://via.placeholder.com/600x600/999999/BBBBBB?text=Graphic+Tee+Back',
//     ],
//     description: 'Express yourself with the "Urban Flow" graphic tee. Soft, breathable cotton with a unique design inspired by city life. Perfect for everyday wear.',
//     details: [
//       'Material: 100% Ringspun Cotton',
//       'Fit: Regular',
//       'Features: Crew neck, Vibrant screen print',
//       'Care: Machine wash cold, inside out',
//     ],
//     sizes: ['XS', 'S', 'M', 'L', 'XL'],
//     colors: ['Black', 'White', 'Forest Green'],
//     rating: 4.9,
//     reviews: 210,
//   },
// ];


// const ProductDetailPage = () => {
//   const { id } = useParams(); // Get product ID from URL
//   const { addToCart } = useCart(); // Use the addToCart function from context

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // In a real app: const response = await api.get(`/products/${id}`);
//         // setProduct(response.data);
//         await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
//         const foundProduct = allProductsForDetail.find(p => p.id === id);
//         if (foundProduct) {
//           setProduct(foundProduct);
//           setSelectedSize(foundProduct.sizes[0] || ''); // Default to first size
//           setSelectedColor(foundProduct.colors[0] || ''); // Default to first color
//         } else {
//           setError("Product not found.");
//         }
//       } catch (err) {
//         setError("Failed to load product details. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     // Optional: Add validation for size/color selection if mandatory
//     if (product.sizes && !selectedSize) {
//       alert("Please select a size.");
//       return;
//     }
//     if (product.colors && !selectedColor) {
//       alert("Please select a color.");
//       return;
//     }

//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       size: selectedSize,    // Include selected size
//       color: selectedColor,  // Include selected color
//     }, quantity);

//     setShowAddedToCartMsg(true);
//     setTimeout(() => setShowAddedToCartMsg(false), 5000); // Hide message after 3 seconds
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow flex items-center justify-center py-20 text-xl text-gray-700">
//           Loading product details...
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow flex items-center justify-center py-20 text-xl text-red-600">
//           Error: {error}
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow flex items-center justify-center py-20 text-xl text-gray-600">
//           Product not found.
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <div className="flex flex-col items-center">
//             <img
//               src={product.imageUrl} // Main image
//               alt={product.name}
//               className="w-full max-w-lg h-auto rounded-lg shadow-lg mb-6"
//             />
//             <div className="flex space-x-4 overflow-x-auto w-full max-w-lg justify-center">
//               {product.images?.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`${product.name} thumbnail ${index + 1}`}
//                   className="w-24 h-24 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-gray-900 transition duration-200"
//                   onClick={() => setProduct({ ...product, imageUrl: img })} // Change main image on click
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="lg:pr-8">
//             <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
//             {product.rating && (
//               <div className="flex items-center mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i}>
//                     {i < Math.floor(product.rating) ? (
//                       <IoStar className="text-yellow-400 w-6 h-6" />
//                     ) : (
//                       <IoStarOutline className="text-gray-300 w-6 h-6" />
//                     )}
//                   </span>
//                 ))}
//                 <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
//               </div>
//             )}
//             <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

//             <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

//             {/* Size Selector */}
//             {product.sizes && product.sizes.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Size:</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {product.sizes.map((size) => (
//                     <button
//                       key={size}
//                       className={`
//                         px-4 py-2 border rounded-md text-sm font-medium
//                         ${selectedSize === size
//                           ? 'bg-gray-900 text-white border-gray-900'
//                           : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'
//                         } transition-colors duration-200
//                       `}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Color Selector */}
//             {product.colors && product.colors.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Color:</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {product.colors.map((color) => (
//                     <button
//                       key={color}
//                       className={`
//                         w-10 h-10 rounded-full border-2
//                         ${selectedColor === color ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-gray-300'}
//                         transition-all duration-200 flex items-center justify-center
//                       `}
//                       style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} // Basic color mapping
//                       onClick={() => setSelectedColor(color)}
//                       title={color}
//                     >
//                       {/* Optional: Add a checkmark for selected color if background is too dark */}
//                       {selectedColor === color && (color.toLowerCase() === 'black' || color.toLowerCase() === 'charcoal' || color.toLowerCase() === 'olive' || color.toLowerCase() === 'forestgreen') ? (
//                         <MdCheckCircleOutline className="text-white w-5 h-5" />
//                       ) : selectedColor === color ? (
//                         <MdCheckCircleOutline className="text-gray-900 w-5 h-5" />
//                       ) : null}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity Selector and Add to Cart */}
//             <div className="flex items-center space-x-4 mb-8">
//               <label htmlFor="quantity" className="sr-only">Quantity</label>
//               <input
//                 type="number"
//                 id="quantity"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                 className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
//               />
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-grow bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Add to Cart
//               </button>
//             </div>

//             {showAddedToCartMsg && (
//               <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2 mb-4 animate-fade-in">
//                 <MdCheckCircleOutline className="h-6 w-6" />
//                 <span>Item added to cart!</span>
//               </div>
//             )}

//             {/* Product Details List */}
//             {product.details && product.details.length > 0 && (
//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Details</h3>
//                 <ul className="list-disc list-inside text-gray-700 space-y-2">
//                   {product.details.map((detail, index) => (
//                     <li key={index}>{detail}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetailPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext'; // Import useCart hook
import { IoStar } from 'react-icons/io5'; // Keeping for dummy rating display
import { MdCheckCircleOutline } from 'react-icons/md'; // For success message
import { fetchProductById, fetchRelatedProducts } from '../api/productsApi'; // Import API functions
import ProductCard from '../components/product/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart(); // Use the addToCart function from context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedSize, setSelectedSize] = useState(''); // Removed: API doesn't provide
  // const [selectedColor, setSelectedColor] = useState(''); // Removed: API doesn't provide
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [mainImageUrl, setMainImageUrl] = useState(''); // State for the main displayed image
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Set the initial main image from the fetched product's images array
          if (fetchedProduct.images && fetchedProduct.images.length > 0) {
            setMainImageUrl(fetchedProduct.images[0]);
          } else {
            setMainImageUrl('https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=No+Image'); // Fallback
          }

          // Fetch related products (API returns random, not truly related by category)
          const fetchedRelated = await fetchRelatedProducts(id);
          // Filter out the current product from related list if it appears there
          setRelatedProducts(fetchedRelated.filter(p => p.id !== fetchedProduct.id).slice(0, 4)); // Limit to 4 related
        } else {
          setError("Product not found.");
          setProduct(null); // Ensure product is null if not found
        }
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
        console.error("Product Detail Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();

    // Reset states on ID change (e.g., navigating from one product detail to another)
    setQuantity(1);
    setShowAddedToCartMsg(false);
    // setSelectedSize(''); // Reset
    // setSelectedColor(''); // Reset
  }, [id]); // Re-run effect when the product ID changes

  const handleAddToCart = () => {
    if (!product) return;

    // // Removed size/color validation as the API does not provide these
    // if (product.sizes && !selectedSize) {
    //   alert("Please select a size.");
    //   return;
    // }
    // if (product.colors && !selectedColor) {
    //   alert("Please select a color.");
    //   return;
    // }

    addToCart({
      id: product.id,
      name: product.title, // Use API's 'title' field for product name
      price: product.price,
      imageUrl: mainImageUrl, // Use the currently displayed main image
      // size: selectedSize,    // Now null or undefined as API doesn't provide
      // color: selectedColor,  // Now null or undefined as API doesn't provide
    }, quantity);

    setShowAddedToCartMsg(true);
    setTimeout(() => setShowAddedToCartMsg(false), 3000); // Hide message after 3 seconds
  };

  // Helper for dummy star rating (since API doesn't provide real ratings)
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<IoStar key={i} className={`h-5 w-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`} />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 mx-auto"></div>
          {/* <p className="text-xl text-gray-700">Loading product details...</p> */}
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 text-center bg-red-50 rounded-lg border border-red-200 text-red-700 mx-4">
          <p className="text-2xl mb-4">{error}</p>
          <p className="text-lg">Please check the product ID or your internet connection.</p>
          <Link to="/shop" className="text-blue-600 hover:underline mt-4 block">Back to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    // This case should ideally be covered by the error state if fetchProductById returns null
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 text-xl text-gray-600">
          Product not found.
          <Link to="/shop" className="text-blue-600 hover:underline ml-2">Go to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="flex flex-col items-center">
            <img
              src={mainImageUrl} // Main displayed image
              alt={product.title} // Use API's 'title'
              className="w-full max-w-lg h-auto rounded-lg shadow-lg mb-6 object-cover aspect-square"
            />
            <div className="flex space-x-4 overflow-x-auto w-full max-w-lg justify-center p-2">
              {product.images?.map((img, index) => (
                // Basic validation for image URLs, filter out invalid ones
                img && typeof img === 'string' && (img.startsWith('http') || img.startsWith('/')) ? (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2
                                ${mainImageUrl === img ? 'border-gray-900' : 'border-gray-300 hover:border-gray-600'}
                                transition duration-200`}
                    onClick={() => setMainImageUrl(img)} // Change main image on thumbnail click
                  />
                ) : null
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pr-8">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {product.category ? product.category.name : 'Uncategorized'}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-3">{product.title}</h1> {/* Use product.title */}
            <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

            {/* Dummy Rating (API does not provide ratings) */}
            <div className="flex items-center mb-4">
              {renderStars(4)} {/* Assuming a dummy rating of 4 stars */}
              <span className="ml-2 text-gray-600">(Dummy Reviews)</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Removed Size Selector: The API does not provide sizes */}
            {/*
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Size:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`
                        px-4 py-2 border rounded-md text-sm font-medium
                        ${selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'
                        } transition-colors duration-200
                      `}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            */}

            {/* Removed Color Selector: The API does not provide colors */}
            {/*
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Color:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`
                        w-10 h-10 rounded-full border-2
                        ${selectedColor === color ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-gray-300'}
                        transition-all duration-200 flex items-center justify-center
                      `}
                      style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} // Basic color mapping
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {selectedColor === color && (color.toLowerCase() === 'black' || color.toLowerCase() === 'charcoal' || color.toLowerCase() === 'olive' || color.toLowerCase() === 'forestgreen') ? (
                        <MdCheckCircleOutline className="text-white w-5 h-5" />
                      ) : selectedColor === color ? (
                        <MdCheckCircleOutline className="text-gray-900 w-5 h-5" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            )}
            */}

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <label htmlFor="quantity" className="sr-only">Quantity</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Add to Cart
              </button>
            </div>

            {showAddedToCartMsg && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2 mb-4 animate-fade-in">
                <MdCheckCircleOutline className="h-6 w-6" />
                <span>Item added to cart!</span>
              </div>
            )}

            {/* Product Details List (using API's 'description' as main details) */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Product</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              {/* If you wanted more detailed points, the API doesn't provide them like your dummy data 'details' array.
                  You'd need to parse the description or assume more details are in the backend. */}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;