'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

// Mock categories data
const mockCategories = [
  { id: 'cat-001', name: 'Furniture', slug: 'furniture', productCount: 12 },
  { id: 'cat-002', name: 'Lighting', slug: 'lighting', productCount: 8 },
  { id: 'cat-003', name: 'Decor', slug: 'decor', productCount: 15 },
  { id: 'cat-004', name: 'Electronics', slug: 'electronics', productCount: 7 },
  { id: 'cat-005', name: 'Textiles', slug: 'textiles', productCount: 9 },
  { id: 'cat-006', name: 'Kitchen', slug: 'kitchen', productCount: 11 }
];

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  
 useEffect(() => {
  const fetchCategories = async () => {
    setIsLoading(true);
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setIsLoading(false);
  };

  fetchCategories();
}, []);

  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           category.slug.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Handle add category
  const handleAddCategory = async () => {
  try {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategory.name,
        slug:
          newCategory.slug ||
          newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      }),
    });

    const created = await res.json();
    setCategories([...categories, created]);

    setNewCategory({ name: "", slug: "" });
    setShowAddModal(false);
  } catch (err) {
    console.error(err);
  }
};

  
  // Handle edit category
  const handleEditClick = (category) => {
    setCategoryToEdit({ ...category });
    setShowEditModal(true);
  };
  
 const handleUpdateCategory = async () => {
  const res = await fetch(`/api/categories/${categoryToEdit._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryToEdit),
  });

  const updated = await res.json();

  setCategories(
    categories.map((cat) => (cat._id === updated._id ? updated : cat))
  );

  setShowEditModal(false);
};

  
  // Handle delete category
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
  await fetch(`/api/categories/${categoryToDelete._id}`, {
    method: "DELETE",
  });

  setCategories(categories.filter((c) => c._id !== categoryToDelete._id));
  setShowDeleteModal(false);
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Categories Management</h1>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2 -ml-1 h-5 w-5" />
          Add New Category
        </button>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Categories Table */}
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <motion.tr 
                      key={category.id}
                      className="hover:bg-gray-50"
                      variants={itemVariants}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{category.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{category.productCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditClick(category)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEdit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(category)}
                            className="text-red-600 hover:text-red-900"
                            disabled={category.productCount > 0}
                            title={category.productCount > 0 ? "Cannot delete category with products" : "Delete category"}
                          >
                            <FiTrash2 className={`h-5 w-5 ${category.productCount > 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No categories found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      
      {/* Add Category Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex"
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
              
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-2">
                <label htmlFor="categorySlug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  id="categorySlug"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  placeholder="auto-generated-if-empty"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleAddCategory}
                disabled={!newCategory.name}
              >
                Add Category
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => {
                  setNewCategory({ name: '', slug: '' });
                  setShowAddModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Category Modal */}
      {showEditModal && categoryToEdit && (
        <div 
          className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex"
          onClick={() => setShowEditModal(false)}
        >
          <div 
            className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Category</h3>
              
              <div className="mb-4">
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="edit-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-2">
                <label htmlFor="edit-slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  id="edit-slug"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={categoryToEdit.slug}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, slug: e.target.value })}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleUpdateCategory}
                disabled={!categoryToEdit.name}
              >
                Update Category
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && categoryToDelete && (
        <div 
          className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex"
          onClick={() => setShowDeleteModal(false)}
        >
          <div 
            className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mr-4">
                  <FiTrash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Delete Category</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the category "{categoryToDelete.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}