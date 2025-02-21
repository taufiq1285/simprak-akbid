import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Image, Paperclip, X } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuth } from '../../context/AuthContext';

const MessageCenter = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock data - replace with API calls
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        name: 'Dr. Smith',
        role: 'dosen',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Please check your assignment feedback',
        timestamp: '10:30 AM',
        unread: 2
      },
      {
        id: 2,
        name: 'Lab Assistant',
        role: 'staff',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Your lab schedule has been confirmed',
        timestamp: 'Yesterday',
        unread: 0
      }
    ];

    const mockMessages = [
      {
        id: 1,
        senderId: 1,
        content: 'Hello, how can I help you?',
        timestamp: '10:00 AM',
        type: 'text'
      },
      {
        id: 2,
        senderId: user.id,
        content: 'I have a question about the lab assignment',
        timestamp: '10:05 AM',
        type: 'text'
      }
    ];

    setConversations(mockConversations);
    setMessages(mockMessages);
  }, [user.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const newMsg = {
      id: Date.now(),
      senderId: user.id,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'text',
      attachments: attachments
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    setAttachments([]);
  };

  const handleAttachment = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      {/* Message Icon */}
      <button
        className="relative p-2 text-gray-400 hover:text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="h-6 w-6" />
        {conversations.reduce((acc, conv) => acc + conv.unread, 0) > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {conversations.reduce((acc, conv) => acc + conv.unread, 0)}
          </span>
        )}
      </button>

      {/* Message Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <Card>
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">Messages</h3>
            </div>

            {/* Conversations List */}
            {!selectedConversation ? (
              <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Chat View
              <div className="h-96 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button
                    className="mr-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedConversation.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.role}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === user.id ? 'justify-end' :message.senderId === user.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`
                        max-w-[75%] rounded-lg px-4 py-2
                        ${message.senderId === user.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-900'
                        }
                      `}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.attachments?.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center text-xs bg-white bg-opacity-20 rounded p-1"
                            >
                              <Paperclip className="h-3 w-3 mr-1" />
                              <span className="truncate">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <span className="block mt-1 text-xs opacity-75">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                {attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                      >
                        <span className="truncate max-w-[100px]">{file.name}</span>
                        <button
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer text-gray-400 hover:text-gray-500">
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleAttachment}
                      />
                      <Paperclip className="h-5 w-5" />
                    </label>
                    <label className="cursor-pointer text-gray-400 hover:text-gray-500">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAttachment}
                      />
                      <Image className="h-5 w-5" />
                    </label>
                    <Button
                      variant="primary"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    )}
  </div>
);
};

export default MessageCenter;