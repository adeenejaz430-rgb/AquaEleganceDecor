import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    
    const blog = await Blog.findOne({ slug, published: true });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}