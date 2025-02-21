import React, { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      type: 'info',
      duration: 3000,
      ...notification,
    };

    setNotifications((current) => [...current, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  };

  const showSuccess = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 5000,
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options,
    });
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Notification Container */}
      <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto
              ring-1 ring-black ring-opacity-5 overflow-hidden transform
              transition-all duration-300 ease-in-out
              ${
                notification.type === 'success' && 'border-l-4 border-green-500'
              }
              ${notification.type === 'error' && 'border-l-4 border-red-500'}
              ${
                notification.type === 'warning' && 'border-l-4 border-yellow-500'
              }
              ${notification.type === 'info' && 'border-l-4 border-blue-500'}
            `}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-1">
                  {notification.title && (
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;