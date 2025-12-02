'use client';

import Navbar from './Navbar';
import CartSidebar from './CartSidebar';

export default function ClientComponents({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <CartSidebar />
    </>
  );
}
