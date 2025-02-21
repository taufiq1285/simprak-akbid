import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const useMessaging = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const mockConversations = [
        {
          id: 1,
          participants: [
            { id: user.id, name: user.name },
            { id: 2, name: 'Dr. Smith', role: 'dosen' }
          ],
          lastMessage: {
            content: 'Please check your assignment feedback',
            timestamp: new Date().toISOString(),
            senderId: 2
          },
          unreadCount: 2
        }
      ];
      setConversations(mockConversations);
    } catch (error) {
      setError(error.message || 'Failed to fetch conversations');
    } finally {
      setLoading(false);
    }
  }, [user.id, user.name]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Send message
  const sendMessage = async (conversationId, content, attachments = []) => {
    try {
      // Replace with actual API call
      const newMessage = {
        id: Date.now(),
        conversationId,
        content,
        attachments,
        senderId: user.id,
        timestamp: new Date().toISOString()
      };

      // Update conversations with new message
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                lastMessage: {
                  content,
                  timestamp: newMessage.timestamp,
                  senderId: user.id
                }
              }
            : conv
        )
      );

      return newMessage;
    } catch (error) {
      throw new Error(error.message || 'Failed to send message');
    }
  };

  // Mark conversation as read
  const markAsRead = async (conversationId) => {
    try {
      // Replace with actual API call
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    } catch (error) {
      throw new Error(error.message || 'Failed to mark conversation as read');
    }
  };

  // Create new conversation
  const createConversation = async (participantId) => {
    try {
      // Replace with actual API call
      const newConversation = {
        id: Date.now(),
        participants: [
          { id: user.id, name: user.name },
          { id: participantId, name: 'New Participant' }
        ],
        lastMessage: null,
        unreadCount: 0
      };

      setConversations(prev => [...prev, newConversation]);
      return newConversation;
    } catch (error) {
      throw new Error(error.message || 'Failed to create conversation');
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId) => {
    try {
      // Replace with actual API call
      setConversations(prev =>
        prev.filter(conv => conv.id !== conversationId)
      );
    } catch (error) {
      throw new Error(error.message || 'Failed to delete conversation');
    }
  };

  return {
    conversations,
    loading,
    error,
    sendMessage,
    markAsRead,
    createConversation,
    deleteConversation,
    refreshConversations: fetchConversations
  };
};

export default useMessaging;