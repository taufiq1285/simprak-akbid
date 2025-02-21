import React, { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Lock,
  Shield,
  Eye
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  useAuth();
  const { 
    darkMode, 
    toggleDarkMode, 
    fontSize, 
    setFontSize 
  } = useTheme();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    praktikumReminders: true,
    assignmentDeadlines: true,
    gradeUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showLastSeen: true,
    showProfile: 'all' // all, contacts, none
  });

  const handleNotificationChange = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Appearance Settings */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {darkMode ? (
                <Moon className="h-5 w-5 text-gray-400 mr-2" />
              ) : (
                <Sun className="h-5 w-5 text-gray-400 mr-2" />
              )}
              <span>Dark Mode</span>
            </div>
            <button
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none
                ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              onClick={toggleDarkMode}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
                  ring-0 transition duration-200 ease-in-out
                  ${darkMode ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Notifications
        </h2>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-400 mr-2" />
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
              </div>
              <button
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                  transition-colors duration-200 ease-in-out focus:outline-none
                  ${value ? 'bg-blue-600' : 'bg-gray-200'}
                `}
                onClick={() => handleNotificationChange(key)}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
                    ring-0 transition duration-200 ease-in-out
                    ${value ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Privacy
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Visibility
            </label>
            <select
              value={privacySettings.showProfile}
              onChange={(e) => handlePrivacyChange('showProfile', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">Everyone</option>
              <option value="contacts">Contacts Only</option>
              <option value="none">Nobody</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-gray-400 mr-2" />
              <span>Show Online Status</span>
            </div>
            <button
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none
                ${privacySettings.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              onClick={() => handlePrivacyChange('showOnlineStatus', !privacySettings.showOnlineStatus)}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
                  ring-0 transition duration-200 ease-in-out
                  ${privacySettings.showOnlineStatus ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Security
        </h2>
        <div className="space-y-4">
          <Button
            variant="secondary"
            onClick={() => {/* Handle password change */}}
          >
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>

          <Button
            variant="secondary"
            onClick={() => {/* Handle 2FA setup */}}
          >
            <Shield className="h-4 w-4 mr-2" />
            Setup Two-Factor Authentication
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;