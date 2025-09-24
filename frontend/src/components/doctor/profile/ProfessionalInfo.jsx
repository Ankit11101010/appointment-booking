import React from 'react';

const ProfessionalInfo = ({
  tempData,
  isEditing,
  handleInputChange
}) => {
  return (
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
};

export default ProfessionalInfo;