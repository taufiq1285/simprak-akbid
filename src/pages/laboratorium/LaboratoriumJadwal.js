// src/pages/laboratorium/LaboratoriumJadwal.js
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';

const LaboratoriumJadwal = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jadwal Laboratorium</h1>
              <p className="mt-1 text-sm text-gray-500">ID: {id}</p>
            </div>
            <Button variant="primary">Tambah Jadwal</Button>
          </div>
        </div>

        {/* Content akan ditambahkan di sini */}
      </div>
    </DashboardLayout>
  );
};

export default LaboratoriumJadwal;