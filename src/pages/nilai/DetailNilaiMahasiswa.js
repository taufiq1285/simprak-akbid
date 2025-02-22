// src/pages/nilai/DetailNilaiMahasiswa.js
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const DetailNilaiMahasiswa = () => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputNilai, setInputNilai] = useState({
    nama: '',
    nilai: '',
    feedback: ''
  });

  // Data simulasi
  const mahasiswaData = {
    nim: '2024001',
    nama: 'Anna Putri',
    semester: 'Ganjil 2024/2025',
    praktikum: 'Praktikum Asuhan Persalinan Normal',
    dosen: 'Dr. Sarah Johnson',
    status: 'Aktif',
    nilai: {
      kehadiran: {
        total: 90,
        detail: [
          { pertemuan: 1, status: 'Hadir', tanggal: '2024-02-05' },
          { pertemuan: 2, status: 'Hadir', tanggal: '2024-02-12' },
          { pertemuan: 3, status: 'Izin', tanggal: '2024-02-19' },
        ]
      },
      tugas: [
        {
          nama: 'Laporan Praktikum 1',
          nilai: 85,
          tanggal: '2024-02-10',
          feedback: 'Laporan sudah baik, perlu ditingkatkan dalam detail prosedur'
        },
        {
          nama: 'Laporan Praktikum 2',
          nilai: 88,
          tanggal: '2024-02-17',
          feedback: 'Sangat baik dalam menjelaskan prosedur'
        }
      ],
      praktik: [
        {
          komponen: 'Persiapan Alat',
          nilai: 90,
          catatan: 'Sangat teliti dalam persiapan alat'
        },
        {
          komponen: 'Prosedur',
          nilai: 85,
          catatan: 'Prosedur sesuai standar'
        },
        {
          komponen: 'Kerjasama Tim',
          nilai: 88,
          catatan: 'Komunikasi baik dengan tim'
        }
      ],
      uas: {
        nilai: 87,
        tanggal: '2024-03-15',
        catatan: 'Pemahaman konsep sangat baik'
      }
    }
  };

  // Hitung nilai akhir
  const nilaiAkhir = () => {
    const bobotKehadiran = 0.1;
    const bobotTugas = 0.3;
    const bobotPraktik = 0.4;
    const bobotUAS = 0.2;

    const rataRataTugas = mahasiswaData.nilai.tugas.reduce((acc, curr) => acc + curr.nilai, 0) / mahasiswaData.nilai.tugas.length;
    const rataRataPraktik = mahasiswaData.nilai.praktik.reduce((acc, curr) => acc + curr.nilai, 0) / mahasiswaData.nilai.praktik.length;

    return (
      (mahasiswaData.nilai.kehadiran.total * bobotKehadiran) +
      (rataRataTugas * bobotTugas) +
      (rataRataPraktik * bobotPraktik) +
      (mahasiswaData.nilai.uas.nilai * bobotUAS)
    ).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputNilai(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitNilai = () => {
    // Implementasi penyimpanan nilai
    console.log('Nilai yang diinput:', inputNilai);
    setShowInputModal(false);
    setInputNilai({ nama: '', nilai: '', feedback: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mahasiswaData.nama}</h1>
              <p className="text-gray-500">NIM: {mahasiswaData.nim}</p>
              <p className="text-gray-500">Praktikum: {mahasiswaData.praktikum}</p>
              <p className="text-gray-500">Dosen: {mahasiswaData.dosen}</p>
            </div>
            <div className="flex flex-col items-start md:items-end justify-center">
              <div className="text-right">
                <p className="text-sm text-gray-500">Nilai Akhir</p>
                <p className="text-4xl font-bold text-blue-600">{nilaiAkhir()}</p>
              </div>
              <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                mahasiswaData.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {mahasiswaData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kehadiran */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Kehadiran</h2>
              <span className="text-2xl font-bold text-blue-600">{mahasiswaData.nilai.kehadiran.total}%</span>
            </div>
            <div className="space-y-3">
              {mahasiswaData.nilai.kehadiran.detail.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Pertemuan {item.pertemuan}</p>
                    <p className="text-sm text-gray-500">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Hadir' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Nilai Tugas */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Nilai Tugas</h2>
              <Button variant="primary" size="sm" onClick={() => setShowInputModal(true)}>
                Input Nilai
              </Button>
            </div>
            <div className="space-y-4">
              {mahasiswaData.nilai.tugas.map((tugas, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{tugas.nama}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Tanggal: {new Date(tugas.tanggal).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{tugas.nilai}</span>
                  </div>
                  {tugas.feedback && (
                    <p className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                      {tugas.feedback}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Nilai Praktik */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Nilai Praktik</h2>
            <div className="space-y-4">
              {mahasiswaData.nilai.praktik.map((praktik, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{praktik.komponen}</h3>
                      <p className="text-sm text-gray-600 mt-1">{praktik.catatan}</p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{praktik.nilai}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${praktik.nilai}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Nilai UAS */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Nilai UAS</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Tanggal: {new Date(mahasiswaData.nilai.uas.tanggal).toLocaleDateString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{mahasiswaData.nilai.uas.catatan}</p>
                </div>
                <span className="text-3xl font-bold text-blue-600">{mahasiswaData.nilai.uas.nilai}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Modal Input Nilai */}
        <Modal 
          isOpen={showInputModal} 
          onClose={() => {
            setShowInputModal(false);
            setInputNilai({ nama: '', nilai: '', feedback: '' });
          }}
          title="Input Nilai"
        >
          <div className="space-y-4">
            <Input
              label="Nama Tugas/Komponen"
              name="nama"
              value={inputNilai.nama}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama tugas atau komponen"
            />
            <Input
              label="Nilai"
              type="number"
              name="nilai"
              value={inputNilai.nilai}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
              placeholder="Masukkan nilai (0-100)"
            />
            <Input
              label="Feedback"
              name="feedback"
              value={inputNilai.feedback}
              onChange={handleInputChange}
              placeholder="Masukkan feedback atau catatan"
              multiline
              rows={3}
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowInputModal(false);
                  setInputNilai({ nama: '', nilai: '', feedback: '' });
                }}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitNilai}
                disabled={!inputNilai.nama || !inputNilai.nilai}
              >
                Simpan
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default DetailNilaiMahasiswa;