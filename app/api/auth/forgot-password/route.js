import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { generateVerificationCode } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/emailService';

// Store verification codes temporarily (in a real app, use a database)
const verificationCodes = new Map();

export async function POST(request) {
  try {
    const { email } = await request.json();

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

    // Generate a verification code (6-digit number)
    const verificationCode = generateVerificationCode();
    
    // Store the code with expiration (15 minutes)
    verificationCodes.set(email, {
      code: verificationCode,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    // In a real app, send the code via email
    // For demo purposes, we'll just log it
    console.log(`Verification code for ${email}: ${verificationCode}`);
    
    // Send verification email with type 'reset'
    await sendVerificationEmail(email, verificationCode, 'reset');
    
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

// Export the verification codes map for other routes to use
export { verificationCodes };