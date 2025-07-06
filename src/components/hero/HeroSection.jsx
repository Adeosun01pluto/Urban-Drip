// import React from 'react';
// import heroBanner from '../../assets/images/hero-banner.jpg'; // Assuming you have an image here

// const HeroSection = () => {
//   return (
//     <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: `url(${heroBanner})` }}
//       >
//         {/* Dark overlay for text readability */}
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 p-4 text-white">
//         <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-in-up">
//           Own Your Style.<br /> Define Your <span className="text-gray-300">Drip</span>.
//         </h1>
//         <p className="text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
//           Unisex streetwear designed for the bold and the trendsetters. Discover our latest collection.
//         </p>
//         <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400 shadow-xl">
//           Shop New Arrivals
//         </button>
//       </div>

//       {/* Optional: Add some simple animations via Tailwind's JIT mode if configured or custom CSS */}
//       <style jsx>{`
//         @keyframes fadeInMoveUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInMoveUp 1s ease-out forwards;
//           opacity: 0; /* Hidden by default */
//         }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-400 { animation-delay: 0.4s; }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;


// import React, { useState, useEffect, useCallback } from 'react';
// import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
// import axios from 'axios';

// // Dummy API endpoint for products (replace with your actual products API if different)
// const PRODUCTS_API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=5';

// const HeroSection = () => {
//   const [images, setImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch images from the products API
//   const fetchProductImages = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(PRODUCTS_API_URL);
//       // Filter out products that don't have valid image URLs or are broken
//       const validImages = response.data
//         .map(product => product.images?.[0]) // Take the first image URL
//         .filter(url => url && typeof url === 'string' && (url.startsWith('http') || url.startsWith('https')))
//         .slice(0, 5); // Limit to 5 images for the carousel

//       // Fallback for broken images from the API, replace with a placeholder
//       const cleanedImages = await Promise.all(validImages.map(async (url) => {
//         try {
//           const img = new Image();
//           img.src = url;
//           await img.decode(); // Attempt to decode the image
//           return url;
//         } catch (e) {
//           console.warn(`Broken image URL detected, replacing: ${url}`);
//           return 'https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=Image+Unavailable'; // Placeholder
//         }
//       }));

//       // Ensure we have at least one fallback if all fetched images fail
//       if (cleanedImages.length === 0) {
//         setImages(['https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=UrbanDrip+Fashion']);
//       } else {
//         setImages(cleanedImages);
//       }
//     } catch (err) {
//       console.error("Error fetching product images:", err);
//       setError("Failed to load hero images.");
//       setImages(['https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=UrbanDrip+Fashion']); // Fallback to a single placeholder
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProductImages();
//   }, [fetchProductImages]);

//   // Automatic slider functionality
//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//       }, 5000); // Change image every 5 seconds
//       return () => clearInterval(interval); // Clean up on component unmount
//     }
//   }, [images.length]);

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   if (loading) {
//     return (
//       <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center bg-gray-100 animate-pulse">
//         <div className="text-xl md:text-2xl text-gray-600">Loading stunning visuals...</div>
//       </section>
//     );
//   }

//   if (error || images.length === 0) {
//     return (
//       <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center bg-red-100 text-red-700">
//         <div className="text-xl md:text-2xl">Error loading images. Please try again later.</div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center overflow-hidden">
//       {/* Background Images with Transition */}
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
//             ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//           style={{ backgroundImage: `url(${image})` }}
//         >
//           {/* Dark overlay for text readability */}
//           <div className="absolute inset-0 bg-black opacity-40"></div>
//         </div>
//       ))}

//       {/* Content */}
//       <div className="relative z-10 p-4 text-white">
//         <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-in-up">
//           Own Your Style.<br /> Define Your <span className="text-gray-300">Drip</span>.
//         </h1>
//         <p className="text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
//           Unisex streetwear designed for the bold and the trendsetters. Discover our latest collection.
//         </p>
//         <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400 shadow-xl">
//           Shop New Arrivals
//         </button>
//       </div>

//       {/* Navigation Arrows */}
//       {images.length > 1 && (
//         <>
//           <button
//             onClick={goToPrev}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
//             aria-label="Previous slide"
//           >
//             <IoChevronBack className="h-6 w-6 md:h-8 md:w-8" />
//           </button>
//           <button
//             onClick={goToNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
//             aria-label="Next slide"
//           >
//             <IoChevronForward className="h-6 w-6 md:h-8 md:w-8" />
//           </button>

//           {/* Dots Indicator */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//             {images.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white
//                   ${idx === currentIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-75 hover:bg-opacity-100'}`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               ></button>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Keep the custom CSS for content animations */}
//       <style jsx>{`
//         @keyframes fadeInMoveUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInMoveUp 1s ease-out forwards;
//           opacity: 0; /* Hidden by default */
//         }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-400 { animation-delay: 0.4s; }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;


import React, { useState, useEffect, useCallback } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import axios from 'axios';
import HeroLoadingSkeleton from './HeroLoadingSkeleton';
import { Link } from 'react-router-dom';


// Dummy API endpoint for products (replace with your actual products API if different)
const PRODUCTS_API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=5';

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Function to fetch images from the products API
  const fetchProductImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(PRODUCTS_API_URL);
      // Filter out products that don't have valid image URLs or are broken
      const validImages = response.data
        .map(product => product.images?.[0]) // Take the first image URL
        .filter(url => url && typeof url === 'string' && (url.startsWith('http') || url.startsWith('https')))
        .slice(0, 5); // Limit to 5 images for the carousel

      // Fallback for broken images from the API, replace with a placeholder
      const cleanedImages = await Promise.all(validImages.map(async (url) => {
        try {
          // Temporarily set a timeout for image loading, as Image.decode() can hang on bad URLs
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(new Error('Image failed to load'));
            img.src = url;
            // Timeout to prevent hanging on very slow/broken image attempts
            setTimeout(() => reject(new Error('Image load timeout')), 5000); // 5 seconds timeout
          });
        } catch (e) {
          console.warn(`Broken image URL detected, replacing: ${url}`, e);
          return 'https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=Image+Unavailable'; // Placeholder
        }
      })).then(results => results.filter(Boolean)) // Filter out any undefined/null from failed promises
         .catch(err => {
            console.error("Error during image processing:", err);
            return []; // Return empty array if all image processing fails
         });


      // Ensure we have at least one fallback if all fetched images fail
      if (cleanedImages.length === 0) {
        setImages(['https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=UrbanDrip+Fashion']);
      } else {
        setImages(cleanedImages);
      }
    } catch (err) {
      console.error("Error fetching product images:", err);
      setError("Failed to load hero images.");
      setImages(['https://via.placeholder.com/1920x1080/E5E7EB/6B7280?text=UrbanDrip+Fashion']); // Fallback to a single placeholder
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductImages();
  }, [fetchProductImages]);

  // Automatic slider functionality
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Use the new skeleton component here
  if (loading) {
    return <HeroLoadingSkeleton />;
  }

  if (error || images.length === 0) {
    return (
      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center bg-red-100 text-red-700">
        <div className="text-xl md:text-2xl">Error loading images. Please try again later.</div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Images with Transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 p-4 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-in-up">
          Own Your Style.<br /> Define Your <span className="text-gray-300">Drip</span>.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Unisex streetwear designed for the bold and the trendsetters. Discover our latest collection.
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400 shadow-xl">
          <Link to="/shop">
            Shop New Arrivals
          </Link>
        </button>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
          >
            <IoChevronBack className="h-6 w-6 md:h-8 md:w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
          >
            <IoChevronForward className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white
                  ${idx === currentIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-75 hover:bg-opacity-100'}`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}

      {/* Keep the custom CSS for content animations */}
      <style jsx>{`
        @keyframes fadeInMoveUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInMoveUp 1s ease-out forwards;
          opacity: 0; /* Hidden by default */
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
};

export default HeroSection;