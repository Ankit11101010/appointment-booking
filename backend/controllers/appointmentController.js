const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  const { date, time } = req.body;
  const appointment = await Appointment.create({
    user: req.user._id,
    date,
    time,
  });
  res.status(201).json(appointment);
};

const getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id });
  res.json(appointments);
};

module.exports = { bookAppointment, getAppointments };
