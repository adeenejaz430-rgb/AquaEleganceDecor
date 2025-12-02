'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';

export default function CheckoutSuccessPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };
  
  // Confetti effect
  useEffect(() => {
    const confetti = () => {
      // Create confetti elements
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
      const container = document.querySelector('.confetti-container');
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(confetti);
      }
    };
    
    confetti();
    
    return () => {
      const container = document.querySelector('.confetti-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Confetti container */}
      <div className="confetti-container fixed inset-0 pointer-events-none" />
      
      {/* Success content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-md p-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="border-t border-b border-gray-200 py-6 my-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-medium">#ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
              <p className="font-medium">Standard Shipping</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-gray-600 mb-4">
            We've sent a confirmation email with order details and tracking information.
          </p>
          <p className="text-gray-600">
            If you have any questions about your order, please contact our customer support.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiHome className="w-4 h-4" />
            Return to Home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FiShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
      
      {/* CSS for confetti animation */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        .confetti {
          position: absolute;
          top: -20px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}