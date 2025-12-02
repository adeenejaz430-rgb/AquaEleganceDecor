import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate a random 6-digit verification code
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simulate sending an email with verification code
// In a real app, you would use a service like SendGrid, Mailgun, etc.
export async function sendVerificationEmail(email, code) {
  // This is a simulation - in a real app, you would call an email service API
  console.log(`Sending verification code ${code} to ${email}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
}
