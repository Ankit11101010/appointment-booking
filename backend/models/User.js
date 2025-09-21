const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["patient", "doctor", "admin"], 
      default: "patient" 
    },
    specialization: { 
      type: String, 
      required: function() {
        return this.role === "doctor";
      }
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);