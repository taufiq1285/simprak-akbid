import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const mockNotifications = [
        {
          id: 1,
          type: 'praktikum',
          title: 'New Assignment',
          message: 'A new assignment has been posted in Database Praktikum',
          timestamp: new Date().toISOString(),
          read: false,
          data: {
            praktikumId: 123,
            assignmentId: 456
          }
        }
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      setError(error.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Replace with actual API call
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, read: true }
            : notif
        )
      );
      updateUnreadCount();
    } catch (error) {
      throw new Error(error.message || 'Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Replace with actual API call
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      throw new Error(error.message || 'Failed to mark all notifications as read');
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      // Replace with actual API call
      setNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
      updateUnreadCount();
    } catch (error) {
      throw new Error(error.message || 'Failed to delete notification');
    }
  };

  // Update unread count
  const updateUnreadCount = () => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  };

  // Add new notification (for real-time updates)
  const addNotification = (notification) => {
    setNotifications(prev => [
      {
        ...notification,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
    updateUnreadCount();
  };

  // Subscribe to real-time notifications
  useEffect(() => {
    // Replace with actual WebSocket or SSE implementation
    const eventSource = {
      connect: () => {
        console.log('Connected to notification service');
      },
      disconnect: () => {
        console.log('Disconnected from notification service');
      }
    };

    eventSource.connect();

    return () => {
      eventSource.disconnect();
    };
  }, [user.id]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    refreshNotifications: fetchNotifications
  };
};

export default useNotifications;