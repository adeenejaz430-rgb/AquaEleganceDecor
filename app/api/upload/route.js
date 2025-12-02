import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/uploadService';
import { mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    
    // Process the form data
    const formData = await request.formData();
    const result = await uploadFile(formData);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error during upload' 
    }, { status: 500 });
  }
}