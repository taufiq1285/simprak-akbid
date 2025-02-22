// src/pages/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-red-600">403</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Akses Tidak Diizinkan
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Maaf, Anda tidak memiliki akses ke halaman ini.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link to="/dashboard">
            <Button variant="primary" className="w-full">
              Kembali ke Dashboard
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              Login dengan Akun Lain
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;