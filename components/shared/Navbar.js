'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Heart, Menu, X, Search, ChevronRight } from 'lucide-react';
import { useUIStore, useCartStore, useWishlistStore } from '@/lib/store';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  const isAuthed = !!session?.user;
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { toggleCart } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartTotal = useMemo(() => {
    if (!isAuthed) return 0;
    return cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  }, [isAuthed, cartItems]);

  /** Fetch categories from backend */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Failed to fetch categories", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  /** Scroll listener */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  const handleCartClick = () => {
    if (!isAuthed) {
      router.push('/login');
      return;
    }
    toggleCart();
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        } border-b border-gray-100`}
      >
        <div className="container mx-auto px-4 lg:px-8">

          {/* NAV TOP ROW */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <div className="relative h-10 w-32 sm:h-12 sm:w-36 lg:h-16 lg:w-48">
                <Image
                  src="/logoreal1.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-8">
              
              {/* NORMAL LINKS */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors relative pb-1 ${
                    pathname === link.href
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}

              {/* ✅ SHOW CATEGORIES ONLY IF THEY EXIST */}
              {categories.length > 0 && (
                <div className="relative group">
                  <button className="text-base font-medium text-gray-700 hover:text-green-600 pb-1">
                    Categories
                  </button>

                  {/* DROPDOWN */}
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-50"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4">
              
              {/* DESKTOP SEARCH */}
              <div className="hidden lg:flex items-center border-2 border-green-600 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(e);
                    }
                  }}
                  className="px-4 py-2 w-64 focus:outline-none"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="w-12 h-12 bg-green-600 text-white flex items-center justify-center"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* CART */}
              {isAuthed && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCartClick}
                  className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-green-600 text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {cartItems.length}
                    </span>
                  )}
                </motion.button>
              )}

              {/* USER ICON */}
              {isAuthed ? (
                <div className="hidden lg:block relative group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-green-600 text-white"
                  >
                    <User className="h-5 w-5" />
                  </motion.button>

                  {/* USER DROPDOWN */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>

                    <Link href="/profile" className="block px-4 py-2.5 text-sm hover:bg-green-50">
                      My Profile
                    </Link>

                    <Link href="/orders" className="block px-4 py-2.5 text-sm hover:bg-green-50">
                      My Orders
                    </Link>

                    <Link
                      href="/wishlist"
                      className=" px-4 py-2.5 text-sm hover:bg-green-50 flex justify-between"
                    >
                      Wishlist
                      {wishlistItems.length > 0 && (
                        <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>

                    {session.user?.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2.5 text-sm hover:bg-green-50">
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="hidden lg:block">
                  <motion.button className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </motion.button>
                </Link>
              )}

              {/* MOBILE TOGGLE */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden border-2 border-green-600 text-green-600 w-10 h-10 rounded-full flex items-center justify-center z-50 relative"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            />

            {/* Sliding Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-white via-green-50/30 to-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 pt-20">
                {isAuthed ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{session.user?.name}</p>
                      <p className="text-green-100 text-sm truncate max-w-[180px]">{session.user?.email}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-white font-bold text-2xl">Welcome!</h2>
                    <p className="text-green-100 text-sm mt-1">Sign in to continue</p>
                  </motion.div>
                )}
              </div>

              {/* Menu Content */}
              <div className="py-4">
                {/* Navigation Links */}
                <div className="px-4 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          pathname === link.href
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30'
                            : 'text-gray-700 hover:bg-green-50 hover:translate-x-1'
                        }`}
                      >
                        <span>{link.name}</span>
                        {pathname === link.href && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories Section */}
                {categories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 px-4"
                  >
                    <div className="mb-3 flex items-center space-x-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider">Categories</p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                    <div className="space-y-1">
                      {categories.map((cat, index) => (
                        <motion.div
                          key={cat._id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                        >
                          <Link
                            href={`/category/${cat.slug}`}
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-base text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100/50 transition-all duration-200 hover:translate-x-1 group"
                          >
                            <span className="group-hover:text-green-700">{cat.name}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Account Section */}
                {isAuthed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 px-4"
                  >
                    <div className="mb-3 flex items-center space-x-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider">My Account</p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 transition-all duration-200 hover:translate-x-1 group"
                      >
                        <span className="group-hover:text-blue-700">My Profile</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100/50 transition-all duration-200 hover:translate-x-1 group"
                      >
                        <span className="group-hover:text-purple-700">My Orders</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                      </Link>

                      <Link
                        href="/wishlist"
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100/50 transition-all duration-200 hover:translate-x-1 group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="group-hover:text-pink-700">Wishlist</span>
                          {wishlistItems.length > 0 && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-lg"
                            >
                              {wishlistItems.length}
                            </motion.span>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600" />
                      </Link>

                      {session.user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100/50 transition-all duration-200 hover:translate-x-1 group"
                        >
                          <span className="group-hover:text-amber-700">Admin Dashboard</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600" />
                        </Link>
                      )}
                    </div>

                    {/* Sign Out Button */}
                    <motion.div
                      className="mt-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => signOut()}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl shadow-red-500/30 flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414 5.414 6l3.293 3.293L13.586 4.5 15 5.914z" clipRule="evenodd" />
                        </svg>
                        Sign Out
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 px-4"
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/login"
                        className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl shadow-green-600/30 text-center"
                      >
                        Sign In
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}