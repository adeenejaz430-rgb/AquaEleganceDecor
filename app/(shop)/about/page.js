'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 ">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're dedicated to providing high-quality products that enhance your lifestyle while maintaining our commitment to sustainability and ethical practices.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-12 items-center mb-20"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, our journey began with a simple vision: to create a marketplace where quality meets sustainability. What started as a small online store has grown into a thriving e-commerce platform serving customers worldwide.
          </p>
          <p className="text-gray-600 mb-4">
            Our founder's passion for eco-friendly products and exceptional customer service has shaped our company culture and values. We believe that every purchase should not only bring joy to our customers but also contribute positively to our planet.
          </p>
          <p className="text-gray-600">
            Today, we continue to expand our product range while staying true to our core principles of quality, sustainability, and customer satisfaction.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="/images/placeholder.jpg"
            alt="Our story" 
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      </motion.div>

      {/* Our Values Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Quality</h3>
            <p className="text-gray-600 text-center">
              We carefully select each product in our catalog to ensure it meets our high standards for quality and durability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Sustainability</h3>
            <p className="text-gray-600 text-center">
              We're committed to reducing our environmental footprint through sustainable sourcing and eco-friendly packaging.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Community</h3>
            <p className="text-gray-600 text-center">
              We believe in building strong relationships with our customers, suppliers, and the communities we serve.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image 
                  src="/images/placeholder.jpg"
                  alt={`Team Member ${item}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Team Member {item}</h3>
              <p className="text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="bg-gray-100 p-10 rounded-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          We're always looking for passionate individuals to join our team and customers who share our values.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
            Contact Us
          </Link>
          <Link href="/(shop)" className="bg-white text-black border border-black px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300">
            Shop Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}