import React from 'react';

const PersonalInfo = ({
  tempData,
  isEditing,
  handleInputChange,
  defaultProfileImage,
  isUploadingImage,
  uploadProgress,
  fileInputRef,
  handleImageUpload,
  handleRemoveImage,
  triggerImageUpload
}) => {
  return (
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
        <p className="text-blue-400 text-center">{tempData.professional?.specialty || 'Specialty'}</p>
        
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
};

export default PersonalInfo;