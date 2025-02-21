import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'theme_preferences';

export const ThemeProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    sidebarCollapsed: false,
    darkMode: false,
    fontSize: 'normal', // small, normal, large
    compactMode: false,
    highContrast: false
  });

  // Load saved preferences
  useEffect(() => {
    const savedPreferences = storage.get(STORAGE_KEY);
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }

    // Apply dark mode if set
    if (savedPreferences?.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    storage.set(STORAGE_KEY, preferences);
    
    // Apply dark mode
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSidebar = () => {
    updatePreference('sidebarCollapsed', !preferences.sidebarCollapsed);
  };

  const toggleDarkMode = () => {
    updatePreference('darkMode', !preferences.darkMode);
  };

  const setFontSize = (size) => {
    updatePreference('fontSize', size);
  };

  const toggleCompactMode = () => {
    updatePreference('compactMode', !preferences.compactMode);
  };

  const toggleHighContrast = () => {
    updatePreference('highContrast', !preferences.highContrast);
  };

  const resetPreferences = () => {
    setPreferences({
      sidebarCollapsed: false,
      darkMode: false,
      fontSize: 'normal',
      compactMode: false,
      highContrast: false
    });
  };

  const value = {
    ...preferences,
    toggleSidebar,
    toggleDarkMode,
    setFontSize,
    toggleCompactMode,
    toggleHighContrast,
    resetPreferences
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`
        ${preferences.fontSize === 'small' ? 'text-sm' : ''}
        ${preferences.fontSize === 'large' ? 'text-lg' : ''}
        ${preferences.compactMode ? 'max-w-5xl mx-auto' : ''}
        ${preferences.highContrast ? 'high-contrast' : ''}
      `}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;