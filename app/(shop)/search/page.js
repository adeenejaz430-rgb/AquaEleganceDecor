// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
// import { useCartStore, useWishlistStore } from '@/lib/store';

// // Mock product data - same as in products page
// const MOCK_PRODUCTS = [
//   {
//     id: '1',
//     name: 'Modern Cascade Fountain',
//     slug: 'modern-cascade-fountain',
//     price: 249.99,
//     image: 'https://images.unsplash.com/photo-1585150841312-c833091e593d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Indoor',
//     rating: 4.5,
//     stock: 10,
//   },
//   {
//     id: '2',
//     name: 'Zen Garden Water Feature',
//     slug: 'zen-garden-water-feature',
//     price: 199.99,
//     image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Outdoor',
//     rating: 4.2,
//     stock: 5,
//   },
//   {
//     id: '3',
//     name: 'Contemporary Wall Fountain',
//     slug: 'contemporary-wall-fountain',
//     price: 299.99,
//     image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Indoor',
//     rating: 4.7,
//     stock: 3,
//   },
//   {
//     id: '4',
//     name: 'Minimalist Tabletop Fountain',
//     slug: 'minimalist-tabletop-fountain',
//     price: 129.99,
//     image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Indoor',
//     rating: 4.3,
//     stock: 15,
//   },
//   {
//     id: '5',
//     name: 'Solar Powered Garden Fountain',
//     slug: 'solar-powered-garden-fountain',
//     price: 349.99,
//     image: 'https://images.unsplash.com/photo-1534857960998-63c4ea13a0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Outdoor',
//     rating: 4.6,
//     stock: 7,
//   },
//   {
//     id: '6',
//     name: 'LED Illuminated Wall Fountain',
//     slug: 'led-illuminated-wall-fountain',
//     price: 599.99,
//     image: 'https://images.unsplash.com/photo-1611223235982-891064f27716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//     category: 'Indoor',
//     rating: 4.9,
//     stock: 2,
//   }
// ];

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('q') || '';
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addItem: addToCart } = useCartStore();
//   const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

//   useEffect(() => {
//     // Simulate search with mock data
//     setLoading(true);
    
//     // Simple search implementation
//     const results = MOCK_PRODUCTS.filter(product => 
//       product.name.toLowerCase().includes(query.toLowerCase()) ||
//       product.category.toLowerCase().includes(query.toLowerCase())
//     );
    
//     // Simulate API delay
//     setTimeout(() => {
//       setSearchResults(results);
//       setLoading(false);
//     }, 500);
//   }, [query]);

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   const handleAddToWishlist = (product) => {
//     addToWishlist(product);
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-8">
//         <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
//           <FiArrowLeft className="mr-2" /> Back to Home
//         </Link>
//       </div>

//       <h1 className="text-3xl font-bold mb-4">Search Results</h1>
//       <p className="text-gray-600 mb-8">
//         {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
//       </p>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
//               <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
//               <div className="h-10 bg-gray-200 rounded"></div>
//             </div>
//           ))}
//         </div>
//       ) : searchResults.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-medium mb-2">No results found</h2>
//           <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
//           <Link href="/products">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
//               Browse All Products
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {searchResults.map((product) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <Link href={`/products/${product.slug}`}>
//                 <div className="aspect-w-3 aspect-h-2 bg-gray-200">
//                   {product.image ? (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       No Image
//                     </div>
//                   )}
//                 </div>
//               </Link>
//               <div className="p-4">
//                 <Link href={`/products/${product.slug}`}>
//                   <h3 className="text-lg font-medium mb-2 hover:text-blue-600 transition-colors">{product.name}</h3>
//                 </Link>
//                 <p className="text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
//                   >
//                     <FiShoppingCart className="mr-2" /> Add to Cart
//                   </button>
//                   <button
//                     onClick={() => handleAddToWishlist(product)}
//                     className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
//                     aria-label="Add to wishlist"
//                   >
//                     <FiHeart />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { useCartStore, useWishlistStore } from '@/lib/store';

// Mock product data - same as in products page
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Modern Cascade Fountain',
    slug: 'modern-cascade-fountain',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1585150841312-c833091e593d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.5,
    stock: 10,
  },
  {
    id: '2',
    name: 'Zen Garden Water Feature',
    slug: 'zen-garden-water-feature',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Outdoor',
    rating: 4.2,
    stock: 5,
  },
  {
    id: '3',
    name: 'Contemporary Wall Fountain',
    slug: 'contemporary-wall-fountain',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.7,
    stock: 3,
  },
  {
    id: '4',
    name: 'Minimalist Tabletop Fountain',
    slug: 'minimalist-tabletop-fountain',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.3,
    stock: 15,
  },
  {
    id: '5',
    name: 'Solar Powered Garden Fountain',
    slug: 'solar-powered-garden-fountain',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1534857960998-63c4ea13a0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Outdoor',
    rating: 4.6,
    stock: 7,
  },
  {
    id: '6',
    name: 'LED Illuminated Wall Fountain',
    slug: 'led-illuminated-wall-fountain',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1611223235982-891064f27716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.9,
    stock: 2,
  }
];

// Search content component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    // Simulate search with mock data
    setLoading(true);
    
    // Simple search implementation
    const results = MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Simulate API delay
    setTimeout(() => {
      setSearchResults(results);
      setLoading(false);
    }, 500);
  }, [query]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
          <Link href="/products">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Browse All Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-lg font-medium mb-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}