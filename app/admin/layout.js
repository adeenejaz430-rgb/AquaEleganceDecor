'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiShoppingBag, 
  FiUsers, 
  FiShoppingCart, 
  FiSettings, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiBarChart2
} from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Add CSS to hide the main navbar on admin pages
  useEffect(() => {
    // Add a class to the body to indicate we're in admin mode
    document.body.classList.add('admin-page');
    
    // Add a style tag to hide the main navbar
    const style = document.createElement('style');
    style.innerHTML = `
      .admin-page header.main-header {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up when navigating away
      document.body.classList.remove('admin-page');
      document.head.removeChild(style);
    };
  }, []);
  
  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Products', href: '/admin/products', icon: FiShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: FiBarChart2 },
    { name: 'Blogs', href: '/admin/blogs', icon: FiBarChart2 },
    { name: 'Customers', href: '/admin/customers', icon: FiUsers },
    { name: 'Orders', href: '/admin/orders', icon: FiShoppingCart },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 pt-2">
      {/* Hide the main navbar for admin pages */}
      <style jsx global>{`
        header.fixed {
          display: none !important;
        }
      `}</style>
      
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile sidebar */}
      <motion.div
        className="lg:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <motion.div
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
          initial={{ x: '-100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-4 border-t">
              <Link
                href="/"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <FiLogOut className="w-5 h-5 mr-3" />
                Back to Store
              </Link>
            </div>
          </nav>
        </motion.div>
      </motion.div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-10">
        <motion.div
          className="w-64 h-full bg-white shadow-lg flex flex-col"
          initial={{ x: isSidebarOpen ? 0 : '-100%' }}
          animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Back to Store
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}