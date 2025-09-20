import React, { useState, useEffect } from "react";
import { FaStethoscope, FaSearch, FaUserMd, FaBars, FaClinicMedical } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('nav')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          navbarScrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-2"
            : "bg-transparent py-4"
        } ${searchOpen ? "bg-gray-900/98" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Better positioning and spacing */}
            <div className="flex items-center flex-shrink-0">
              <div className="text-teal-400 font-bold text-xl lg:text-2xl flex items-center">
                <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-2 rounded-lg mr-3 shadow-lg">
                  <FaStethoscope className="text-lg" />
                </div>
                <span className="block">
                  DocBook<span className="text-blue-400">+</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - Better spacing and alignment */}
            <div
              className={`hidden lg:flex items-center space-x-8 ${
                searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              } transition-opacity duration-200`}
            >
              <a 
                href="/" 
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium text-sm xl:text-base relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium text-sm xl:text-base relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a 
                href="#doctors" 
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium text-sm xl:text-base relative group"
              >
                Doctors
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a 
                href="#benefits" 
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium text-sm xl:text-base relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a 
                href="#faq" 
                className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium text-sm xl:text-base relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-200"></span>
              </a>
            </div>

            {/* Right Side Actions - Better alignment and spacing */}
            <div className="flex items-center space-x-3">
              
              {/* Desktop Search - Improved positioning */}
              {!searchOpen && (
                <div className="hidden lg:flex items-center bg-gray-700/80 hover:bg-gray-600/80 rounded-full px-4 py-2.5 w-56 xl:w-64 transition-all duration-200">
                  <FaSearch className="text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search doctors, cities, clinics..."
                    className="bg-transparent border-none focus:outline-none w-full text-sm text-gray-200 placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}

              {/* Mobile Search Button */}
              {!searchOpen && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="lg:hidden p-2.5 rounded-full hover:bg-gray-700/50 transition-all duration-200"
                >
                  <FaSearch className="text-gray-300 text-lg" />
                </button>
              )}

              {/* Action Buttons - Better responsive design */}
              {!searchOpen && (
                <div className="hidden md:flex items-center space-x-3">
                 
                   <button
      onClick={() => navigate("/doctor-auth")}
      className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 
                  hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full 
                  font-medium shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    menuOpen ? 'animate-slideInRight' : ''
                  }`}
      style={{ animationDelay: '0.6s' }}
    >
      <FaUserMd className="mr-2" />
      Doctor Portal
    </button>
                </div>
              )}

              {/* Mobile Hamburger - Better positioning */}
              {!searchOpen && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2.5 rounded-full hover:bg-gray-700/50 transition-all duration-200 relative z-10"
                >
                  <div className="relative w-6 h-6">
                    <FaBars 
                      className={`absolute inset-0 text-gray-300 text-xl transition-all duration-200 ${
                        menuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
                      }`} 
                    />
                    <IoMdClose 
                      className={`absolute inset-0 text-gray-300 text-xl transition-all duration-200 ${
                        menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
                      }`} 
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Search Overlay - Better positioning */}
        {searchOpen && (
          <div className="absolute inset-0 bg-gray-900/98 backdrop-blur-md flex items-center px-4 sm:px-6 lg:px-8 z-40">
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center bg-gray-700/80 rounded-full px-6 py-4 shadow-2xl">
                <FaSearch className="text-gray-400 mr-4 text-lg flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties, clinics..."
                  className="bg-transparent border-none focus:outline-none w-full text-lg text-gray-200 placeholder-gray-400"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-600/50 transition-all duration-200 ml-2"
                >
                  <IoMdClose className="text-gray-400 text-xl" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay - Better positioning and animations */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-6 mb-8">
              {['Home', 'How It Works', 'Doctors', 'About', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase().replace(' ', '-')}`}
                  className={`text-gray-300 hover:text-teal-400 transition-all duration-200 font-medium text-lg transform hover:translate-x-2 ${
                    menuOpen ? 'animate-slideInRight' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
                    <button
      onClick={() => navigate("/doctor-auth")}
      className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 
                  hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full 
                  font-medium shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    menuOpen ? 'animate-slideInRight' : ''
                  }`}
      style={{ animationDelay: '0.6s' }}
    >
      <FaUserMd className="mr-2" />
      Doctor Portal
    </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-slideInRight {
            animation: slideInRight 0.4s ease-out forwards;
          }
        `
      }} />
    </>
  );
}