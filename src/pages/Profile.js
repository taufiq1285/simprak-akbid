// src/pages/Profile.js
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Profile = () => {
  // Data simulasi untuk profil
  const [profileData] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Dosen',
    email: 'sarah.johnson@example.com',
    phone: '081234567890',
    nip: 'D12345',
    specialization: 'Kebidanan',
    education: [
      {
        degree: 'S3',
        major: 'Kedokteran',
        institution: 'Universitas Indonesia',
        year: '2018'
      },
      {
        degree: 'S2',
        major: 'Kebidanan',
        institution: 'Universitas Gadjah Mada',
        year: '2012'
      }
    ],
    avatar: '/default-avatar.png'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    // Implementasi penyimpanan profil
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={profileData.avatar}
                alt={profileData.name}
              />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-500">{profileData.role}</p>
              <div className="mt-2 flex space-x-4">
                <span className="inline-flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profileData.email}
                </span>
                <span className="inline-flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {profileData.phone}
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <Button
                variant={isEditing ? "secondary" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Batal' : 'Edit Profil'}
              </Button>
            </div>
          </div>
        </div>

        {/* Informasi Pribadi */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Nama Lengkap"
                value={profileData.name}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Input
                label="Nomor Telepon"
                value={profileData.phone}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Input
                label="NIP"
                value={profileData.nip}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Input
                label="Spesialisasi"
                value={profileData.specialization}
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <div className="mt-6">
              <Button variant="primary" onClick={handleSaveProfile}>
                Simpan Perubahan
              </Button>
            </div>
          )}
        </Card>

        {/* Riwayat Pendidikan */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Riwayat Pendidikan</h2>
            {isEditing && (
              <Button variant="secondary" size="sm">
                Tambah Pendidikan
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {profileData.education.map((edu, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {edu.degree} - {edu.major}
                    </h3>
                    <p className="text-sm text-gray-500">{edu.institution}</p>
                    <p className="text-sm text-gray-500">Lulus tahun {edu.year}</p>
                  </div>
                  {isEditing && (
                    <Button variant="danger" size="sm">
                      Hapus
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Aktivitas Terakhir */}
        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aktivitas Terakhir</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Input nilai praktikum</p>
                <p className="text-sm text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Membuat jadwal praktikum baru</p>
                <p className="text-sm text-gray-500">5 jam yang lalu</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;