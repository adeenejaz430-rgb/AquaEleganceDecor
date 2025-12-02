import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import slugify from 'slugify';

// GET all blogs
export async function GET(request) {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST create a new blog
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    const data = await request.json();
    
    // Create slug from title
    const slug = slugify(data.title, { lower: true, strict: true });
    
    // Create blog post
    const blog = await Blog.create({
      ...data,
      slug,
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}