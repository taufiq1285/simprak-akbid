// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // Simulasi login untuk pengembangan frontend
    if (email === 'admin@simprak.com') {
      setUser({ email, role: 'admin', name: 'Admin' });
      navigate('/dashboard/admin');
    } else if (email === 'dosen@simprak.com') {
      setUser({ email, role: 'dosen', name: 'Dr. Sarah Johnson' });
      navigate('/dashboard/dosen');
    } else if (email === 'mahasiswa@simprak.com') {
      setUser({ email, role: 'mahasiswa', name: 'John Doe' });
      navigate('/dashboard/mahasiswa');
    } else {
      throw new Error('Email tidak valid');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};