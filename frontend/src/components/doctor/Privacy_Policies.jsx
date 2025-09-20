import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Users, Database, Share2, Lock, UserCheck, CreditCard, AlertTriangle, Scale, Bell, Download, FileText, Mail, Clock, CheckCircle } from 'lucide-react';

const Privacy = () => {
  const [expandedSection, setExpandedSection] = useState('introduction');
  const [accepted, setAccepted] = useState(false);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleAccept = () => {
    setAccepted(true);
    // Scroll to top after acceptance
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white border-b border-blue-700 pb-2">Welcome to MedBookPro</h3>
              <p className="text-gray-300 leading-relaxed">
                Welcome to MedBookPro, a comprehensive doctor's appointment booking platform. This Privacy Policy outlines how we collect, use, protect, and manage your personal and professional information as a healthcare provider on our platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By creating an account and using our services, you consent to the collection and use of information in accordance with this policy. This document is specifically designed to address the unique needs and concerns of medical professionals joining our network.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-700/30 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <div className="bg-blue-700/20 p-2 rounded-lg mr-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-semibold">Doctor's Consent</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Your registration and continued use of our platform constitutes your explicit consent to these terms and our data handling practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-700/20 p-2 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-purple-300 font-semibold">Policy Effectiveness</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    This policy is effective immediately upon account creation and remains in effect throughout your use of our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/40 rounded-xl p-5 mt-4 border border-gray-700/50">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-green-400" />
              Policy Overview
            </h4>
            <p className="text-gray-300 text-sm">
              This comprehensive policy covers all aspects of data handling, privacy, security, and professional responsibilities. We encourage you to review each section carefully to understand your rights and obligations as a healthcare provider on our platform.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data-collection',
      title: '2. Data Collection',
      icon: Database,
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            We collect various types of information to provide you with optimal platform services and ensure patient trust:
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-green-400" />
                Professional Information
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Full name and professional title</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Medical qualifications and specializations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>License numbers and verification documents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Years of experience and expertise areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Professional photographs and biography</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-400" />
                Contact & Location Data
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Clinic/hospital address and contact details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Phone numbers and email addresses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Emergency contact information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Operational hours and availability schedules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Geographic service areas and coverage</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                Financial Information
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Bank account details for settlements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Tax identification numbers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Consultation fee structures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Payment preferences and methods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Billing and invoice information</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-400" />
                Platform Usage Data
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Login times and session duration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Appointment history and patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Patient interaction records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Platform feature usage analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Device and browser information</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mt-4">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Data Collection Principles
            </h4>
            <p className="text-gray-300 text-sm">
              We adhere to the principle of data minimization, collecting only information that is necessary for providing our services, maintaining platform integrity, and fulfilling legal obligations. All data collection is performed with transparency and your explicit consent.
            </p>
          </div>
        </div>
      )
    },
    // Additional sections would follow the same enhanced pattern
    // ... (other sections would be enhanced similarly)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/70 to-purple-900/70 border-b border-blue-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Doctor Privacy Policy</h1>
                <p className="text-blue-300">MedBookPro Healthcare Platform</p>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-400">Last Updated</p>
                  <p className="text-white">August 22, 2025</p>
                </div>
                <div className="h-6 w-px bg-gray-700/50"></div>
                <div className="text-center">
                  <p className="text-gray-400">Version</p>
                  <p className="text-white">2.1</p>
                </div>
                <div className="h-6 w-px bg-gray-700/50"></div>
                <div className="text-center">
                  <p className="text-gray-400">Status</p>
                  <p className={`font-medium ${accepted ? 'text-green-400' : 'text-amber-400'}`}>
                    {accepted ? 'Accepted' : 'Pending Review'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introductory Text */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Protecting Your Professional Information</h2>
          <p className="text-lg text-gray-300 mb-6">
            At MedBookPro, we understand the importance of confidentiality and security for healthcare providers. 
            This Privacy Policy outlines our commitment to protecting your professional data while enabling you to 
            deliver exceptional care through our platform.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50">
              <div className="bg-blue-700/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Secure Data Handling</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade encryption and security protocols protect all your information.</p>
            </div>
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50">
              <div className="bg-purple-700/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Regulatory Compliance</h3>
              <p className="text-gray-400 text-sm">Full compliance with HIPAA, GDPR, and other healthcare regulations.</p>
            </div>
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50">
              <div className="bg-green-700/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Transparent Controls</h3>
              <p className="text-gray-400 text-sm">You maintain control over what information is shared and with whom.</p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isExpanded = expandedSection === section.id;
            
            return (
              <div key={section.id} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-gray-600/50">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-700/20 p-2 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3 hidden md:block">
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-8 pb-8 border-t border-gray-700/50">
                    <div className="pt-6">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Acceptance Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-700/30">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Review Complete</h3>
            <p className="text-gray-300 mb-6">
              By accepting this Privacy Policy, you acknowledge that you have read, understood, and agree to be bound by all its terms and conditions.
            </p>
            
            {!accepted ? (
              <div>
                <button 
                  onClick={handleAccept}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center space-x-2 mx-auto"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept Privacy Policy</span>
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  You must accept our Privacy Policy to continue using MedBookPro services.
                </p>
              </div>
            ) : (
              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-green-400 mb-3">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Policy Accepted</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Thank you for reviewing and accepting our Privacy Policy. You may now continue to use all features of the MedBookPro platform.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-700/20 p-2 rounded-lg mr-3">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Legal Department</p>
                    <p className="text-blue-400">legal@medbookpro.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-700/20 p-2 rounded-lg mr-3">
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Privacy Officer</p>
                    <p className="text-purple-400">privacy@medbookpro.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-700/20 p-2 rounded-lg mr-3">
                    <Users className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Support Team</p>
                    <p className="text-green-400">support@medbookpro.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Subscribe to Updates</span>
                </button>
                <button className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>View Terms of Service</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-700/50 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 MedBookPro. All rights reserved. By using our platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;