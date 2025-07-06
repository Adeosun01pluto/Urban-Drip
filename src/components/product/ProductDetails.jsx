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
//     setTimeout(() => setShowAddedToCartMsg(false), 3000); // Hide message after 3 seconds
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
import ProductCard from '../components/product/ProductCard'; // For related products
import { useCart } from '../contexts/CartContext';
import { IoStar } from 'react-icons/io5'; // Keeping star for dummy display
import { fetchProductById, fetchRelatedProducts } from '../api/productsApi'; // Import API functions

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  // const [selectedSize, setSelectedSize] = useState(null); // Removed: API doesn't provide sizes
  // const [selectedColor, setSelectedColor] = useState(null); // Removed: API doesn't provide colors
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product and related products
  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductById(id);
        // console.log(fetchedProduct, id)
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Fetch related products for the current product
          const fetchedRelatedProducts = await fetchRelatedProducts(id);
          // Filter out the current product from related products
          setRelatedProducts(fetchedRelatedProducts.filter(p => p.id !== fetchedProduct.id));
        } else {
          setError('Product not found.');
          setProduct(null);
        }
      } catch (err) {
        setError('Failed to load product details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
    // Reset states on ID change
    // setSelectedSize(null);
    // setSelectedColor(null);
    setQuantity(1);
    setShowAddedToCartMsg(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // // Removed size/color validation as API products don't have these attributes
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
      name: product.title, // Use API's title as name
      price: product.price,
      imageUrl: product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400x400/CCCCCC/FFFFFF?text=No+Image',
      // Since API doesn't have sizes/colors, these will be null or undefined
      size: null, // selectedSize,
      color: null, // selectedColor,
    }, quantity);

    setShowAddedToCartMsg(true);
    setTimeout(() => setShowAddedToCartMsg(false), 3000); // Hide message after 3 seconds
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4 mx-auto"></div>
          <p className="text-xl text-gray-600">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center bg-red-50 rounded-lg border border-red-200 text-red-700">
          <p className="text-2xl mb-4">{error}</p>
          <p className="text-lg">Please check the product ID or your internet connection.</p>
          <Link to="/shop" className="text-blue-600 hover:underline mt-4 block">Back to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <p className="text-2xl text-gray-600">Product not found.</p>
          <Link to="/shop" className="text-blue-600 hover:underline mt-4 block">Back to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper for star rating (dummy, since API doesn't provide)
  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<IoStar key={i} className={`h-5 w-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`} />);
    }
    return stars;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Images */}
          <div>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]} // Display first image as main
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <img
                src="https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=No+Image"
                alt="No Image Available"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            )}
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {product.images && product.images.map((img, index) => (
                // You might want to implement a larger image viewer here for clicking on thumbnails
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200 cursor-pointer hover:border-gray-500 transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {product.category ? product.category.name : 'Uncategorized'}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.title}</h1>
            <p className="text-gray-700 text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>

            {/* Dummy Rating (since API doesn't provide) */}
            <div className="flex items-center mt-3 mb-6">
              {renderStars(4)} {/* Assuming a dummy rating of 4 stars */}
              <span className="ml-2 text-gray-600 text-sm">(150+ Reviews)</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Removed Size and Color Selection as API doesn't provide these attributes */}
            {/* {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium
                        ${selectedSize === size ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Color:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      style={{ backgroundColor: color.toLowerCase().includes('white') ? '#f0f0f0' : color, borderColor: selectedColor === color ? 'currentColor' : '' }} // Added background for white color
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <label htmlFor="quantity" className="text-lg font-medium text-gray-800 mr-4">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Add to Cart
            </button>

            {showAddedToCartMsg && (
              <p className="text-green-600 text-center mt-4 text-lg">Product added to cart!</p>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map((relatedProduct) => ( // Show max 4 related
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