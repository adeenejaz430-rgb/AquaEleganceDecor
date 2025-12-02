'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useCartStore, useUIStore } from '@/lib/store';
import { useSession } from 'next-auth/react';

export default function CartSidebar() {
  const { items, totalItems, totalPrice, removeItem, updateItemQuantity } = useCartStore();
  const { isCartOpen, toggleCart } = useUIStore();
  const { data: session } = useSession();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        toggleCart();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCartOpen, toggleCart]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleCart}
          />
          
          {/* Cart sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FiShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <p className="text-sm text-green-100">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>
                <button
                  onClick={toggleCart}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center backdrop-blur-sm"
                  aria-label="Close cart"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6 shadow-lg"
                  >
                    <FiShoppingBag className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8 max-w-xs">Start adding items to your cart and they'll appear here.</p>
                  <button
                    onClick={toggleCart}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Continue Shopping
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                      >
                        <div className="flex gap-4">
                          {/* Product image */}
                          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                            <img
                              src={item.image || item.images?.[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-800 text-sm line-clamp-2 pr-2">{item.name}</h4>
                              <button
                                onClick={async () => {
                                  try {
                                    removeItem(item.id);
                                    if (session?.user) {
                                      const res = await fetch("/api/cart", {
                                        method: "DELETE",
                                        headers: { "Content-Type": "application/json" },
                                        credentials: "include",
                                        body: JSON.stringify({ productId: item._id || item.id }),
                                      });
                                      const data = await res.json();
                                      if (!res.ok) {
                                        console.error("Failed to remove from DB:", data.message);
                                      }
                                    }
                                  } catch (err) {
                                    console.error("Error deleting item:", err);
                                  }
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                                aria-label="Remove item"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                            
                            <div className="flex justify-between items-center">
                              {/* Quantity controls */}
                              <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <FiMinus className="w-3 h-3" />
                                </button>
                                <span className="px-4 py-2 text-sm font-bold text-gray-800 min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <FiPlus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              {/* Price */}
                              <p className="font-bold text-lg text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            
            {/* Footer with totals and checkout button */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-6 shadow-2xl">
                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-xl gap-2 text-lg"
                  >
                    Proceed to Checkout
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={toggleCart}
                    className="w-full border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Free Shipping
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}