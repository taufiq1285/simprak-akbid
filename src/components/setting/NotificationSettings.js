import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import Card from '../common/Card';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      announcements: true,
      praktikumUpdates: true,
      gradeReleases: true,
      deadlineReminders: true
    },
    push: {
      announcements: true,
      praktikumUpdates: true,
      gradeReleases: true,
      deadlineReminders: true,
      messages: true
    },
    schedule: {
      beforeDeadline: '24',  // hours
      beforePraktikum: '1',  // hour
      quietHoursStart: '22', // 24-hour format
      quietHoursEnd: '07'    // 24-hour format
    }
  });

  const toggleSetting = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handleScheduleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-gray-400" />
            Email Notifications
          </div>
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </p>
                <p className="text-xs text-gray-500">
                  Receive email notifications for {key.toLowerCase()}
                </p>
              </div>
              <button
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
                  border-2 border-transparent transition-colors duration-200 ease-in-out 
                  focus:outline-none
                  ${value ? 'bg-blue-600' : 'bg-gray-200'}
                `}
                onClick={() => toggleSetting('email', key)}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full 
                    bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${value ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Push Notifications */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-gray-400" />
            Push Notifications
          </div>
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </p>
                <p className="text-xs text-gray-500">
                  Receive push notifications for {key.toLowerCase()}
                </p>
              </div>
              <button
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
                  border-2 border-transparent transition-colors duration-200 ease-in-out 
                  focus:outline-none
                  ${value ? 'bg-blue-600' : 'bg-gray-200'}
                `}
                onClick={() => toggleSetting('push', key)}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full 
                    bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${value ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Schedule Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            Notification Schedule
          </div>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline Reminders
            </label>
            <select
              value={settings.schedule.beforeDeadline}
              onChange={(e) => handleScheduleChange('beforeDeadline', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="6">6 hours before</option>
              <option value="12">12 hours before</option>
              <option value="24">24 hours before</option>
              <option value="48">48 hours before</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Praktikum Reminders
            </label>
            <select
              value={settings.schedule.beforePraktikum}
              onChange={(e) => handleScheduleChange('beforePraktikum', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="0.5">30 minutes before</option>
              <option value="1">1 hour before</option>
              <option value="2">2 hours before</option>
              <option value="3">3 hours before</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Quiet Hours
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Start Time
                </label>
                <select
                  value={settings.schedule.quietHoursStart}
                  onChange={(e) => handleScheduleChange('quietHoursStart', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  End Time
                </label>
                <select
                  value={settings.schedule.quietHoursEnd}
                  onChange={(e) => handleScheduleChange('quietHoursEnd', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              During quiet hours, you will only receive critical notifications
            </p>
          </div>
        </div>
      </Card>

      {/* Priority Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-gray-400" />
            Priority Notifications
          </div>
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Priority notifications will always be delivered, even during quiet hours
          </p>
          <ul className="mt-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Deadline warnings
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Security alerts
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Important announcements
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default NotificationSettings;