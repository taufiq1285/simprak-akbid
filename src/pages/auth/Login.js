// src/pages/auth/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import logo from '../../assets/logo.png';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Login Function
  const handleQuickLogin = (role) => {
    setFormData({
      email: `${role}@simprak.com`,
      password: 'password123'
    });
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="animated-bg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo Akbid Mega Buana"
            className="h-24 w-auto"
          />
        </div>
        
        <h1 className="text-center text-4xl font-extrabold text-primary-900 tracking-tight">
          SIMPRAK
        </h1>
        <h2 className="mt-2 text-center text-xl text-primary-700">
          Sistem Informasi Manajemen Praktikum
        </h2>
        <p className="mt-2 text-center text-lg text-primary-600">
          Akademi Kebidanan Mega Buana
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <Alert type="error" message={error} />}
            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Masukkan email Anda"
                className="bg-white/70"
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Masukkan password Anda"
                className="bg-white/70"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </div>
                ) : 'Masuk'}
              </Button>
            </div>
          </form>

          {/* Quick Login Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Quick Login (Development)
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="secondary"
                onClick={() => handleQuickLogin('admin')}
                className="text-sm"
              >
                Admin
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleQuickLogin('dosen')}
                className="text-sm"
              >
                Dosen
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleQuickLogin('mahasiswa')}
                className="text-sm"
              >
                Mahasiswa
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Daftar Sekarang
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-primary-600">
        <p>Melayani dengan Hati, Mendidik dengan Ilmu</p>
        <p className="mt-1">© {new Date().getFullYear()} Akademi Kebidanan Mega Buana</p>
      </div>
    </div>
  );
};

export default Login;