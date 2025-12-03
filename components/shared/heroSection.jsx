'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-yellow-400 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
             Mobile Acessories Collection
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 mb-6 leading-tight">
              in Our Store
            </h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
            </p>
            <Link href="/products">
              <button className="bg-green-500   text-white font-bold text-lg px-12 py-4 rounded-full  transition-all duration-300  uppercase tracking-wider">
                BUY
              </button>
            </Link>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Price Tag */}
              <div className="absolute -top-4 left-1/2 lg:left-auto lg:right-12 transform -translate-x-1/2 lg:translate-x-0 z-20 bg-white rounded-full shadow-2xl p-4 w-28 h-28 flex flex-col items-center justify-center">
                <div className="flex items-start">
             
                  <div className="flex flex-col ml-1 -mt-1">
                    <span className="text-xxl font-bold text-gray-800">50$</span>
                  </div>
                </div>
                
              </div>

              {/* Wooden Crate with Fruits */}
              <div className="relative">
                {/* You can replace this with your actual fruit crate image */}
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-b-3xl">
                  <Image
                    src="/product.jpg"
                    alt="Fresh Exotic Fruits"
                    fill
                    className="object-contain drop-shadow-2xl rounded-2xl"
                    priority
                    onError={(e) => {
                      // Fallback placeholder
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Fallback placeholder if image doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Wooden Crate Illustration */}
                      <div className="relative w-80 h-96">
                        {/* Top Apples */}
                       
                        
                        {/* Wooden Crate */}
                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      
      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
}