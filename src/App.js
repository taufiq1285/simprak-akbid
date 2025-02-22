// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DosenDashboard from './pages/dashboard/DosenDashboard';
import MahasiswaDashboard from './pages/dashboard/MahasiswaDashboard';

// Praktikum Pages
import PraktikumList from './pages/praktikum/PraktikumList';
import AbsensiPraktikum from './pages/praktikum/AbsensiPraktikum';
import LaporanPraktikum from './pages/praktikum/LaporanPraktikum';
import PraktikumDetail from './pages/praktikum/PraktikumDetail';

// Nilai Pages
import NilaiManagement from './pages/nilai/NilaiManagement';
import DetailNilaiMahasiswa from './pages/nilai/DetailNilaiMahasiswa';

// Laboratorium Pages
import LaboratoriumManagement from './pages/laboratorium/LaboratoriumManagement';
import LaboratoriumDetail from './pages/laboratorium/LaboratoriumDetail';
import LaboratoriumPemeliharaan from './pages/laboratorium/LaboratoriumPemeliharaan';
import LaboratoriumJadwal from './pages/laboratorium/LaboratoriumJadwal';

// Other Pages
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// Context
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />

            {/* Dosen Routes */}
            <Route path="/dashboard/dosen" element={<DosenDashboard />} />

            {/* Mahasiswa Routes */}
            <Route path="/dashboard/mahasiswa" element={<MahasiswaDashboard />} />

            {/* Praktikum Routes */}
            <Route path="/praktikum" element={<PraktikumList />} />
            <Route path="/praktikum/:id" element={<PraktikumDetail />} />
            <Route path="/praktikum/:id/absensi" element={<AbsensiPraktikum />} />
            <Route path="/praktikum/:id/laporan" element={<LaporanPraktikum />} />

            {/* Nilai Routes */}
            <Route path="/nilai" element={<NilaiManagement />} />
            <Route path="/nilai/:id" element={<DetailNilaiMahasiswa />} />

            {/* Laboratorium Routes */}
            <Route path="/laboratorium" element={<LaboratoriumManagement />} />
            <Route path="/laboratorium/:id" element={<LaboratoriumDetail />} />
            <Route path="/laboratorium/:id/pemeliharaan" element={<LaboratoriumPemeliharaan />} />
            <Route path="/laboratorium/:id/jadwal" element={<LaboratoriumJadwal />} />

            {/* Profile & Settings Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Special Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;