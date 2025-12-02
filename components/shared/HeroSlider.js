'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../../lib/store';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Default products if none in store
const defaultProducts = [
  {
    id: 1,
    name: 'Modern Vase Collection',
    slug: 'modern-vase-collection',
    price: 79.99,
    images: ['/flower.png'],
    category: 'Vases',
    featured: true
  },
  {
    id: 2,
    name: 'Artificial Floral Arrangement',
    slug: 'artificial-floral-arrangement',
    price: 129.99,
    images: ['/flower.png'],
    category: 'Florals',
    featured: true
  },
  {
    id: 3,
    name: 'Ceramic Planter Set',
    slug: 'ceramic-planter-set',
    price: 89.99,
    images: ['/flower.png'],
    category: 'Planters',
    featured: true
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderProducts, setSliderProducts] = useState([]);
  
  // Get products from store
  const { products: storeProducts, fetchProducts } = useProductStore();
  
  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  useEffect(() => {
    // Filter featured products from store or use defaults if none
    const productsFromStore = storeProducts?.filter(product => product.featured);
    setSliderProducts(productsFromStore?.length > 0 ? productsFromStore.slice(0, 5) : defaultProducts);
  }, [storeProducts]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sliderProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sliderProducts.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, sliderProducts.length]);

  if (sliderProducts.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Left arrow */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      
      {/* Right arrow */}
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors shadow-md"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            {sliderProducts.length > 0 && (
              <Link href={`/products/${sliderProducts[currentIndex].slug}`} className="w-full h-full">
                <img
                  src={sliderProducts[currentIndex].images && sliderProducts[currentIndex].images.length > 0 
                    ? sliderProducts[currentIndex].images[0] 
                    : '/images/placeholder.jpg'}
                  alt={sliderProducts[currentIndex].name}
                  className="w-200 h-130 object-contain"
                />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-2 space-x-2">
        {sliderProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}