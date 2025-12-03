'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiTwitter, FiFacebook, FiYoutube, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-700 text-white">
      {/* Top Section with Newsletter */}
      <div className="border-b border-gray-600">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo and Tagline */}
            <div>
              <h2 className="text-green-500 text-4xl font-bold mb-2">Mobile Acessories</h2>
              <p className="text-orange-400 text-lg">Affordable Prices</p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex-1 max-w-2xl w-full">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="flex-1 px-6 py-4 text-gray-700 outline-none text-base"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
            </form>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-orange-400 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-orange-400 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-orange-400 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-orange-400 rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Why People Like us */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Why People Like us!</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.
            </p>
            <Link href="/about">
              <button className="border-2 border-orange-400 text-white px-8 py-2.5 rounded-full hover:bg-orange-400 transition-colors font-medium">
                Read More
              </button>
            </Link>
          </div>

          {/* Shop Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Shop Info</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-300 hover:text-orange-400 transition-colors">
                  FAQs & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/account" className="text-gray-300 hover:text-orange-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/shop-details" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Shop details
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/order-history" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/international-orders" className="text-gray-300 hover:text-orange-400 transition-colors">
                  International Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold">Address:</span> 1429 Netus Rd, NY 48247
              </p>
              <p>
                <span className="font-semibold">Email:</span> Example@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +0123 4567 8910
              </p>
              <div>
                <p className="font-semibold mb-3">Payment Accepted</p>
                <div className="flex items-center gap-2">
                  <img src="/payment-visa.png" alt="Visa" className="h-8" />
                  <img src="/payment-mastercard.png" alt="Mastercard" className="h-8" />
                  <img src="/payment-maestro.png" alt="Maestro" className="h-8" />
                  <img src="/payment-paypal.png" alt="PayPal" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © <Link href="/" className="text-green-500 hover:text-green-400">Your Site Name</Link>, All right reserved.
            </p>
            <p>
              Designed By{' '}
              <a
                href="https://htmlcodex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400"
              >
                HTML Codex
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}