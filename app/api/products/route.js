//
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // make sure this runs in Node runtime

// 🔹 helper to load DB + model only when needed
async function getDbAndModel() {
  const { default: connectToDatabase } = await import('@/lib/db');
  const { default: Product } = await import('@/models/Product');
  await connectToDatabase();
  return { Product };
}

// GET all products
export async function GET(request) {
  try {
    const { Product } = await getDbAndModel();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request) {
  try {
    const { Product } = await getDbAndModel();

    const productData = await request.json();
    const product = new Product(productData);
    await product.save();

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(request) {
  try {
    const { Product } = await getDbAndModel();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
