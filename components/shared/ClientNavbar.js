'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';

// Simple placeholder while Navbar loads
function NavbarPlaceholder() {
  return <div className="h-16 bg-white dark:bg-gray-900"></div>;
}

// Client-side only Navbar
export default function ClientNavbar() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <NavbarPlaceholder />;
  }
  
  return <Navbar />;
}