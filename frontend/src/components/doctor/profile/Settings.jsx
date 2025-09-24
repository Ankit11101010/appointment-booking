import React, { useState } from 'react';

const Settings = ({
  tempData = {},
  isEditing = false,
  handleInputChange = () => {},
  passwordData = {},
  passwordErrors = {},
  passwordSuccess = false,
  handlePasswordChange = () => {},
  handlePasswordSubmit = () => {},
  notificationSettings = {},
  handleNotificationChange = () => {},
  privacySettings = {},
  handlePrivacyChange = () => {},
  sessionData = [],
  handleSessionRevoke = () => {}
}) => {
  // Default values for missing props
  const safeTempData = {
    settings: {
      enable2FA: false,
      loginAlerts: false,
      ...tempData.settings
    },
    ...tempData
  };

  const safePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    ...passwordData
  };

  const safePasswordErrors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    ...passwordErrors
  };

  const safeNotificationSettings = {
    email: true,
    push: true,
    sms: false,
    ...notificationSettings
  };

  const safePrivacySettings = {
    profileVisibility: 'public',
    dataSharing: false,
    personalizedAds: false,
    ...privacySettings
  };

  const safeSessionData = Array.isArray(sessionData) ? sessionData : [];

  // Local state for dangerous actions
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Default handlers if not provided
  const handleDefaultPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password change submitted:', safePasswordData);
  };

  const handleDefaultSessionRevoke = (sessionId) => {
    console.log('Revoking session:', sessionId);
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Actual deletion logic would go here
    console.log('Account deletion confirmed');
    setShowDeleteConfirm(false);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Data export completed');
      // In a real app, this would trigger a download
      alert('Data export completed! Check your downloads.');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Security Settings */}
      <div className="bg-gray-800/40 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Security Settings</h3>
        
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
          <div>
            <h4 className="font-medium text-gray-200">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={safeTempData.settings.enable2FA}
              onChange={(e) => handleInputChange('settings', 'enable2FA', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Login Alerts */}
        <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
          <div>
            <h4 className="font-medium text-gray-200">Login Alerts</h4>
            <p className="text-sm text-gray-400">Get notified of new sign-ins</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={safeTempData.settings.loginAlerts}
              onChange={(e) => handleInputChange('settings', 'loginAlerts', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Change Password */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-200 mb-4">Change Password</h4>
          <form onSubmit={handlePasswordSubmit || handleDefaultPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <input
                type="password"
                value={safePasswordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
              />
              {safePasswordErrors.currentPassword && (
                <p className="text-red-400 text-sm mt-1">{safePasswordErrors.currentPassword}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={safePasswordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
                {safePasswordErrors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{safePasswordErrors.newPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={safePasswordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
                {safePasswordErrors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{safePasswordErrors.confirmPassword}</p>
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
                Password updated successfully!
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800/40 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">Email Notifications</h4>
              <p className="text-sm text-gray-400">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={safeNotificationSettings.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">Push Notifications</h4>
              <p className="text-sm text-gray-400">Receive browser notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={safeNotificationSettings.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">SMS Notifications</h4>
              <p className="text-sm text-gray-400">Receive text message alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={safeNotificationSettings.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-gray-800/40 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Privacy Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">Profile Visibility</h4>
              <p className="text-sm text-gray-400">Who can see your profile</p>
            </div>
            <select
              value={safePrivacySettings.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">Data Sharing</h4>
              <p className="text-sm text-gray-400">Allow anonymous data collection</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={safePrivacySettings.dataSharing}
                onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-200">Personalized Ads</h4>
              <p className="text-sm text-gray-400">Show personalized advertisements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={safePrivacySettings.personalizedAds}
                onChange={(e) => handlePrivacyChange('personalizedAds', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

     

      {/* Danger Zone */}
      <div className="bg-gray-800/40 rounded-xl p-6 border border-red-500/20">
        <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-red-200">Delete Account</h4>
              <p className="text-sm text-red-400/70">
                {showDeleteConfirm 
                  ? 'Are you sure? This action cannot be undone!' 
                  : 'Permanently delete your account and all data'
                }
              </p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                showDeleteConfirm
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30'
              }`}
            >
              {showDeleteConfirm ? 'Confirm Delete' : 'Delete Account'}
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-red-200">Export Data</h4>
              <p className="text-sm text-red-400/70">Download all your personal data</p>
            </div>
            <button 
              onClick={handleExportData}
              disabled={isExporting}
              className="px-4 py-2 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-xl hover:bg-gray-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;