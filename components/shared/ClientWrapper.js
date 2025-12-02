'use client';

import Navbar from './Navbar';
import CartSidebar from './CartSidebar';

export default function ClientWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <CartSidebar />
    </>
  );
}
