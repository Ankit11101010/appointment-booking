import React, { useState, useRef, useEffect } from 'react';
import { getDoctorProfile, updateDoctorProfile, changeDoctorPassword } from '../api/doctorApi';

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      bio: '',
      profileImage: ''
    },
    professional: {
      specialty: '',
      qualifications: '',
      experience: '',
      license: '',
      hospital: '',
      consultingHours: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    },
    settings: {
      enable2FA: false,
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
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('doctorToken');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        // Redirect to login page
        window.location.href = '/doctor/login';
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  // Calculate profile completion percentage
  const calculateProfileCompletion = (data) => {
    const fields = [
      data.personal.name, data.personal.email, data.personal.phone,
      data.personal.dob, data.personal.gender, data.personal.bio,
      data.professional.specialty, data.professional.qualifications,
      data.professional.experience, data.professional.license,
      data.professional.hospital, data.professional.consultingHours,
      data.address.street, data.address.city, data.address.state,
      data.address.zipcode, data.address.country
    ];
    
    const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setSaveStatus({ type: '', message: '' });
        
        const response = await getDoctorProfile();
        
        if (response.success) {
          const data = response.data;
          const newProfileData = {
            personal: {
              name: data.name || '',
              email: data.email || '',
              phone: data.phone || '',
              dob: data.dob ? data.dob.split('T')[0] : '', // Format date for input
              gender: data.gender || '',
              bio: data.bio || '',
              profileImage: data.profileImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            professional: {
              specialty: data.specialty || '',
              qualifications: data.qualifications || '',
              experience: data.experience || '',
              license: data.license || '',
              hospital: data.hospital || '',
              consultingHours: data.consultingHours || ''
            },
            address: {
              street: data.street || '',
              city: data.city || '',
              state: data.state || '',
              zipcode: data.zipcode || '',
              country: data.country || ''
            },
            settings: {
              enable2FA: data.enable2FA || false,
            }
          };
          
          setProfileData(newProfileData);
          setTempData({...newProfileData});
          setProfileCompletion(calculateProfileCompletion(newProfileData));
          
        } else {
          setSaveStatus({ 
            type: 'error', 
            message: response.message || 'Failed to load profile data' 
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        
        if (error.response?.status === 401) {
          // Authentication failed
          localStorage.removeItem('doctorToken');
          setIsAuthenticated(false);
          window.location.href = '/doctor/login';
          return;
        }
        
        setSaveStatus({ 
          type: 'error', 
          message: error.response?.data?.message || 'Error loading profile data. Please refresh the page.' 
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isAuthenticated]);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    if (isEditing) {
      localStorage.setItem('doctorProfileDraft', JSON.stringify(tempData));
    }
  }, [tempData, isEditing]);

  // Load draft data when starting to edit
  const startEditing = () => {
    const draft = localStorage.getItem('doctorProfileDraft');
    if (draft) {
      try {
        setTempData(JSON.parse(draft));
      } catch (e) {
        console.warn('Error loading draft data:', e);
      }
    }
    setIsEditing(true);
    setSaveStatus({ type: '', message: '' });
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
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(passwordData.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
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
      try {
        setIsLoading(true);
        setSaveStatus({ type: '', message: '' });
        
        const response = await changeDoctorPassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        });
        
        if (response.success) {
          setPasswordSuccess(true);
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          
          // Hide success message after 5 seconds
          setTimeout(() => setPasswordSuccess(false), 5000);
        } else {
          setPasswordErrors({ 
            currentPassword: response.message || 'Failed to change password' 
          });
        }
      } catch (error) {
        console.error('Error changing password:', error);
        
        if (error.response?.status === 401) {
          setPasswordErrors({ 
            currentPassword: 'Current password is incorrect' 
          });
        } else {
          setPasswordErrors({ 
            currentPassword: error.response?.data?.message || 'Error changing password. Please try again.' 
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setSaveStatus({ type: '', message: '' });
      
      // Prepare data for API
      const updateData = {
        name: tempData.personal.name.trim(),
        email: tempData.personal.email.trim(),
        phone: tempData.personal.phone.trim(),
        dob: tempData.personal.dob,
        gender: tempData.personal.gender,
        bio: tempData.personal.bio.trim(),
        profileImage: tempData.personal.profileImage,
        specialty: tempData.professional.specialty.trim(),
        qualifications: tempData.professional.qualifications.trim(),
        experience: tempData.professional.experience.trim(),
        license: tempData.professional.license.trim(),
        hospital: tempData.professional.hospital.trim(),
        consultingHours: tempData.professional.consultingHours.trim(),
        street: tempData.address.street.trim(),
        city: tempData.address.city.trim(),
        state: tempData.address.state.trim(),
        zipcode: tempData.address.zipcode.trim(),
        country: tempData.address.country.trim(),
        enable2FA: tempData.settings.enable2FA
      };

      // Basic validation
      if (!updateData.name || !updateData.email) {
        setSaveStatus({ 
          type: 'error', 
          message: 'Name and email are required fields' 
        });
        setIsLoading(false);
        return;
      }

      const response = await updateDoctorProfile(updateData);
      
      if (response.success) {
        setProfileData({...tempData});
        setIsEditing(false);
        setProfileCompletion(calculateProfileCompletion(tempData));
        
        // Clear draft data
        localStorage.removeItem('doctorProfileDraft');
        
        setSaveStatus({ 
          type: 'success', 
          message: 'Profile updated successfully!' 
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
      } else {
        setSaveStatus({ 
          type: 'error', 
          message: response.message || 'Failed to update profile' 
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('doctorToken');
        setIsAuthenticated(false);
        window.location.href = '/doctor/login';
        return;
      }
      
      setSaveStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error updating profile. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData({...profileData});
    setIsEditing(false);
    setSaveStatus({ type: '', message: '' });
    
    // Clear draft data
    localStorage.removeItem('doctorProfileDraft');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveStatus({ 
          type: 'error', 
          message: 'Please select a valid image file' 
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveStatus({ 
          type: 'error', 
          message: 'Image size must be less than 5MB' 
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange('personal', 'profileImage', event.target.result);
        setSaveStatus({ type: '', message: '' });
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
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
              }}
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
        <h2 className="text-2xl font-bold mt-4 text-center">{tempData.personal.name || 'Dr. Name'}</h2>
        <p className="text-blue-400 text-center">{tempData.professional.specialty || 'Specialty'}</p>
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Specialty</label>
          <input
            type="text"
            value={tempData.professional.specialty}
            onChange={(e) => handleInputChange('professional', 'specialty', e.target.value)}
            disabled={!isEditing}
            className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition-all"
            placeholder="e.g., Cardiology"
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
            placeholder="e.g., MBBS, MD"
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
            placeholder="e.g., 10 years"
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
            placeholder="Enter license number"
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
            placeholder="Enter hospital/clinic name"
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
          placeholder="Enter street address"
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
            placeholder="Enter city"
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
            placeholder="Enter state"
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
            placeholder="Enter ZIP code"
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
            placeholder="Enter country"
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
            <p className="mt-1 text-xs text-gray-400">
              Password must be at least 8 characters with uppercase, lowercase, number, and special character
            </p>
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
              disabled={isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-300">Logout from all devices</h4>
            <p className="text-sm text-gray-400 mb-3">This will log you out from all devices and invalidate all active sessions</p>
            <button 
              type="button"
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 hover:border-red-600/50 rounded-lg text-red-400 text-sm transition-all"
              onClick={() => {
                if (window.confirm('Are you sure you want to logout from all devices?')) {
                  localStorage.removeItem('doctorToken');
                  window.location.href = '/doctor/login';
                }
              }}
            >
              Logout All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Show authentication error if not logged in
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-4 md:p-6 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please login to access your profile</p>
          <button 
            onClick={() => window.location.href = '/doctor/login'}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading spinner
  if (isLoading && !isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-4 md:p-6 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading your profile...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we fetch your latest information</p>
        </div>
      </div>
    );
  }

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
          
          {saveStatus.message && (
            <div className={`w-full md:w-auto p-3 rounded-lg flex items-center gap-2 ${
              saveStatus.type === 'success' 
                ? 'bg-green-900/30 border border-green-800 text-green-400' 
                : 'bg-red-900/30 border border-red-800 text-red-400'
            }`}>
              <span className="text-lg">
                {saveStatus.type === 'success' ? '✅' : '❌'}
              </span>
              {saveStatus.message}
            </div>
          )}
          
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button 
                onClick={handleCancel}
                disabled={isLoading}
                className="px-4 md:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={startEditing}
              className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
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

        {/* Last updated info */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Profile data is automatically synced with the server</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;