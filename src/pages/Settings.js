// src/pages/Settings.js
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan Akun</h1>
          <p className="mt-1 text-sm text-gray-600">
            Kelola pengaturan akun dan preferensi Anda
          </p>
        </div>

        {/* Pengaturan Profil */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Profil</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Input
                label="Nama Lengkap"
                name="fullName"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <Input
                label="Nomor Telepon"
                name="phone"
                type="tel"
                placeholder="Masukkan nomor telepon"
              />
            </div>
            <div>
              <Button variant="primary">
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Card>

        {/* Pengaturan Password */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ubah Password</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Input
                label="Password Saat Ini"
                name="currentPassword"
                type="password"
                placeholder="Masukkan password saat ini"
              />
            </div>
            <div>
              <Input
                label="Password Baru"
                name="newPassword"
                type="password"
                placeholder="Masukkan password baru"
              />
            </div>
            <div>
              <Input
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                type="password"
                placeholder="Konfirmasi password baru"
              />
            </div>
            <div>
              <Button variant="primary">
                Ubah Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Pengaturan Notifikasi */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Notifikasi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notifikasi Email</h3>
                <p className="text-sm text-gray-500">Terima notifikasi via email</p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notifikasi Browser</h3>
                <p className="text-sm text-gray-500">Terima notifikasi di browser</p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Update Praktikum</h3>
                <p className="text-sm text-gray-500">Notifikasi perubahan jadwal/materi</p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="pt-4">
              <Button variant="primary">
                Simpan Pengaturan
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200">
          <h2 className="text-lg font-medium text-red-700 mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Nonaktifkan Akun</h3>
                <p className="text-sm text-gray-500">
                  Nonaktifkan akun Anda secara sementara
                </p>
              </div>
              <Button variant="danger" size="sm">
                Nonaktifkan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;