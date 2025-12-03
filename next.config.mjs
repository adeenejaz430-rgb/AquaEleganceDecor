//
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },

  // 👇 NEW: correct key for Next 15
  serverExternalPackages: ['mongoose'],
};

export default nextConfig;
