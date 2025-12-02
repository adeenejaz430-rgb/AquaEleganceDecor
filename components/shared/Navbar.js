'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Heart, Menu, X, Search } from 'lucide-react';
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
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      } border-b border-gray-100`}
    >
      <div className="container mx-auto px-4 lg:px-8">

        {/* NAV TOP ROW */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32 sm:h-12 sm:w-36 lg:h-16 lg:w-48">
              <Image
                src="/logo.png"
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
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center border-2 border-green-600 rounded-full overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-64 focus:outline-none"
              />
              <button
                type="submit"
                className="w-12 h-12 bg-green-600 text-white flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

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
                    className="block px-4 py-2.5 text-sm hover:bg-green-50 flex justify-between"
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden border-2 border-green-600 text-green-600 w-10 h-10 rounded-full flex items-center justify-center"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <div className="py-4 space-y-1">

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 text-base ${
                      pathname === link.href
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* MOBILE CATEGORIES ONLY IF EXISTS */}
                {categories.length > 0 && (
                  <div className="border-t pt-2 mt-2">
                    <p className="px-4 text-gray-500 text-sm uppercase">Categories</p>
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
