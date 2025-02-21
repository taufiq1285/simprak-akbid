import React from 'react';
import { Sun, Moon, Type, Layout, Monitor } from 'lucide-react';
import Card from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const AppearanceSettings = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    fontSize, 
    setFontSize,
    compactMode,
    toggleCompactMode,
    highContrast,
    toggleHighContrast
  } = useTheme();

  const themeOptions = [
    {
      id: 'light',
      title: 'Light',
      description: 'Default light theme',
      icon: Sun,
      active: !darkMode
    },
    {
      id: 'dark',
      title: 'Dark',
      description: 'Easier on the eyes in low light',
      icon: Moon,
      active: darkMode
    }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themeOptions.map((theme) => (
            <div
              key={theme.id}
              className={`
                relative rounded-lg border p-4 cursor-pointer
                ${theme.active 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => toggleDarkMode()}
            >
              <div className="flex items-center">
                <theme.icon 
                  className={`
                    h-5 w-5 mr-3
                    ${theme.active ? 'text-blue-500' : 'text-gray-400'}
                  `} 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {theme.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {theme.description}
                  </p>
                </div>
              </div>
              {theme.active && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Active
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Font Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Type className="h-5 w-5 mr-2 text-gray-400" />
            Typography
          </div>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <div className="flex space-x-4">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium
                    ${fontSize === size.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setFontSize(size.value)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Layout Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Layout className="h-5 w-5 mr-2 text-gray-400" />
            Layout
          </div>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Compact Mode</p>
              <p className="text-xs text-gray-500">
                Reduce spacing between elements
              </p>
            </div>
            <button
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
                border-2 border-transparent transition-colors duration-200 ease-in-out 
                focus:outline-none
                ${compactMode ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              onClick={toggleCompactMode}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full 
                  bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${compactMode ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">High Contrast</p>
              <p className="text-xs text-gray-500">
                Increase contrast for better readability
              </p>
            </div>
            <button
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
                border-2 border-transparent transition-colors duration-200 ease-in-out 
                focus:outline-none
                ${highContrast ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              onClick={toggleHighContrast}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full 
                  bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${highContrast ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Display Settings */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-gray-400" />
            Display
          </div>
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Your current display resolution is: <span className="font-medium">1920 x 1080</span>
          </p>
          <p className="text-sm text-gray-500">
            System theme: <span className="font-medium">Light</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AppearanceSettings;