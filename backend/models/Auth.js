import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Medical license number is required'],
    unique: true,
    trim: true
  },
  hospital: {
    type: String,
    required: [true, 'Hospital/Clinic name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'any');
      },
      message: 'Please provide a valid phone number'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verificationToken: String,
  lastLogin: Date
}, {
  timestamps: true
});

// Index for better query performance
doctorSchema.index({ email: 1 });
doctorSchema.index({ licenseNumber: 1 });
doctorSchema.index({ isActive: 1 });

// Pre-save middleware to hash password
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
doctorSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to generate JWT token
doctorSchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { 
      id: this._id, 
      email: this.email,
      role: 'doctor'
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Instance method to generate reset token
doctorSchema.methods.generateResetToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  
  return resetToken;
};

// Static method to find doctor by email
doctorSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Virtual for full name
doctorSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Transform output to remove password and add virtuals
doctorSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpire;
    delete ret.verificationToken;
    return ret;
  }
});

export default mongoose.model('Doctor', doctorSchema);