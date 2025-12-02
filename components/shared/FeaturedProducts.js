// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { motion, useInView } from 'framer-motion';
// import { useProductStore } from '../../lib/store';
// import { FiShoppingCart, FiHeart, FiEye, FiStar, FiPackage } from 'react-icons/fi';

// export default function FeaturedProducts() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Get products and fetch function from store
//   const { products: storeProducts, fetchProducts } = useProductStore();
  
//   // Fetch products from database on component mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       await fetchProducts();
//       setLoading(false);
//     };
//     loadProducts();
//   }, [fetchProducts]);
  
//   useEffect(() => {
//     // Filter featured products from store
//     const productsFromStore = storeProducts?.filter(product => product.featured);
//     setFeaturedProducts(productsFromStore || []);
//   }, [storeProducts]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { 
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94]
//       },
//     },
//   };

//   const shimmerVariants = {
//     initial: { backgroundPosition: '-1000px 0' },
//     animate: {
//       backgroundPosition: '1000px 0',
//       transition: {
//         duration: 2,
//         repeat: Infinity,
//         ease: 'linear'
//       }
//     }
//   };

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse" />
//             <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse" />
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
//                 <div className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse" />
//                 <div className="p-6 space-y-3">
//                   <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//                   <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//                   <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // No featured products message
//   if (featuredProducts.length === 0) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
//               <FiPackage className="w-10 h-10 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
//               Featured Products
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               No featured products available at the moment. Check back soon for our latest offerings!
//             </p>
//             <Link href="/products">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg"
//               >
//                 Browse All Products
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 relative overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={isInView ? { scale: 1 } : {}}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="inline-block mb-4"
//           >
//             <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
//               ⭐ Featured Collection
//             </span>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Handpicked
//             </span>{' '}
//             For You
//           </h2>
          
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Discover our carefully curated selection of premium products, each chosen for its exceptional quality and design.
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {featuredProducts.map((product, index) => (
//             <motion.div
//               key={product._id || product.id}
//               variants={itemVariants}
//               className="group relative"
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
//                 {/* Product Image Container */}
//                 <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
//                   {/* Stock Badge */}
//                   {product.quantity > 0 ? (
//                     <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
//                       In Stock ({product.quantity})
//                     </div>
//                   ) : (
//                     <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
//                       Out of Stock
//                     </div>
//                   )}
                  
//                   {/* Featured Badge */}
//                   <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
//                     <FiStar className="w-4 h-4" />
//                   </div>
                  
//                   <Link href={`/products/${product.slug}`}>
//                     <motion.img
//                       src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.jpg'}
//                       alt={product.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.6 }}
//                     />
//                   </Link>
                  
//                   {/* Overlay with action buttons */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-center pb-6 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
//                       title="Quick View"
//                     >
//                       <FiEye className="w-5 h-5" />
//                     </motion.button>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
//                       title="Add to Wishlist"
//                     >
//                       <FiHeart className="w-5 h-5" />
//                     </motion.button>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
//                       title="Add to Cart"
//                       disabled={product.quantity === 0}
//                     >
//                       <FiShoppingCart className="w-5 h-5" />
//                     </motion.button>
//                   </motion.div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-6">
//                   {/* Category */}
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
//                       {product.category}
//                     </span>
                    
//                     {/* Rating */}
//                     <div className="flex items-center gap-1">
//                       <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                       <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                         {product.averageRating > 0 ? product.averageRating.toFixed(1) : '5.0'}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Product Name */}
//                   <Link href={`/products/${product.slug}`}>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-[3.5rem]">
//                       {product.name}
//                     </h3>
//                   </Link>
                  
//                   {/* Description */}
//                   {product.description && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
//                       {product.description}
//                     </p>
//                   )}
                  
//                   {/* Price and CTA */}
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//                     <div>
//                       <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         ${product.price.toFixed(2)}
//                       </p>
//                     </div>
                    
//                     <Link href={`/products/${product.slug}`}>
//                       <motion.button
//                         whileHover={{ scale: 1.05, x: 5 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//                       >
//                         View
//                       </motion.button>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Decorative corner accent */}
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="text-center mt-16"
//         >
//           <Link href="/products">
//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 Explore All Products
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   →
//                 </motion.span>
//               </span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
//                 initial={{ x: '-100%' }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { motion, useInView } from 'framer-motion';
// import { useProductStore } from '@/lib/store';
// import {
//   FiShoppingCart,
//   FiHeart,
//   FiEye,
//   FiStar,
//   FiPackage,
//   FiArrowRight,
//   FiZap,
// } from 'react-icons/fi';

// export default function FeaturedProducts() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   // Zustand store
//   const { products, isLoading, fetchProducts } = useProductStore();

//   // Fetch once on mount
//   useEffect(() => {
//     // console.log('FeaturedProducts: Fetching products...');
//     fetchProducts?.();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Recompute featured when products change
//   useEffect(() => {
//     // console.log('FeaturedProducts: Products updated', products?.length || 0);
//     if (Array.isArray(products)) {
//       const featured = products.filter(
//         (p) => p?.featured === true || p?.featured === 'true' || p?.featured === 1
//       );
//       // console.log('FeaturedProducts: Featured products found', featured.length);
//       setFeaturedProducts(featured);
//     }
//   }, [products]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 60, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   const floatingAnimation = {
//     y: [0, -10, 0],
//     transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="text-center mb-20">
//             <div className="h-12 w-72 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl mx-auto mb-6 animate-pulse" />
//             <div className="h-6 w-full max-w-[500px] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl mx-auto animate-pulse" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="group relative">
//                 <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
//                   <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
//                   <div className="p-6 space-y-4">
//                     <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Empty state
//   if (!featuredProducts || featuredProducts.length === 0) {
//     return (
//       <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
//             <motion.div animate={floatingAnimation} className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-3xl mb-8">
//               <FiPackage className="w-12 h-12 text-gray-600 dark:text-gray-400" />
//             </motion.div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Featured Products</h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
//               No featured products available at the moment. Check back soon for our latest curated collection!
//             </p>
//             <Link href="/products">
//               <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300">
//                 Browse All Products
//                 <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     );
//   }

//   // Grid
//   return (
//     <section ref={sectionRef} className="py-24 bg-white dark:bg-black relative z-10 overflow-hidden">
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//       <motion.div
//         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         className="absolute top-0 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full blur-3xl opacity-30"
//       />
//       <motion.div
//         animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-400 dark:bg-gray-600 rounded-full blur-3xl opacity-20"
//       />

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="text-center mb-20"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={isInView ? { scale: 1, rotate: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
//             className="inline-block mb-6"
//           >
//             <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               <FiZap className="w-4 h-4" />
//               Featured Collection
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
//           >
//             Handpicked
//             <span className="block mt-2 text-gray-400 dark:text-gray-600">Excellence</span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
//           >
//             Discover our carefully curated selection of premium products, each chosen for exceptional quality and timeless design.
//           </motion.p>
//         </motion.div>

//         <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {featuredProducts.map((product, index) => (
//             <motion.div key={product._id || product.id} variants={itemVariants} className="group relative">
//               <motion.div
//                 whileHover={{ y: -8 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:border-gray-900 dark:hover:border-white hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
//                   <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + index * 0.1 }} className="absolute top-4 left-4 z-20">
//                     {product.quantity > 0 ? (
//                       <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full text-xs font-bold">
//                         In Stock · {product.quantity}
//                       </div>
//                     ) : (
//                       <div className="bg-gray-800 dark:bg-gray-300 text-white dark:text-black px-3 py-1.5 rounded-full text-xs font-bold">
//                         Out of Stock
//                       </div>
//                     )}
//                   </motion.div>

//                   <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3 + index * 0.1, type: 'spring' }} className="absolute top-4 right-4 z-20">
//                     <div className="bg-gray-900 dark:bg-gray-100 p-2.5 rounded-full shadow-lg">
//                       <FiStar className="w-4 h-4 text-white dark:text-black fill-current" />
//                     </div>
//                   </motion.div>

//                   <Link href={`/products/${product.slug}`}>
//                     <motion.img
//                       src={product.images?.[0] || '/images/placeholder.jpg'}
//                       alt={product.name}
//                       className="w-full h-full object-cover cursor-pointer"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.6 }}
//                     />
//                   </Link>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   >
//                     <motion.button whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }} className="bg-white text-black p-3 rounded-2xl shadow-xl hover:bg-gray-200 transition-colors" title="Quick View">
//                       <FiEye className="w-5 h-5" />
//                     </motion.button>

//                     <motion.button whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.9 }} className="bg-white text-black p-3 rounded-2xl shadow-xl hover:bg-gray-200 transition-colors" title="Add to Wishlist">
//                       <FiHeart className="w-5 h-5" />
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.15 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="bg-black text-white p-3 rounded-2xl shadow-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="Add to Cart"
//                       disabled={product.quantity === 0}
//                     >
//                       <FiShoppingCart className="w-5 h-5" />
//                     </motion.button>
//                   </motion.div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs text-gray-500 dark:text-gray-500 font-bold uppercase tracking-widest">
//                       {product.category || 'Uncategorized'}
//                     </span>
//                     <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
//                       <FiStar className="w-3.5 h-3.5 text-gray-900 dark:text-white fill-current" />
//                       <span className="text-xs font-bold text-gray-900 dark:text-white">
//                         {product.averageRating > 0 ? product.averageRating.toFixed(1) : '5.0'}
//                       </span>
//                     </div>
//                   </div>

//                   <Link href={`/products/${product.slug}`}>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-gray-600 dark:hover:text-gray-400 transition-colors min-h-[3.5rem] cursor-pointer">
//                       {product.name}
//                     </h3>
//                   </Link>

//                   {product.description && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
//                       {product.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between pt-5 border-t-2 border-gray-200 dark:border-gray-800">
//                     <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                       ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
//                     </p>

//                     <Link href={`/products/${product.slug}`}>
//                       <motion.button whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }} className="group/btn bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
//                         View
//                         <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//                       </motion.button>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100 dark:from-gray-800 to-transparent opacity-50 rounded-tr-full" />
//               </motion.div>

//               <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mt-20">
//           <Link href="/products">
//             <motion.button whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} className="group relative inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden">
//               <span className="relative z-10 flex items-center gap-3">
//                 Explore All Products
//                 <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
//                   <FiArrowRight className="w-5 h-5" />
//                 </motion.span>
//               </span>
//               <motion.div className="absolute inset-0 bg-gray-800 dark:bg-gray-200" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { motion, useInView } from 'framer-motion';
// import { useProductStore } from '@/lib/store';
// import {
//   FiShoppingCart,
//   FiHeart,
//   FiEye,
//   FiStar,
//   FiPackage,
//   FiArrowRight,
//   FiZap,
// } from 'react-icons/fi';

// export default function FeaturedProducts() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   // We only read products + loading.
//   // fetchProducts is now called from HomePage, not here.
//   const { products, isLoading } = useProductStore();

//   // When products change, recompute featured products
//   useEffect(() => {
//     if (!Array.isArray(products) || products.length === 0) {
//       setFeaturedProducts([]);
//       return;
//     }

//     // Prefer products explicitly marked as featured
//     let featured = products.filter(
//       (p) => p?.featured === true || p?.featured === 'true' || p?.featured === 1
//     );

//     // If none are marked, fallback to first 4 products
//     if (featured.length === 0) {
//       console.warn(
//         '[FeaturedProducts] No products have "featured" flag set. Showing first 4 products as fallback.'
//       );
//       featured = products.slice(0, 4);
//     }

//     setFeaturedProducts(featured);
//   }, [products]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 60, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   const floatingAnimation = {
//     y: [0, -10, 0],
//     transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
//   };

//   /* ----------------- LOADING SKELETON ----------------- */
//   if (isLoading) {
//     return (
//       <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="text-center mb-20">
//             <div className="h-12 w-72 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl mx-auto mb-6 animate-pulse" />
//             <div className="h-6 w-full max-w-[500px] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl mx-auto animate-pulse" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="group relative">
//                 <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
//                   <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
//                   <div className="p-6 space-y-4">
//                     <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//                     <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* ----------------- EMPTY STATE ----------------- */
//   if (!featuredProducts || featuredProducts.length === 0) {
//     return (
//       <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center max-w-2xl mx-auto"
//           >
//             <motion.div
//               animate={floatingAnimation}
//               className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-3xl mb-8"
//             >
//               <FiPackage className="w-12 h-12 text-gray-600 dark:text-gray-400" />
//             </motion.div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Featured Products
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
//               No featured products available at the moment. Check back soon for our latest curated collection!
//             </p>
//             <Link href="/products">
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 Browse All Products
//                 <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     );
//   }

//   /* ----------------- MAIN GRID ----------------- */
//   return (
//     <section
//       ref={sectionRef}
//       className="py-24 bg-white dark:bg-black relative z-10 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
//       <motion.div
//         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         className="absolute top-0 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full blur-3xl opacity-30"
//       />
//       <motion.div
//         animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute bottom-0 left-1/4 w-96 h-96 bg-gray-400 dark:bg-gray-600 rounded-full blur-3xl opacity-20"
//       />

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="text-center mb-20"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={isInView ? { scale: 1, rotate: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
//             className="inline-block mb-6"
//           >
//             <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
//               <FiZap className="w-4 h-4" />
//               Featured Collection
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
//           >
//             Handpicked
//             <span className="block mt-2 text-gray-400 dark:text-gray-600">
//               Excellence
//             </span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
//           >
//             Discover our carefully curated selection of premium products, each
//             chosen for exceptional quality and timeless design.
//           </motion.p>
//         </motion.div>

//         {/* Products grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? 'visible' : 'hidden'}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {featuredProducts.map((product, index) => (
//             <motion.div
//               key={product._id || product.id}
//               variants={itemVariants}
//               className="group relative"
//             >
//               <motion.div
//                 whileHover={{ y: -8 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:border-gray-900 dark:hover:border-white hover:shadow-2xl transition-all duration-500"
//               >
//                 {/* Image */}
//                 <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
//                   {/* Stock badge */}
//                   <motion.div
//                     initial={{ x: -100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ delay: 0.2 + index * 0.1 }}
//                     className="absolute top-4 left-4 z-20"
//                   >
//                     {product.quantity > 0 ? (
//                       <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full text-xs font-bold">
//                         In Stock · {product.quantity}
//                       </div>
//                     ) : (
//                       <div className="bg-gray-800 dark:bg-gray-300 text-white dark:text-black px-3 py-1.5 rounded-full text-xs font-bold">
//                         Out of Stock
//                       </div>
//                     )}
//                   </motion.div>

//                   {/* Featured star */}
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{
//                       delay: 0.3 + index * 0.1,
//                       type: 'spring',
//                     }}
//                     className="absolute top-4 right-4 z-20"
//                   >
//                     <div className="bg-gray-900 dark:bg-gray-100 p-2.5 rounded-full shadow-lg">
//                       <FiStar className="w-4 h-4 text-white dark:text-black fill-current" />
//                     </div>
//                   </motion.div>

//                   <Link href={`/products/${product.slug}`}>
//                     <motion.img
//                       src={product.images?.[0] || '/images/placeholder.jpg'}
//                       alt={product.name}
//                       className="w-full h-full object-cover cursor-pointer"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.6 }}
//                     />
//                   </Link>

//                   {/* Hover actions */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.15, rotate: 5 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="bg-white text-black p-3 rounded-2xl shadow-xl hover:bg-gray-200 transition-colors"
//                       title="Quick View"
//                     >
//                       <FiEye className="w-5 h-5" />
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.15, rotate: -5 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="bg-white text-black p-3 rounded-2xl shadow-xl hover:bg-gray-200 transition-colors"
//                       title="Add to Wishlist"
//                     >
//                       <FiHeart className="w-5 h-5" />
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.15 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="bg-black text-white p-3 rounded-2xl shadow-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="Add to Cart"
//                       disabled={product.quantity === 0}
//                     >
//                       <FiShoppingCart className="w-5 h-5" />
//                     </motion.button>
//                   </motion.div>
//                 </div>

//                 {/* Text content */}
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs text-gray-500 dark:text-gray-500 font-bold uppercase tracking-widest">
//                       {product.category || 'Uncategorized'}
//                     </span>
//                     <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
//                       <FiStar className="w-3.5 h-3.5 text-gray-900 dark:text-white fill-current" />
//                       <span className="text-xs font-bold text-gray-900 dark:text-white">
//                         {product.averageRating > 0
//                           ? product.averageRating.toFixed(1)
//                           : '5.0'}
//                       </span>
//                     </div>
//                   </div>

//                   <Link href={`/products/${product.slug}`}>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-gray-600 dark:hover:text-gray-400 transition-colors min-h-[3.5rem] cursor-pointer">
//                       {product.name}
//                     </h3>
//                   </Link>

//                   {product.description && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
//                       {product.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between pt-5 border-t-2 border-gray-200 dark:border-gray-800">
//                     <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                       $
//                       {typeof product.price === 'number'
//                         ? product.price.toFixed(2)
//                         : '0.00'}
//                     </p>

//                     <Link href={`/products/${product.slug}`}>
//                       <motion.button
//                         whileHover={{ scale: 1.05, x: 3 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="group/btn bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
//                       >
//                         View
//                         <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//                       </motion.button>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100 dark:from-gray-800 to-transparent opacity-50 rounded-tr-full" />
//               </motion.div>

//               <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* View all button */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="text-center mt-20"
//         >
//           <Link href="/products">
//             <motion.button
//               whileHover={{ scale: 1.05, y: -4 }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center gap-3">
//                 Explore All Products
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   <FiArrowRight className="w-5 h-5" />
//                 </motion.span>
//               </span>
//               <motion.div
//                 className="absolute inset-0 bg-gray-800 dark:bg-gray-200"
//                 initial={{ x: '-100%' }}
//                 whileHover={{ x: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useProductStore, useCartStore } from '@/lib/store';
import { FiShoppingCart } from 'react-icons/fi';
import { message } from 'antd';
import Image from 'next/image';

export default function FeaturedProducts() {
  const { data: session } = useSession();
  const isAuthed = !!(session && session.user);
  const router = useRouter();

  const sectionRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');

  const { products, isLoading } = useProductStore();
  const { addItem: addToCart } = useCartStore();

  // Fetch categories dynamically from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        // prepend "All Products" for default tab
        setCategories(['All Products', ...data.map(c => c.name)]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Filter featured products
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setFeaturedProducts([]);
      return;
    }

    let featured = products.filter(
      (p) => p?.featured === true || p?.featured === 'true' || p?.featured === 1
    );

    if (featured.length === 0) {
      featured = products.slice(0, 8);
    }

    setFeaturedProducts(featured);
  }, [products]);

  const handleAddToCart = (product) => {
    if (!isAuthed) {
      message.info('Please sign in to continue');
      router.push('/login');
      return;
    }

    const stockQty = typeof product.quantity === 'number' ? product.quantity : 0;
    
    if (stockQty === 0) {
      message.error('Product is out of stock');
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

  // Filter products by selected category
  const filteredProducts =
    activeCategory === 'All Products'
      ? featuredProducts
      : featuredProducts.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  // Loading state
  if (isLoading) return <p>Loading featured products...</p>;
  if (!featuredProducts || featuredProducts.length === 0) return <p>No products available.</p>;

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8">
            Featured Products
          </h2>

          {/* Dynamic Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-green-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const stockQty = typeof product.quantity === 'number' ? product.quantity : 0;

            return (
              <div
                key={product._id || product.id}
                className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-50 group">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>

                  <Link href={`/products/${product.slug || product._id}`}>
                    <Image
                      src={product.images?.[0] || '/images/placeholder.jpg'}
                      alt={product.name || 'Product'}
                      fill
                      className="object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <Link href={`/products/${product.slug || product._id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-green-600 transition-colors cursor-pointer line-clamp-1">
                      {product.name || 'Unnamed Product'}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1 min-h-[2.5rem]">
                    {product.description || 'No description available.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-gray-800">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={stockQty === 0}
                      className={`group px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 border border-yellow-400 transition-all duration-300 shadow-sm ${
                        stockQty === 0
                          ? 'bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed'
                          : 'bg-white text-green-600 hover:bg-yellow-400 hover:text-white'
                      }`}
                    >
                      <FiShoppingCart
                        className={`w-4 h-4 transition-all duration-300 ${
                          stockQty === 0 ? '' : 'text-green-600 group-hover:text-white'
                        }`}
                      />
                      {stockQty === 0 ? 'Out of Stock' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
