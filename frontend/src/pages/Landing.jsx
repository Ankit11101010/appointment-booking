import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUserCheck,
  FaLock,
  FaUserMd, 
  FaClock, 
  FaShieldAlt, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaStethoscope,  
  FaHeartbeat,
  FaCalendarCheck, 
  FaRobot,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPlus,
  FaMobileAlt,
  FaDownload,
  FaMinus,
  FaArrowRight,
  FaRegCalendarCheck,
  FaClinicMedical,
  FaAmbulance,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
  FaLaptopMedical,
  FaUserFriends,
  FaAward,
  FaChartLine,
  FaGlobe,
  FaCog,
  FaBell,
  FaShieldVirus,
  FaHandHoldingHeart,
  FaSyringe,
  FaXRay,
  FaTeeth,
  FaBrain,
  FaAllergies,
  FaHeart,
  FaLungs,
  FaBaby
} from 'react-icons/fa';
import { GiBrain, GiHealthPotion } from 'react-icons/gi';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0, cities: 0 });
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const doctorsData = [
    {
      name: 'Dr. Priyanka Mohanty',
      specialty: 'General Physician',
      category: 'General',
      experience: '12 years',
      rating: 4.9,
      image: '/doctor1.jpg',
      clinic: 'City Care Clinic',
      available: 'Today',
      badge: 'AI Recommended',
      badgeColor: 'from-purple-600 to-blue-600'
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'Pediatrician',
      category: 'Pediatric',
      experience: '8 years',
      rating: 4.8,
      image: '/doctor2.jpg',
      clinic: 'Little Stars',
      available: 'Tomorrow',
      badge: 'Top Rated',
      badgeColor: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Dr. Sanjay Das',
      specialty: 'Cardiologist',
      category: 'Cardio',
      experience: '15 years',
      rating: 4.7,
      image: '/doctor3.jpg',
      clinic: 'Bargarh Heart',
      available: 'Today',
      badge: 'Verified',
      badgeColor: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Dr. Ananya Roy',
      specialty: 'Neurologist',
      category: 'Neuro',
      experience: '10 years',
      rating: 4.8,
      image: '/doctor4.jpg',
      clinic: 'NeuroCare',
      available: 'Mon-Tue',
      badge: 'New',
      badgeColor: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Dr. Rahul Sharma',
      specialty: 'Dental Surgeon',
      category: 'Dental',
      experience: '9 years',
      rating: 4.6,
      image: '/doctor5.jpg',
      clinic: 'Smile Clinic',
      available: 'Tomorrow',
      badge: 'Popular',
      badgeColor: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Dr. Neha Gupta',
      specialty: 'General Physician',
      category: 'General',
      experience: '7 years',
      rating: 4.7,
      image: '/doctor6.jpg',
      clinic: 'MediCare Center',
      available: 'Today',
      badge: 'Early Availability',
      badgeColor: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'Cardiologist',
      category: 'Cardio',
      experience: '14 years',
      rating: 4.9,
      image: '/doctor7.jpg',
      clinic: 'Heart Wellness',
      available: 'Wed-Thu',
      badge: 'Senior Specialist',
      badgeColor: 'from-red-500 to-orange-500'
    },
    {
      name: 'Dr. Sneha Desai',
      specialty: 'Pediatrician',
      category: 'Pediatric',
      experience: '6 years',
      rating: 4.8,
      image: '/doctor8.jpg',
      clinic: 'Kids First',
      available: 'Today',
      badge: 'Child Specialist',
      badgeColor: 'from-green-500 to-emerald-500'
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "How do I prepare for my appointment?",
      answer: "Please bring your ID proof, any previous medical records, and a list of current medications. Arrive 10-15 minutes early for registration."
    },
    {
      question: "What information do I need to book an appointment?",
      answer: "You'll need basic contact information, your reason for visit, and insurance details if applicable."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel or reschedule up to 12 hours before your appointment without any charges. Late cancellations may incur a small fee."
    },
    {
      question: "Do you accept insurance?",
      answer: "We work with most major insurance providers. You can check your specific provider in the insurance section during booking."
    },
    {
      question: "What in case of emergency?",
      answer: "For medical emergencies, please go directly to the nearest emergency room or call 108. This platform is for non-emergency appointments."
    }
  ];

  // Health tips data
  const healthTips = [
    {
      title: "Managing Seasonal Allergies",
      excerpt: "Learn how to reduce symptoms during pollen season",
      category: "Seasonal Health"
    },
    {
      title: "5 Signs You Should See a Cardiologist",
      excerpt: "Early detection can save lives - know the warning signs",
      category: "Preventive Care"
    },
    {
      title: "Digital Eye Strain: Prevention Tips",
      excerpt: "Protect your eyes in the digital age",
      category: "Wellness"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Patient",
      content: "DocBook+ saved me hours of waiting time. The AI recommendation matched me with the perfect specialist for my condition.",
      avatar: "/avatar1.jpg",
      rating: 5
    },
    {
      name: "Priya Singh",
      role: "Working Professional",
      content: "As a busy professional, I can't afford to wait in clinics. This platform lets me book appointments during my commute.",
      avatar: "/avatar2.jpg",
      rating: 5
    },
    {
      name: "Dr. Amit Sharma",
      role: "Cardiologist",
      content: "The platform has streamlined my practice significantly. I can focus more on patients rather than administrative tasks.",
      avatar: "/avatar3.jpg",
      rating: 5
    }
  ];

  // Services data
  const services = [
    { icon: <FaRegCalendarCheck />, title: "Online Appointment", description: "Book doctor appointments 24/7 without waiting" },
    { icon: <FaClinicMedical />, title: "Clinic Visit", description: "Visit your preferred clinic with confirmed timing" },
    { icon: <FaLaptopMedical />, title: "Video Consultation", description: "Consult doctors remotely from your home" },
    { icon: <FaAmbulance />, title: "Emergency Care", description: "Quick access to emergency medical services" },
    { icon: <FaPrescriptionBottleAlt />, title: "E-Prescriptions", description: "Digital prescriptions sent directly to your phone" },
    { icon: <FaNotesMedical />, title: "Health Records", description: "Access your medical history anytime, anywhere" }
  ];

  // Specialties data with icons
  const specialties = [
    { name: 'All', icon: <FaUserMd /> },
    { name: 'General', icon: <FaStethoscope /> },
    { name: 'Cardio', icon: <FaHeart /> },
    { name: 'Neuro', icon: <FaBrain /> },
    { name: 'Dental', icon: <FaTeeth /> },
    { name: 'Pediatric', icon: <FaBaby /> },
    { name: 'Ortho', icon: <FaXRay /> },
    { name: 'Dermatology', icon: <FaAllergies /> },
    { name: 'Pulmonology', icon: <FaLungs /> }
  ];

  // Toggle FAQ expansion
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Filter doctors based on active filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredDoctors(doctorsData);
    } else {
      setFilteredDoctors(doctorsData.filter(doctor => doctor.category === activeFilter));
    }
  }, [activeFilter]);

  // Handle filter buttons scroll
  const handleScroll = (direction) => {
    const container = document.getElementById('filter-container');
    const scrollAmount = 200;
    const newPosition = direction === 'right' 
      ? scrollPosition + scrollAmount 
      : scrollPosition - scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  // Check scroll position for arrow visibility
  useEffect(() => {
    const checkScroll = () => {
      const container = document.getElementById('filter-container');
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
      }
    };

    const container = document.getElementById('filter-container');
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  // Testimonial navigation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isStatsVisible) {
      const duration = 2000; // ms
      const steps = 60;
      const stepDuration = duration / steps;

      const counters = {
        patients: { target: 10000, current: 0 },
        doctors: { target: 500, current: 0 },
        appointments: { target: 25000, current: 0 },
        cities: { target: 50, current: 0 }
      };

      const interval = setInterval(() => {
        let allCompleted = true;

        Object.keys(counters).forEach(key => {
          if (counters[key].current < counters[key].target) {
            const step = Math.ceil(counters[key].target / steps);
            counters[key].current = Math.min(counters[key].current + step, counters[key].target);
            allCompleted = false;
          }
        });

        setStats({
          patients: counters.patients.current,
          doctors: counters.doctors.current,
          appointments: counters.appointments.current,
          cities: counters.cities.current
        });

        if (allCompleted) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isStatsVisible]);

  return (
    <div className="font-sans bg-black text-gray-100">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-black to-gray-900 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center py-24 md:py-32">
          {/* Left Content */}
          <div className="space-y-8 text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-900 text-teal-200 text-sm font-medium mb-4 mx-auto md:mx-0">
              <FaHeartbeat className="mr-2" /> Healthcare Revolution 2025
            </div>
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                Smart Healthcare
              </span><br />
              For Your City
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto md:mx-0">
              Choose the Right Doctor & Book Instantly — Designed for Residents Across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/booking")}
                className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-teal-800/50"
              >
                <FaCalendarAlt className="mr-3" />
                Book Appointment
              </button>
              
              <button className="border-2 border-teal-400 text-teal-400 hover:bg-gray-800 px-8 py-4 rounded-xl font-medium text-lg transition-all">
               <a href="#how-it-works"> How It Works →</a>
              </button>
              
            </div>
            <div className="flex flex-wrap gap-6 pt-6 justify-center md:justify-start">
              {['Smart Doctor Match', 'Instant Booking', 'Video Consult', 'E-Prescriptions'].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${i % 2 === 0 ? 'bg-teal-500' : 'bg-blue-500'}`}></div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="hidden md:block relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-900/30 blur-3xl"></div>
            <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-blue-900/30 blur-3xl"></div>
            <div className="relative z-10">
              <img 
                src="src/assets/booking.png" 
                alt="App interface showing doctor booking"
                className="w-full h-auto rounded-2xl "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gradient-to-tr from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaUserFriends className="text-3xl text-teal-400" />, value: stats.patients, label: "Happy Patients", suffix: "+" },
              { icon: <FaUserMd className="text-3xl text-blue-400" />, value: stats.doctors, label: "Expert Doctors", suffix: "+" },
              { icon: <FaRegCalendarCheck className="text-3xl text-purple-400" />, value: stats.appointments, label: "Appointments", suffix: "+" },
              { icon: <FaGlobe className="text-3xl text-amber-400" />, value: stats.cities, label: "Cities", suffix: "+" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-teal-400/30 transition-all duration-500">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Our Healthcare Services
            </h2>
            <p className="text-gray-400">
              Comprehensive medical services designed to meet all your healthcare needs with convenience and quality care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-teal-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-teal-400 text-3xl mb-6 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <button className="text-teal-400 flex items-center font-medium group-hover:text-teal-300 transition-colors duration-300">
                  Learn more
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>
          </div>

          {/* Steps with animated connectors */}
          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full z-0"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {[
                { 
                  icon: <FaSearch className="w-10 h-10" />,
                  aiIcon: <GiBrain className="w-6 h-6 text-teal-400" />, 
                  title: "1. Smart Doctor Search", 
                  desc: "Easily discover the right healthcare professional using our intelligent search system.", 
                  features: [
                    "Find doctors available near your location",
                    "Quickly connect with your preferred doctor",
                    "Explore clinics and hospitals around you"
                  ],
                  color: "teal"
                },
                { 
                  icon: <FaCalendarCheck className="w-10 h-10" />,
                  aiIcon: <FaRobot className="w-6 h-6 text-blue-400" />,
                  title: "2. Instant Booking",
                  desc: "Book your appointment effortlessly with real-time availability and a seamless booking flow.",
                  features: [
                    "Enter your basic details in seconds",
                    "Instantly view available slots",
                    "Validate your details and secure your booking"
                  ],
                  color: "blue"
                },
                { 
                  icon: <FaUserMd className="w-10 h-10" />,
                  aiIcon: <FaShieldAlt className="w-6 h-6 text-purple-400" />,
                  title: "3. Confirmed Visit",
                  desc: "Enjoy a secure digital confirmation with your doctor before your actual appointment.",
                  features: [
                    "Pay a minimal booking fee",
                    "Receive an instant digital receipt",
                    "Visit the clinic and meet your doctor without hassle"
                  ],
                  color: "purple"
                }
              ].map((step, index) => {
                // Fix dynamic colors with explicit Tailwind mapping
                const bulletColors = {
                  teal: "bg-teal-500",
                  blue: "bg-blue-500",
                  purple: "bg-purple-500"
                };
                
                return (
                  <div 
                    key={index} 
                    className="group p-8 rounded-3xl transition-all hover:shadow-2xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 backdrop-blur-sm"
                  >
                    <div className="relative w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 mb-6 group-hover:scale-105 transition-transform shadow-lg border border-gray-700">
                      {step.icon}
                      <div className="absolute -top-2 -right-2 bg-black p-2 rounded-full border border-gray-700">
                        {step.aiIcon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-center text-white">{step.title}</h3>
                    <p className="text-center mb-6 text-gray-400">{step.desc}</p>
                    <ul className="space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-3 ${bulletColors[step.color]}`}></span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

     {/* Featured Doctors - Enhanced UI */}
<section id="doctors" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black-900 to-black relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
  </div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Header - Centered at the top */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Meet Our Healthcare Partners
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">Our team of specialized professionals is dedicated to providing you with the best healthcare experience.</p>
    </div>

    {/* Filters - Enhanced with scrollable container */}
    <div className="flex justify-center mb-12">
      <div className="w-full max-w-4xl relative">
        <div className="relative flex items-center">
          {/* Left scroll button (visible on mobile) */}
          {showLeftArrow && (
            <button 
              onClick={() => handleScroll('left')}
              className="absolute left-0 z-10 bg-gray-800 rounded-full p-2 shadow-lg hidden sm:block"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-teal-400" />
            </button>
          )}
          
          {/* Filters container */}
          <div 
            id="filter-container"
            className="flex overflow-x-auto scrollbar-hide space-x-2 py-2 px-1 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 max-w-full mx-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialties.map((spec, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(spec.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 flex items-center ${
                  activeFilter === spec.name
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700/30 hover:bg-gray-700/70 text-gray-300 hover:text-white'
                }`}
              >
                <span className="mr-2">{spec.icon}</span>
                {spec.name}
              </button>
            ))}
          </div>
          
          {/* Right scroll button (visible on mobile) */}
          {showRightArrow && (
            <button 
              onClick={() => handleScroll('right')}
              className="absolute right-0 z-10 bg-gray-800 rounded-full p-2 shadow-lg hidden sm:block"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-teal-400" />
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Doctors Grid - Enhanced with animations */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredDoctors.map((doctor, index) => (
        <div
          key={index}
          className="group rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl bg-gray-800 hover:bg-gray-700/60 border border-gray-700 hover:border-teal-400/50 flex flex-col transform hover:-translate-y-2"
        >
          {/* Image - Enhanced */}
          <div className="relative h-48 sm:h-52 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/20 z-10"></div>
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 animate-pulse"></div>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0"
            />
            <div className={`absolute top-3 right-3 bg-gradient-to-r ${doctor.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
              {doctor.badge}
            </div>
          </div>

          {/* Info - Enhanced */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">{doctor.name}</h3>
                <p className="text-teal-400 font-medium">{doctor.specialty}</p>
              </div>
              <div className="flex items-center bg-gray-700/80 px-2.5 py-1 rounded-full text-sm font-semibold backdrop-blur-sm group-hover:bg-teal-900/30 transition-colors duration-300">
                <FaStar className="text-yellow-400 mr-1" /> {doctor.rating}
                <span className="text-gray-400 ml-1 text-xs">({Math.floor(Math.random() * 100) + 50})</span>
              </div>
            </div>

            <div className="text-sm text-gray-300 mb-4 space-y-2">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-400 flex-shrink-0" /> 
                <span className="truncate">{doctor.clinic}</span>
              </p>
              <p className="flex items-center">
                <FaClock className="mr-2 text-teal-400 flex-shrink-0" /> 
                <span>Available {doctor.available}</span>
              </p>
              <p className="flex items-center">
                <FaUserMd className="mr-2 text-teal-400 flex-shrink-0" /> 
                <span>{doctor.experience} experience</span>
              </p>
            </div>

            <button className="mt-auto w-full py-3 rounded-lg font-bold transition-all duration-300 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white flex items-center justify-center group-hover:shadow-lg transform group-hover:-translate-y-1">
              <FaCalendarAlt className="mr-2" /> Book Consultation
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* No results message */}
    {filteredDoctors.length === 0 && (
      <div className="text-center py-12">
        <div className="text-teal-400 text-5xl mb-4">😔</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No doctors found</h3>
        <p className="text-gray-500">Try selecting a different specialty</p>
      </div>
    )}

    {/* View All Button - Enhanced */}
    <div className="text-center mt-14">
      <button className="relative overflow-hidden group border-2 border-teal-400/30 text-teal-400 hover:text-white hover:border-teal-400 px-8 py-3.5 rounded-xl font-medium transition-all duration-500">
        <span className="relative z-10 flex items-center justify-center">
          View All 47 Doctors
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      </button>
    </div>
  </div>
</section>
     
      {/* FAQ Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-center mb-12">Find answers to common questions about our services</p>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-teal-400/30">
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {activeFAQ === index ? (
                    <FaMinus className="text-teal-400" />
                  ) : (
                    <FaPlus className="text-teal-400" />
                  )}
                </button>
                
                {activeFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Health & Wellness Tips
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Expert advice to help you maintain your health and prevent illness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthTips.map((tip, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 transition-all hover:border-teal-400/50 hover:translate-y-2">
                <div className="h-48 bg-gradient-to-br from-teal-900/20 to-blue-900/20"></div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-teal-900/30 text-teal-400 rounded-full text-xs font-medium mb-4">
                    {tip.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
                  <p className="text-gray-400 mb-4">{tip.excerpt}</p>
                  <button className="text-teal-400 font-medium flex items-center hover:text-teal-300">
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 px-8 py-3 rounded-xl font-medium transition-all">
              View All Health Articles
            </button>
          </div>
        </div>
      </section>

     

      {/* Benefits Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-30 pointer-events-none z-0"></div>

          {/* Benefits Section */}
          <div className="text-center mb-20 relative z-10">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 pb-2 leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Why Choose Us?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
              Experience seamless healthcare access designed to save your time, ensure trust, and provide round-the-clock support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {[
              { 
                icon: <FaClock className="w-10 h-10" />, 
                title: "No Waiting in Queues", 
                desc: "Book in seconds and skip long hospital lines.", 
                color: "from-cyan-400 to-blue-500",
                hoverColor: "hover:from-cyan-500 hover:to-blue-600"
              },
              { 
                icon: <FaUserCheck className="w-10 h-10" />, 
                title: "Verified Doctors", 
                desc: "All practitioners are verified and certified.", 
                color: "from-green-400 to-emerald-500",
                hoverColor: "hover:from-green-500 hover:to-emerald-600"
              },
              { 
                icon: <FaLock className="w-10 h-10" />, 
                title: "Secure Payment", 
                desc: "Your transactions are encrypted for maximum safety.", 
                color: "from-yellow-400 to-orange-500",
                hoverColor: "hover:from-yellow-500 hover:to-orange-600"
              },
              { 
                icon: <FaCalendarCheck className="w-10 h-10" />, 
                title: "24/7 Booking", 
                desc: "Access doctors and services round-the-clock.", 
                color: "from-purple-400 to-pink-500",
                hoverColor: "hover:from-purple-500 hover:to-pink-600"
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="relative p-10 rounded-3xl bg-gray-800/60 backdrop-blur-xl border border-white/10 
                text-center shadow-lg group transition-all overflow-hidden hover:shadow-2xl hover:border-cyan-400/30
                hover:scale-105 duration-500"
              >
                {/* Soft glowing background per card */}
                <div className={`absolute inset-0 rounded-3xl opacity-20 blur-2xl bg-gradient-to-br ${benefit.color} group-hover:opacity-40 transition-opacity duration-500`}></div>

                <div className={`relative w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center 
                bg-gradient-to-br ${benefit.color} ${benefit.hoverColor} text-white shadow-lg 
                group-hover:scale-110 transition-transform duration-500`}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{benefit.title}</h4>
                <p className="text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-28 px-6 bg-gradient-to-b from-black via-gray-900 to-teal-900 relative text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/70"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Smarter Healthcare?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands in Bargarh who are experiencing healthcare designed for 2025
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/booking")}
            className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
              <FaCalendarAlt className="mr-3" />
              Book an Appointment
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center">
              Download App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-br from-black via-gray-900 to-black relative text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
          
          {/* Quick Links - Left */}
          <div className="md:justify-self-start">
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['Services', 'Cities', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media - Center */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-lg mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-[#1DA1F2] transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-[#1877F2] transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-[#E4405F] transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-[#0A66C2] transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white shadow-md hover:bg-[#FF0000] transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Location - Right */}
          <div className="md:justify-self-end text-sm">
            <h4 className="font-semibold text-lg mb-4 text-white">Location</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2 text-teal-400" />
                <span>Bargarh, Odisha, India</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhoneAlt className="mr-2 text-teal-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-teal-400" />
                <span>care@docbookplus.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 DocBook+. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-400">Privacy</a>
            <a href="#" className="hover:text-teal-400">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}