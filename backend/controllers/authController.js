import Doctor from '../models/Auth.js';
import emailService from '../utils/emailService.js';
import crypto from 'crypto';

// @desc    Register a new doctor
// @route   POST /api/doctors/register
// @access  Public
export const registerDoctor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      specialization,
      licenseNumber,
      hospital,
      phone
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !specialization || !licenseNumber || !hospital || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({
      $or: [
        { email: email.toLowerCase() },
        { licenseNumber: licenseNumber }
      ]
    });

    if (existingDoctor) {
      if (existingDoctor.email === email.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: 'Doctor with this email already exists'
        });
      }
      if (existingDoctor.licenseNumber === licenseNumber) {
        return res.status(400).json({
          success: false,
          message: 'Doctor with this license number already exists'
        });
      }
    }

    // Create new doctor
    const doctor = new Doctor({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      specialization,
      licenseNumber,
      hospital,
      phone
    });

    await doctor.save();

    // Generate token
    const token = doctor.generateAuthToken();

    // Send welcome email (non-blocking)
    emailService.sendWelcomeEmail(doctor.email, doctor.firstName);

    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully',
      data: {
        token,
        doctor: {
          id: doctor._id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          specialization: doctor.specialization,
          hospital: doctor.hospital,
          phone: doctor.phone,
          isVerified: doctor.isVerified,
          createdAt: doctor.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Register doctor error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login doctor
// @route   POST /api/doctors/login
// @access  Public
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find doctor and include password for comparison
    const doctor = await Doctor.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!doctor.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Check password
    const isPasswordValid = await doctor.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    doctor.lastLogin = new Date();
    await doctor.save();

    // Generate token
    const token = doctor.generateAuthToken();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        doctor: {
          id: doctor._id,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          specialization: doctor.specialization,
          hospital: doctor.hospital,
          phone: doctor.phone,
          isVerified: doctor.isVerified,
          lastLogin: doctor.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Login doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current doctor profile
// @route   GET /api/doctors/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor._id);
    
    res.json({
      success: true,
      data: { doctor }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, specialization, hospital, phone } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.doctor._id,
      { 
        firstName, 
        lastName, 
        specialization, 
        hospital, 
        phone 
      },
      { 
        new: true, 
        runValidators: true 
      }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { doctor }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/doctors/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const doctor = await Doctor.findOne({ email: email.toLowerCase() });
    
    if (!doctor) {
      // Return success even if email doesn't exist for security
      return res.json({
        success: true,
        message: 'If the email exists, password reset instructions will be sent'
      });
    }

    // Generate reset token
    const resetToken = doctor.generateResetToken();
    await doctor.save();

    // Send email
    const emailSent = await emailService.sendPasswordResetEmail(doctor.email, resetToken);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Error sending email. Please try again later.'
      });
    }

    res.json({
      success: true,
      message: 'If the email exists, password reset instructions will be sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
};

// @desc    Reset password
// @route   POST /api/doctors/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash token to compare with stored hash
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const doctor = await Doctor.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password and clear reset token
    doctor.password = newPassword;
    doctor.resetPasswordToken = undefined;
    doctor.resetPasswordExpire = undefined;
    await doctor.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

// @desc    Change password
// @route   PUT /api/doctors/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const doctor = await Doctor.findById(req.doctor._id).select('+password');

    // Verify current password
    const isCurrentPasswordValid = await doctor.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    doctor.password = newPassword;
    await doctor.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password change'
    });
  }
};

// @desc    Health check endpoint
// @route   GET /api/health
// @access  Public
export const healthCheck = async (req, res) => {
  try {
    // Test database connection
    const mongoose = await import('mongoose');
    const dbState = mongoose.connection.readyState;
    
    const healthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: dbState === 1 ? 'Connected' : 'Disconnected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};