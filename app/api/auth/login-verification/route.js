import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { generateVerificationCode } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/emailService';

// Store verification codes in memory (in production, use Redis or similar)
export const loginVerificationCodes = new Map();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Generate verification code
    const code = generateVerificationCode();
    
    // Store code with expiration (15 minutes)
    loginVerificationCodes.set(email, {
      code,
      expires: Date.now() + 15 * 60 * 1000,
      password // Store password to complete login after verification
    });

    // Send verification email with type 'login'
    await sendVerificationEmail(email, code, 'login');
    
    return NextResponse.json(
      { 
        message: 'Verification code sent successfully to your email'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { message: 'Error sending verification code' },
      { status: 500 }
    );
  }
}