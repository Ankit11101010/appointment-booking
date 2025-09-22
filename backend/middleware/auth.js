const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

// Protect routes - verify JWT
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get doctor from token
    req.doctor = await Doctor.findById(decoded.id).select('-password');
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.doctor.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.doctor.role} is not authorized to access this route`
      });
    }
    next();
  };
};