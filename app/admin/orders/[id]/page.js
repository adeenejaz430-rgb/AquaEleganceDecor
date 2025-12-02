'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiPrinter,
  FiPackage,
  FiTruck,
  FiCheck,
  FiX,
} from 'react-icons/fi';

export default function OrderDetail({ params }) {
  const router = useRouter();
  const { id } = params;

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState(null);

  // Simple derived timeline (since your schema has no timeline field)
  const buildTimeline = (orderData) => {
    const events = [];

    events.push({
      status: 'Order Placed',
      description: 'Order was placed by customer',
      date: new Date(orderData.createdAt).toLocaleString(),
    });

    if (orderData.isPaid) {
      events.push({
        status: 'Payment Confirmed',
        description: 'Payment was successfully processed',
        date: orderData.paidAt
          ? new Date(orderData.paidAt).toLocaleString()
          : new Date(orderData.createdAt).toLocaleString(),
      });
    }

    if (orderData.status === 'processing') {
      events.push({
        status: 'Processing',
        description: 'Order is being prepared for shipping',
        date: new Date(orderData.createdAt).toLocaleString(),
      });
    }

    if (orderData.status === 'shipped') {
      events.push({
        status: 'Shipped',
        description: 'Order has been shipped',
        date: new Date(orderData.updatedAt).toLocaleString(),
      });
    }

    if (orderData.isDelivered || orderData.status === 'delivered') {
      events.push({
        status: 'Delivered',
        description: 'Package was delivered to customer',
        date: orderData.deliveredAt
          ? new Date(orderData.deliveredAt).toLocaleString()
          : new Date(orderData.updatedAt).toLocaleString(),
      });
    }

    return events;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/admin/orders/${id}`);
        if (!res.ok) {
          throw new Error('Failed to load order');
        }
        const data = await res.json();
        const o = data.order;

        // attach derived timeline
        o.timeline = buildTimeline(o);

        setOrder(o);
        setNewStatus(o.status || 'processing');
      } catch (err) {
        console.error('Order detail error:', err);
        setError(err.message || 'Failed to load order');
        router.push('/admin/orders');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id, router]);

  const handleStatusUpdate = async () => {
    if (!order || newStatus === order.status) return;

    try {
      setIsUpdating(true);
      setError(null);

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update order');
      }

      const data = await res.json();
      const updated = data.order;
      updated.timeline = buildTimeline(updated);
      setOrder(updated);
    } catch (err) {
      console.error('Update status error:', err);
      setError(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'failed':
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-gray-500">Order not found.</p>
      </div>
    );
  }

  const shipping = order.shippingAddress || {};
  const customerName = shipping.name || 'Customer';
  const paymentStatus = order.isPaid ? 'Paid' : 'Pending';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <button
            onClick={() => router.push('/admin/orders')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Order {order.orderNumber || order._id}
          </h1>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPrinter className="mr-2 -ml-1 h-5 w-5" />
            Print Order
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Order Summary */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : '-'}
                </p>
              </div>

              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Order Status</p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Payment Status</p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    paymentStatus === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {paymentStatus}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.paymentMethod || 'Card'}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">
                Items
              </h3>

              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                        Image
                      </div>
                    </div>

                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-gray-900 font-medium">
                  ${Number(order.itemsPrice || order.totalPrice || 0).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <p className="text-gray-500">Shipping</p>
                <p className="text-gray-900 font-medium">
                  ${Number(order.shippingPrice || 0).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <p className="text-gray-500">Tax</p>
                <p className="text-gray-900 font-medium">
                  ${Number(order.taxPrice || 0).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-medium text-gray-900">
                  ${Number(order.totalPrice || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Update Status */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                Update Status
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Order Status
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating || newStatus === order.status}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                Customer Information
              </h2>
            </div>

            <div className="p-6">
              <p className="text-sm font-medium text-gray-900">
                {customerName}
              </p>
              <p className="text-sm text-gray-500 mt-1">{order.email}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping Address
              </h2>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-900">
                {shipping.address || shipping.street}
              </p>
              <p className="text-sm text-gray-900 mt-1">
                {shipping.city}, {shipping.state}{' '}
                {shipping.postalCode || shipping.zip}
              </p>
              <p className="text-sm text-gray-900 mt-1">
                {shipping.country || 'United States'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Order Timeline</h2>
          </div>

          <div className="p-6">
            {order.timeline && order.timeline.length > 0 ? (
              <div className="flow-root">
                <ul className="-mb-8">
                  {order.timeline.map((event, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== order.timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                event.status === 'Delivered'
                                  ? 'bg-green-500'
                                  : event.status === 'Shipped'
                                  ? 'bg-yellow-500'
                                  : event.status === 'Cancelled'
                                  ? 'bg-red-500'
                                  : 'bg-blue-500'
                              }`}
                            >
                              {event.status === 'Delivered' ? (
                                <FiCheck className="h-5 w-5 text-white" />
                              ) : event.status === 'Shipped' ? (
                                <FiTruck className="h-5 w-5 text-white" />
                              ) : event.status === 'Cancelled' ? (
                                <FiX className="h-5 w-5 text-white" />
                              ) : (
                                <FiPackage className="h-5 w-5 text-white" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">
                                {event.status}
                              </p>
                              <p className="text-sm text-gray-500">
                                {event.description}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {event.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No timeline data.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
