// src/pages/nilai/NilaiManagement.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const NilaiManagement = () => {
  const [selectedPraktikum, setSelectedPraktikum] = useState(null);
  const [showInputModal, setShowInputModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data simulasi
  const praktikumList = [
    {
      id: '1',
      nama: 'Praktikum Asuhan Persalinan Normal',
      kode: 'PKB-001',
      periode: 'Semester Ganjil 2024/2025',
      mahasiswa: [
        {
          nim: '2024001',
          nama: 'Anna Putri',
          kehadiran: 90,
          tugas: 85,
          praktik: 88,
          uas: 87,
          status: 'Lengkap'
        },
        {
          nim: '2024002',
          nama: 'Bella Safitri',
          kehadiran: 85,
          tugas: 80,
          praktik: 82,
          uas: null,
          status: 'Belum UAS'
        }
      ]
    },
    {
      id: '2',
      nama: 'Praktikum Kesehatan Ibu dan Anak',
      kode: 'PKB-002',
      periode: 'Semester Ganjil 2024/2025',
      mahasiswa: [
        {
          nim: '2024001',
          nama: 'Anna Putri',
          kehadiran: 95,
          tugas: 88,
          praktik: 90,
          uas: 89,
          status: 'Lengkap'
        }
      ]
    }
  ];

  // Komponen tabel nilai mahasiswa
  const NilaiTable = ({ mahasiswa }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIM</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kehadiran</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tugas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Praktik</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UAS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mahasiswa.map((mhs) => (
            <tr key={mhs.nim}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nim}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.kehadiran}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.tugas}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.praktik}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {mhs.uas ?? '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  mhs.status === 'Lengkap' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {mhs.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    setSelectedPraktikum({ ...praktikum, selectedMahasiswa: mhs });
                    setShowInputModal(true);
                  }}
                >
                  Input Nilai
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Nilai Praktikum</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola nilai mahasiswa untuk setiap praktikum
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="search"
              placeholder="Cari berdasarkan nama atau kode praktikum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-96"
            />
          </div>
        </Card>

        {/* Praktikum List */}
        <div className="space-y-6">
          {praktikumList.map((praktikum) => (
            <Card key={praktikum.id} className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">{praktikum.nama}</h2>
                <p className="text-sm text-gray-500">Kode: {praktikum.kode}</p>
                <p className="text-sm text-gray-500">Periode: {praktikum.periode}</p>
              </div>
              <NilaiTable mahasiswa={praktikum.mahasiswa} />
            </Card>
          ))}
        </div>

        {/* Modal Input Nilai */}
        <Modal
          isOpen={showInputModal}
          onClose={() => setShowInputModal(false)}
          title="Input Nilai Mahasiswa"
        >
          {selectedPraktikum?.selectedMahasiswa && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedPraktikum.selectedMahasiswa.nama}
                </h3>
                <p className="text-sm text-gray-500">
                  NIM: {selectedPraktikum.selectedMahasiswa.nim}
                </p>
              </div>

              <Input
                label="Nilai Kehadiran"
                type="number"
                min="0"
                max="100"
                value={selectedPraktikum.selectedMahasiswa.kehadiran}
              />

              <Input
                label="Nilai Tugas"
                type="number"
                min="0"
                max="100"
                value={selectedPraktikum.selectedMahasiswa.tugas}
              />

              <Input
                label="Nilai Praktik"
                type="number"
                min="0"
                max="100"
                value={selectedPraktikum.selectedMahasiswa.praktik}
              />

              <Input
                label="Nilai UAS"
                type="number"
                min="0"
                max="100"
                value={selectedPraktikum.selectedMahasiswa.uas || ''}
              />

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowInputModal(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Implement save logic here
                    setShowInputModal(false);
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default NilaiManagement;