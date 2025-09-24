import React from 'react';

const AddressInfo = ({
  tempData,
  isEditing,
  handleInputChange
}) => {
  return (
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
};

export default AddressInfo;