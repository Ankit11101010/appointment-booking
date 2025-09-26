import express from 'express';
import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorAuth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create new doctor
    const doctor = new Doctor({
      name,
      email,
      password,
      role,
      specialization,
    });

    await doctor.save();

    // Generate JWT
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful ✅',
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      success: true,
      message: 'Login successful ✅',
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;