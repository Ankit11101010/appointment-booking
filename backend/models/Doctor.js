import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  role: {
    type: String,
    enum: ['doctor'],
    default: 'doctor',
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
    ],
  },
}, { timestamps: true });

// Hash password before saving
doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Doctor', doctorSchema);