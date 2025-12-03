'use client';

// import ThemeProvider from "@/components/providers/ThemeProvider";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';

export default function AuthLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <ThemeProvider> */}
        <main className="flex-grow">
          {children}
        </main>
      {/* </ThemeProvider> */}
    </div>
  );
}