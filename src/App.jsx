// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import DosenLayout from './layouts/DosenLayout';
import MahasiswaLayout from './layouts/MahasiswaLayout';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Admin Pages
import AdminDashboard from './components/admin/dashboard/DashboardStats';
import UserList from './components/admin/management/user/UserList';
import UserForm from './components/admin/management/user/UserForm';
import UserDetail from './components/admin/management/user/UserDetail';
import PraktikumList from './components/admin/management/praktikum/PraktikumList';
import PraktikumForm from './components/admin/management/praktikum/PraktikumForm';
import JadwalSetting from './components/admin/management/praktikum/JadwalSetting';
import AlatList from './components/admin/management/alat/AlatList';
import AlatForm from './components/admin/management/alat/AlatForm';
import StokManagement from './components/admin/management/alat/StokManagement';
import NilaiReport from './components/admin/reports/NilaiReport';
import KehadiranReport from './components/admin/reports/KehadiranReport';
import PeminjamanReport from './components/admin/reports/PeminjamanReport';

// Dosen Pages
import DosenDashboard from './components/dosen/dashboard/JadwalHarian';
import StatusPraktikum from './components/dosen/dashboard/StatusPraktikum';
import InputNilai from './components/dosen/nilai/InputNilai';
import NilaiList from './components/dosen/nilai/NilaiList';
import NilaiDetail from './components/dosen/nilai/NilaiDetail';
import JadwalMengajar from './components/dosen/jadwal/JadwalMengajar';
import DetailJadwal from './components/dosen/jadwal/DetailJadwal';
import ValidasiLogbook from './components/dosen/logbook/ValidasiLogbook';
import LogbookList from './components/dosen/logbook/LogbookList';

// Mahasiswa Pages
import MahasiswaDashboard from './components/mahasiswa/dashboard/JadwalHarian';
import StatusNilai from './components/mahasiswa/dashboard/StatusNilai';
import JadwalPraktikum from './components/mahasiswa/praktikum/JadwalPraktikum';
import MateriPraktikum from './components/mahasiswa/praktikum/MateriPraktikum';
import MahasiswaNilai from './components/mahasiswa/nilai/NilaiList';
import MahasiswaNilaiDetail from './components/mahasiswa/nilai/NilaiDetail';
import LogbookForm from './components/mahasiswa/logbook/LogbookForm';
import LogbookHistory from './components/mahasiswa/logbook/LogbookHistory';

// Peminjaman Pages
import DaftarPeminjaman from './components/peminjaman/list/DaftarPeminjaman';
import RiwayatPeminjaman from './components/peminjaman/list/RiwayatPeminjaman';
import PeminjamanAktif from './components/peminjaman/list/PeminjamanAktif';
import PeminjamanForm from './components/peminjaman/form/PeminjamanForm';
import PengembalianForm from './components/peminjaman/form/PengembalianForm';
import ValidasiForm from './components/peminjaman/form/ValidasiForm';
import DetailPeminjaman from './components/peminjaman/detail/DetailPeminjaman';
import StatusPeminjaman from './components/peminjaman/detail/StatusPeminjaman';
import BuktiPeminjaman from './components/peminjaman/detail/BuktiPeminjaman';

// Loading Component
import LoadingSpinner from './components/shared/utils/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path="create" element={<UserForm />} />
              <Route path=":id" element={<UserDetail />} />
            </Route>
            <Route path="praktikum">
              <Route index element={<PraktikumList />} />
              <Route path="create" element={<PraktikumForm />} />
              <Route path="jadwal" element={<JadwalSetting />} />
            </Route>
            <Route path="alat">
              <Route index element={<AlatList />} />
              <Route path="create" element={<AlatForm />} />
              <Route path="stok" element={<StokManagement />} />
            </Route>
            <Route path="reports">
              <Route path="nilai" element={<NilaiReport />} />
              <Route path="kehadiran" element={<KehadiranReport />} />
              <Route path="peminjaman" element={<PeminjamanReport />} />
            </Route>
          </Route>

          {/* Dosen Routes */}
          <Route
            path="/dosen"
            element={
              <ProtectedRoute allowedRoles={['dosen']}>
                <DosenLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DosenDashboard />} />
            <Route path="praktikum" element={<StatusPraktikum />} />
            <Route path="nilai">
              <Route index element={<NilaiList />} />
              <Route path="input" element={<InputNilai />} />
              <Route path=":id" element={<NilaiDetail />} />
            </Route>
            <Route path="jadwal">
              <Route index element={<JadwalMengajar />} />
              <Route path=":id" element={<DetailJadwal />} />
            </Route>
            <Route path="logbook">
              <Route index element={<LogbookList />} />
              <Route path="validasi" element={<ValidasiLogbook />} />
            </Route>
          </Route>

          {/* Mahasiswa Routes */}
          <Route
            path="/mahasiswa"
            element={
              <ProtectedRoute allowedRoles={['mahasiswa']}>
                <MahasiswaLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MahasiswaDashboard />} />
            <Route path="nilai" element={<StatusNilai />} />
            <Route path="praktikum">
              <Route index element={<JadwalPraktikum />} />
              <Route path=":id" element={<MateriPraktikum />} />
            </Route>
            <Route path="nilai">
              <Route index element={<MahasiswaNilai />} />
              <Route path=":id" element={<MahasiswaNilaiDetail />} />
            </Route>
            <Route path="logbook">
              <Route index element={<LogbookForm />} />
              <Route path="history" element={<LogbookHistory />} />
            </Route>
          </Route>

          {/* Peminjaman Routes */}
          <Route
            path="/peminjaman"
            element={
              <ProtectedRoute allowedRoles={['admin', 'dosen', 'mahasiswa']}>
                <div> {/* Wrapper div for peminjaman routes */}
                  <Routes>
                    <Route index element={<DaftarPeminjaman />} />
                    <Route path="riwayat" element={<RiwayatPeminjaman />} />
                    <Route path="aktif" element={<PeminjamanAktif />} />
                    <Route path="create" element={<PeminjamanForm />} />
                    <Route path="pengembalian/:id" element={<PengembalianForm />} />
                    <Route path="validasi/:id" element={<ValidasiForm />} />
                    <Route path=":id">
                      <Route index element={<DetailPeminjaman />} />
                      <Route path="status" element={<StatusPeminjaman />} />
                      <Route path="bukti" element={<BuktiPeminjaman />} />
                    </Route>
                  </Routes>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  user?.role === 'admin'
                    ? '/admin'
                    : user?.role === 'dosen'
                    ? '/dosen'
                    : '/mahasiswa'
                }
                replace
              />
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;