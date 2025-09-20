import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'booking'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '12 years',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '9 years',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      experience: '14 years',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: true
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      experience: '11 years',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: false
    },
    {
      id: 5,
      name: 'Dr. Lisa Taylor',
      specialty: 'Dermatology',
      experience: '8 years',
      rating: 4.7,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: true
    },
    {
      id: 6,
      name: 'Dr. Robert Brown',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      available: true
    },
  ];

  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'];

  useEffect(() => {
    if (formData.date) {
      // Generate available times (every 30 minutes from 8 AM to 8 PM)
      const times = [];
      for (let hour = 8; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          times.push(timeString);
        }
      }
      setAvailableTimes(times);
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact information is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Booking submitted:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            age: '',
            gender: '',
            contact: '',
            address: '',
            date: '',
            time: ''
          });
          setIsSuccess(false);
          setActiveTab('search');
          setSelectedDoctor(null);
        }, 3000);
      }, 1500);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('booking');
  };

  // Date constraints
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mt-24">
       

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'search' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Find Doctors
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'booking' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Book Appointment
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'search' ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-700 shadow-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Find Your Doctor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                        placeholder="Search doctors by name or specialty..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    >
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>
                          {specialty === 'all' ? 'All Specialties' : specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map(doctor => (
                    <motion.div 
                      key={doctor.id}
                      whileHover={{ y: -5 }}
                      className="bg-gray-900 bg-opacity-70 rounded-xl p-4 border border-gray-700 transition-all hover:border-cyan-500/30"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h3 className="font-bold text-lg">{doctor.name}</h3>
                          <p className="text-cyan-400 text-sm">{doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-300">{doctor.rating} ({doctor.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="text-sm text-gray-400">{doctor.experience} experience</span>
                          <div className={`inline-flex items-center ml-3 px-2 py-1 rounded-full text-xs ${doctor.available ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                            {doctor.available ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleBookAppointment(doctor)}
                          disabled={!doctor.available}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${doctor.available ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                        >
                          Book Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredDoctors.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-4 text-gray-400">No doctors found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-700 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Book Appointment</h2>
                <button 
                  onClick={() => setActiveTab('search')}
                  className="flex items-center text-sm text-gray-400 hover:text-white"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to doctors
                </button>
              </div>
              
              {selectedDoctor && (
                <div className="bg-gray-900 bg-opacity-50 rounded-xl p-4 mb-6 border border-gray-700">
                  <div className="flex items-center gap-4">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold">{selectedDoctor.name}</h3>
                      <p className="text-cyan-400 text-sm">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                </div>
              )}

              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-900 bg-opacity-50 p-6 rounded-xl border border-green-700 text-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-2xl font-bold text-green-300">Booking Confirmed!</h3>
                      <p className="text-green-200 mt-2">Your appointment has been scheduled successfully.</p>
                      <p className="text-green-200 text-sm mt-4">A confirmation has been sent to your contact details.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-700 bg-opacity-50 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        className={`w-full bg-gray-700 bg-opacity-50 border ${errors.age ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                        placeholder="Your age"
                      />
                      {errors.age && <p className="mt-2 text-sm text-red-400">{errors.age}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={option.toLowerCase()}
                            checked={formData.gender === option.toLowerCase()}
                            onChange={handleChange}
                            className="hidden peer"
                            id={`gender-${option.toLowerCase()}`}
                          />
                          <label
                            htmlFor={`gender-${option.toLowerCase()}`}
                            className={`w-full text-center py-3 rounded-xl cursor-pointer transition-colors ${
                              formData.gender === option.toLowerCase()
                                ? 'bg-cyan-600 border-cyan-500 text-white'
                                : 'bg-gray-700 bg-opacity-50 border border-gray-600 text-gray-300 hover:border-cyan-500'
                            }`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.gender && <p className="mt-2 text-sm text-red-400">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Information</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 bg-opacity-50 border ${errors.contact ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                      placeholder="Phone or email"
                    />
                    {errors.contact && <p className="mt-2 text-sm text-red-400">{errors.contact}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 bg-opacity-50 border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                      placeholder="Your complete address"
                    />
                    {errors.address && <p className="mt-2 text-sm text-red-400">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={minDate}
                        max={maxDateStr}
                        className={`w-full bg-gray-700 bg-opacity-50 border ${errors.date ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                      />
                      {errors.date && <p className="mt-2 text-sm text-red-400">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        disabled={!formData.date}
                        className={`w-full bg-gray-700 bg-opacity-50 border ${errors.time ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition ${!formData.date ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <option value="">{formData.date ? 'Select a time' : 'Select date first'}</option>
                        {availableTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.time && <p className="mt-2 text-sm text-red-400">{errors.time}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-cyan-500/20'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>© 2027 MedBook Inc. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;