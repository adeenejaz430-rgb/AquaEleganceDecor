// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import ThemeProvider from "@/components/providers/ThemeProvider";
// import SessionProvider from "@/components/providers/SessionProvider";
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";
// import CartSidebar from "@/components/shared/CartSidebar";
// import AccessibilityReader from "@/app/components/accessibilityReader";
// import ChatbotWidget from "@/app/components/ChatbotWidget";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "FountainFlow - Modern E-Commerce",
//   description: "Premium shopping experience with the latest products",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <SessionProvider>
//           {/* <ThemeProvider> */}
//             <div className="flex flex-col min-h-screen ">
//               <Navbar />
//               <main className="flex-grow pt-16">
//                 {children}
//               </main>
//               <Footer />
//               <CartSidebar />
//                {/* <AccessibilityReader /> */}
//                 {/* <ChatbotWidget /> ✅  */}
//             </div>
//           {/* </ThemeProvider> */}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "FountainFlow - Modern E-Commerce",
  description: "Premium shopping experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
