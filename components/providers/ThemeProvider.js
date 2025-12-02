// 'use client';

// import { useEffect } from 'react';
// import { useUIStore } from '@/lib/store';

// export default function ThemeProvider({ children }) {
//   const { isDarkMode, toggleDarkMode } = useUIStore();

//   // Apply dark mode class to html element on initial load and when isDarkMode changes
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDarkMode]);

//   // Check for user's system preference on initial load
//   useEffect(() => {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     if (prefersDark && !isDarkMode) {
//       toggleDarkMode();
//     }
//   }, []);

//   return children;
// }