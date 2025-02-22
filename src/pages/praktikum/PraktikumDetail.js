// src/pages/praktikum/PraktikumDetail.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const PraktikumDetail = () => {
  const [, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  // Data simulasi
  const praktikumData = {
    id: '1',
    nama: 'Praktikum Asuhan Persalinan Normal',
    kode: 'PKB-001',
    dosen: 'Dr. Sarah Johnson',
    jadwal: 'Senin, 08:00 - 10:00',
    ruangan: 'Lab Kebidanan A',
    kapasitas: 30,
    terdaftar: 25,
    status: 'Aktif',
    periode: 'Semester Ganjil 2024/2025',
    deskripsi: 'Praktikum ini bertujuan untuk memberikan pemahaman dan keterampilan dasar dalam asuhan persalinan normal.',
    materi: [
      'Persiapan persalinan',
      'Pemeriksaan Leopold',
      'Pertolongan persalinan normal',
      'Penanganan kegawatdaruratan dasar'
    ],
    pertemuan: [
      {
        minggu: 1,
        topik: 'Pengenalan Alat dan Persiapan Persalinan',
        status: 'Selesai',
        tanggal: '2024-02-05'
      },
      {
        minggu: 2,
        topik: 'Pemeriksaan Leopold dan Interpretasi',
        status: 'Selesai',
        tanggal: '2024-02-12'
      },
      {
        minggu: 3,
        topik: 'Praktik Pertolongan Persalinan',
        status: 'Akan Datang',
        tanggal: '2024-02-19'
      }
    ],
    mahasiswa: [
      {
        nim: '2024001',
        nama: 'Anna Putri',
        kehadiran: '2/3',
        status: 'Aktif'
      },
      {
        nim: '2024002',
        nama: 'Bella Safitri',
        kehadiran: '3/3',
        status: 'Aktif'
      }
    ]
  };

  const TabButton = ({ label, value }) => (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === value
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {label}
    </button>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{praktikumData.nama}</h1>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    praktikumData.status === 'Aktif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {praktikumData.status}
                  </span>
                </div>
                <p className="mt-1 text-gray-500">Kode: {praktikumData.kode}</p>
              </div>
              <Button
                variant="primary"
                onClick={() => setShowEditModal(true)}
              >
                Edit Praktikum
              </Button>
            </div>
          </div>
          
          <div className="px-6 py-3 border-t border-gray-200">
            <div className="flex space-x-4">
              <TabButton label="Informasi" value="info" />
              <TabButton label="Pertemuan" value="pertemuan" />
              <TabButton label="Mahasiswa" value="mahasiswa" />
              <TabButton label="Nilai" value="nilai" />
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informasi Umum</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Dosen Pengampu</label>
                  <p className="mt-1">{praktikumData.dosen}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Jadwal</label>
                  <p className="mt-1">{praktikumData.jadwal}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ruangan</label>
                  <p className="mt-1">{praktikumData.ruangan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Kapasitas</label>
                  <p className="mt-1">{praktikumData.terdaftar} / {praktikumData.kapasitas} mahasiswa</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Periode</label>
                  <p className="mt-1">{praktikumData.periode}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Deskripsi Praktikum</h2>
              <p className="text-gray-600">{praktikumData.deskripsi}</p>
              
              <h3 className="text-md font-medium text-gray-900 mt-6 mb-2">Materi Praktikum</h3>
              <ul className="list-disc list-inside space-y-1">
                {praktikumData.materi.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {activeTab === 'pertemuan' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Jadwal Pertemuan</h2>
              <Button variant="primary">Tambah Pertemuan</Button>
            </div>
            
            <div className="space-y-4">
              {praktikumData.pertemuan.map((pertemuan, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Minggu {pertemuan.minggu} - {pertemuan.topik}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Tanggal: {new Date(pertemuan.tanggal).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pertemuan.status === 'Selesai'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pertemuan.status}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" size="sm">Detail</Button>
                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="danger" size="sm">Hapus</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'mahasiswa' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Daftar Mahasiswa</h2>
              <Button variant="primary">Tambah Mahasiswa</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIM</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kehadiran</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {praktikumData.mahasiswa.map((mhs) => (
                    <tr key={mhs.nim}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {mhs.nim}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mhs.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mhs.kehadiran}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {mhs.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">Detail</Button>
                          <Button variant="danger" size="sm">Hapus</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PraktikumDetail;