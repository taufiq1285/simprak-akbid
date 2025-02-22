// src/pages/laboratorium/LaboratoriumManagement.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const LaboratoriumManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [, setSelectedLab] = useState(null);

  // Data simulasi
  const [labData] = useState([
    {
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
      jadwalHariIni: [
        {
          waktu: '08:00 - 10:00',
          praktikum: 'Praktikum Asuhan Persalinan Normal',
          dosen: 'Dr. Sarah Johnson'
        }
      ],
      pemeliharaan: {
        terakhir: '2024-01-15',
        berikutnya: '2024-03-15',
        kondisi: 'Baik'
      }
    },
    {
      id: 'LAB-002',
      nama: 'Lab Kebidanan B',
      kapasitas: 25,
      fasilitas: [
        'Phantom Persalinan',
        'Phantom Bayi',
        'Alat Pemeriksaan Kehamilan',
        'Bed Persalinan'
      ],
      status: 'Digunakan',
      jadwalHariIni: [
        {
          waktu: '13:00 - 15:00',
          praktikum: 'Praktikum Kesehatan Ibu dan Anak',
          dosen: 'Dr. Emily Brown'
        }
      ],
      pemeliharaan: {
        terakhir: '2024-02-01',
        berikutnya: '2024-04-01',
        kondisi: 'Baik'
      }
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tersedia':
        return 'bg-green-100 text-green-800';
      case 'Digunakan':
        return 'bg-blue-100 text-blue-800';
      case 'Pemeliharaan':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Laboratorium</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola laboratorium dan fasilitas praktikum
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
            >
              Tambah Laboratorium
            </Button>
          </div>
        </div>

        {/* Lab Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {labData.map((lab) => (
            <Card key={lab.id} className="p-6">
              <div className="space-y-4">
                {/* Lab Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{lab.nama}</h2>
                    <p className="text-sm text-gray-500">ID: {lab.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lab.status)}`}>
                    {lab.status}
                  </span>
                </div>

                {/* Lab Info */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Kapasitas</p>
                    <p className="mt-1 text-sm text-gray-900">{lab.kapasitas} orang</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Kondisi</p>
                    <p className="mt-1 text-sm text-gray-900">{lab.pemeliharaan.kondisi}</p>
                  </div>
                </div>

                {/* Fasilitas */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Fasilitas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lab.fasilitas.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Jadwal Hari Ini */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Jadwal Hari Ini</h3>
                  <div className="mt-2 space-y-3">
                    {lab.jadwalHariIni.map((jadwal, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{jadwal.praktikum}</p>
                        <p className="text-sm text-gray-500">{jadwal.waktu}</p>
                        <p className="text-sm text-gray-500">{jadwal.dosen}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pemeliharaan */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-900">Informasi Pemeliharaan</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Pemeliharaan Terakhir</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(lab.pemeliharaan.terakhir).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pemeliharaan Berikutnya</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(lab.pemeliharaan.berikutnya).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedLab(lab)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setSelectedLab(lab)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger">
                    Hapus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal Tambah Lab */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Tambah Laboratorium Baru"
        >
          <div className="space-y-4">
            <Input
              label="Nama Laboratorium"
              placeholder="Masukkan nama laboratorium"
              required
            />
            <Input
              label="Kapasitas"
              type="number"
              placeholder="Masukkan kapasitas laboratorium"
              required
            />
            <Input
              label="Fasilitas"
              placeholder="Masukkan fasilitas (pisahkan dengan koma)"
              required
            />
            <div className="flex justify-end space-x-3 pt-4">
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

export default LaboratoriumManagement;