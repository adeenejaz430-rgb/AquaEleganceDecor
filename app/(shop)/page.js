// 'use client';

// import { useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useProductStore } from '@/lib/store';

// // Components
// import FeaturedProducts from '@/components/shared/FeaturedProducts';
// import NewsletterSection from '@/components/shared/NewsletterSection';

// export default function HomePage() {
//   // Fetch products from database
//   const fetchProducts = useProductStore((state) => state.fetchProducts);
  
//   useEffect(() => {
//     // Load products on page load
//     fetchProducts();
//   }, [fetchProducts]);
  
//   const heroRef = useRef(null);
//   const aboutRef = useRef(null);
//   const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ['start start', 'end start'],
//   });
  
//   const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
//   const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
    
//     // Water ripple effect on hero section
//     const rippleAnimation = () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: 'top top',
//           end: 'bottom top',
//           scrub: true,
//         },
//       });
      
//       tl.to('.water-ripple', {
//         scale: 1.2,
//         opacity: 0.7,
//         stagger: 0.2,
//         duration: 2,
//         ease: 'power2.out',
//         repeat: -1,
//         yoyo: true,
//       });
      
//       return tl;
//     };
    
//     const ctx = gsap.context(() => {
//       rippleAnimation();
//     });
    
//     return () => ctx.revert();
//   }, []);

//   return (
//     <main className="overflow-hidden">
//       {/* Hero Section */}
//       <motion.section
//         ref={heroRef}
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           opacity: heroOpacity,
//           scale: heroScale,
//           y: heroY,
//         }}
//       >
//         {/* Background with water effect */}
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-600/40 z-0">
//           {/* Water ripple circles */}
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="water-ripple absolute rounded-full border-2 border-blue-300/30 z-0"
//               style={{
//                 width: `${(i + 1) * 10}%`,
//                 height: `${(i + 1) * 10}%`,
//                 left: '50%',
//                 top: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 opacity: 0.3 - i * 0.05,
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Hero Content */}
//         <div className="container mx-auto px-4 z-10 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
//           >
//             Elegant <span className="text-blue-300">Fountains</span> for Your Space
//           </motion.h1>
          
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
//           >
//             Transform your environment with our stunning collection of premium water fountains
//           </motion.p>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium text-lg shadow-lg"
//             >
//               <Link href="/products">
//                 Shop Collection
//               </Link>
//             </motion.button>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium text-lg"
//             >
//               <Link href="/about">
//                 Learn More
//               </Link>
//             </motion.button>
//           </motion.div>
//         </div>
        
//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//             className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
//           >
//             <motion.div
//               animate={{ y: [0, 15, 0] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//               className="w-1.5 h-3 bg-white rounded-full mt-2"
//             />
//           </motion.div>
//         </motion.div>
//       </motion.section>
      
//       {/* About Section */}
//       <section ref={aboutRef} className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
//           >
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
//                 Crafting Serenity Through Water
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//                 At FountainFlow, we believe in the transformative power of water. Our artisanal fountains are designed to bring tranquility, beauty, and a touch of luxury to any space.
//               </p>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
//                 Each fountain is meticulously crafted using premium materials and innovative design techniques to create a perfect harmony of form and function.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
//               >
//                 <Link href="/about">
//                   Our Story
//                 </Link>
//               </motion.button>
//             </div>
//             <div className="relative">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isAboutInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="rounded-lg overflow-hidden shadow-2xl"
//               >
//                 <div className="aspect-w-4 aspect-h-3 relative">
//                   <div className="w-full h-full bg-blue-200 flex items-center justify-center">
//                     <div className="text-blue-500 text-lg">Fountain Image Placeholder</div>
//                   </div>
//                 </div>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className="absolute -bottom-6 -right-6 bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow-lg"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="text-blue-600 dark:text-blue-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-800 dark:text-gray-200 font-medium">Handcrafted Quality</span>
//                 </div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="text-blue-600 dark:text-blue-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-800 dark:text-gray-200 font-medium">Premium Materials</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="text-blue-600 dark:text-blue-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-800 dark:text-gray-200 font-medium">2-Year Warranty</span>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
      
//       {/* Featured Products Section */}
//       <FeaturedProducts />
      
//       {/* Newsletter Section */}
//       <NewsletterSection />
//     </main>
//   );
// }
// 'use client';

// import { useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useProductStore } from '@/lib/store';

// import FeaturedProducts from '@/components/shared/FeaturedProducts';
// import NewsletterSection from '@/components/shared/NewsletterSection';

// export default function HomePage() {
//   const fetchProducts = useProductStore((state) => state.fetchProducts);

//   // Fetch all products once when the home page loads
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const heroRef = useRef(null);
//   const aboutRef = useRef(null);
//   const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ['start start', 'end start'],
//   });

//   const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
//   const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const rippleAnimation = () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: 'top top',
//           end: 'bottom top',
//           scrub: true,
//         },
//       });

//       tl.to('.water-ripple', {
//         scale: 1.2,
//         opacity: 0.7,
//         stagger: 0.2,
//         duration: 2,
//         ease: 'power2.out',
//         repeat: -1,
//         yoyo: true,
//       });

//       return tl;
//     };

//     const ctx = gsap.context(() => {
//       rippleAnimation();
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main className="overflow-hidden">
//       {/* Hero Section */}
//       <motion.section
//         ref={heroRef}
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           opacity: heroOpacity,
//           scale: heroScale,
//           y: heroY,
//         }}
//       >
//         {/* background and content ... exactly as you already had */}
//         {/* ... */}
//       </motion.section>

//       {/* About section ... (unchanged) */}
//       {/* ... */}

//       {/* Featured Products Section */}
//       <FeaturedProducts />

//       {/* Newsletter Section */}
//       <NewsletterSection />
//     </main>
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
import { useRef } from 'react';
import Typed from 'typed.js';

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
const titleRef = useRef(null);
const subtitleRef = useRef(null);

useEffect(() => {
  if (!titleRef.current || !subtitleRef.current) return;

  // Destroy previous instances on slide change
  let titleTyped, subtitleTyped;

  titleTyped = new Typed(titleRef.current, {
    strings: [heroSlides[currentSlide].title],
    typeSpeed: 100,
    showCursor: true,
    cursorChar: '|',
    backSpeed: 50,
    loop: false,
  });

  subtitleTyped = new Typed(subtitleRef.current, {
    strings: [heroSlides[currentSlide].subtitle],
    typeSpeed: 80,
    showCursor: true,
    cursorChar: '|',
    backSpeed: 50,
    loop: false,
  });

  return () => {
    titleTyped.destroy();
    subtitleTyped.destroy();
  };
}, [currentSlide]);

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
  <span ref={titleRef}></span>
  <br />
  <span className="text-yellow-400" ref={subtitleRef}></span>
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