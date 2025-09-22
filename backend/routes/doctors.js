const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const { authenticateDoctor } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get doctor profile
router.get('/profile', authenticateDoctor, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.doctor,
      message: 'Profile fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// Update doctor profile
router.put('/profile', authenticateDoctor, async (req, res) => {
  try {
    const allowedUpdates = [
      'name', 'specialization', 'hospital', 'experience', 
      'contactNumber', 'address', 'availability'
    ];
    
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid updates!'
      });
    }

    updates.forEach(update => {
      req.doctor[update] = req.body[update];
    });

    await req.doctor.save();

    res.json({
      success: true,
      data: req.doctor,
      message: 'Profile updated successfully'
    });
  } catch (error) {
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
});

// Change password
router.post('/change-password', authenticateDoctor, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Verify current password
    const doctor = await Doctor.findById(req.doctor._id);
    const isMatch = await doctor.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({
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
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
});

// Additional routes for doctor registration and login
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password, specialization, 
      licenseNumber, hospital, experience, contactNumber
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ 
      $or: [{ email }, { licenseNumber }] 
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email or license number already exists'
      });
    }

    const doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      licenseNumber,
      hospital,
      experience,
      contactNumber
    });

    await doctor.save();

    // Generate token
    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { 
      expiresIn: '7d' 
    });

    res.status(201).json({
      success: true,
      data: { doctor, token },
      message: 'Doctor registered successfully'
    });
  } catch (error) {
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
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find doctor and include password for comparison
    const doctor = await Doctor.findOne({ email }).select('+password');
    
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await doctor.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { 
      expiresIn: '7d' 
    });

    res.json({
      success: true,
      data: { 
        doctor: {
          _id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          hospital: doctor.hospital
        }, 
        token 
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

module.exports = router;