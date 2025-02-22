// src/pages/praktikum/PraktikumList.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const PraktikumList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data simulasi untuk development
  const praktikumList = [
    {
      id: '1',
      nama: 'Praktikum Asuhan Persalinan Normal',
      kode: 'PKB-001',
      dosen: 'Dr. Sarah Johnson',
      jadwal: 'Senin, 08:00 - 10:00',
      ruangan: 'Lab Kebidanan A',
      kapasitas: 30,
      terdaftar: 25,
      status: 'Aktif',
      periode: 'Semester Ganjil 2024/2025'
    },
    {
      id: '2',
      nama: 'Praktikum Kesehatan Ibu dan Anak',
      kode: 'PKB-002',
      dosen: 'Dr. Emily Brown',
      jadwal: 'Rabu, 13:00 - 15:00',
      ruangan: 'Lab Kebidanan B',
      kapasitas: 25,
      terdaftar: 20,
      status: 'Aktif',
      periode: 'Semester Ganjil 2024/2025'
    },
    // ... tambahkan data praktikum lainnya
  ];

  const filters = [
    { label: 'Semua', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Selesai', value: 'completed' },
    { label: 'Mendatang', value: 'upcoming' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Daftar Praktikum</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola semua praktikum dalam satu tempat
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
              >
                Tambah Praktikum Baru
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-96">
              <Input
                type="search"
                placeholder="Cari praktikum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant="secondary"
                  className="text-sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Praktikum List */}
        <div className="grid grid-cols-1 gap-6">
          {praktikumList.map((praktikum) => (
            <Card key={praktikum.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-gray-900">
                      {praktikum.nama}
                    </h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      praktikum.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {praktikum.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Kode: {praktikum.kode}</p>
                  <div className="text-sm text-gray-500">
                    <p>Dosen: {praktikum.dosen}</p>
                    <p>Jadwal: {praktikum.jadwal}</p>
                    <p>Ruangan: {praktikum.ruangan}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Terdaftar: {praktikum.terdaftar} dari {praktikum.kapasitas} mahasiswa</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                  <Button variant="secondary">Detail</Button>
                  <Button variant="primary">Edit</Button>
                  <Button variant="danger">Hapus</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Praktikum Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Tambah Praktikum Baru"
      >
        <div className="space-y-4">
          <Input
            label="Nama Praktikum"
            placeholder="Masukkan nama praktikum"
          />
          <Input
            label="Kode Praktikum"
            placeholder="Masukkan kode praktikum"
          />
          {/* ... tambahkan input lainnya */}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Batal
            </Button>
            <Button variant="primary">Simpan</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default PraktikumList;