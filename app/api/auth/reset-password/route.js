import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { verificationCodes } from '../forgot-password/route';

export async function POST(request) {
  try {
    const { email, code, newPassword } = await request.json();

    // Validate input
    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { message: 'Email, code, and new password are required' },
        { status: 400 }
      );
    }

    // Verify the code
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

    // Code is valid, proceed with password reset
    await connectToDatabase();

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Clean up the verification code
    verificationCodes.delete(email);

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { message: 'Error resetting password' },
      { status: 500 }
    );
  }
}