// src/pages/dashboard/MahasiswaDashboard.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const MahasiswaDashboard = () => {
  // Data simulasi untuk development
  const stats = [
    {
      title: "Total Praktikum",
      value: "4",
      icon: "📚",
      description: "Semester ini"
    },
    {
      title: "Praktikum Aktif",
      value: "2",
      icon: "✍️",
      description: "Sedang berjalan"
    },
    {
      title: "Rata-rata Nilai",
      value: "85.5",
      icon: "📊",
      description: "Semester ini"
    },
    {
      title: "Kehadiran",
      value: "95%",
      icon: "📅",
      description: "15 dari 16 pertemuan"
    }
  ];

  const jadwalPraktikum = [
    {
      nama: "Praktikum Asuhan Persalinan Normal",
      waktu: "Senin, 08:00 - 10:00",
      ruangan: "Lab Kebidanan A",
      dosen: "Dr. Sarah Johnson",
      status: "Minggu Ini",
      pertemuan: "Pertemuan 5 dari 8"
    },
    {
      nama: "Praktikum Kesehatan Ibu dan Anak",
      waktu: "Rabu, 13:00 - 15:00",
      ruangan: "Lab Kebidanan B",
      dosen: "Dr. Emily Brown",
      status: "Minggu Depan",
      pertemuan: "Pertemuan 3 dari 8"
    }
  ];

  const tugasPending = [
    {
      praktikum: "Asuhan Persalinan Normal",
      tugas: "Laporan Praktikum Minggu 4",
      deadline: "Besok, 23:59",
      status: "Urgent"
    },
    {
      praktikum: "Kesehatan Ibu dan Anak",
      tugas: "Kasus Study Minggu 3",
      deadline: "3 hari lagi",
      status: "On Track"
    }
  ];

  const pengumuman = [
    {
      judul: "Jadwal UAS Praktikum",
      pesan: "UAS Praktikum akan dilaksanakan pada tanggal 20-24 Februari 2025",
      tanggal: "15 Feb 2025",
      penting: true
    },
    {
      judul: "Pengumpulan Laporan",
      pesan: "Batas akhir pengumpulan laporan praktikum diperpanjang hingga 28 Februari 2025",
      tanggal: "14 Feb 2025",
      penting: false
    }
  ];

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Mahasiswa</h1>
            <p className="text-purple-100 mt-1">Akademi Kebidanan Mega Buana</p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-purple-50"
          >
            Daftar Praktikum
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Praktikum */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Jadwal Praktikum</h2>
            <div className="space-y-4">
              {jadwalPraktikum.map((jadwal, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{jadwal.nama}</h3>
                      <p className="text-sm text-gray-500 mt-1">{jadwal.waktu}</p>
                      <p className="text-sm text-gray-500">{jadwal.ruangan}</p>
                      <p className="text-sm text-gray-500">Dosen: {jadwal.dosen}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        jadwal.status === 'Minggu Ini' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {jadwal.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{jadwal.pertemuan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tugas Pending */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tugas Pending</h2>
            <div className="space-y-4">
              {tugasPending.map((tugas, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{tugas.praktikum}</h3>
                      <p className="text-sm text-gray-500 mt-1">{tugas.tugas}</p>
                      <p className="text-sm text-gray-500">Deadline: {tugas.deadline}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tugas.status === 'Urgent' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {tugas.status}
                    </span>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full mt-3"
                    size="sm"
                  >
                    Kumpulkan Tugas
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pengumuman */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pengumuman</h2>
          <div className="space-y-4">
            {pengumuman.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                item.penting ? 'bg-red-50' : 'bg-blue-50'
              }`}>
                <h3 className={`text-sm font-medium ${
                  item.penting ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {item.judul}
                </h3>
                <p className={`text-sm mt-1 ${
                  item.penting ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {item.pesan}
                </p>
                <p className="text-xs text-gray-500 mt-2">{item.tanggal}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MahasiswaDashboard;