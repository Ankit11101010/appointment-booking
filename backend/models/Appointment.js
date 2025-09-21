const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
