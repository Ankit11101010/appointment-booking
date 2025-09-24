import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - Doctor Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>You requested a password reset for your doctor account.</p>
          <p>Click the link below to reset your password (valid for 30 minutes):</p>
          <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="margin: 24px 0;">
          <p style="color: #6b7280; font-size: 14px;">Doctor Portal Team</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Password reset email sent to: ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending password reset email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email, firstName) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Doctor Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Doctor Portal, Dr. ${firstName}!</h2>
          <p>Your account has been successfully created.</p>
          <p>You can now login to your account and start managing your profile.</p>
          <hr style="margin: 24px 0;">
          <p style="color: #6b7280; font-size: 14px;">Doctor Portal Team</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to: ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
      return false;
    }
  }
}

export default new EmailService();