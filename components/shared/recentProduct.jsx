'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/lib/store';
import { message } from 'antd';
import Image from 'next/image';

export default function FreshVegetablesSection() {
  const { data: session } = useSession();
  const isAuthed = !!(session && session.user);
  const router = useRouter();
  const { addItem: addToCart } = useCartStore();

  const [recentProducts, setRecentProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Fetch recently added products (last 2 days)
  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          // Filter products added in last 2 days
          const twoDaysAgo = new Date();
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

          const recent = data.data.filter((product) => {
            const createdDate = new Date(product.createdAt);
            return createdDate >= twoDaysAgo;
          });

          setRecentProducts(recent);
        }
      } catch (error) {
        console.error('Error fetching recent products:', error);
      }
    };

    fetchRecentProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthed) {
      message.info('Please sign in to continue');
      router.push('/login');
      return;
    }

    const normalizedProduct = {
      ...product,
      id: product._id || product.id,
      quantity: 1,
    };

    addToCart(normalizedProduct);
    message.success(`${product.name} added to cart!`);
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth / getVisibleCards();
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth / getVisibleCards();
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      setCurrentIndex(Math.min(recentProducts.length - getVisibleCards(), currentIndex + 1));
    }
  };

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  };

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-800">
           Recent Products
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= recentProducts.length - getVisibleCards()}
              className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentProducts.map((product) => {
            const stockQty = typeof product.quantity === 'number' ? product.quantity : 0;

            return (
              <div
                key={product._id || product.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] snap-start"
              >
                <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-64 bg-gray-50 overflow-hidden group">
                    <Image
                      src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                        {product.category || 'Vegetable'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description || 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod te incididunt'}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-2xl font-bold text-gray-800">
                        ${Number(product.price).toFixed(2)} <span className="text-sm font-normal text-gray-500"></span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={stockQty === 0}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        {stockQty === 0 ? 'Out of Stock' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(1, recentProducts.length - getVisibleCards() + 1) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const cardWidth = container.offsetWidth / getVisibleCards();
                  container.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-green-500 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}