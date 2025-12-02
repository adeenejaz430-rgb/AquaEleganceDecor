// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiShoppingBag, FiUsers, FiShoppingCart, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

// // Mock data for dashboard
// const mockStats = {
//   totalSales: 15890.75,
//   totalOrders: 124,
//   totalCustomers: 89,
//   totalProducts: 56,
//   recentOrders: [
//     { id: 'ORD-001', customer: 'John Doe', date: '2023-05-15', total: 129.99, status: 'Delivered' },
//     { id: 'ORD-002', customer: 'Jane Smith', date: '2023-05-14', total: 89.95, status: 'Processing' },
//     { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-05-14', total: 210.50, status: 'Shipped' },
//     { id: 'ORD-004', customer: 'Emily Davis', date: '2023-05-13', total: 59.99, status: 'Delivered' },
//     { id: 'ORD-005', customer: 'Michael Brown', date: '2023-05-12', total: 149.99, status: 'Processing' },
//   ],
//   salesData: [
//     { month: 'Jan', sales: 4500 },
//     { month: 'Feb', sales: 5200 },
//     { month: 'Mar', sales: 4800 },
//     { month: 'Apr', sales: 5900 },
//     { month: 'May', sales: 6500 },
//   ]
// };

// export default function AdminDashboard() {
//   const [stats, setStats] = useState(mockStats);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading data
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   // Status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered':
//         return 'bg-green-100 text-green-800';
//       case 'Processing':
//         return 'bg-blue-100 text-blue-800';
//       case 'Shipped':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {/* Stats Cards */}
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div 
//               className="bg-white rounded-lg shadow p-6 flex items-center"
//               variants={itemVariants}
//             >
//               <div className="rounded-full bg-blue-100 p-3 mr-4">
//                 <FiDollarSign className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Sales</p>
//                 <p className="text-2xl font-bold text-gray-900">${stats.totalSales.toLocaleString()}</p>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="bg-white rounded-lg shadow p-6 flex items-center"
//               variants={itemVariants}
//             >
//               <div className="rounded-full bg-green-100 p-3 mr-4">
//                 <FiShoppingCart className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Orders</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="bg-white rounded-lg shadow p-6 flex items-center"
//               variants={itemVariants}
//             >
//               <div className="rounded-full bg-purple-100 p-3 mr-4">
//                 <FiUsers className="h-6 w-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Customers</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="bg-white rounded-lg shadow p-6 flex items-center"
//               variants={itemVariants}
//             >
//               <div className="rounded-full bg-orange-100 p-3 mr-4">
//                 <FiShoppingBag className="h-6 w-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Products</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
//               </div>
//             </motion.div>
//           </motion.div>
          
//           {/* Sales Chart */}
//           <motion.div 
//             className="bg-white rounded-lg shadow p-6 mb-8"
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
//               <div className="flex items-center">
//                 <FiTrendingUp className="h-5 w-5 text-green-500 mr-1" />
//                 <span className="text-sm font-medium text-green-500">+12.5% from last month</span>
//               </div>
//             </div>
            
//             <div className="h-64 w-full">
//               {/* Simple chart visualization */}
//               <div className="flex h-48 items-end space-x-2">
//                 {stats.salesData.map((item, index) => (
//                   <div key={index} className="flex flex-col items-center flex-1">
//                     <div 
//                       className="w-full bg-blue-500 rounded-t"
//                       style={{ 
//                         height: `${(item.sales / Math.max(...stats.salesData.map(d => d.sales))) * 100}%`,
//                         transition: 'height 1s ease-in-out'
//                       }}
//                     ></div>
//                     <div className="text-xs mt-2 text-gray-600">{item.month}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
          
//           {/* Recent Orders */}
//           <motion.div 
//             className="bg-white rounded-lg shadow overflow-hidden"
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <div className="px-6 py-4 border-b">
//               <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Order ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {stats.recentOrders.map((order) => (
//                     <tr key={order.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                         {order.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {order.customer}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.date}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         ${order.total.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUsers, FiShoppingCart, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    salesData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants} initial="hidden" animate="visible">
            
            <motion.div className="bg-white rounded-lg shadow p-6 flex items-center" variants={itemVariants}>
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <FiDollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalSales.toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-lg shadow p-6 flex items-center" variants={itemVariants}>
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <FiShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-lg shadow p-6 flex items-center" variants={itemVariants}>
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-lg shadow p-6 flex items-center" variants={itemVariants}>
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <FiShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Sales Chart */}
          <motion.div className="bg-white rounded-lg shadow p-6 mb-8" variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
              <div className="flex items-center">
                <FiTrendingUp className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+{stats.salesGrowthPercent || 0}% from last month</span>
              </div>
            </div>
            
            <div className=" w-full flex h-48 items-end space-x-2">
              {stats.salesData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${(item.sales / Math.max(...stats.salesData.map(d => d.sales))) * 100}%`,
                      transition: 'height 1s ease-in-out'
                    }}
                  ></div>
                  <div className="text-xs mt-2 text-gray-600">{item.month}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div className="bg-white rounded-lg shadow overflow-hidden" variants={itemVariants}>
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentOrders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
