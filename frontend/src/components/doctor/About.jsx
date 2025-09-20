import React from 'react';

const AboutUs = () => {
  // Sample team data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CEO",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Experienced healthcare technology entrepreneur with a passion for improving patient access."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Tech innovator with 10+ years experience building scalable healthcare platforms."
    },
    {
      name: "Priya Sharma",
      role: "Head of Medical Partnerships",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Former healthcare administrator with extensive network in medical communities."
    }
  ];

  return (
    <div className="min-h-screenbg-gradient-to-br from-black to-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="bg-black bg-opacity-70 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-5xl font-bold text-blue-400">About Us</h1>
         
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-12 px-4 bg-black bg-opacity-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-blue-400 mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                MedConnect was born out of a simple observation: accessing quality healthcare shouldn't be complicated. 
                Founded in 2020, our platform emerged to simplify healthcare access in cities and towns where finding the 
                right doctor at the right time was often challenging.
              </p>
              <p className="text-gray-300">
                We recognized the gap between patients seeking care and trusted medical professionals, and made it our 
                mission to bridge this divide through technology, compassion, and innovation.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img 
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Team collaboration" 
                className="rounded-lg shadow-md opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 bg-gray-800 bg-opacity-70 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To empower patients with convenient access to verified medical guidance, saving time, avoiding long queues, 
            and ensuring reliable care from the comfort of home.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 px-4 bg-black bg-opacity-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover opacity-90"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-400">{member.name}</h3>
                  <p className="text-blue-300 font-medium">{member.role}</p>
                  <p className="text-gray-400 mt-4">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-400">
            Our dedicated team works tirelessly to improve healthcare access for everyone.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-800 bg-opacity-70 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-10 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-sm text-center border border-gray-700">
              <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Verified Professionals</h3>
              <p className="text-gray-400">All our healthcare providers are thoroughly vetted with verified credentials.</p>
            </div>
            
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-sm text-center border border-gray-700">
              <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Easy Appointment Booking</h3>
              <p className="text-gray-400">Book appointments in just a few clicks, with real-time availability.</p>
            </div>
            
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-sm text-center border border-gray-700">
              <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Secure & Confidential</h3>
              <p className="text-gray-400">Your health data is protected with enterprise-grade security.</p>
            </div>
            
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-sm text-center border border-gray-700">
              <div className="bg-blue-900 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">24/7 Support</h3>
              <p className="text-gray-400">Our customer care team is available round the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-12 px-4 bg-black bg-opacity-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Our Vision</h2>
            <p className="text-gray-300 text-lg mb-6">
              We envision a future where quality healthcare is accessible to everyone, regardless of location or background. 
              Through innovative technology, we aim to create stronger patient-provider connections and extend our services to 
              underserved communities.
            </p>
            <p className="text-gray-300 text-lg">
              Our goal is to leverage technology to make healthcare more predictive, preventive, and personalized.
            </p>
          </div>
        </div>
      </section>

      {/* Patient-Centric Approach Section */}
      <section className="py-12 bg-blue-900 bg-opacity-70 text-gray-100 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Patient-Centric Approach</h2>
          <p className="text-xl max-w-3xl mx-auto">
            At MedConnect, every patient is treated with compassion, confidentiality, and the highest standard of care. 
            We believe that healthcare should be a partnership between patients and providers, built on trust and understanding.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 px-4 bg-gray-800 bg-opacity-70">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-10 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Get in Touch</h3>
              <p className="text-gray-400 mb-6">
                Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-900 bg-opacity-50 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300">Phone</h4>
                    <p className="text-gray-400">+1 (800) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 bg-opacity-50 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300">Email</h4>
                    <p className="text-gray-400">support@medconnect.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 bg-opacity-50 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300">Address</h4>
                    <p className="text-gray-400">123 Healthcare Avenue, Medical District, City 10001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-400 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" 
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" 
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;