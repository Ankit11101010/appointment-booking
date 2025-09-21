const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // You'll need to implement this

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;
    
    // Validate required fields for doctors
    if (role === "doctor" && !specialization) {
      return res.status(400).json({ message: "Specialization is required for doctors" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "patient",
      verificationToken
    };

    // Add specialization only for doctors
    if (role === "doctor") {
      userData.specialization = specialization;
      userData.isVerified = false; // Doctors need admin verification
    } else {
      userData.isVerified = true; // Patients are auto-verified
    }

    const user = await User.create(userData);

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      isVerified: user.isVerified,
      token: generateToken(user.id),
      message: role === "doctor" 
        ? "Registration successful! Please wait for admin approval." 
        : "Registration successful! Please verify your email."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        message: "Account not verified. Please check your email for verification instructions." 
      });
    }

    // Check if doctor is approved by admin
    if (user.role === "doctor" && !user.isApproved) {
      return res.status(401).json({ 
        message: "Your account is pending admin approval. Please try again later." 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Please click <a href="${resetUrl}">here</a> to reset your password.</p>`
    });

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  verifyEmail, 
  forgotPassword, 
  resetPassword 
};