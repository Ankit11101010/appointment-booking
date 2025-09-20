import React, { useState, useEffect, useRef } from 'react';
import { User, Users, Shield, Settings, Home, Bell, Search, Menu, X, Activity, Heart, Calendar, TrendingUp, ChevronRight, CreditCard, LogOut } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa';
import Profile from '../components/doctor/Profile';
import Slots from '../components/doctor/Slots';
import Patient from '../components/doctor/Patient';
import Payment from '../components/doctor/Payment';
import AboutUs from '../components/doctor/About';
import Privacy from '../components/doctor/Privacy_Policies';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const largeScreen = window.innerWidth >= 1280;
      setIsLargeScreen(largeScreen);
      // Auto-expand sidebar on large screens
      if (largeScreen) {
        setExpanded(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User, color: 'from-purple-500 to-pink-500' },
    { id: 'slots', label: 'Slots', icon: Calendar, color: 'from-emerald-500 to-teal-500' },
    { id: 'patient', label: 'Patient', icon: Users, color: 'from-amber-500 to-orange-500' },
    { id: 'payment', label: 'Payment', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, color: 'from-indigo-500 to-blue-500' },
    { id: 'about', label: 'About Us', icon: Heart, color: 'from-rose-500 to-pink-500' },
  ];

  const renderContent = () => {
    
    if (activeSection === 'profile') {
      return <Profile />;
    }
    if (activeSection === 'slots') {
      return <Slots />;
    }
    if (activeSection === 'patient'){
      return <Patient />;
    }
    if (activeSection === 'payment'){
      return <Payment />;
    }
    if (activeSection === 'about'){
      return <AboutUs />;
    }
    if (activeSection === 'privacy'){
      return <Privacy />;
    }
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center capitalize mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {activeSection}
        </h1>
        <p className="text-gray-300 text-center max-w-md text-base md:text-lg px-4 md:px-0">
          This is the {activeSection} section content. Add your specific content here.
        </p>
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-none md:w-64 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg md:rounded-xl mb-3 md:mb-4">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-1 md:mb-2">Quick Stats</h3>
            <p className="text-gray-400 text-xs md:text-sm">View your important metrics and analytics</p>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-xs md:max-w-none md:w-64 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg md:rounded-xl mb-3 md:mb-4">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-base md:text-lg mb-1 md:mb-2">Recent Activity</h3>
            <p className="text-gray-400 text-xs md:text-sm">Check your latest actions and updates</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Mobile header with logo and hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/30">
        {/* Logo on the left */}
        <div className="flex items-center">
          <div className="text-teal-400 font-bold text-xl flex items-center">
            <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-2 rounded-lg mr-3 shadow-lg">
              <FaStethoscope className="text-lg" />
            </div>
            <span>
              DocBook<span className="text-blue-400">+</span>
            </span>
          </div>
        </div>
        
        {/* Hamburger menu on the right */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-3 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700/30 text-white hover:bg-gray-700/60 transition-all duration-300 shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Floating Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/30 transform transition-all duration-300 ease-in-out z-40 overflow-hidden
          ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
          ${expanded || isLargeScreen ? 'lg:translate-x-0 lg:w-64' : 'lg:w-20'}`}
        onMouseEnter={() => !isLargeScreen && setExpanded(true)}
        onMouseLeave={() => !isLargeScreen && setExpanded(false)}
      >
        
        <div className="flex flex-col h-full py-6">
          {/* Logo and close button - Only visible on large screens */}
          <div className="hidden lg:flex items-center justify-between px-4 mb-8">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <div className="text-teal-400 font-bold text-xl lg:text-2xl flex items-center">
                <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-2 rounded-lg mr-3 shadow-lg">
                  <FaStethoscope className="text-lg" />
                </div>
                {(expanded || isLargeScreen) && (
                  <span className="block">
                    DocBook<span className="text-blue-400">+</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Close button for mobile - positioned at top right of sidebar */}
          <div className="lg:hidden flex justify-between items-center px-4 mb-6">
            <div className="text-teal-400 font-bold text-xl flex items-center">
              <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-2 rounded-lg mr-3 shadow-lg">
                <FaStethoscope className="text-lg" />
              </div>
              <span>
                DocBook<span className="text-blue-400">+</span>
              </span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col space-y-2 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} shadow-lg`
                    : 'bg-gray-800/40 hover:bg-gray-700/60'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} />
                
                {(expanded || isLargeScreen || sidebarOpen) && (
                  <span className={`font-medium ${
                    activeSection === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {!(expanded || isLargeScreen || sidebarOpen) && (
                  <span className="absolute left-16 bg-gray-900 text-white text-sm font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 border border-gray-700">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Settings and Logout buttons */}
          <div className="pt-4 border-t border-gray-700/30 mx-4 space-y-2">
           
            
            <button
              className="flex items-center space-x-3 p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all duration-300 group w-full"
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              
              {(expanded || isLargeScreen || sidebarOpen) && (
                <span className="text-red-400 group-hover:text-red-300 font-medium">Logout</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {!(expanded || isLargeScreen || sidebarOpen) && (
                <span className="absolute left-16 bg-gray-900 text-red-400 text-sm font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 border border-gray-700">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Close sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isLargeScreen ? 'lg:ml-64' : expanded ? 'lg:ml-64' : 'lg:ml-20'
      } p-4 pt-20 lg:pt-6 lg:p-6`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;