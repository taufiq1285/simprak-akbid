// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Maaf, halaman yang Anda cari tidak tersedia.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" className="w-full">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;