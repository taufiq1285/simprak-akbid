// src/pages/dashboard/DosenDashboard.js
import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DosenDashboard = () => {
  // Data simulasi untuk development
  const stats = [
    {
      title: "Total Mahasiswa",
      value: "45",
      icon: "👥",
      description: "Di kelas praktikum"
    },
    {
      title: "Kelas Aktif",
      value: "3",
      icon: "📚",
      description: "Periode ini"
    },
    {
      title: "Nilai Pending",
      value: "15",
      icon: "📝",
      description: "Perlu input nilai"
    },
    {
      title: "Tingkat Kelulusan",
      value: "92%",
      icon: "📊",
      description: "Rata-rata semester ini"
    }
  ];

  const jadwalHariIni = [
    {
      waktu: "08:00 - 10:00",
      praktikum: "Praktikum Asuhan Persalinan Normal",
      ruangan: "Lab Kebidanan A",
      mahasiswa: 15,
      status: "Akan Datang"
    },
    {
      waktu: "13:00 - 15:00",
      praktikum: "Praktikum Kesehatan Ibu dan Anak",
      ruangan: "Lab Kebidanan B",
      mahasiswa: 12,
      status: "Sedang Berlangsung"
    }
  ];

  const tugasPending = [
    {
      praktikum: "Asuhan Persalinan Normal",
      jenis: "Input Nilai",
      deadline: "Hari ini",
      jumlah: 15
    },
    {
      praktikum: "Kesehatan Ibu dan Anak",
      jenis: "Review Laporan",
      deadline: "Besok",
      jumlah: 8
    }
  ];

  return (
    <DashboardLayout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Dosen</h1>
            <p className="text-teal-100 mt-1">Akademi Kebidanan Mega Buana</p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-teal-600 hover:bg-teal-50"
          >
            Input Nilai
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
        {/* Jadwal Hari Ini */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Jadwal Hari Ini</h2>
          <div className="space-y-4">
            {jadwalHariIni.map((jadwal, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{jadwal.waktu}</span>
                    <h3 className="text-base font-medium text-gray-900 mt-1">{jadwal.praktikum}</h3>
                    <p className="text-sm text-gray-500 mt-1">{jadwal.ruangan}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    jadwal.status === 'Sedang Berlangsung' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {jadwal.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{jadwal.mahasiswa} Mahasiswa</span>
                  <Button variant="primary" size="sm">Lihat Detail</Button>
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
                <h3 className="text-sm font-medium text-gray-900">{tugas.praktikum}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="text-xs text-gray-500">{tugas.jenis}</span>
                    <p className="text-xs text-gray-500 mt-1">Deadline: {tugas.deadline}</p>
                  </div>
                  <span className="text-sm font-medium text-red-600">{tugas.jumlah} pending</span>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-3"
                  size="sm"
                >
                  Kerjakan
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DosenDashboard;