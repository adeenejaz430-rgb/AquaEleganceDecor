import { NextResponse } from 'next/server';
import { loginVerificationCodes } from '../login-verification/route';

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
    const storedData = loginVerificationCodes.get(email);
    
    if (!storedData) {
      return NextResponse.json(
        { message: 'Verification code not found or expired' },
        { status: 400 }
      );
    }
    
    if (Date.now() > storedData.expires) {
      // Code has expired
      loginVerificationCodes.delete(email);
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

    // Code is valid
    return NextResponse.json(
      { message: 'Verification successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying login code:', error);
    return NextResponse.json(
      { message: 'Error verifying code' },
      { status: 500 }
    );
  }
}