import React, { useState, useRef } from 'react';

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    personal: {
      name: 'Dr. Sarah Johnson',
      email: 's.johnson@medicalcenter.com',
      phone: '+1 (555) 123-4567',
      dob: '1985-06-15',
      gender: 'Female',
      bio: 'Cardiologist with over 10 years of experience specializing in interventional procedures and minimally invasive surgeries.',
      profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    professional: {
      specialty: 'Cardiology',
      qualifications: 'MD, PhD in Cardiology, Board Certified',
      experience: '12 years',
      license: 'MED123456789',
      hospital: 'City Medical Center',
      consultingHours: '9:00 AM - 5:00 PM (Mon-Fri)'
    },
    address: {
      street: '123 Medical Plaza, Suite 405',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94103',
      country: 'United States'
    },
    settings: {
      enable2FA: true,
    }
  });

  const [tempData, setTempData] = useState({...profileData});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleInputChange = (section, field, value) => {
    setTempData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      // Simulate API call
      setTimeout(() => {
        setPasswordSuccess(true);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Hide success message after 3 seconds
        setTimeout(() => setPasswordSuccess(false), 3000);
      }, 500);
    }
  };

  const handleSave = () => {
    setProfileData({...tempData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({...profileData});
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange('personal', 'profileImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg">
            <img 
              src={tempData.personal.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={triggerImageUpload}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <h2 className="text-2xl font-bold mt-4 text-center">{tempData.personal.name}</h2>
        <p className="text-blue-400 text-center">{tempData.professional.specialty}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={tempData.personal.name}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={tempData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={tempData.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
          <input
            type="date"
            value={tempData.personal.dob}
            onChange={(e) => handleInputChange('personal', 'dob', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
          <select
            value={tempData.personal.gender}
            onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
        <textarea
          value={tempData.personal.bio}
          onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
        />
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Specialty</label>
          <input
            type="text"
            value={tempData.professional.specialty}
            onChange={(e) => handleInputChange('professional', 'specialty', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Qualifications</label>
          <input
            type="text"
            value={tempData.professional.qualifications}
            onChange={(e) => handleInputChange('professional', 'qualifications', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
          <input
            type="text"
            value={tempData.professional.experience}
            onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">License Number</label>
          <input
            type="text"
            value={tempData.professional.license}
            onChange={(e) => handleInputChange('professional', 'license', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Hospital/Clinic</label>
          <input
            type="text"
            value={tempData.professional.hospital}
            onChange={(e) => handleInputChange('professional', 'hospital', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Consulting Hours</label>
          <input
            type="text"
            value={tempData.professional.consultingHours}
            onChange={(e) => handleInputChange('professional', 'consultingHours', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Street Address</label>
        <input
          type="text"
          value={tempData.address.street}
          onChange={(e) => handleInputChange('address', 'street', e.target.value)}
          disabled={!isEditing}
          className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
          <input
            type="text"
            value={tempData.address.city}
            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
          <input
            type="text"
            value={tempData.address.state}
            onChange={(e) => handleInputChange('address', 'state', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
          <input
            type="text"
            value={tempData.address.zipcode}
            onChange={(e) => handleInputChange('address', 'zipcode', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
          <input
            type="text"
            value={tempData.address.country}
            onChange={(e) => handleInputChange('address', 'country', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={tempData.settings.enable2FA}
                onChange={(e) => handleInputChange('settings', 'enable2FA', e.target.checked)}
                className="sr-only peer" 
                disabled={!isEditing}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Change Password</h3>
        
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg text-green-400">
            Password changed successfully!
          </div>
        )}
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your current password"
            />
            {passwordErrors.currentPassword && (
              <p className="mt-1 text-sm text-red-400">{passwordErrors.currentPassword}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your new password"
            />
            {passwordErrors.newPassword && (
              <p className="mt-1 text-sm text-red-400">{passwordErrors.newPassword}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Confirm your new password"
            />
            {passwordErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{passwordErrors.confirmPassword}</p>
            )}
          </div>
          
          <div className="pt-2">
            <button 
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-4 md:p-6 w-full">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Doctor Profile
          </h1>
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button 
                onClick={handleSave}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                className="px-4 md:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all w-full md:w-auto"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-gray-800/20 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/30 w-full">
          <div className="border-b border-gray-700/30 overflow-x-auto">
            <nav className="flex min-w-max px-4 md:px-6">
              {[
                {id: 'personal', label: 'Personal Info', icon: '👤'},
                {id: 'professional', label: 'Professional Info', icon: '💼'},
                {id: 'address', label: 'Address', icon: '📍'},
                {id: 'settings', label: 'Settings', icon: '⚙️'}
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-3 font-medium text-sm border-b-2 transition-all flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'professional' && renderProfessionalInfo()}
            {activeTab === 'address' && renderAddressInfo()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>

        <div className="mt-6 md:mt-8 bg-gray-800/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-700/30 shadow-xl">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Profile Completion</h2>
          <div className="w-full bg-gray-700/40 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">92% complete - Almost there!</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;