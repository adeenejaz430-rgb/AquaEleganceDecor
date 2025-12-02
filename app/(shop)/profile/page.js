'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { message } from 'antd';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });

  // Get wishlist and cart items from store
  const wishlistItems = useWishlistStore(state => state.items);
  const { addItem: addToCart } = useCartStore();
  const { removeItem: removeFromWishlist } = useWishlistStore();

  // Mock orders data
  const mockOrders = [
    { id: '1001', date: '2023-05-15', total: 249.99, status: 'Delivered' },
    { id: '1002', date: '2023-06-22', total: 129.99, status: 'Processing' },
  ];

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      message.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      message.error('Failed to sign out');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // Try to get saved user data from localStorage first with user-specific key
      const userId = session?.user?.id || session?.user?.email || 'guest';
      const savedUserData = localStorage.getItem(`userData-${userId}`);
     const fetchProfile = async () => {
  const res = await fetch("/api/user/profile");
  if (res.ok) {
    const user = await res.json();
    setUserData({
      name: user.name || "",
      email: user.email || "",
      address: user.address || {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
    });
  }
};

fetchProfile();

      setIsLoading(false);
    }
  }, [status, router, session]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="h-40 bg-gray-200 rounded-lg"></div>
              <div className="md:col-span-3">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FiHeart /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white mb-4 md:mb-0 md:mr-6">
              <img
                src={session?.user?.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(session?.user?.name || 'User')}
                alt={session?.user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{session?.user?.name || 'User'}</h1>
              <p className="text-blue-100">{session?.user?.email || 'user@example.com'}</p>
              <p className="text-blue-100 mt-2">Member since {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center p-3 rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center p-3 rounded-md transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <span className="mr-3"><FiLogOut /></span>
                    Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => isEditing && setUserData({...userData, name: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white ${
                        isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => isEditing && setUserData({...userData, email: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white ${
                        isEditing ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={userData.address.street}
                          onChange={(e) => setUserData({
                            ...userData, 
                            address: {...userData.address, street: e.target.value}
                          })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={userData.address.city}
                          onChange={(e) => setUserData({
                            ...userData, 
                            address: {...userData.address, city: e.target.value}
                          })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={userData.address.state}
                          onChange={(e) => setUserData({
                            ...userData, 
                            address: {...userData.address, state: e.target.value}
                          })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          value={userData.address.zip}
                          onChange={(e) => setUserData({
                            ...userData, 
                            address: {...userData.address, zip: e.target.value}
                          })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  {isEditing ? (
                    <div className="flex space-x-4">
                      <button 
                        onClick={async () => {
  setIsEditing(false);
  try {
    const res = await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (result.success) {
      message.success("Profile updated successfully!");
      setUserData(result.user);
    } else {
      message.error("Failed to update profile");
    }
  } catch (error) {
    console.error(error);
    message.error("Something went wrong");
  }
}}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          message.info('Edits cancelled');
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div key={item._id || item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                            {(item.images?.[0] || item.image) && (
                              <img 
                                src={item.images?.[0] || item.image} 
                                alt={item.name} 
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-blue-600 font-medium">${item.price?.toFixed(2) || '0.00'}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 w-full sm:w-auto">
                          <button 
                            onClick={() => {
                              addToCart(item);
                              message.success(`${item.name} added to cart!`);
                            }}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <FiShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </button>
                          <button 
                            onClick={() => {
                              removeFromWishlist(item._id || item.id);
                              message.success(`${item.name} removed from wishlist`);
                            }}
                            className="flex items-center space-x-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            <FiTrash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiHeart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      You don't have any items in your wishlist yet.
                    </p>
                    <Link 
                      href="/products"
                      className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">My Orders</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden dark:border-gray-700">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Order #{order.id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiShoppingBag className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <Link 
                      href="/products"
                      className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button 
                        onClick={() => message.info('Password change functionality will be implemented soon')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}