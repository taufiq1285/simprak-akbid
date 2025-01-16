import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  resetPassword 
} from '../firebase/auth/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config/firebase';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, userData) => {
    try {
      const user = await registerUser(email, password, userData.displayName);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: userData.displayName,
        role: userData.role || 'mahasiswa',
        createdAt: new Date().toISOString(),
        ...userData
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  return {
    ...context,
    login,
    register,
    logout,
    forgotPassword
  };
};