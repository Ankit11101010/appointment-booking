import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  registerDoctor,
  loginDoctor,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  healthCheck
} from '../controllers/authController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.get('/health', healthCheck);
router.post('/register', authLimiter, registerDoctor);
router.post('/login', authLimiter, loginDoctor);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePassword);

export default router;