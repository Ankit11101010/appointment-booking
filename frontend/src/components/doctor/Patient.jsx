import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 42,
      gender: 'Male',
      address: 'A-102, Sunshine Apartments, Bandra West, Mumbai',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@example.com',
      appointmentDate: '2023-10-15',
      appointmentTime: '09:00 AM',
      status: 'booked',
      diagnosis: 'Hypertension',
      notes: 'Regular checkup. Prescribed medication.',
      lastVisit: '2023-09-10'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 28,
      gender: 'Female',
      address: 'B-205, Green Valley Society, Andheri East, Mumbai',
      phone: '+91 97654 32109',
      email: 'priya.sharma@example.com',
      appointmentDate: '2023-10-15',
      appointmentTime: '10:30 AM',
      status: 'booked',
      diagnosis: 'General Consultation',
      notes: '',
      lastVisit: '2023-08-15'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      age: 65,
      gender: 'Male',
      address: 'C-34, Silver Oak Complex, Powai, Mumbai',
      phone: '+91 96543 21098',
      email: 'vikram.singh@example.com',
      appointmentDate: '2023-10-16',
      appointmentTime: '11:00 AM',
      status: 'booked',
      diagnosis: 'Diabetes Management',
      notes: 'Needs sugar level monitoring',
      lastVisit: '2023-09-20'
    },
    {
      id: 4,
      name: 'Anjali Patel',
      age: 35,
      gender: 'Female',
      address: 'D-12, Royal Palms, Goregaon East, Mumbai',
      phone: '+91 95432 10987',
      email: 'anjali.patel@example.com',
      appointmentDate: '2023-10-17',
      appointmentTime: '03:00 PM',
      status: 'booked',
      diagnosis: 'Migraine',
      notes: 'Follow-up appointment',
      lastVisit: '2023-10-03'
    },
    {
      id: 5,
      name: 'Sanjay Mehta',
      age: 50,
      gender: 'Male',
      address: 'E-45, Hill View Society, Malad West, Mumbai',
      phone: '+91 94321 09876',
      email: 'sanjay.mehta@example.com',
      appointmentDate: '2023-10-18',
      appointmentTime: '02:00 PM',
      status: 'booked',
      diagnosis: 'Arthritis',
      notes: 'Physical therapy recommended',
      lastVisit: '2023-09-25'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter to show only booked patients
  const bookedPatients = patients.filter(patient => patient.status === 'booked');

  const updateAppointmentStatus = (id, status) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, status } : patient
    ));
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Patient Appointments</h1>
        <p className="text-gray-400">Manage your booked patient appointments</p>
      </div>

      {/* Patient Cards Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600/30 rounded-2xl p-4 mb-3 hidden md:grid grid-cols-12 gap-4 text-gray-400 text-sm font-medium">
        <div className="col-span-3">PATIENT INFORMATION</div>
        <div className="col-span-2">CONTACT</div>
        <div className="col-span-3">ADDRESS</div>
        <div className="col-span-2">APPOINTMENT</div>
        <div className="col-span-2 text-center">ACTION</div>
      </div>

      {/* Patient Cards - Enhanced with address */}
      <div className="space-y-4">
        {bookedPatients.map(patient => (
          <div key={patient.id} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl p-5 transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Patient Info */}
              <div className="md:col-span-3">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                    <p className="text-gray-300 text-sm">{patient.age} years, {patient.gender}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm truncate">{patient.phone}</span>
                </div>
              </div>

              {/* Address Info */}
              <div className="md:col-span-3">
                <div className="flex items-start space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm line-clamp-2">{patient.address}</span>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="md:col-span-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{formatDate(patient.appointmentDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{patient.appointmentTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="md:col-span-2 flex justify-center md:justify-end">
                <button
                  onClick={() => updateAppointmentStatus(patient.id, 'completed')}
                  className="flex items-center justify-center space-x-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 font-medium py-2.5 px-4 rounded-xl transition-all duration-300 w-full md:w-auto"
                  title="Mark as Completed"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Complete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {bookedPatients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl mt-6">
          <div className="bg-blue-500/20 p-6 rounded-full mb-5">
            <User className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Booked Appointments</h3>
          <p className="text-gray-400 mb-5">You don't have any booked appointments at the moment.</p>
        </div>
      )}

      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700/30 sticky top-0 bg-gray-800 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Patient Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-400" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-white">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Age & Gender</p>
                      <p className="text-white">{selectedPatient.age} years, {selectedPatient.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Contact Number</p>
                      <p className="text-white">{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Address</p>
                      <p className="text-white">{selectedPatient.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-amber-400" />
                    Appointment Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Appointment Date</p>
                      <p className="text-white">{formatDate(selectedPatient.appointmentDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Appointment Time</p>
                      <p className="text-white">{selectedPatient.appointmentTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-400" />
                  Address
                </h3>
                <div className="bg-gray-700/30 rounded-xl p-4">
                  <p className="text-white">{selectedPatient.address}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700/30 flex justify-end sticky bottom-0 bg-gray-800">
              <button
                onClick={() => updateAppointmentStatus(selectedPatient.id, 'completed')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 mr-3"
              >
                Mark as Completed
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;