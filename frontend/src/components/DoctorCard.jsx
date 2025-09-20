import { useState } from 'react';
import { motion } from 'framer-motion';

const DoctorCard = ({ doctor, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-5 border border-gray-700 transition-all hover:border-cyan-500/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center mb-4">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50 mb-4" 
        />
        <h3 className="text-xl font-bold text-center text-white">{doctor.name}</h3>
        <p className="text-cyan-400 text-sm text-center">{doctor.speciality}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-300">{doctor.rating} ({doctor.reviews} reviews)</span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Consultation Fee:</span>
          <span className="text-xl font-bold text-cyan-400">${doctor.fee}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Experience:</span>
          <span className="text-white">{doctor.experience} years</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400">Availability:</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doctor.available ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {doctor.available ? 'Available Today' : 'Not Available'}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBook(doctor)}
        disabled={!doctor.available}
        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
          doctor.available 
            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/20' 
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        } ${isHovered && doctor.available ? 'shadow-lg shadow-cyan-500/20' : ''}`}
      >
        {doctor.available ? 'Book Appointment' : 'Not Available'}
      </button>
    </motion.div>
  );
};

// Example usage component
export default function DoctorListing() {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      speciality: 'Cardiologist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      reviews: 124,
      fee: 120,
      experience: 12,
      available: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      speciality: 'Neurologist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 4.7,
      reviews: 98,
      fee: 150,
      experience: 9,
      available: true
    },
    
  ];

  const handleBookAppointment = (doctor) => {
    console.log('Booking appointment with:', doctor);
    // Here you would typically open a modal or navigate to a booking page
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 text-center">
          Our Medical Specialists
        </h1>
        <p className="text-lg text-gray-400 text-center mb-12">
          Book an appointment with our expert doctors
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onBook={handleBookAppointment} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}