import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Mock data - replace with API call
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'info',
        title: 'Praktikum Schedule Updated',
        message: 'Your praktikum schedule for Database has been updated.',
        timestamp: '2025-02-20T10:00:00',
        read: false
      },
      {
        id: 2,
        type: 'success',
        title: 'Assignment Submitted',
        message: 'Your assignment has been successfully submitted.',
        timestamp: '2025-02-19T15:30:00',
        read: true
      },
      {
        id: 3,
        type: 'warning',
        title: 'Deadline Approaching',
        message: 'Assignment deadline is in 2 days.',
        timestamp: '2025-02-18T09:00:00',
        read: false
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
    updateUnreadCount();
  };

  const updateUnreadCount = () => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        className="relative p-2 text-gray-400 hover:text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <Card>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                <select
                  className="text-sm border-gray-300 rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
                {unreadCount > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="py-6 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 hover:bg-gray-50 transition-colors
                        ${!notification.read ? 'bg-blue-50' : ''}
                      `}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              className="text-blue-600 hover:text-blue-800 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-4">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => {/* Navigate to all notifications */}}
              >
                View All Notifications
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;