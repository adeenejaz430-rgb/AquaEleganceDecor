'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiStar, FiTruck, FiShield, FiPackage } from 'react-icons/fi';
import { useCartStore, useWishlistStore, useProductStore } from '@/lib/store';
import React from 'react';
import { useSession } from "next-auth/react";

// Default products if store is empty
const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Modern Cascade Fountain',
    slug: 'modern-cascade-fountain',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1585150841312-c833091e593d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.5,
    stock: 10,
  },
  {
    id: '2',
    name: 'Zen Garden Water Feature',
    slug: 'zen-garden-water-feature',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Outdoor',
    rating: 4.2,
    stock: 5,
  },
  {
    id: '5',
    name: 'Solar Powered Garden Fountain',
    slug: 'solar-powered-garden-fountain',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1534857960998-63c4ea13a0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Outdoor',
    rating: 4.6,
    stock: 7,
  },
  {
    id: '6',
    name: 'LED Illuminated Wall Fountain',
    slug: 'led-illuminated-wall-fountain',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1611223235982-891064f27716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Indoor',
    rating: 4.9,
    stock: 2,
  }
];

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug;
  const { data: session } = useSession();
  const { addItem: addToCart } = useCartStore();
const { addItem: addToWishlist, removeItem: removeFromWishlist, items: wishlist } = useWishlistStore();
  const { products: storeProducts, getProductBySlug } = useProductStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    if (!slug) return;
    
    const foundProduct = getProductBySlug(slug) || DEFAULT_PRODUCTS.find(p => p.slug === slug);
    
    if (foundProduct) {
      const stockValue = foundProduct.stock !== undefined ? foundProduct.stock : foundProduct.quantity;
      const productWithStock = {
        ...foundProduct,
        stock: typeof stockValue === 'number' ? stockValue : parseInt(stockValue) || 0
      };
      
      setProduct(productWithStock);
      if (wishlist && Array.isArray(wishlist)) {
        setIsInWishlist(wishlist.some(item => item.id === productWithStock.id));
      }
      
      const productsSource = storeProducts.length > 0 ? storeProducts : DEFAULT_PRODUCTS;
      const related = productsSource
        .filter(p => p.category === productWithStock.category && p.id !== productWithStock.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [slug, wishlist, getProductBySlug, storeProducts]);
  
  const handleAddToCart = async () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);

      if (session?.user) {
        try {
          const productId = product._id || product.id;
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, quantity }),
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Failed to sync cart");
          }
        } catch (err) {
          console.error("Failed to sync cart:", err);
        }
      }
    }
  };
  
  
const handleToggleWishlist = async () => {
  if (!product) return;

  const productId = product._id || product.id;

  // If item exists → REMOVE  
  if (isInWishlist) {
    removeFromWishlist(productId);
    setIsInWishlist(false);

    if (session?.user) {
      try {
        const res = await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId }),
        });
      } catch (err) {
        console.error("Failed to remove from wishlist:", err);
      }
    }

    return;
  }

  // If item does NOT exist → ADD
  addToWishlist(product);
  setIsInWishlist(true);

  if (session?.user) {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  }
};
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-xl w-48 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 rounded-3xl h-[600px]"></div>
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded-xl w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded-xl w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded-xl w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-14 bg-gray-200 rounded-xl"></div>
                  <div className="h-14 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiPackage className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, the product you are looking for does not exist.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            <FiArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['/flower.png'];
  
  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
            <FiArrowLeft /> Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100 aspect-square">
              <Image 
                src={productImages[selectedImage]} 
                alt={product.name || 'Product image'}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/flower.png';
                }}
              />
              
              {/* Stock Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  product.stock > 5 
                    ? 'bg-green-500 text-white' 
                    : product.stock > 0 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'bg-red-500 text-white'
                }`}>
                  {product.stock > 5 
                    ? 'In Stock' 
                    : product.stock > 0 
                    ? `Only ${product.stock} Left` 
                    : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-green-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <Image 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6">
            
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">({product.rating} rating)</span>
            </div>
            
            {/* Price */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6 border-2 border-green-200">
              <p className="text-4xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mt-2">Free shipping on orders over $50</p>
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'This premium quality product is carefully crafted to bring elegance and style to your space.'}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quantity</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-green-500 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}>
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-12 border-2 border-gray-300 rounded-xl text-center font-bold text-lg focus:border-green-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                />
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-green-500 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}>
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-md ${
                  product.stock > 0
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-200 hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.stock || product.stock <= 0}>
                <FiShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                onClick={handleToggleWishlist}
                className={`py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-lg border-2 transition-all ${
                  isInWishlist 
                    ? 'bg-pink-50 text-pink-600 border-pink-300 shadow-md' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:text-pink-600'
                }`}>
                <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <FiTruck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <FiShield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">Secure Payment</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <FiPackage className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-green-400 group">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={relatedProduct.images?.[0] || relatedProduct.image || '/flower.png'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-2xl font-bold text-gray-800">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}