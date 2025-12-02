'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useWishlistStore, useCartStore } from '@/lib/store';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle moving item from wishlist to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeItem(product.id);
  };

  if (!mounted) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }
const handleRemoveFromWishlist = async (productId) => {
  try {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to remove from wishlist");

    console.log("✅ Removed from wishlist:", data.message);
    removeItem(productId);
  } catch (err) {
    console.error("❌ Failed to remove from wishlist:", err);
  }
};

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love for later by clicking the heart icon on product pages.</p>
          <Link href="/products">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <p className="text-blue-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                 <button
  onClick={() => handleRemoveFromWishlist(item._id )}
  className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
  aria-label="Remove from wishlist"
>
  <FiTrash2 />
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