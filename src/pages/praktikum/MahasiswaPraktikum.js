// src/pages/praktikum/MahasiswaPraktikum.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import PraktikumCard from '../../modules/praktikum/PraktikumCard';
import Modal from '../../components/common/Modal';

const MahasiswaPraktikum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDaftarModal, setShowDaftarModal] = useState(false);
  const [selectedPraktikum, setSelectedPraktikum] = useState(null);
  
  // Mock data - akan diganti dengan data dari Firebase
  const [praktikumList] = useState([
    {
      id: '1',
      nama: 'Praktikum Kebidanan Dasar',
      kodePraktikum: 'PKB-001',
      dosen: 'Dr. Sarah Johnson',
      jadwal: 'Senin, 08:00 - 10:00',
      ruangan: 'Lab A',
      kapasitas: 30,
      status: 'Aktif',
      deskripsi: 'Praktikum ini mencakup dasar-dasar kebidanan dan penanganan pasien.',
      syarat: ['Lulus Mata Kuliah Dasar Kebidanan', 'IPK minimal 2.75']
    },
    {
      id: '2',
      nama: 'Praktikum Kesehatan Ibu dan Anak',
      kodePraktikum: 'PKB-002',
      dosen: 'Dr. Emily Brown',
      jadwal: 'Rabu, 13:00 - 15:00',
      ruangan: 'Lab B',
      kapasitas: 25,
      status: 'Aktif',
      deskripsi: 'Fokus pada pemeriksaan dan perawatan ibu hamil serta bayi.',
      syarat: ['Lulus Praktikum Kebidanan Dasar', 'IPK minimal 3.0']
    }
  ]);

  const handleAction = (action, praktikum) => {
    if (action === 'daftar') {
      setSelectedPraktikum(praktikum);
      setShowDaftarModal(true);
    }
  };

  const handleDaftar = async () => {
    try {
      // Implementasi pendaftaran ke Firebase akan ditambahkan nanti
      console.log('Mendaftar ke praktikum:', selectedPraktikum.nama);
      setShowDaftarModal(false);
      setSelectedPraktikum(null);
    } catch (error) {
      console.error('Error mendaftar praktikum:', error);
    }
  };

  const filteredPraktikum = praktikumList.filter(praktikum =>
    praktikum.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    praktikum.kodePraktikum.toLowerCase().includes(searchQuery.toLowerCase()) ||
    praktikum.dosen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Daftar Praktikum</h1>
        </div>

        <Card className="p-4">
          <Input
            type="search"
            placeholder="Cari praktikum berdasarkan nama, kode, atau dosen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPraktikum.map((praktikum) => (
            <PraktikumCard
              key={praktikum.id}
              praktikum={praktikum}
              role="mahasiswa"
              onAction={handleAction}
            />
          ))}
        </div>

        {/* Modal Pendaftaran Praktikum */}
        <Modal
          isOpen={showDaftarModal}
          onClose={() => {
            setShowDaftarModal(false);
            setSelectedPraktikum(null);
          }}
          title="Pendaftaran Praktikum"
        >
          {selectedPraktikum && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  {selectedPraktikum.nama}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedPraktikum.kodePraktikum}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Deskripsi</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedPraktikum.deskripsi}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Syarat Praktikum
                </h4>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  {selectedPraktikum.syarat.map((syarat, index) => (
                    <li key={index}>{syarat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Jadwal</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedPraktikum.jadwal}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">Informasi Tambahan</h4>
                <div className="mt-1 space-y-2 text-sm text-gray-600">
                  <p>Dosen: {selectedPraktikum.dosen}</p>
                  <p>Ruangan: {selectedPraktikum.ruangan}</p>
                  <p>Kapasitas: {selectedPraktikum.kapasitas} mahasiswa</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowDaftarModal(false);
                    setSelectedPraktikum(null);
                  }}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  onClick={handleDaftar}
                >
                  Daftar Praktikum
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default MahasiswaPraktikum;