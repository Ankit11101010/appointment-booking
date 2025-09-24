import jwt from 'jsonwebtoken';
import Doctor from '../models/Auth.js';

export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get doctor from token
    const doctor = await Doctor.findById(decoded.id).select('-password');
    
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but doctor no longer exists.'
      });
    }

    if (!doctor.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Doctor account is deactivated.'
      });
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error in authentication.'
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const doctor = await Doctor.findById(decoded.id).select('-password');
      
      if (doctor && doctor.isActive) {
        req.doctor = doctor;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};