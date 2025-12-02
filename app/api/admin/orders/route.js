import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // adjust path if needed
import dbConnect from '@/lib/db'; // your db helper
import Order from '@/models/Order';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Optional: restrict to admin
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error('Admin orders error:', err);
    return NextResponse.json(
      { error: 'Failed to load orders' },
      { status: 500 }
    );
  }
}
