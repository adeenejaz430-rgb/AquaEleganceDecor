'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { useProductStore } from '../../../lib/store';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };
  
  // Get products from store
  const storeProducts = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  
  // Get unique categories
  const categories = ['All', ...new Set([...storeProducts].map(product => product.category).filter(Boolean))];
  
  useEffect(() => {
    // Fetch products from database
    const loadProducts = async () => {
      setIsLoading(true);
      await fetchProducts();
      setIsLoading(false);
    };
    
    loadProducts();
  }, [fetchProducts]);
  
  useEffect(() => {
    // Load products from store
    setProducts(storeProducts);
  }, [storeProducts]);
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    // Safe access to product properties with fallback
    const productName = product?.name || '';
    const productId = (product?._id || product?.id || '').toString();
    const productCategory = product?.category || '';
    
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === '' || 
                            productCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle delete click
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
  
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      const productId = productToDelete._id || productToDelete.id;
      
      // Delete product from database
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Delete product from store
        deleteProduct(productId);
        // Update local state
        setProducts(products.filter(product => (product._id || product.id) !== productId));
        setShowDeleteModal(false);
        setProductToDelete(null);
        
        // Show success message
        showToast('Product deleted successfully!', 'success');
      } else {
        throw new Error(result.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Failed to delete product. Please try again.', 'error');
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 
            toast.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            {toast.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Products Management</h1>
        
        <Link 
          href="/admin/products/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2 -ml-1 h-5 w-5" />
          Add New Product
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FiFilter className="mr-2 h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                category !== 'All' && (
                  <option key={`category-${index}`} value={category}>
                    {category}
                  </option>
                )
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div 
          className="bg-white rounded-lg shadow overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const productId = product._id || product.id;
                    const productImages = product.images || [];
                    const firstImage = productImages[0] || product.image || '/images/placeholder.jpg';
                    
                    return (
                      <motion.tr 
                        key={productId}
                        className="hover:bg-gray-50"
                        variants={itemVariants}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 relative">
                              <img
                                src={firstImage}
                                alt={product.name || 'Product'}
                                className="h-10 w-10 rounded-md object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/placeholder.jpg';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name || 'Unnamed Product'}</div>
                              <div className="text-sm text-gray-500">{productId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category || 'Uncategorized'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${(product.price || 0).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${(product.stock || 0) < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                            {product.quantity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {product.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/admin/products/edit/${productId}`}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="Edit product"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(product)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete product"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-sm text-gray-500 mb-4">
                          {searchTerm || selectedCategory 
                            ? 'No products found matching your criteria' 
                            : 'No products available yet'}
                        </p>
                        {!searchTerm && !selectedCategory && (
                          <Link 
                            href="/admin/products/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          >
                            <FiPlus className="mr-2 h-4 w-4" />
                            Add Your First Product
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      
      {/* Delete Confirmation Modal */}
    {/* Delete Confirmation Modal */}
{showDeleteModal && (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
        aria-hidden="true"
        onClick={() => setShowDeleteModal(false)}
      ></div>

      {/* Modal container */}
      <motion.div 
        className="relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <FiTrash2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Product</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{productToDelete?.name || 'this product'}"? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleDeleteProduct}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  </div>
)}

      
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}