import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import slugify from 'slugify';

// GET a single blog by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT update a blog
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const data = await request.json();
    
    // Update slug if title changed
    if (data.title) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }
    
    // Update timestamp
    data.updatedAt = new Date();
    
    const blog = await Blog.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE a blog
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);
    
    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}