'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    // In a real app, this would be an API call to a newsletter service
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-blue-600 dark:bg-blue-800 relative overflow-hidden"
    >
      {/* Background water ripple effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 4 + i, 
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              width: `${(i + 1) * 30}%`,
              height: `${(i + 1) * 30}%`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Latest Designs
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Subscribe to our newsletter to receive exclusive offers, new product announcements, and design inspiration.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : 'Subscribe'}
            </motion.button>
          </form>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-white bg-white/20 p-3 rounded-lg inline-block"
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}