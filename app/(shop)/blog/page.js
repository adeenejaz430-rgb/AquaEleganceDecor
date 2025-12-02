'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Sample blog data
  const sampleBlogs = [
    {
      id: '1',
      title: 'The Future of Sustainable Home Decor',
      slug: 'future-sustainable-home-decor',
      excerpt: 'Discover how eco-friendly materials are revolutionizing interior design and home decor.',
      category: 'Decor',
      author: 'Jane Smith',
      date: '2023-05-15',
      image: '/images/placeholder.jpg',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Minimalist Living: Less is More',
      slug: 'minimalist-living-less-more',
      excerpt: 'Explore the benefits of minimalist design and how it can transform your living space.',
      category: 'Lifestyle',
      author: 'John Doe',
      date: '2023-04-22',
      image: '/images/placeholder.jpg',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Smart Home Technology Trends for 2023',
      slug: 'smart-home-technology-trends-2023',
      excerpt: 'Stay ahead of the curve with these emerging smart home technologies and innovations.',
      category: 'Technology',
      author: 'Alex Johnson',
      date: '2023-03-10',
      image: '/images/placeholder.jpg',
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'Color Psychology in Home Design',
      slug: 'color-psychology-home-design',
      excerpt: 'Learn how different colors affect mood and atmosphere in your living spaces.',
      category: 'Design',
      author: 'Sarah Williams',
      date: '2023-02-28',
      image: '/images/placeholder.jpg',
      readTime: '4 min read'
    },
    {
      id: '5',
      title: 'Sustainable Materials for Modern Furniture',
      slug: 'sustainable-materials-modern-furniture',
      excerpt: 'Discover eco-friendly materials that don\'t compromise on style or durability.',
      category: 'Furniture',
      author: 'Michael Brown',
      date: '2023-01-15',
      image: '/images/placeholder.jpg',
      readTime: '8 min read'
    },
    {
      id: '6',
      title: 'Small Space Solutions: Maximizing Your Home',
      slug: 'small-space-solutions',
      excerpt: 'Creative ideas for making the most of limited square footage in urban living.',
      category: 'Decor',
      author: 'Emily Chen',
      date: '2022-12-05',
      image: '/images/placeholder.jpg',
      readTime: '5 min read'
    }
  ];

  // Categories derived from blog posts
  const categories = ['All', ...new Set(sampleBlogs.map(post => post.category))];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBlogPosts(sampleBlogs);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest trends, tips, and insights about home decor, design, and sustainable living.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {isLoading ? (
          // Loading skeletons
          Array(6).fill().map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))
        ) : (
          filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 hover:text-gray-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Newsletter Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-gray-100 p-10 rounded-lg text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Get the latest articles, design tips, and exclusive offers delivered straight to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>

      {/* Featured Post */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Editor's Pick</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-full min-h-[300px]">
            <Image
              src="/images/placeholder.jpg"
              alt="Featured post"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="p-8">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mb-4">
              Special Feature
            </span>
            <h3 className="text-2xl font-bold mb-4">The Complete Guide to Eco-Friendly Home Renovation</h3>
            <p className="text-gray-600 mb-6">
              Transform your living space with sustainable materials and energy-efficient solutions that reduce your carbon footprint while creating a healthier home environment.
            </p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500">By Editorial Team</span>
              <span className="text-sm text-gray-500">June 10, 2023</span>
            </div>
            <Link href="/blog/eco-friendly-home-renovation" className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
              Read Full Article
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}