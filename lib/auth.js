import { signOut } from 'next-auth/react';
import { useCartStore, useWishlistStore, useUIStore } from './store';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import connectDB from './db';
import bcrypt from 'bcryptjs';

/**
 * NextAuth configuration options
 */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }
          
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret',
};

/**
 * Custom sign-out handler that redirects to login page
 * Preserves user data for when they log back in
 */
export const handleSignOut = async () => {
  // Sign out with NextAuth and redirect to login page
  await signOut({ 
    callbackUrl: '/login',
    redirect: true
  });
};

/**
 * Helper function to get user ID from localStorage
 */
export const getUserIdFromLocalStorage = () => {
  try {
    const session = JSON.parse(localStorage.getItem('next-auth.session-token') || 
                              localStorage.getItem('__Secure-next-auth.session-token') || 
                              sessionStorage.getItem('next-auth.session-token') || 
                              sessionStorage.getItem('__Secure-next-auth.session-token') || '{}');
    return session?.user?.id || session?.sub || 'guest-user';
  } catch (error) {
    console.error('Error getting user ID:', error);
    return 'guest-user';
  }
};