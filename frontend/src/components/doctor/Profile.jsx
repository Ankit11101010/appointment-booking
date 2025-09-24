import React, { useState, useRef } from 'react';
import PersonalInfo from './profile/PersonalInfo';
import ProfessionalInfo from './profile/ProfessionalInfo';
import AddressInfo from './profile/AddressInfo';
import Settings from './profile/Settings';

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  
  const defaultProfileImage = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  const [profileData, setProfileData] = useState({
    personal: {
      name: 'Dr. John Smith',
      email: 'john.smith@hospital.com',
      phone: '+1 (555) 123-4567',
      dob: '1985-06-15',
      gender: 'Male',
      bio: 'Experienced cardiologist with over 10 years of practice in treating cardiovascular diseases.',
      profileImage: defaultProfileImage
    },
    professional: {
      specialty: 'Cardiology',
      qualifications: 'MD, FACC',
      experience: '10',
      license: 'MD123456',
      hospital: 'City General Hospital',
      consultingHours: '9:00 AM - 5:00 PM'
    },
    address: {
      street: '123 Medical Center Dr',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      country: 'United States'
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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileCompletion, setProfileCompletion] = useState(85);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Message handler
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Editing functions
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

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      // Simulate password change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
      setPasswordSuccess(true);
      showMessage('success', 'Password changed successfully!');
      setTimeout(() => setPasswordSuccess(false), 5000);
    }
  };

  const handleSave = () => {
    // Validation
    if (!tempData.personal.name || !tempData.personal.email) {
      showMessage('error', 'Name and email are required fields');
      return;
    }

    // Simulate save
    setProfileData({...tempData});
    setIsEditing(false);
    showMessage('success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempData({...profileData});
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select a valid image file (JPEG, PNG, GIF, etc.)');
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size must be less than 5MB');
      return;
    }

    // Simulate upload
    setIsUploadingImage(true);
    setUploadProgress(0);
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploadingImage(false);
          
          // Create URL for the uploaded file
          const imageUrl = URL.createObjectURL(file);
          handleInputChange('personal', 'profileImage', imageUrl);
          setProfileData(prev => ({
            ...prev,
            personal: {
              ...prev.personal,
              profileImage: imageUrl
            }
          }));
          
          showMessage('success', 'Profile picture updated successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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

  const commonProps = {
    tempData,
    isEditing,
    handleInputChange,
    showMessage
  };

  const settingsProps = {
    ...commonProps,
    passwordData,
    passwordErrors,
    passwordSuccess,
    handlePasswordChange,
    handlePasswordSubmit
  };

  const personalInfoProps = {
    ...commonProps,
    defaultProfileImage,
    isUploadingImage,
    uploadProgress,
    fileInputRef,
    handleImageUpload,
    handleRemoveImage,
    triggerImageUpload
  };

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
                className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                disabled={isUploadingImage}
                className="px-4 md:px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          ) : (
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
            {activeTab === 'personal' && <PersonalInfo {...personalInfoProps} />}
            {activeTab === 'professional' && <ProfessionalInfo {...commonProps} />}
            {activeTab === 'address' && <AddressInfo {...commonProps} />}
            {activeTab === 'settings' && <Settings {...settingsProps} />}
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
              ? 'Congratulations! Your profile is complete!' 
              : profileCompletion >= 80 
                ? 'Almost there! Just a few more details to go.' 
                : 'Complete your profile to help patients find you easily.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;