import React, { useState, useRef } from 'react';

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  
  const defaultProfileImage = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  const [profileData, setProfileData] = useState({
    personal: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@medicalcenter.com',
      phone: '+1 (555) 123-4567',
      dob: '1985-03-15',
      gender: 'Female',
      bio: 'Cardiologist with 12 years of experience specializing in interventional cardiology and heart disease prevention.',
      profileImage: defaultProfileImage
    },
    professional: {
      specialty: 'Cardiology',
      qualifications: 'MD, FACC, Board Certified',
      experience: '12',
      license: 'MED123456789',
      hospital: 'City Medical Center',
      consultingHours: '9:00 AM - 5:00 PM, Mon-Fri'
    },
    address: {
      street: '123 Medical Plaza',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileCompletion, setProfileCompletion] = useState(85);
  const [uploadProgress, setUploadProgress] = useState(0);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const startEditing = () => {
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

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
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      // Simulate API call
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 5000);
    }
  };

  const handleSave = () => {
    setProfileData({...tempData});
    setIsEditing(false);
    showMessage('success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempData({...profileData});
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select a valid image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size must be less than 5MB');
      return;
    }

    await uploadImageToServer(file);
  };

  const uploadImageToServer = async (file) => {
    try {
      setIsUploadingImage(true);
      setUploadProgress(0);
      setMessage({ type: '', text: '' });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Simulate successful upload
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('personal', 'profileImage', e.target.result);
        setProfileData(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            profileImage: e.target.result
          }
        }));
        showMessage('success', 'Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
      
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      showMessage('error', 'Error uploading image. Please try again.');
    } finally {
      setIsUploadingImage(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleRemoveImage = () => {
    if (!window.confirm('Are you sure you want to remove your profile picture?')) {
      return;
    }

    handleInputChange('personal', 'profileImage', defaultProfileImage);
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        profileImage: defaultProfileImage
      }
    }));
    showMessage('success', 'Profile picture removed successfully!');
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg relative">
            {tempData.personal.profileImage && tempData.personal.profileImage.trim() !== '' ? (
              <img 
                src={tempData.personal.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultProfileImage;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-4xl text-white">👨‍⚕️</span>
              </div>
            )}
            
            {isUploadingImage && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <span className="text-white text-xs">Uploading... {uploadProgress}%</span>
                </div>
              </div>
            )}
          </div>
          
          {isEditing && (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={triggerImageUpload}
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
                    title="Upload new photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  
                  {tempData.personal.profileImage && 
                   !tempData.personal.profileImage.includes('unsplash.com') && (
                    <button 
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                      title="Remove photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Click to upload • Max 5MB
              </div>
            </>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
        />
        
        <h2 className="text-2xl font-bold mt-4 text-center">{tempData.personal.name || 'Dr. Name'}</h2>
        <p className="text-blue-400 text-center">{tempData.professional.specialty || 'Specialty'}</p>
        
        {isUploadingImage && (
          <div className="mt-2 w-48">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">
              {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            value={tempData.personal.name}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <input
            type="email"
            value={tempData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="Enter your email address"
            required
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
            placeholder="Enter phone number"
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
            <option value="">Select Gender</option>
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
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Specialty *</label>
          <input
            type="text"
            value={tempData.professional.specialty}
            onChange={(e) => handleInputChange('professional', 'specialty', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="e.g., Cardiology, Neurology"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Medical License *</label>
          <input
            type="text"
            value={tempData.professional.license}
            onChange={(e) => handleInputChange('professional', 'license', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="License number"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Qualifications</label>
          <input
            type="text"
            value={tempData.professional.qualifications}
            onChange={(e) => handleInputChange('professional', 'qualifications', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="e.g., MD, MBBS, PhD"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
          <input
            type="number"
            value={tempData.professional.experience}
            onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="Number of years"
            min="0"
            max="50"
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
            placeholder="Hospital or clinic name"
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
            placeholder="e.g., 9:00 AM - 5:00 PM"
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
          placeholder="Street address"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
          <input
            type="text"
            value={tempData.address.city}
            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="City"
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
            placeholder="State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
          <input
            type="text"
            value={tempData.address.zipcode}
            onChange={(e) => handleInputChange('address', 'zipcode', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="ZIP code"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
        <input
          type="text"
          value={tempData.address.country}
          onChange={(e) => handleInputChange('address', 'country', e.target.value)}
          disabled={!isEditing}
          className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
          placeholder="Country"
        />
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-gray-800/40 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Security Settings</h3>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
          <div>
            <h4 className="font-medium text-gray-200">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempData.settings.enable2FA}
              onChange={(e) => handleInputChange('settings', 'enable2FA', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-200 mb-4">Change Password</h4>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
            >
              Update Password
            </button>
            
            {passwordSuccess && (
              <div className="bg-green-900/30 border border-green-800 text-green-400 p-3 rounded-lg">
                Password updated successfully! ✅
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-4 md:p-6 w-full">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Doctor Profile
            </h1>
            <p className="text-gray-400 mt-1">Manage your professional profile and settings</p>
          </div>
          
          {message.text && (
            <div className={`w-full md:w-auto p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-900/30 border border-green-800 text-green-400' 
                : message.type === 'error'
                ? 'bg-red-900/30 border border-red-800 text-red-400'
                : 'bg-blue-900/30 border border-blue-800 text-blue-400'
            }`}>
              <span className="text-lg">
                {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
              </span>
              {message.text}
            </div>
          )}
          
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button 
                onClick={handleSave}
                disabled={isUploadingImage}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto disabled:opacity-50"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                disabled={isUploadingImage}
                className="px-4 md:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all w-full md:w-auto disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button 
                onClick={startEditing}
                disabled={isUploadingImage}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
              <button 
                onClick={() => window.location.reload()}
                disabled={isUploadingImage}
                className="px-4 md:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
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
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Profile Completion</h2>
            <span className="text-sm text-gray-400">{profileCompletion}% complete</span>
          </div>
          <div className="w-full bg-gray-700/40 rounded-full h-2.5 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500" 
              style={{width: `${profileCompletion}%`}}
            ></div>
          </div>
          <p className="text-sm text-gray-400">
            {profileCompletion === 100 
              ? '🎉 Congratulations! Your profile is complete!' 
              : profileCompletion >= 80 
                ? '🚀 Almost there! Just a few more details to go.' 
                : '📝 Complete your profile to help patients find you easily.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;