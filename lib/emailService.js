import nodemailer from 'nodemailer';

// Create a test account for development
let transporter;

// Initialize the transporter
async function initTransporter() {
  try {
    // Force use of Gmail with app password
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Password, // App Password from Google
      },
    });
    
    // Verify connection configuration
    await transporter.verify();
    console.log('Gmail connection verified successfully');
    console.log(`Using email: ${process.env.Email_User}`);
  } catch (error) {
    console.error('Error setting up email transport:', error);
    
    // Fallback to Ethereal for testing if Gmail fails
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Falling back to Ethereal Email');
      console.log('Ethereal Email credentials:', testAccount.user, testAccount.pass);
      console.log('View emails at: https://ethereal.email');
    } catch (fallbackError) {
      console.error('Failed to set up fallback email service:', fallbackError);
    }
  }
}

// Initialize transporter when this module is imported
initTransporter();

/**
 * Send verification code email
 * @param {string} to - Recipient email
 * @param {string} code - Verification code
 * @param {string} type - Type of verification ('login' or 'reset')
 * @returns {Promise<boolean>} - Success status
 */
export async function sendVerificationEmail(to, code, type = 'login') {
  try {
    // Make sure transporter is initialized
    if (!transporter) {
      await initTransporter();
    }
    
    const subject = type === 'login' 
      ? 'Your Login Verification Code' 
      : 'Password Reset Verification Code';
    
    const text = type === 'login'
      ? `Your verification code for login is: ${code}\nThis code will expire in 15 minutes.`
      : `Your verification code for password reset is: ${code}\nThis code will expire in 15 minutes.`;
    
    const html = type === 'login'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Login Verification Code</h2>
          <p>Your verification code for login is:</p>
          <div style="background-color: #f5f5f5; padding: 10px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Password Reset Verification Code</h2>
          <p>Your verification code for password reset is:</p>
          <div style="background-color: #f5f5f5; padding: 10px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"E-Commerce Support" <support@your-domain.com>',
      to,
      subject,
      text,
      html
    });

    console.log('Email sent:', info.messageId);
    
    // For development with Ethereal, log the URL where the email can be viewed
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Test if email configuration is working
export async function testEmailConfig() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}