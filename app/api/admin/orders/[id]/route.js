import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();

    const order = await Order.findById(params.id).lean();
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error('Admin order detail error:', err);
    return NextResponse.json({ error: 'Failed to load order' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const { status } = await req.json();

    await dbConnect();

    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // update status
    order.status = status;

    // if you want to mark delivered / paid:
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }
    if (status === 'paid') {
      order.isPaid = true;
      order.paidAt = new Date();
    }

    await order.save();

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error('Admin update order error:', err);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
