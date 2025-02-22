// src/pages/praktikum/AbsensiPraktikum.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const AbsensiPraktikum = () => {
  const [selectedPertemuan, setSelectedPertemuan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Data simulasi
  const praktikumData = {
    id: 'PKB-001',
    nama: 'Praktikum Asuhan Persalinan Normal',
    pertemuan: [
      {
        id: 1,
        tanggal: '2024-02-19',
        topik: 'Praktik Pertolongan Persalinan',
        status: 'Aktif'
      },
      {
        id: 2,
        tanggal: '2024-02-26',
        topik: 'Penanganan Kegawatdaruratan',
        status: 'Mendatang'
      }
    ],
    mahasiswa: [
      {
        nim: '2024001',
        nama: 'Anna Putri',
        absensi: {
          1: { status: 'Hadir', waktu: '08:00', catatan: 'Tepat waktu' },
          2: null
        }
      },
      {
        nim: '2024002',
        nama: 'Bella Safitri',
        absensi: {
          1: { status: 'Izin', waktu: '-', catatan: 'Sakit dengan surat dokter' },
          2: null
        }
      }
    ]
  };

  const AbsensiTable = ({ pertemuanId, mahasiswa }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mahasiswa.map((mhs) => {
            const absensi = mhs.absensi[pertemuanId];
            return (
              <tr key={mhs.nim}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mhs.nim}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {absensi ? (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      absensi.status === 'Hadir' 
                        ? 'bg-green-100 text-green-800'
                        : absensi.status === 'Izin'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {absensi.status}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {absensi?.waktu || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {absensi?.catatan || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      // eslint-disable-next-line no-undef
                      onClick={() => handleEditAbsensi(mhs, pertemuanId)}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
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
              <h1 className="text-2xl font-bold text-gray-900">Absensi Praktikum</h1>
              <p className="mt-1 text-sm text-gray-500">{praktikumData.nama}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
              >
                Tambah Pertemuan
              </Button>
            </div>
          </div>
        </div>

        {/* Pertemuan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {praktikumData.pertemuan.map((pertemuan) => (
            <Card 
              key={pertemuan.id}
              className={`p-6 cursor-pointer transition-shadow hover:shadow-lg ${
                selectedPertemuan?.id === pertemuan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPertemuan(pertemuan)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Pertemuan {pertemuan.id}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(pertemuan.tanggal).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  pertemuan.status === 'Aktif'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {pertemuan.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{pertemuan.topik}</p>
            </Card>
          ))}
        </div>

        {/* Absensi Table */}
        {selectedPertemuan && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Absensi Pertemuan {selectedPertemuan.id}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedPertemuan.topik} - {new Date(selectedPertemuan.tanggal).toLocaleDateString('id-ID')}
                </p>
              </div>
              <Button variant="primary">Download Absensi</Button>
            </div>
            <AbsensiTable
              pertemuanId={selectedPertemuan.id}
              mahasiswa={praktikumData.mahasiswa}
            />
          </Card>
        )}

        {/* Modal Tambah Pertemuan */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Tambah Pertemuan Baru"
        >
          <div className="space-y-4">
            <Input
              label="Tanggal"
              type="date"
              required
            />
            <Input
              label="Topik"
              required
              placeholder="Masukkan topik pertemuan"
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </Button>
              <Button variant="primary">
                Simpan
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default AbsensiPraktikum;