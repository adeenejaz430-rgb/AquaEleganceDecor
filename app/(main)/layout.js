'use client';

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";
import { useSession } from "next-auth/react";
import AccessibilityReader from "@/app/components/accessibilityReader";
export default function MainLayout({ children }) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <div className="flex flex-col min-h-screen ">
      {/* <Navbar /> */}
      <main className="flex-grow ">
        {children}
      </main>
      {/* <Footer /> */}
      {isAuthenticated && <CartSidebar />}
       <AccessibilityReader />
    </div>
  );
}