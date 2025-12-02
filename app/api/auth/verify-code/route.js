import { NextResponse } from 'next/server';
import { verificationCodes } from '../forgot-password/route';

export async function POST(request) {
  try {
    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return NextResponse.json(
        { message: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Get stored verification data
    const storedData = verificationCodes.get(email);
    
    if (!storedData) {
      return NextResponse.json(
        { message: 'Verification code not found or expired' },
        { status: 400 }
      );
    }
    
    if (Date.now() > storedData.expires) {
      // Code has expired
      verificationCodes.delete(email);
      return NextResponse.json(
        { message: 'Verification code has expired' },
        { status: 400 }
      );
    }
    
    if (storedData.code !== code) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Code is valid - don't delete it yet as it will be needed for password reset
    return NextResponse.json(
      { message: 'Verification code is valid' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { message: 'Error verifying code' },
      { status: 500 }
    );
  }
}