// src/components/HeroLoadingSkeleton.jsx
import React from 'react';

const HeroLoadingSkeleton = () => {
  return (
    <section className="relative w-full h-[600px] sm:h-[100vh] flex items-center justify-center text-center overflow-hidden bg-gray-900">
      {/* Shimmer Effect Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gray-800"></div>

        {/* Shimmer gradient overlay */}
        <div className="shimmer-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* Content Area - for perceived structure (optional, could be removed for full abstract shimmer) */}
      <div className="relative z-10 p-4 flex flex-col items-center justify-center h-full w-full">
        {/* Central Spinner */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-400"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border-t-4 border-b-4 border-gray-600 animate-spin-reverse"></div>
        </div>
        <p className="text-xl md:text-2xl text-gray-400 font-light mt-4">Loading UrbanDrip...</p>
      </div>

      {/* Custom CSS for shimmer effect and reverse spin */}
      <style jsx>{`
        .shimmer-effect {
          transform: translateX(-100%);
          animation: shimmer 1.8s infinite forwards;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroLoadingSkeleton;