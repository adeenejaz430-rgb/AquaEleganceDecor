// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import FeaturedProducts from '@/components/shared/FeaturedProducts';
// import NewsletterSection from '@/components/shared/NewsletterSection';
// import HeroSlider from '@/components/shared/HeroSlider';
// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <div className="container mx-auto px-4">
//       {/* Hero Section */}
//       <section className="mt-24 md:mt-32 mb-16">
//         <div className="container mx-auto px-0">
//           <div className="flex flex-col md:flex-row items-center bg-gray-50">
//             {/* Left content */}
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 lg:p-20 order-2 md:order-1"
//             >
//               <div className="uppercase text-green-500 font-semibold mb-3 text-xs sm:text-sm tracking-wider">
//                 INSPIRED BY NATURE
//               </div>
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
//                 Handcrafted Artificial Florals & Vases
//               </h1>
//               <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
//                 Free Pickup and Delivery Available
//               </p>
//               <Link 
//                 href="/products"
//                 className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-green-500 text-white font-semibold uppercase hover:bg-green-600 transition-all duration-300 text-sm sm:text-base"
//               >
//                 SHOP NOW
//               </Link>
//             </motion.div>
            
//             {/* Right side product slider */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center p-4"
//             >
//               <HeroSlider />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section */}
//       <FeaturedProducts />

//       {/* Newsletter Section */}
//       <NewsletterSection />
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/lib/store';
import FeaturedProducts from '@/components/shared/FeaturedProducts';
import NewsletterSection from '@/components/shared/NewsletterSection';
import RecentProduct from '@/components/shared/recentProduct';
import HeroSlider from '@/components/shared/heroSection';
import SectionLast from '@/components/shared/sectionlast';
import SectionMid from '@/components/shared/sectionmid';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    image: '/homeimage1.png',
    title: 'Elevate Interiors',
    subtitle: 'with Quality & Style',
    description: 'Since 2015, Golden Rugs has been a trusted wholesale supplier of premium rugs and curated furniture, including dining sets, coffee tables, mirrors, and more. We deliver quality, affordability, and timeless design for retailers.',
  },
  {
    id: 2,
    image: '/homeimage2.png',
    title: 'Transform Your Home',
    subtitle: 'with Modern Elegance',
    description: 'Discover handcrafted furniture and décor that define comfort and luxury. Shop dining sets, coffee tables, and more for your perfect space.',
  },
  {
    id: 3,
    image: '/homeimage3.png',
    title: 'Crafted to Inspire',
    subtitle: 'Every Space',
    description: 'Explore our wide range of designs, from bold modern styles to timeless classics — made for retailers who value excellence.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full">
      {/* ===== HERO SLIDER SECTION ===== */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16">
                      <div className="max-w-3xl">
                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
                        >
                          {slide.title}
                          <br />
                          <span className="text-yellow-400">{slide.subtitle}</span>
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        >
                          <Link
                            href="/products"
                            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-md text-base sm:text-lg uppercase transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                          >
                            Explore Now
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 h-3 bg-yellow-400 rounded-full'
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== REST OF THE SECTIONS ===== */}
      <FeaturedProducts />
      <SectionMid />
      <RecentProduct />
      <HeroSlider />
      <SectionLast />
    </div>
  );
}