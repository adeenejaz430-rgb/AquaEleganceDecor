// app/api/orders/my/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // <- change path if yours is different
import dbConnect from '@/lib/db'; // <- change to your actual db connect helper
import Order from '@/models/Order';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // If your session stores ID as session.user._id instead of id, change here
    const userId = session.user.id || session.user._id;

    await dbConnect();

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
