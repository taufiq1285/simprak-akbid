// src/pages/laboratorium/LaboratoriumDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const LaboratoriumDetail = () => {
  useParams();

  // Data simulasi
  const labData = {
    id: 'LAB-001',
    nama: 'Lab Kebidanan A',
    kapasitas: 30,
    fasilitas: [
      'Phantom Persalinan',
      'Phantom Bayi',
      'USG Simulator',
      'Bed Persalinan'
    ],
    status: 'Tersedia',
    kondisi: 'Baik',
    pemeliharaan: {
      terakhir: '2024-01-15',
      berikutnya: '2024-03-15'
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {labData.nama}
              </h1>
              <p className="mt-1 text-sm text-gray-500">ID: {labData.id}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary">
                Jadwal
              </Button>
              <Button variant="primary">
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informasi Umum */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Informasi Umum
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kapasitas</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {labData.kapasitas} orang
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {labData.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kondisi</h3>
                <p className="mt-1 text-sm text-gray-900">{labData.kondisi}</p>
              </div>
            </div>
          </Card>

          {/* Fasilitas */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Fasilitas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {labData.fasilitas.map((item, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* Pemeliharaan */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Informasi Pemeliharaan
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Pemeliharaan Terakhir
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(labData.pemeliharaan.terakhir).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Pemeliharaan Berikutnya
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(labData.pemeliharaan.berikutnya).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LaboratoriumDetail;