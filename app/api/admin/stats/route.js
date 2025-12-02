import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";

export async function GET() {
  await dbConnect();

  // Total products
  const totalProducts = await Product.countDocuments();

  // Total customers
  const totalCustomers = await User.countDocuments({ role: 'user' });

  // Total orders
  const totalOrders = await Order.countDocuments();

  // Total sales
  const orders = await Order.find();
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  // Sales per month (last 6 months)
  const salesData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthOrders = orders.filter(o => new Date(o.createdAt) >= start && new Date(o.createdAt) < end);
    const monthSales = monthOrders.reduce((sum, o) => sum + o.total, 0);
    salesData.push({ month: start.toLocaleString('default', { month: 'short' }), sales: monthSales });
  }

  // Recent orders (latest 5)
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user');

  return NextResponse.json({
    totalSales,
    totalOrders,
    totalCustomers,
    totalProducts,
    salesData,
    recentOrders: recentOrders.map(o => ({
      _id: o._id,
      customerName: o.user.name,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt
    })),
    salesGrowthPercent: 12.5 // optional, you can calculate dynamically
  });
}
