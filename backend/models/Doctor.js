const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
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
    enum: [
      'cardiologist',
      'neurologist',
      'pediatrician',
      'dermatologist',
      'general',
      'surgeon',
      'psychiatrist',
      'radiologist',
      'orthopedic',
      'ophthalmologist',
      'dentist'
    ],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true,
    trim: true
  },
  hospital: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Experience in years is required'],
    min: [0, 'Experience cannot be negative'],
    max: [60, 'Experience seems unrealistic']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
      match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code']
    }
  },
  availability: {
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
    workingHours: {
      start: {
        type: String,
        required: [true, 'Working hours start time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
      },
      end: {
        type: String,
        required: [true, 'Working hours end time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
      }
    },
    workingDays: {
      type: [String],
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  },
  role: {
    type: String,
    enum: ['doctor', 'admin'],
    default: 'doctor'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    trim: true
  },
  education: [{
    degree: String,
    university: String,
    year: Number
  }],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
doctorSchema.index({ email: 1 });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ 'availability.isAvailable': 1 });
doctorSchema.index({ licenseNumber: 1 });

// Encrypt password before saving
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

// Compare password method
doctorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Alias for comparePassword for backward compatibility
doctorSchema.methods.comparePassword = doctorSchema.methods.matchPassword;

// Remove password from JSON output
doctorSchema.methods.toJSON = function() {
  const doctor = this.toObject();
  delete doctor.password;
  return doctor;
};

// Static method to find available doctors
doctorSchema.statics.findAvailable = function() {
  return this.find({ 
    'availability.isAvailable': true,
    isVerified: true 
  });
};

// Virtual for full address
doctorSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
});

// Instance method to check if doctor is working now
doctorSchema.methods.isWorkingNow = function() {
  if (!this.availability.isAvailable) return false;
  
  const now = new Date();
  const currentDay = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
  const currentTime = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
  
  return this.availability.workingDays.includes(currentDay) && 
         currentTime >= this.availability.workingHours.start && 
         currentTime <= this.availability.workingHours.end;
};

module.exports = mongoose.model('Doctor', doctorSchema);