import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DosenDashboard from './pages/dashboard/DosenDashboard';
import MahasiswaDashboard from './pages/dashboard/MahasiswaDashboard';

// Praktikum Pages
import PraktikumList from './pages/praktikum/PraktikumList';
import PraktikumDetail from './pages/praktikum/PraktikumDetail';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
    if (user.role === 'dosen') return <Navigate to="/dosen/dashboard" />;
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['admin']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'praktikum',
        element: <PraktikumList />
      },
      {
        path: 'praktikum/:id',
        element: <PraktikumDetail />
      }
    ]
  },
  {
    path: '/dosen',
    element: (
      <ProtectedRoute roles={['dosen']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DosenDashboard />
      },
      {
        path: 'praktikum',
        element: <PraktikumList />
      },
      {
        path: 'praktikum/:id',
        element: <PraktikumDetail />
      }
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute roles={['mahasiswa']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <MahasiswaDashboard />
      },
      {
        path: 'praktikum',
        element: <PraktikumList />
      },
      {
        path: 'praktikum/:id',
        element: <PraktikumDetail />
      }
    ]
  }
];

export default routes;