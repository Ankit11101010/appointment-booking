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
      if (largeScreen) {
        setExpanded(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
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
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/'; // Redirect to landing page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Mobile header with logo and hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/30">
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
          <div className="hidden lg:flex items-center justify-between px-4 mb-8">
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

          <nav className="flex-1 flex flex-col space-y-2 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
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
                
                {!(expanded || isLargeScreen || sidebarOpen) && (
                  <span className="absolute left-16 bg-gray-900 text-white text-sm font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 border border-gray-700">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-700/30 mx-4 space-y-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all duration-300 group w-full"
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              
              {(expanded || isLargeScreen || sidebarOpen) && (
                <span className="text-red-400 group-hover:text-red-300 font-medium">Logout</span>
              )}
              
              {!(expanded || isLargeScreen || sidebarOpen) && (
                <span className="absolute left-16 bg-gray-900 text-red-400 text-sm font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 border border-gray-700">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isLargeScreen ? 'lg:ml-64' : expanded ? 'lg:ml-64' : 'lg:ml-20'
      } p-0 pt-20 lg:pt-0 lg:p-0`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;