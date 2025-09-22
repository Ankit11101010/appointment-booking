const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

// Main authentication middleware
const authenticateDoctor = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // Alternative: Check for token in Auth header without 'Bearer'
    else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get doctor from database (excluding password)
    const doctor = await Doctor.findById(decoded.id).select('-password');
    
    if (!doctor) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is invalid - doctor not found.' 
      });
    }

    // Check if doctor account is verified
    if (!doctor.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified. Please verify your account to access this resource.'
      });
    }

    // Attach doctor to request object
    req.doctor = doctor;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);

    // Handle specific JWT errors
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

    res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route.' 
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.doctor) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required before authorization.'
      });
    }

    if (!roles.includes(req.doctor.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.doctor.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`
      });
    }
    next();
  };
};

// Optional authentication (doesn't fail if no token, but attaches doctor if valid)
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const doctor = await Doctor.findById(decoded.id).select('-password');
      
      if (doctor && doctor.isVerified) {
        req.doctor = doctor;
      }
    }
    
    next();
  } catch (error) {
    // For optional auth, we don't block the request on token errors
    // Just continue without setting req.doctor
    next();
  }
};

// Check if doctor owns the resource or has admin role
const checkOwnership = (resourceDoctorIdPath = 'params.id') => {
  return (req, res, next) => {
    if (!req.doctor) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    // Allow admin to access any resource
    if (req.doctor.role === 'admin') {
      return next();
    }

    // Get the doctor ID from the specified path (e.g., req.params.id, req.body.doctorId, etc.)
    const paths = resourceDoctorIdPath.split('.');
    let resourceDoctorId = req;
    
    for (const path of paths) {
      resourceDoctorId = resourceDoctorId[path];
      if (resourceDoctorId === undefined) break;
    }

    // Convert both IDs to string for comparison
    if (resourceDoctorId && req.doctor._id.toString() === resourceDoctorId.toString()) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this resource.'
    });
  };
};

// Alias for backward compatibility
const protect = authenticateDoctor;

module.exports = {
  authenticateDoctor,
  protect,
  authorize,
  optionalAuth,
  checkOwnership
};