// src/pages/praktikum/LaporanPraktikum.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const LaporanPraktikum = () => {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Data simulasi
  const laporanData = {
    praktikum: 'Praktikum Asuhan Persalinan Normal',
    kode: 'PKB-001',
    dosen: 'Dr. Sarah Johnson',
    pertemuan: [
      {
        id: 1,
        minggu: 'Minggu 1',
        topik: 'Pengenalan Alat dan Persiapan Persalinan',
        deadline: '2024-02-25',
        status: 'Sudah Lewat'
      },
      {
        id: 2,
        minggu: 'Minggu 2',
        topik: 'Pemeriksaan Leopold dan Interpretasi',
        deadline: '2024-03-03',
        status: 'Aktif'
      }
    ],
    mahasiswa: [
      {
        nim: '2024001',
        nama: 'Anna Putri',
        laporan: {
          1: {
            status: 'Terkumpul',
            tanggal: '2024-02-24',
            nilai: 85,
            feedback: 'Laporan sudah bagus, perlu ditambahkan detail prosedur'
          },
          2: {
            status: 'Belum',
            tanggal: null,
            nilai: null,
            feedback: null
          }
        }
      },
      {
        nim: '2024002',
        nama: 'Bella Safitri',
        laporan: {
          1: {
            status: 'Telat',
            tanggal: '2024-02-26',
            nilai: 75,
            feedback: 'Pengumpulan terlambat, isi laporan cukup baik'
          },
          2: {
            status: 'Terkumpul',
            tanggal: '2024-03-01',
            nilai: null,
            feedback: null
          }
        }
      }
    ]
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      'Terkumpul': 'bg-green-100 text-green-800',
      'Telat': 'bg-yellow-100 text-yellow-800',
      'Belum': 'bg-red-100 text-red-800',
      'Aktif': 'bg-blue-100 text-blue-800',
      'Sudah Lewat': 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const LaporanTable = ({ pertemuanId }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIM</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Kumpul</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nilai</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feedback</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {laporanData.mahasiswa.map((mhs) => {
            const laporan = mhs.laporan[pertemuanId];
            return (
              <tr key={mhs.nim}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nim}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mhs.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={laporan.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {laporan.tanggal ? new Date(laporan.tanggal).toLocaleDateString('id-ID') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {laporan.nilai || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {laporan.feedback || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {laporan.status !== 'Belum' && (
                      <Button variant="secondary" size="sm">
                        Lihat
                      </Button>
                    )}
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => setShowUploadModal(true)}
                    >
                      {laporan.status === 'Belum' ? 'Upload' : 'Update'}
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
              <h1 className="text-2xl font-bold text-gray-900">Laporan Praktikum</h1>
              <p className="mt-1 text-sm text-gray-500">{laporanData.praktikum}</p>
              <p className="text-sm text-gray-500">Dosen: {laporanData.dosen}</p>
            </div>
          </div>
        </div>

        {/* Daftar Pertemuan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laporanData.pertemuan.map((pertemuan) => (
            <Card 
              key={pertemuan.id}
              className={`p-6 cursor-pointer transition-shadow hover:shadow-lg ${
                selectedLaporan?.id === pertemuan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedLaporan(pertemuan)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {pertemuan.minggu}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {pertemuan.topik}
                  </p>
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(pertemuan.deadline).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <StatusBadge status={pertemuan.status} />
              </div>
            </Card>
          ))}
        </div>

        {/* Tabel Laporan */}
        {selectedLaporan && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {selectedLaporan.minggu} - {selectedLaporan.topik}
                </h2>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(selectedLaporan.deadline).toLocaleDateString('id-ID')}
                </p>
              </div>
              <Button variant="primary">Download Template</Button>
            </div>
            <LaporanTable pertemuanId={selectedLaporan.id} />
          </Card>
        )}

        {/* Modal Upload Laporan */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload Laporan Praktikum"
        >
          <div className="space-y-4">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              label="File Laporan"
              required
            />
            <Input
              type="textarea"
              label="Catatan"
              placeholder="Tambahkan catatan jika ada..."
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowUploadModal(false)}
              >
                Batal
              </Button>
              <Button variant="primary">
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default LaporanPraktikum;