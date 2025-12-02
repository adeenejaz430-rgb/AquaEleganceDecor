import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

// PUT (update) a product
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const productData = await request.json();
    
    await connectToDatabase();
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// GET a single product
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    await connectToDatabase();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE a product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await connectToDatabase();
    const result = await Product.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}