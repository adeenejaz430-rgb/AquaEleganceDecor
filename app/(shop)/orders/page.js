'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (status !== 'authenticated') {
      setLoading(false);
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/orders', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to load orders');
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Orders fetch error:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
      case 'pending':
      case 'paid':
        return <FiClock className="text-yellow-500" />;
      case 'shipped':
        return <FiPackage className="text-blue-500" />;
      case 'delivered':
        return <FiCheck className="text-green-500" />;
      case 'cancelled':
      case 'failed':
      case 'refunded':
        return <FiX className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'paid':
        return 'Paid';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      case 'failed':
        return 'Payment Failed';
      case 'refunded':
        return 'Refunded';
      default:
        return 'Unknown';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
      case 'processing':
      case 'paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'failed':
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {/* Not logged in */}
      {status !== 'loading' && !session && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Please sign in to view your orders
          </h2>
          <p className="text-gray-500 mb-6">
            Orders are linked to your account. Sign in and try again.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      )}

      {/* Loading */}
      {status === 'authenticated' && loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error */}
      {status === 'authenticated' && !loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* No orders */}
      {status === 'authenticated' &&
        !loading &&
        !error &&
        orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500 mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        )}

      {/* Orders list */}
      {status === 'authenticated' &&
        !loading &&
        !error &&
        orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Order #{order.orderNumber || order._id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on{' '}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-2">
                        {getStatusText(order.status)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Items
                  </h3>
                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item._id || item.product || item.name}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div className="ml-0">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price || 0).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Total</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${(order.totalPrice || 0).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
    </div>
  );
}
